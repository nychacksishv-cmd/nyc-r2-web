import { auth } from '@clerk/nextjs/server'
import { AppShell } from '@/components/app-shell'
import { callBackend } from '@/lib/api'
import type { AppUser } from '@/lib/types'

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-800 py-4 sm:flex-row sm:items-center sm:justify-between">
      <dt className="text-sm text-slate-400">{label}</dt>
      <dd className="text-sm font-medium text-slate-100">{value || 'Not set'}</dd>
    </div>
  )
}

export default async function ProfilePage() {
  await auth.protect()

  const profile = await callBackend<AppUser>('/api/me')

  return (
    <AppShell title="Profile" subtitle="Your Clerk identity synced into the application database.">
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {profile.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.image_url}
              alt=""
              className="size-20 rounded-full border border-slate-700 object-cover"
            />
          ) : (
            <div className="grid size-20 place-items-center rounded-full border border-slate-700 bg-slate-950 text-2xl">
              {profile.email?.slice(0, 1).toUpperCase() ?? 'U'}
            </div>
          )}
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300">Signed in</p>
            <h2 className="mt-2 text-2xl font-semibold">
              {[profile.first_name, profile.last_name].filter(Boolean).join(' ') || profile.username || 'User'}
            </h2>
            <p className="mt-1 text-sm text-slate-400">{profile.email ?? profile.id}</p>
          </div>
        </div>

        <dl className="mt-6">
          <Field label="App role" value={profile.role} />
          <Field label="Clerk user ID" value={profile.id} />
          <Field label="Username" value={profile.username} />
          <Field label="Created" value={new Date(profile.created_at).toLocaleString()} />
          <Field label="Last synced" value={new Date(profile.updated_at).toLocaleString()} />
        </dl>
      </section>
    </AppShell>
  )
}

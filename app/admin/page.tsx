import { auth } from '@clerk/nextjs/server'
import { AppShell } from '@/components/app-shell'
import { BackendError, callBackend } from '@/lib/api'
import type { AppUser } from '@/lib/types'

async function getUsers() {
  try {
    return { users: await callBackend<AppUser[]>('/api/admin/users'), error: null }
  } catch (error) {
    return { users: [], error }
  }
}

export default async function AdminPage() {
  await auth.protect()

  const { users, error } = await getUsers()
  const forbidden = error instanceof BackendError && error.status === 403

  return (
    <AppShell title="Admin" subtitle="Role-gated admin starter page for hackathon operations.">
      {error ? (
        <section className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-6 text-amber-100">
          <p className="text-sm font-semibold uppercase tracking-[0.24em]">
            {forbidden ? 'Admin access needed' : 'Admin API unavailable'}
          </p>
          <h2 className="mt-3 text-2xl font-semibold">
            {forbidden ? 'Your account is signed in, but not an admin yet.' : 'Could not load admin users.'}
          </h2>
          <p className="mt-3 text-sm text-amber-100/80">
            {forbidden
              ? 'Set ADMIN_USER_IDS on the backend or promote your user role in the database once the first profile row exists.'
              : error instanceof Error
                ? error.message
                : 'Unknown error'}
          </p>
        </section>
      ) : (
        <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300">Users</p>
              <h2 className="mt-3 text-2xl font-semibold">Synced profiles</h2>
            </div>
            <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-sm font-semibold text-cyan-200">
              {users.length} total
            </span>
          </div>

          <div className="mt-6 overflow-hidden rounded-lg border border-slate-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950 text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-100">{user.email ?? user.username ?? user.id}</p>
                      <p className="max-w-72 truncate text-xs text-slate-500">{user.id}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{new Date(user.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </AppShell>
  )
}

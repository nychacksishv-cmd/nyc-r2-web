import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { AppShell } from '@/components/app-shell'
import { createNoteAction } from '@/app/dashboard/actions'

export default async function CreatePage() {
  await auth.protect()

  return (
    <AppShell
      title="Create"
      subtitle="A simple protected write path you can turn into any hackathon workflow."
    >
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300">DB write</p>
          <h2 className="mt-3 text-2xl font-semibold">Capture a note</h2>
          <p className="mt-2 text-sm text-slate-400">
            This uses a Server Action, your Clerk session, the FastAPI notes API, and Postgres.
          </p>

          <form action={createNoteAction} className="mt-5 space-y-3">
            <textarea
              name="content"
              required
              maxLength={2000}
              placeholder="Example: interview question, user insight, TODO, feature idea..."
              className="min-h-40 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />
            <button
              type="submit"
              className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Save to DB
            </button>
          </form>
        </div>

        <aside className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold">Turn this into the real feature later</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-slate-300">
            <li>Change the note table into your hackathon entity.</li>
            <li>Add fields in the backend model, schema, and migration.</li>
            <li>Replace this form with your product flow.</li>
            <li>Run Alembic migration before the deployment rollout.</li>
          </ul>
          <Link href="/dashboard" className="mt-6 inline-flex text-sm font-semibold text-cyan-300">
            View saved notes →
          </Link>
        </aside>
      </section>
    </AppShell>
  )
}

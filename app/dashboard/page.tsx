import { auth } from '@clerk/nextjs/server'
import { AppShell, InfoCard } from '@/components/app-shell'
import { BackendError, callBackend } from '@/lib/api'
import type { AppUser, Greeting, Job, Note, Notification, StoredFile } from '@/lib/types'
import { createNoteAction, deleteNoteAction } from './actions'

type SafeResult<T> = {
  data: T
  error?: string
}

async function safeBackend<T>(path: string, fallback: T): Promise<SafeResult<T>> {
  try {
    return { data: await callBackend<T>(path) }
  } catch (error) {
    const message =
      error instanceof BackendError
        ? `Backend ${error.status}: ${error.message}`
        : error instanceof Error
          ? error.message
          : 'Unknown backend error'

    return { data: fallback, error: message }
  }
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export default async function DashboardPage() {
  await auth.protect()

  const { userId } = await auth()
  if (!userId) {
    return null
  }

  const [greeting, profile, notes, jobs, notifications, files] = await Promise.all([
    safeBackend<Greeting>('/api/greeting', {
      message: 'Signed in locally. Backend greeting is not available yet.',
      clerk_user_id: userId,
      username: null,
      email: null,
    }),
    safeBackend<AppUser | null>('/api/me', null),
    safeBackend<Note[]>(`/api/users/${userId}/notes`, []),
    safeBackend<Job[]>('/api/me/jobs', []),
    safeBackend<Notification[]>('/api/me/notifications', []),
    safeBackend<StoredFile[]>('/api/me/files', []),
  ])

  const warnings = [greeting, profile, notes, jobs, notifications, files]
    .map((result) => result.error)
    .filter((message): message is string => Boolean(message))

  const unreadNotifications = notifications.data.filter((notification) => !notification.read_at).length

  return (
    <AppShell
      title="Command center"
      subtitle="A protected starter dashboard wired to Clerk, FastAPI, and Postgres."
    >
      <div className="space-y-8">
        {warnings.length > 0 ? (
          <section className="rounded-lg border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100">
            <p className="font-medium">Some backend features are still catching up.</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-amber-100/80">
              {warnings.slice(0, 3).map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="grid gap-4 md:grid-cols-4">
          <InfoCard label="Notes" value={String(notes.data.length)} detail="Simple DB CRUD is ready." />
          <InfoCard label="Jobs" value={String(jobs.data.length)} detail="Background task table scaffold." />
          <InfoCard
            label="Unread"
            value={String(unreadNotifications)}
            detail="Notification table scaffold."
          />
          <InfoCard label="Files" value={String(files.data.length)} detail="Upload metadata table scaffold." />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300">Identity</p>
            <h2 className="mt-3 text-2xl font-semibold">Auth is connected</h2>
            <p className="mt-3 text-sm text-slate-300">{greeting.data.message}</p>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-slate-800 pb-3">
                <dt className="text-slate-400">User ID</dt>
                <dd className="max-w-64 truncate text-right text-slate-200">{userId}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-slate-800 pb-3">
                <dt className="text-slate-400">Email</dt>
                <dd className="text-right text-slate-200">{profile.data?.email ?? 'Not shared'}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Role</dt>
                <dd className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                  {profile.data?.role ?? 'user'}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300">Database</p>
                <h2 className="mt-3 text-2xl font-semibold">Quick notes</h2>
                <p className="mt-2 text-sm text-slate-400">
                  This proves writes, reads, and deletes are flowing through Clerk auth into Postgres.
                </p>
              </div>
            </div>

            <form action={createNoteAction} className="mt-5 space-y-3">
              <textarea
                name="content"
                required
                maxLength={2000}
                placeholder="Add a note for your hackathon idea, TODO, or demo script..."
                className="min-h-28 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
              />
              <button
                type="submit"
                className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Save note
              </button>
            </form>

            <div className="mt-6 space-y-3">
              {notes.data.length > 0 ? (
                notes.data.map((note) => (
                  <article key={note.id} className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
                    <p className="whitespace-pre-wrap text-sm text-slate-200">{note.content}</p>
                    <div className="mt-3 flex items-center justify-between gap-4 text-xs text-slate-500">
                      <span>{formatDate(note.created_at)}</span>
                      <form action={deleteNoteAction}>
                        <input type="hidden" name="noteId" value={note.id} />
                        <button type="submit" className="text-rose-300 transition hover:text-rose-200">
                          Delete
                        </button>
                      </form>
                    </div>
                  </article>
                ))
              ) : (
                <p className="rounded-lg border border-dashed border-slate-700 p-4 text-sm text-slate-400">
                  No notes yet. Add one above to test the live database path.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  )
}

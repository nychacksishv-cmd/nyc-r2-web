import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import { callBackend } from '@/lib/api'

export default async function DashboardPage() {
  await auth.protect()

  const data = await callBackend('/api/greeting')

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 p-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Dashboard</p>
        <h1 className="mt-3 text-3xl font-semibold">Clerk auth is working</h1>
        <p className="mt-3 text-slate-300">{data.message}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-lg bg-cyan-400 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-300"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  )
}
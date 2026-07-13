'use client'

export default function DashboardError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-50">
      <section className="mx-auto max-w-2xl rounded-xl border border-rose-400/30 bg-rose-400/10 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-200">Dashboard error</p>
        <h1 className="mt-3 text-2xl font-semibold">Something blocked the dashboard.</h1>
        <p className="mt-3 text-sm text-rose-100/80">{error.message}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 rounded-lg bg-rose-200 px-4 py-2 text-sm font-semibold text-slate-950"
        >
          Try again
        </button>
      </section>
    </main>
  )
}

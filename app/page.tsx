import Link from 'next/link'
import { SignInButton, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'

const features = [
  'Clerk sign-in and protected pages',
  'FastAPI backend calls with auth tokens',
  'Postgres-backed starter tables',
  'Kubernetes deploy + autoscaling ready',
]

export default async function LandingPage() {
  const { userId } = await auth()

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-8 px-6 py-16 text-center">
        <span className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-300">
          Get200 Hackathon Starter
        </span>

        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Start with auth, DB, API, and deploy already working.
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-300">
            A clean base for whatever the hackathon prompt becomes: secure user sessions, a protected
            dashboard, Postgres CRUD, and production Kubernetes hosting.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {!userId ? (
            <SignInButton mode="modal">
              <button className="rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
                Sign in
              </button>
            </SignInButton>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Open dashboard
              </Link>
              <UserButton />
            </>
          )}
        </div>

        <div className="grid w-full gap-3 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature} className="rounded-lg border border-slate-800 bg-slate-900/70 p-4 text-sm">
              {feature}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

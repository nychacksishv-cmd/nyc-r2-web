
import Link from 'next/link'
import { SignInButton, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'

export default async function LandingPage() {
  const { userId } = await auth()

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-8 px-6 text-center">
        <span className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-300">
          NYC R2 Auth Demo
        </span>

        {/* <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Secure frontend + backend auth with Clerk
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-300">
            Sign in with Clerk, then go to the protected dashboard where the Next.js app attaches the
            user session token to the FastAPI backend call.
          </p>
        </div> */}

        <div className="flex items-center gap-4">
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
                className="rounded-lg border border-cyan-400/50 px-5 py-3 font-semibold text-cyan-200 transition hover:bg-cyan-400/10"
              >
                Open dashboard
              </Link>
              <UserButton />
            </>
          )}
        </div>
      </section>
    </main>
  )
}

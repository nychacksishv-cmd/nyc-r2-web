import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import type { ReactNode } from 'react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/create', label: 'Create' },
  { href: '/profile', label: 'Profile' },
  { href: '/admin', label: 'Admin' },
]

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 bg-slate-950/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/" className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
              Get200
            </Link>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h1>
            {subtitle ? <p className="mt-1 text-sm text-slate-400">{subtitle}</p> : null}
          </div>

          <div className="flex items-center gap-3">
            <nav className="flex flex-wrap gap-2 text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md border border-slate-800 px-3 py-2 text-slate-300 transition hover:border-cyan-400/60 hover:text-cyan-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <UserButton />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
    </main>
  )
}

export function InfoCard({
  label,
  value,
  detail,
}: {
  label: string
  value: string
  detail?: string
}) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-50">{value}</p>
      {detail ? <p className="mt-2 text-sm text-slate-500">{detail}</p> : null}
    </div>
  )
}

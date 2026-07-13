import { AppShell } from '@/components/app-shell'

export default function ProfileLoading() {
  return (
    <AppShell title="Profile" subtitle="Loading profile...">
      <div className="h-80 rounded-xl border border-slate-800 bg-slate-900/70" />
    </AppShell>
  )
}

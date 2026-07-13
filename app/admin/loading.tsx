import { AppShell } from '@/components/app-shell'

export default function AdminLoading() {
  return (
    <AppShell title="Admin" subtitle="Checking admin access...">
      <div className="h-80 rounded-xl border border-slate-800 bg-slate-900/70" />
    </AppShell>
  )
}

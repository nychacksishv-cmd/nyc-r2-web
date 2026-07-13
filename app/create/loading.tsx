import { AppShell } from '@/components/app-shell'

export default function CreateLoading() {
  return (
    <AppShell title="Create" subtitle="Loading create tools...">
      <div className="h-64 rounded-xl border border-slate-800 bg-slate-900/70" />
    </AppShell>
  )
}

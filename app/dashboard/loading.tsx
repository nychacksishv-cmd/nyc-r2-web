import { AppShell, InfoCard } from '@/components/app-shell'

export default function DashboardLoading() {
  return (
    <AppShell title="Command center" subtitle="Loading your workspace...">
      <section className="grid gap-4 md:grid-cols-4">
        <InfoCard label="Notes" value="..." />
        <InfoCard label="Jobs" value="..." />
        <InfoCard label="Unread" value="..." />
        <InfoCard label="Files" value="..." />
      </section>
    </AppShell>
  )
}

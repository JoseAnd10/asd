import { AppSidebar } from "@/components/app-sidebar"
import { DeadlinesTable } from "@/components/deadlines-table"
import { KpiCards } from "@/components/kpi-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function OverviewPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 64)",
          "--header-height": "calc(var(--spacing) * 14)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Resumen" subtitle="Vista general de tu despacho" />
        <div className="flex flex-1 flex-col">
          <div className="flex flex-col gap-6 py-6">
            <KpiCards />
            <DeadlinesTable />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

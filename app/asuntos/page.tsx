import { AppSidebar } from "@/components/app-sidebar"
import { AsuntosTable } from "@/components/asuntos-table"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function AsuntosPage() {
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
        <SiteHeader title="Asuntos" />
        <div className="flex flex-1 flex-col">
          <div className="flex flex-col gap-6 py-6">
            <AsuntosTable />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

import { AppSidebar } from "@/components/app-sidebar"
import { AsuntoDetail } from "@/components/asunto-detail"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

// TODO: replace with Supabase data
const asuntosData: Record<string, { titulo: string; cliente: string; estado: string }> = {
  "asunto-1": {
    titulo: "García vs. Seguros ABC",
    cliente: "Juan García Pérez",
    estado: "activo",
  },
  "asunto-2": {
    titulo: "Herencia Martínez",
    cliente: "Familia Martínez",
    estado: "activo",
  },
  "asunto-3": {
    titulo: "Despido improcedente López",
    cliente: "María López Sánchez",
    estado: "en_espera",
  },
}

export default async function AsuntoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const asunto = asuntosData[id] || {
    titulo: "Asunto no encontrado",
    cliente: "-",
    estado: "cerrado",
  }

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
        <SiteHeader title="Detalle del asunto" />
        <div className="flex flex-1 flex-col">
          <div className="flex flex-col gap-6 py-6">
            <AsuntoDetail
              id={id}
              titulo={asunto.titulo}
              cliente={asunto.cliente}
              estado={asunto.estado}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

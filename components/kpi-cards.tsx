"use client"

import { AlertTriangle, Clock, Briefcase, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface KpiData {
  label: string
  value: number
  description: string
  icon: React.ElementType
  variant: "critical" | "warning" | "info" | "success"
  items?: { name: string; date: string; type: string }[]
}

const kpiData: KpiData[] = [
  {
    label: "Vence hoy",
    value: 3,
    description: "Requieren acción inmediata",
    icon: AlertTriangle,
    variant: "critical",
    items: [
      { name: "Contestación demanda - García", date: "Hoy", type: "Demanda" },
      { name: "Recurso apelación - López", date: "Hoy", type: "Recurso" },
      { name: "Prueba documental - Ruiz", date: "Hoy", type: "Prueba" },
    ],
  },
  {
    label: "Próximas 48h",
    value: 7,
    description: "Plazos en las próximas 48 horas",
    icon: Clock,
    variant: "warning",
    items: [
      { name: "Vista oral - Díaz", date: "Mañana", type: "Vista" },
      { name: "Alegaciones - Martínez", date: "En 2 días", type: "Escrito" },
    ],
  },
  {
    label: "Esta semana",
    value: 12,
    description: "Plazos en los próximos 7 días",
    icon: Calendar,
    variant: "info",
    items: [
      { name: "Audiencia previa - Sánchez", date: "En 5 días", type: "Audiencia" },
      { name: "Demanda laboral - Pérez", date: "En 6 días", type: "Demanda" },
    ],
  },
  {
    label: "Asuntos activos",
    value: 24,
    description: "Expedientes en tramitación",
    icon: Briefcase,
    variant: "success",
  },
]

const variantStyles = {
  critical: {
    border: "border-l-4 border-l-destructive",
    badge: "bg-[#FCEBEB] text-destructive",
    value: "text-destructive",
  },
  warning: {
    border: "border-l-4 border-l-warning",
    badge: "bg-[#FEF3E2] text-warning",
    value: "text-warning",
  },
  info: {
    border: "border-l-4 border-l-primary",
    badge: "bg-primary/10 text-primary",
    value: "text-primary",
  },
  success: {
    border: "border-l-4 border-l-success",
    badge: "bg-[#EAF3DE] text-success",
    value: "text-success",
  },
}

export function KpiCards() {
  return (
    <div className="grid gap-4 px-4 sm:grid-cols-2 lg:px-6 xl:grid-cols-4">
      {kpiData.map((kpi) => {
        const styles = variantStyles[kpi.variant]
        
        return (
          <Card 
            key={kpi.label} 
            className={`border rounded-lg ${styles.border}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <Badge className={`${styles.badge} border-0 text-xs font-medium`}>
                  {kpi.value} plazos
                </Badge>
                <span className="text-xs text-muted-foreground">{kpi.label}</span>
              </div>
              
              <div className="mb-3">
                <span className={`text-3xl font-semibold ${styles.value}`}>
                  {kpi.value}
                </span>
              </div>
              
              <p className="text-[13px] text-muted-foreground mb-3">
                {kpi.description}
              </p>
              
              {kpi.items && kpi.items.length > 0 && (
                <div className="space-y-2 pt-2 border-t">
                  {kpi.items.slice(0, 2).map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-foreground truncate max-w-[60%]">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
                          {item.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

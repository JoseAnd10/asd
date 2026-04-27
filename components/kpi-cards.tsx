"use client"

import { AlertTriangle, Clock, Briefcase, TrendingUp, TrendingDown, Minus, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface KpiData {
  label: string
  value: number
  trend?: number
  trendDirection?: "up" | "down" | "neutral"
  description: string
  icon: React.ElementType
  variant: "critical" | "warning" | "info" | "success"
}

const kpiData: KpiData[] = [
  {
    label: "Vencen Hoy",
    value: 3,
    trend: 2,
    trendDirection: "up",
    description: "Requieren acción inmediata",
    icon: AlertTriangle,
    variant: "critical",
  },
  {
    label: "Próximas 48h",
    value: 7,
    trend: 1,
    trendDirection: "down",
    description: "Plazos en las próximas 48 horas",
    icon: Clock,
    variant: "warning",
  },
  {
    label: "Esta Semana",
    value: 12,
    trend: 0,
    trendDirection: "neutral",
    description: "Plazos en los próximos 7 días",
    icon: Calendar,
    variant: "info",
  },
  {
    label: "Asuntos Activos",
    value: 24,
    trend: 3,
    trendDirection: "up",
    description: "Expedientes en tramitación",
    icon: Briefcase,
    variant: "success",
  },
]

const variantStyles = {
  critical: {
    iconBg: "bg-gradient-to-br from-destructive/15 to-destructive/5",
    iconColor: "text-destructive",
    valueBg: "bg-gradient-to-r from-destructive/10 via-transparent to-transparent",
    border: "border-l-destructive",
    ring: "ring-destructive/10",
  },
  warning: {
    iconBg: "bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-900/10",
    iconColor: "text-amber-600 dark:text-amber-500",
    valueBg: "bg-gradient-to-r from-amber-50 via-transparent to-transparent dark:from-amber-900/20",
    border: "border-l-amber-500",
    ring: "ring-amber-500/10",
  },
  info: {
    iconBg: "bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-800/50",
    iconColor: "text-slate-600 dark:text-slate-400",
    valueBg: "bg-gradient-to-r from-slate-50 via-transparent to-transparent dark:from-slate-800/30",
    border: "border-l-slate-400",
    ring: "ring-slate-400/10",
  },
  success: {
    iconBg: "bg-gradient-to-br from-primary/15 to-primary/5",
    iconColor: "text-primary",
    valueBg: "bg-gradient-to-r from-primary/5 via-transparent to-transparent",
    border: "border-l-primary",
    ring: "ring-primary/10",
  },
}

function TrendIndicator({ trend, direction }: { trend: number; direction?: "up" | "down" | "neutral" }) {
  if (direction === "neutral" || trend === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
        <Minus className="size-3" />
        Sin cambios
      </span>
    )
  }
  
  const isUp = direction === "up"
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${
      isUp ? "text-destructive" : "text-primary"
    }`}>
      {isUp ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
      {isUp ? "+" : "-"}{Math.abs(trend)} vs ayer
    </span>
  )
}

export function KpiCards() {
  return (
    <div className="grid gap-4 px-4 sm:grid-cols-2 lg:px-6 xl:grid-cols-4">
      {kpiData.map((kpi) => {
        const styles = variantStyles[kpi.variant]
        const Icon = kpi.icon
        
        return (
          <Card 
            key={kpi.label} 
            className={`group relative overflow-hidden border border-border/60 border-l-[3px] ${styles.border} shadow-soft hover:shadow-soft-md transition-all duration-200`}
          >
            {/* Background Icon - Large and subtle */}
            <div className="pointer-events-none absolute -right-6 -top-6 opacity-[0.03] transition-transform duration-300 group-hover:scale-110">
              <Icon className="size-36" strokeWidth={1} />
            </div>
            
            <CardContent className="relative p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    {kpi.label}
                  </p>
                  
                  <div className={`inline-block rounded-lg px-3 py-1.5 ${styles.valueBg}`}>
                    <span className="font-serif text-[42px] font-bold leading-none tracking-tight text-foreground">
                      {kpi.value}
                    </span>
                  </div>
                  
                  <div className="space-y-2 pt-1">
                    <p className="text-[13px] text-muted-foreground">
                      {kpi.description}
                    </p>
                    {kpi.trend !== undefined && (
                      <TrendIndicator trend={kpi.trend} direction={kpi.trendDirection} />
                    )}
                  </div>
                </div>
                
                <div className={`flex size-12 flex-shrink-0 items-center justify-center rounded-xl ${styles.iconBg} ring-1 ${styles.ring}`}>
                  <Icon className={`size-5 ${styles.iconColor}`} strokeWidth={2} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

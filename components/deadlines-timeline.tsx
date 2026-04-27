"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface Deadline {
  id: string
  caseName: string
  asuntoId: string
  type: string
  date: Date
}

interface DeadlinesTimelineProps {
  deadlines?: Deadline[]
  isLoading?: boolean
}

function getRelativeLabel(date: Date): { label: string; variant: "red" | "amber" | "green" } {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const targetDate = new Date(date)
  targetDate.setHours(0, 0, 0, 0)
  
  const diffDays = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) {
    return { label: "Vencido", variant: "red" }
  }
  if (diffDays === 0) {
    return { label: "Hoy", variant: "red" }
  }
  if (diffDays === 1) {
    return { label: "Mañana", variant: "amber" }
  }
  if (diffDays <= 7) {
    const weekdays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
    const dayName = weekdays[targetDate.getDay()]
    const dayNum = targetDate.getDate()
    return { label: `${dayName} ${dayNum}`, variant: diffDays <= 2 ? "amber" : "green" }
  }
  
  const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
  return { label: `${targetDate.getDate()} ${months[targetDate.getMonth()]}`, variant: "green" }
}

const variantStyles = {
  red: {
    label: "text-[#DC2626] dark:text-[#FCA5A5]",
    border: "border-l-[#DC2626]",
  },
  amber: {
    label: "text-[#D97706] dark:text-[#FCD34D]",
    border: "border-l-[#D97706]",
  },
  green: {
    label: "text-[#16A34A] dark:text-[#86EFAC]",
    border: "border-l-[#16A34A]",
  },
}

// Mock data
const mockDeadlines: Deadline[] = [
  { id: "1", caseName: "García vs. Seguros ABC", asuntoId: "asunto-1", type: "Contestación demanda", date: new Date() },
  { id: "2", caseName: "Herencia Martínez", asuntoId: "asunto-2", type: "Presentar prueba documental", date: new Date() },
  { id: "3", caseName: "Despido López", asuntoId: "asunto-3", type: "Recurso de apelación", date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) },
  { id: "4", caseName: "Accidente Ruiz", asuntoId: "asunto-4", type: "Notificación firmada", date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
  { id: "5", caseName: "Contrato Díaz", asuntoId: "asunto-5", type: "Vista oral", date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000) },
  { id: "6", caseName: "Divorcio Fernández", asuntoId: "asunto-6", type: "Audiencia previa", date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) },
  { id: "7", caseName: "Reclamación Sánchez", asuntoId: "asunto-7", type: "Alegaciones finales", date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
]

export function DeadlinesTimeline({ deadlines = mockDeadlines, isLoading = false }: DeadlinesTimelineProps) {
  if (isLoading) {
    return (
      <div className="bg-card border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-3 pl-3 border-l-2 border-border">
              <div className="flex-1">
                <Skeleton className="h-4 w-16 mb-1" />
                <Skeleton className="h-4 w-40 mb-1" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-foreground">Próximos plazos</h2>
        <Button variant="ghost" size="sm" className="h-7 text-xs text-primary hover:text-primary">
          Ver todos
          <ArrowRight className="ml-1 size-3" />
        </Button>
      </div>
      
      <div className="space-y-1">
        {deadlines.slice(0, 8).map((deadline) => {
          const { label, variant } = getRelativeLabel(deadline.date)
          const styles = variantStyles[variant]
          
          return (
            <Link
              key={deadline.id}
              href={`/asuntos/${deadline.asuntoId}`}
              className={`block pl-3 py-2 border-l-2 ${styles.border} hover:bg-muted/50 rounded-r transition-colors`}
            >
              <div className={`text-xs font-semibold ${styles.label}`}>
                {label}
              </div>
              <div className="text-sm font-medium text-foreground mt-0.5">
                {deadline.caseName}
              </div>
              <div className="text-xs text-muted-foreground">
                {deadline.type}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

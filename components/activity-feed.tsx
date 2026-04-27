"use client"

import { FileText, Calendar, CheckCircle2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface Activity {
  id: string
  type: "document" | "deadline" | "status"
  description: string
  timestamp: Date
}

interface ActivityFeedProps {
  activities?: Activity[]
  isLoading?: boolean
}

function getRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 1) return "Ahora mismo"
  if (diffMins < 60) return `Hace ${diffMins} min`
  if (diffHours < 24) return `Hace ${diffHours}h`
  if (diffDays === 1) return "Ayer"
  if (diffDays < 7) return `Hace ${diffDays} días`
  return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" })
}

const iconMap = {
  document: FileText,
  deadline: Calendar,
  status: CheckCircle2,
}

// Mock data
const mockActivities: Activity[] = [
  { id: "1", type: "document", description: "Documento procesado en Caso Martínez", timestamp: new Date(Date.now() - 10 * 60 * 1000) },
  { id: "2", type: "deadline", description: "Nuevo plazo calculado: 15 mayo", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  { id: "3", type: "status", description: "Asunto López marcado como cerrado", timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) },
  { id: "4", type: "document", description: "Sentencia recibida en Caso García", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  { id: "5", type: "deadline", description: "Plazo de apelación vence en 5 días", timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
]

export function ActivityFeed({ activities = mockActivities, isLoading = false }: ActivityFeedProps) {
  if (isLoading) {
    return (
      <div className="bg-card border rounded-lg p-4">
        <Skeleton className="h-5 w-32 mb-4" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="size-8 rounded-full shrink-0" />
              <div className="flex-1">
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card border rounded-lg p-4">
      <h2 className="text-base font-semibold text-foreground mb-4">Actividad reciente</h2>
      
      <div className="space-y-0">
        {activities.slice(0, 5).map((activity, index) => {
          const Icon = iconMap[activity.type]
          const isLast = index === Math.min(activities.length, 5) - 1
          
          return (
            <div 
              key={activity.id} 
              className={`flex gap-3 py-3 ${!isLast ? "border-b border-border" : ""}`}
            >
              <div className="flex size-8 items-center justify-center rounded-full bg-muted shrink-0">
                <Icon className="size-4 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {getRelativeTime(activity.timestamp)}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

"use client"

import { Skeleton } from "@/components/ui/skeleton"

interface StatusBarProps {
  stats?: {
    activeAsuntos: number
    urgent: number
    pendingTasks: number
    inactive30Days: number
  }
  isLoading?: boolean
}

export function StatusBar({ stats, isLoading = false }: StatusBarProps) {
  const data = stats || { activeAsuntos: 0, urgent: 0, pendingTasks: 0, inactive30Days: 0 }

  if (isLoading) {
    return (
      <div className="px-4 lg:px-6">
        <Skeleton className="h-5 w-full max-w-xl" />
      </div>
    )
  }

  return (
    <div className="px-4 lg:px-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#64748B] dark:text-muted-foreground">
        <span>{data.activeAsuntos} asuntos activos</span>
        <span className="text-border">|</span>
        <span>{data.urgent} urgentes</span>
        <span className="text-border">|</span>
        <span>{data.pendingTasks} tareas pendientes</span>
        <span className="text-border">|</span>
        <span>{data.inactive30Days} sin actividad +30 días</span>
      </div>
    </div>
  )
}

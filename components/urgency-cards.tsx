"use client"

import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

interface UrgencyCardProps {
  count: number
  isLoading: boolean
  label: string
  subtext: string
  variant: "today" | "48h" | "week" | "tasks"
  href: string
}

const variantStyles = {
  today: {
    bg: "bg-[#FEF2F2] dark:bg-[#DC2626]/10",
    border: "border-[#FECACA] dark:border-[#DC2626]/30",
    number: "text-[#DC2626]",
  },
  "48h": {
    bg: "bg-[#FFFBEB] dark:bg-[#D97706]/10",
    border: "border-[#FDE68A] dark:border-[#D97706]/30",
    number: "text-[#D97706]",
  },
  week: {
    bg: "bg-[#F0FDF4] dark:bg-[#16A34A]/10",
    border: "border-[#BBF7D0] dark:border-[#16A34A]/30",
    number: "text-[#16A34A]",
  },
  tasks: {
    bg: "bg-[#F8FAFC] dark:bg-card",
    border: "border-[#E2E8F0] dark:border-border",
    number: "text-[#1E293B] dark:text-foreground",
  },
}

function UrgencyCard({ count, isLoading, label, subtext, variant, href }: UrgencyCardProps) {
  const styles = variantStyles[variant]

  if (isLoading) {
    return (
      <div className={`p-4 rounded-lg border ${styles.bg} ${styles.border}`}>
        <Skeleton className="h-12 w-16 mb-2" />
        <Skeleton className="h-4 w-24 mb-1" />
        <Skeleton className="h-3 w-32" />
      </div>
    )
  }

  return (
    <Link 
      href={href}
      className={`block p-4 rounded-lg border transition-all hover:shadow-md ${styles.bg} ${styles.border}`}
    >
      <div className={`text-5xl font-bold mb-1 ${styles.number}`}>
        {count}
      </div>
      <div className="text-sm font-medium text-foreground">
        {label}
      </div>
      <div className="text-xs text-muted-foreground mt-0.5">
        {subtext}
      </div>
    </Link>
  )
}

interface UrgencyCardsProps {
  data?: {
    today: number
    next48h: number
    thisWeek: number
    pendingTasks: number
  }
  isLoading?: boolean
}

export function UrgencyCards({ data, isLoading = false }: UrgencyCardsProps) {
  const counts = data || { today: 0, next48h: 0, thisWeek: 0, pendingTasks: 0 }

  return (
    <div className="grid grid-cols-2 gap-4 px-4 lg:grid-cols-4 lg:px-6">
      <UrgencyCard
        count={counts.today}
        isLoading={isLoading}
        label="plazos HOY"
        subtext="Requieren acción inmediata"
        variant="today"
        href="/plazos?filter=today"
      />
      <UrgencyCard
        count={counts.next48h}
        isLoading={isLoading}
        label="plazos en 48h"
        subtext="Próximas 48 horas"
        variant="48h"
        href="/plazos?filter=48h"
      />
      <UrgencyCard
        count={counts.thisWeek}
        isLoading={isLoading}
        label="plazos esta semana"
        subtext="Próximos 7 días"
        variant="week"
        href="/plazos?filter=week"
      />
      <UrgencyCard
        count={counts.pendingTasks}
        isLoading={isLoading}
        label="tareas pendientes"
        subtext="Sin completar"
        variant="tasks"
        href="/tareas"
      />
    </div>
  )
}

"use client"

import { AlertTriangle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

interface InactiveCase {
  id: string
  caseName: string
  asuntoId: string
  daysInactive: number
}

interface InactiveCasesAlertProps {
  cases?: InactiveCase[]
  isLoading?: boolean
}

// Mock data
const mockCases: InactiveCase[] = [
  { id: "1", caseName: "Herencia Rodríguez", asuntoId: "asunto-8", daysInactive: 45 },
  { id: "2", caseName: "Contrato Navarro", asuntoId: "asunto-9", daysInactive: 38 },
]

export function InactiveCasesAlert({ cases = mockCases, isLoading = false }: InactiveCasesAlertProps) {
  if (isLoading) {
    return (
      <div className="px-4 lg:px-6">
        <div className="bg-[#FFFBEB] dark:bg-[#D97706]/10 border border-[#FDE68A] dark:border-[#D97706]/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Skeleton className="size-5" />
            <Skeleton className="h-5 w-48" />
          </div>
          <div className="flex gap-3 overflow-x-auto">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-48 shrink-0" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Hide section if no inactive cases
  if (!cases || cases.length === 0) return null

  return (
    <div className="px-4 lg:px-6">
      <div className="bg-[#FFFBEB] dark:bg-[#D97706]/10 border border-[#FDE68A] dark:border-[#D97706]/30 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="size-5 text-[#D97706]" strokeWidth={2} />
          <h3 className="text-sm font-semibold text-[#92400E] dark:text-[#FCD34D]">
            Asuntos sin actividad (+30 días)
          </h3>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-1">
          {cases.map((caseItem) => (
            <div 
              key={caseItem.id}
              className="flex items-center justify-between gap-4 min-w-[200px] bg-white dark:bg-card border border-[#FDE68A] dark:border-[#D97706]/20 rounded-md p-3 shrink-0"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {caseItem.caseName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {caseItem.daysInactive} días sin actividad
                </p>
              </div>
              <Button 
                asChild
                variant="ghost" 
                size="sm" 
                className="h-7 text-xs text-[#D97706] hover:text-[#B45309] hover:bg-[#FDE68A]/30 shrink-0"
              >
                <Link href={`/asuntos/${caseItem.asuntoId}`}>
                  Registrar
                  <ArrowRight className="ml-1 size-3" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { AlertTriangle, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CriticalDeadline {
  id: string
  caseName: string
  status: string
  asuntoId: string
}

interface CriticalBannerProps {
  deadline?: CriticalDeadline | null
}

export function CriticalBanner({ deadline }: CriticalBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  if (!deadline || dismissed) return null

  return (
    <div className="sticky top-0 z-50 border-l-4 border-l-[#DC2626] bg-[#FEF2F2] dark:bg-[#DC2626]/15 dark:border-l-[#DC2626]">
      <div className="flex items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <div className="flex items-center gap-3 min-w-0">
          <AlertTriangle className="size-5 text-[#DC2626] shrink-0" strokeWidth={2} />
          <p className="text-sm font-medium text-[#DC2626] dark:text-[#FCA5A5] truncate">
            <span className="font-semibold">{deadline.caseName}</span>
            <span className="mx-2">—</span>
            <span>{deadline.status}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button 
            asChild
            size="sm" 
            className="h-8 bg-[#DC2626] hover:bg-[#B91C1C] text-white"
          >
            <Link href={`/asuntos/${deadline.asuntoId}`}>
              Ver asunto
              <ArrowRight className="ml-1.5 size-3.5" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-[#DC2626] hover:bg-[#DC2626]/10"
            onClick={() => setDismissed(true)}
          >
            <X className="size-4" />
            <span className="sr-only">Descartar</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

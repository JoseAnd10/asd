"use client"

import { Plus, FileText, CheckSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function QuickActions() {
  return (
    <div className="px-4 lg:px-6">
      <div className="flex flex-wrap gap-3">
        <Button 
          asChild
          variant="outline" 
          className="h-10"
        >
          <Link href="/asuntos/nuevo">
            <Plus className="mr-2 size-4" />
            Nuevo asunto
          </Link>
        </Button>
        <Button 
          asChild
          variant="outline" 
          className="h-10"
        >
          <Link href="/documentos/procesar">
            <FileText className="mr-2 size-4" />
            Procesar documento
          </Link>
        </Button>
        <Button 
          asChild
          variant="outline" 
          className="h-10"
        >
          <Link href="/tareas">
            <CheckSquare className="mr-2 size-4" />
            Ver tareas pendientes
          </Link>
        </Button>
      </div>
    </div>
  )
}

"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function GlobalSearch() {
  return (
    <div className="px-4 lg:px-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" strokeWidth={1.5} />
        <Input
          type="search"
          placeholder="Buscar asuntos, clientes, documentos..."
          className="h-12 pl-12 pr-16 text-base bg-card border-border rounded-lg placeholder:text-muted-foreground/70"
        />
        <kbd className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none hidden h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-xs text-muted-foreground sm:flex">
          <span className="text-sm">⌘</span>K
        </kbd>
      </div>
    </div>
  )
}

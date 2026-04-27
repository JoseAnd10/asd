"use client"

import { useState } from "react"
import { Bell, AlertTriangle, Clock, FileText, Search, X, ChevronRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface SiteHeaderProps {
  title?: string
  subtitle?: string
}

const notifications = [
  {
    id: 1,
    type: "critical",
    title: "Plazo vence hoy",
    description: "Contestación demanda - García vs. Constructora ABC",
    time: "Hace 2h",
    unread: true,
    caseRef: "2024/0847",
  },
  {
    id: 2,
    type: "warning",
    title: "Plazo en 48h",
    description: "Presentar recurso de apelación",
    time: "Hace 5h",
    unread: true,
    caseRef: "2024/1234",
  },
  {
    id: 3,
    type: "success",
    title: "IA: Análisis completado",
    description: "Se detectaron 3 plazos en el documento subido",
    time: "Ayer",
    unread: true,
    caseRef: "2024/0912",
  },
  {
    id: 4,
    type: "info",
    title: "Documento recibido",
    description: "Nueva notificación judicial recibida",
    time: "Hace 2d",
    unread: false,
    caseRef: "2024/0756",
  },
]

export function SiteHeader({ title = "Resumen", subtitle }: SiteHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const unreadCount = notifications.filter((n) => n.unread).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "critical":
        return (
          <div className="flex size-9 items-center justify-center rounded-lg bg-destructive/10">
            <AlertTriangle className="size-4 text-destructive" strokeWidth={2} />
          </div>
        )
      case "warning":
        return (
          <div className="flex size-9 items-center justify-center rounded-lg bg-warning/10">
            <Clock className="size-4 text-warning" strokeWidth={2} />
          </div>
        )
      case "success":
        return (
          <div className="flex size-9 items-center justify-center rounded-lg bg-success/10">
            <CheckCircle2 className="size-4 text-success" strokeWidth={2} />
          </div>
        )
      default:
        return (
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <FileText className="size-4 text-muted-foreground" strokeWidth={2} />
          </div>
        )
    }
  }

  return (
    <header className="flex h-12 shrink-0 items-center border-b bg-card">
      <div className="flex w-full items-center gap-3 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1 size-8 text-muted-foreground hover:text-foreground transition-colors" />
        <Separator
          orientation="vertical"
          className="mx-1 data-[orientation=vertical]:h-5"
        />
        
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold text-foreground">{title}</h1>
          {subtitle && (
            <span className="text-xs text-muted-foreground">{subtitle}</span>
          )}
        </div>
        
        <div className="ml-auto flex items-center gap-1.5">
          {/* Search - Desktop */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" strokeWidth={2} />
            <Input
              type="search"
              placeholder="Buscar asuntos, clientes..."
              className="h-9 w-64 rounded-lg pl-9 pr-12 text-sm placeholder:text-muted-foreground/50 lg:w-80"
            />
            <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 select-none rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground lg:inline-flex">
              ⌘K
            </kbd>
          </div>

          {/* Search - Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="size-9 md:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="size-4" strokeWidth={2} />
            <span className="sr-only">Buscar</span>
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative size-9 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Bell className="size-[18px]" strokeWidth={2} />
                {unreadCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex size-[18px] items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                    {unreadCount}
                  </span>
                )}
                <span className="sr-only">Notificaciones</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-[400px] p-0 border" 
              align="end"
              sideOffset={12}
            >
              <div className="flex items-center justify-between border-b px-4 py-3 bg-muted/30">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-sm font-semibold text-foreground">Notificaciones</h3>
                  {unreadCount > 0 && (
                    <Badge className="h-5 rounded-md bg-destructive/10 px-2 text-[11px] font-semibold text-destructive hover:bg-destructive/10">
                      {unreadCount} nuevas
                    </Badge>
                  )}
                </div>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground">
                  Marcar leídas
                </Button>
              </div>
              
              <div className="max-h-[400px] overflow-y-auto">
                {notifications.map((notification, index) => (
                  <div
                    key={notification.id}
                    className={`group flex cursor-pointer gap-3 px-4 py-3.5 transition-colors hover:bg-muted/40 ${
                      notification.unread ? "bg-primary/5" : ""
                    } ${index !== notifications.length - 1 ? "border-b" : ""}`}
                  >
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm leading-tight ${notification.unread ? "font-semibold text-foreground" : "font-medium text-muted-foreground"}`}>
                          {notification.title}
                        </p>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span className="text-[11px] text-muted-foreground">
                            {notification.time}
                          </span>
                          {notification.unread && (
                            <span className="size-2 rounded-full bg-primary" />
                          )}
                        </div>
                      </div>
                      <p className="text-[13px] text-muted-foreground line-clamp-1">
                        {notification.description}
                      </p>
                      <div className="flex items-center gap-2 pt-0.5">
                        <Badge variant="outline" className="h-5 rounded px-1.5 text-[10px] font-mono">
                          {notification.caseRef}
                        </Badge>
                        <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          Ver asunto →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t bg-muted/20 px-4 py-2.5">
                <Button variant="ghost" className="h-8 w-full justify-center text-sm font-medium text-primary hover:text-primary hover:bg-primary/5">
                  Ver todas las notificaciones
                  <ChevronRight className="ml-1 size-4" />
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div className="absolute inset-x-0 top-0 z-50 flex h-12 items-center gap-2 border-b bg-card px-4 md:hidden">
          <Search className="size-4 text-muted-foreground" strokeWidth={2} />
          <Input
            type="search"
            placeholder="Buscar asuntos, clientes..."
            className="h-9 flex-1 border-0 bg-transparent pl-0 text-sm focus-visible:ring-0"
            autoFocus
          />
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => setSearchOpen(false)}
          >
            <X className="size-4" />
          </Button>
        </div>
      )}
    </header>
  )
}

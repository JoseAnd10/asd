"use client"

import { AlertTriangle, Clock, Calendar, MoreHorizontal, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const deadlines = [
  {
    id: "1",
    plazo: "Contestación demanda",
    asunto: "García vs. Seguros ABC",
    asuntoId: "asunto-1",
    expediente: "2024/0847",
    vence: "2024-01-15",
    estado: "vencido",
    aiDetected: true,
  },
  {
    id: "2",
    plazo: "Presentar prueba documental",
    asunto: "Herencia Martínez",
    asuntoId: "asunto-2",
    expediente: "2024/0912",
    vence: "2024-01-16",
    estado: "hoy",
    aiDetected: true,
  },
  {
    id: "3",
    plazo: "Audiencia preliminar",
    asunto: "Despido improcedente López",
    asuntoId: "asunto-3",
    expediente: "2024/0756",
    vence: "2024-01-18",
    estado: "proximo",
    aiDetected: false,
  },
  {
    id: "4",
    plazo: "Recurso de apelación",
    asunto: "Accidente tráfico Ruiz",
    asuntoId: "asunto-4",
    expediente: "2024/0634",
    vence: "2024-01-20",
    estado: "pendiente",
    aiDetected: false,
  },
  {
    id: "5",
    plazo: "Vista oral",
    asunto: "Contrato mercantil Díaz",
    asuntoId: "asunto-5",
    expediente: "2024/0521",
    vence: "2024-01-22",
    estado: "pendiente",
    aiDetected: false,
  },
]

function getStatusBadge(estado: string) {
  switch (estado) {
    case "vencido":
      return <Badge className="bg-destructive/10 text-destructive border-0 hover:bg-destructive/20 font-medium">Vencido</Badge>
    case "hoy":
      return <Badge className="bg-amber-100 text-amber-700 border-0 hover:bg-amber-200 font-medium dark:bg-amber-900/30 dark:text-amber-500">Hoy</Badge>
    case "proximo":
      return <Badge className="bg-primary/10 text-primary border-0 hover:bg-primary/20 font-medium">7 días</Badge>
    case "pendiente":
      return <Badge variant="secondary" className="border-0 font-medium">Pendiente</Badge>
    default:
      return <Badge variant="outline">{estado}</Badge>
  }
}

function getStatusIcon(estado: string) {
  switch (estado) {
    case "vencido":
      return (
        <div className="flex size-9 items-center justify-center rounded-lg bg-destructive/10">
          <AlertTriangle className="size-4 text-destructive" strokeWidth={2} />
        </div>
      )
    case "hoy":
      return (
        <div className="flex size-9 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
          <Clock className="size-4 text-amber-600 dark:text-amber-500" strokeWidth={2} />
        </div>
      )
    default:
      return (
        <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
          <Calendar className="size-4 text-muted-foreground" strokeWidth={2} />
        </div>
      )
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function getDaysUntil(dateString: string) {
  const date = new Date(dateString)
  const today = new Date()
  const diff = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  if (diff < 0) return `${Math.abs(diff)}d vencido`
  if (diff === 0) return "Hoy"
  if (diff === 1) return "Mañana"
  return `${diff} días`
}

export function DeadlinesTable() {
  return (
    <Card className="mx-4 border-border/60 shadow-soft lg:mx-6">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-serif text-xl">Vencimientos próximos</CardTitle>
            <CardDescription className="mt-1">
              Plazos y fechas importantes de tus asuntos activos
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="border-border/60">
            Ver todos
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border/60">
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-12"></TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Plazo</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Asunto</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Vence</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Estado</TableHead>
              <TableHead className="w-12">
                <span className="sr-only">Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deadlines.map((deadline) => {
              // Urgency-based background colors
              const getUrgencyBackground = () => {
                switch (deadline.estado) {
                  case "vencido":
                    return "bg-red-50 hover:bg-red-100/80 dark:bg-red-950/30 dark:hover:bg-red-950/50"
                  case "hoy":
                    return "bg-amber-50 hover:bg-amber-100/80 dark:bg-amber-950/30 dark:hover:bg-amber-950/50"
                  case "proximo":
                    return "bg-emerald-50/50 hover:bg-emerald-100/60 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40"
                  default:
                    return "bg-card hover:bg-muted/50"
                }
              }
              
              return (
              <TableRow 
                key={deadline.id} 
                className={`group cursor-pointer border-border/40 transition-colors ${getUrgencyBackground()}`}
              >
                <TableCell className="py-4">
                  {getStatusIcon(deadline.estado)}
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{deadline.plazo}</span>
                    {deadline.aiDetected && (
                      <Sparkles className="size-3.5 text-primary" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <Link
                    href={`/asuntos/${deadline.asuntoId}`}
                    className="group/link"
                  >
                    <span className="text-foreground group-hover/link:text-primary transition-colors">{deadline.asunto}</span>
                    <span className="ml-2 font-mono text-xs text-muted-foreground">{deadline.expediente}</span>
                  </Link>
                </TableCell>
                <TableCell className="py-4">
                  <div className="space-y-0.5">
                    <p className="font-medium tabular-nums text-foreground">
                      {formatDate(deadline.vence)}
                    </p>
                    <p className={`text-xs ${
                      deadline.estado === "vencido" ? "text-destructive font-medium" :
                      deadline.estado === "hoy" ? "text-amber-600 dark:text-amber-500 font-medium" :
                      "text-muted-foreground"
                    }`}>
                      {getDaysUntil(deadline.vence)}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="py-4">{getStatusBadge(deadline.estado)}</TableCell>
                <TableCell className="py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="size-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Abrir menú</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem>
                        <ArrowRight className="mr-2 size-4" />
                        Ver asunto
                      </DropdownMenuItem>
                      <DropdownMenuItem>Marcar completado</DropdownMenuItem>
                      <DropdownMenuItem>Editar plazo</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

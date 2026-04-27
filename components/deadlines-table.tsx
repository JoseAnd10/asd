"use client"

import { MoreHorizontal, ArrowRight, Sparkles } from "lucide-react"
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
    tipo: "Demanda",
    plazo: "Contestación demanda",
    asunto: "García vs. Seguros ABC",
    asuntoId: "asunto-1",
    cliente: "Juan García",
    expediente: "2024/0847",
    vence: "2024-01-15",
    estado: "vencido",
    aiDetected: true,
  },
  {
    id: "2",
    tipo: "Prueba",
    plazo: "Presentar prueba documental",
    asunto: "Herencia Martínez",
    asuntoId: "asunto-2",
    cliente: "Ana Martínez",
    expediente: "2024/0912",
    vence: "2024-01-16",
    estado: "hoy",
    aiDetected: true,
  },
  {
    id: "3",
    tipo: "Audiencia",
    plazo: "Audiencia preliminar",
    asunto: "Despido improcedente López",
    asuntoId: "asunto-3",
    cliente: "Pedro López",
    expediente: "2024/0756",
    vence: "2024-01-18",
    estado: "proximo",
    aiDetected: false,
  },
  {
    id: "4",
    tipo: "Recurso",
    plazo: "Recurso de apelación",
    asunto: "Accidente tráfico Ruiz",
    asuntoId: "asunto-4",
    cliente: "María Ruiz",
    expediente: "2024/0634",
    vence: "2024-01-20",
    estado: "pendiente",
    aiDetected: false,
  },
  {
    id: "5",
    tipo: "Vista",
    plazo: "Vista oral",
    asunto: "Contrato mercantil Díaz",
    asuntoId: "asunto-5",
    cliente: "Carlos Díaz",
    expediente: "2024/0521",
    vence: "2024-01-22",
    estado: "pendiente",
    aiDetected: false,
  },
]

function getStatusBadge(estado: string) {
  switch (estado) {
    case "vencido":
      return <Badge className="bg-[#FCEBEB] text-[#C0392B] dark:bg-[#C0392B]/20 dark:text-[#FF6B5B] border-0 hover:bg-[#FCEBEB] dark:hover:bg-[#C0392B]/20 font-medium">Vencido</Badge>
    case "hoy":
      return <Badge className="border border-[#C0392B] text-[#C0392B] dark:border-[#FF6B5B] dark:text-[#FF6B5B] bg-transparent hover:bg-transparent font-medium">Hoy</Badge>
    case "proximo":
      return <Badge className="bg-[#FEF3E2] text-[#D4860A] dark:bg-[#D4860A]/20 dark:text-[#FFAA33] border-0 hover:bg-[#FEF3E2] dark:hover:bg-[#D4860A]/20 font-medium">Próximo</Badge>
    case "pendiente":
      return <Badge variant="secondary" className="border-0 font-medium text-muted-foreground">Pendiente</Badge>
    default:
      return <Badge variant="outline">{estado}</Badge>
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  })
}

function formatFullDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function getRelativeDate(dateString: string) {
  const date = new Date(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  date.setHours(0, 0, 0, 0)
  
  const diff = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  
  // Today
  if (diff === 0) return { text: "Hoy", isUrgent: true, isOverdue: false }
  
  // Tomorrow
  if (diff === 1) return { text: "Mañana", isUrgent: true, isOverdue: false }
  
  // Overdue (past dates)
  if (diff < 0) return { text: formatDate(dateString), isUrgent: true, isOverdue: true }
  
  // Within 7 days
  if (diff <= 7) return { text: `En ${diff} días`, isUrgent: true, isOverdue: false }
  
  // Far future (>7 days)
  return { text: formatFullDate(dateString), isUrgent: false, isOverdue: false }
}

export function DeadlinesTable() {
  return (
    <Card className="mx-4 border rounded-lg lg:mx-6">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Plazos próximos</CardTitle>
            <CardDescription className="mt-1 text-sm">
              Fechas importantes de tus asuntos activos
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
            Ver todos
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tipo</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Asunto</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cliente</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Vence</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Estado</TableHead>
              <TableHead className="w-12">
                <span className="sr-only">Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deadlines.map((deadline) => {
              const dateInfo = getRelativeDate(deadline.vence)
              return (
                <TableRow 
                  key={deadline.id} 
                  className="group cursor-pointer hover:bg-muted/50"
                >
                  <TableCell className="py-3">
                    <Badge variant="secondary" className="font-normal text-muted-foreground">
                      {deadline.tipo}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3">
                    <Link
                      href={`/asuntos/${deadline.asuntoId}`}
                      className="group/link"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground group-hover/link:text-primary transition-colors">
                          {deadline.asunto}
                        </span>
                        {deadline.aiDetected && (
                          <Sparkles className="size-3.5 text-primary" />
                        )}
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">{deadline.expediente}</span>
                    </Link>
                  </TableCell>
                  <TableCell className="py-3 text-foreground">
                    {deadline.cliente}
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${dateInfo.isOverdue || deadline.estado === "hoy" ? "text-[#C0392B] dark:text-[#FF6B5B] font-medium" : dateInfo.isUrgent ? "text-[#D4860A] dark:text-[#FFAA33] font-medium" : "text-muted-foreground"}`}>
                        {dateInfo.text}
                      </span>
                      {dateInfo.isOverdue && (
                        <Badge className="bg-[#FCEBEB] text-[#C0392B] dark:bg-[#C0392B]/20 dark:text-[#FF6B5B] border-0 text-[10px] px-1.5 py-0">
                          Vencido
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-3">{getStatusBadge(deadline.estado)}</TableCell>
                  <TableCell className="py-3">
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
                          Ver
                        </DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Archivar</DropdownMenuItem>
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

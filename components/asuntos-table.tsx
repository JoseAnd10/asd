"use client"

import { MoreHorizontal, Plus, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// TODO: replace with Supabase data
const asuntos = [
  {
    id: "asunto-1",
    titulo: "García vs. Seguros ABC",
    cliente: "Juan García Pérez",
    estado: "activo",
    proximoVencimiento: "2024-01-15",
    ultimaActividad: "2024-01-10",
  },
  {
    id: "asunto-2",
    titulo: "Herencia Martínez",
    cliente: "Familia Martínez",
    estado: "activo",
    proximoVencimiento: "2024-01-18",
    ultimaActividad: "2024-01-12",
  },
  {
    id: "asunto-3",
    titulo: "Despido improcedente López",
    cliente: "María López Sánchez",
    estado: "en_espera",
    proximoVencimiento: "2024-01-25",
    ultimaActividad: "2024-01-08",
  },
  {
    id: "asunto-4",
    titulo: "Accidente tráfico Ruiz",
    cliente: "Carlos Ruiz Torres",
    estado: "activo",
    proximoVencimiento: "2024-01-20",
    ultimaActividad: "2024-01-11",
  },
  {
    id: "asunto-5",
    titulo: "Contrato mercantil Díaz",
    cliente: "Empresa Díaz S.L.",
    estado: "cerrado",
    proximoVencimiento: null,
    ultimaActividad: "2024-01-05",
  },
  {
    id: "asunto-6",
    titulo: "Divorcio Fernández",
    cliente: "Ana Fernández Gil",
    estado: "activo",
    proximoVencimiento: "2024-01-22",
    ultimaActividad: "2024-01-13",
  },
]

function getStatusBadge(estado: string) {
  switch (estado) {
    case "activo":
      return <Badge className="bg-primary hover:bg-primary/90">Activo</Badge>
    case "en_espera":
      return <Badge className="bg-amber-500 hover:bg-amber-600">En espera</Badge>
    case "cerrado":
      return <Badge variant="secondary">Cerrado</Badge>
    default:
      return <Badge variant="outline">{estado}</Badge>
  }
}

function formatDate(dateString: string | null) {
  if (!dateString) return "-"
  const date = new Date(dateString)
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function AsuntosTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")

  const filteredAsuntos = asuntos.filter((asunto) => {
    const matchesSearch =
      asunto.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asunto.cliente.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === "todos" || asunto.estado === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <Card className="mx-4 shadow-sm lg:mx-6">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Asuntos</CardTitle>
            <CardDescription>
              Gestiona todos tus casos y expedientes
            </CardDescription>
          </div>
          <Button asChild>
            <Link href="/asuntos/new">
              <Plus className="mr-2 size-4" />
              Nuevo asunto
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por título o cliente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="activo">Activo</SelectItem>
              <SelectItem value="en_espera">En espera</SelectItem>
              <SelectItem value="cerrado">Cerrado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Próximo vencimiento</TableHead>
              <TableHead>Última actividad</TableHead>
              <TableHead className="w-12">
                <span className="sr-only">Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAsuntos.map((asunto) => (
              <TableRow key={asunto.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/asuntos/${asunto.id}`}
                    className="text-foreground hover:text-primary hover:underline"
                  >
                    {asunto.titulo}
                  </Link>
                </TableCell>
                <TableCell>{asunto.cliente}</TableCell>
                <TableCell>{getStatusBadge(asunto.estado)}</TableCell>
                <TableCell className="tabular-nums">
                  {formatDate(asunto.proximoVencimiento)}
                </TableCell>
                <TableCell className="tabular-nums text-muted-foreground">
                  {formatDate(asunto.ultimaActividad)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Abrir menú</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/asuntos/${asunto.id}`}>Ver detalles</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Añadir plazo</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Archivar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredAsuntos.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No se encontraron asuntos con los filtros aplicados.
          </div>
        )}
      </CardContent>
    </Card>
  )
}

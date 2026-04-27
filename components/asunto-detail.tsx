"use client"

import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  File,
  FileText,
  MessageSquare,
  Send,
  Sparkles,
  Upload,
  User,
  Bot,
  Circle,
  Scale,
} from "lucide-react"
import Link from "next/link"
import { useState, useRef } from "react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface AsuntoDetailProps {
  id: string
  titulo: string
  cliente: string
  estado: string
}

const documents = [
  { id: "1", name: "Demanda inicial.pdf", type: "documento", date: "2024-01-05", size: "245 KB" },
  { id: "2", name: "Poder notarial.pdf", type: "documento", date: "2024-01-03", size: "128 KB" },
  { id: "3", name: "Contrato seguro.pdf", type: "documento", date: "2024-01-02", size: "512 KB" },
  { id: "4", name: "Fotografías accidente.zip", type: "prueba", date: "2024-01-08", size: "2.4 MB" },
]

const plazos = [
  { 
    id: "1", 
    plazo: "Contestación demanda", 
    vence: "2024-01-15", 
    urgencia: "vencido",
    aiDetected: true,
    confidence: "alta",
    fundamento: "Art. 405 LEC - Plazo de 20 días hábiles desde la notificación de la demanda."
  },
  { 
    id: "2", 
    plazo: "Presentar prueba documental", 
    vence: "2024-01-16", 
    urgencia: "hoy",
    aiDetected: true,
    confidence: "alta",
    fundamento: "Art. 265 LEC - Las pruebas documentales deben acompañar a los escritos de demanda y contestación."
  },
  { 
    id: "3", 
    plazo: "Audiencia preliminar", 
    vence: "2024-01-25", 
    urgencia: "proximo",
    aiDetected: false,
    confidence: null,
    fundamento: null
  },
  { 
    id: "4", 
    plazo: "Vista oral", 
    vence: "2024-02-15", 
    urgencia: "pendiente",
    aiDetected: false,
    confidence: null,
    fundamento: null
  },
]

const hitos = [
  { id: "1", titulo: "Apertura del expediente", fecha: "2024-01-02", completado: true, descripcion: "Recepción de documentación inicial del cliente" },
  { id: "2", titulo: "Presentación de demanda", fecha: "2024-01-05", completado: true, descripcion: "Demanda presentada ante el Juzgado de Primera Instancia nº 4" },
  { id: "3", titulo: "Admisión a trámite", fecha: "2024-01-10", completado: true, descripcion: "Auto de admisión recibido. Emplazamiento al demandado." },
  { id: "4", titulo: "Fase probatoria", fecha: null, completado: false, descripcion: "Pendiente de proposición y práctica de prueba" },
  { id: "5", titulo: "Sentencia", fecha: null, completado: false, descripcion: "Resolución final del procedimiento" },
]

const chatMessages = [
  { id: "1", role: "user", content: "¿Cuáles son los plazos más urgentes de este caso?" },
  { id: "2", role: "assistant", content: "He analizado el expediente y detectado **2 plazos críticos**:\n\n1. **Contestación a la demanda** - Venció el 15 de enero (Art. 405 LEC)\n2. **Presentación de prueba documental** - Vence hoy, 16 de enero (Art. 265 LEC)\n\nTe recomiendo priorizar la presentación de pruebas y solicitar prórroga para la contestación por causa justificada." },
  { id: "3", role: "user", content: "¿Qué documentos tenemos disponibles para la fase probatoria?" },
  { id: "4", role: "assistant", content: "El expediente contiene **4 documentos** relevantes:\n\n• Demanda inicial (245 KB)\n• Poder notarial (128 KB)\n• Contrato de seguro (512 KB)\n• Fotografías del accidente (2.4 MB)\n\nPara fortalecer la fase probatoria, sugiero incorporar:\n- Informe pericial de daños\n- Atestado policial (si existe)\n- Testimonios de testigos presenciales" },
]

const caseInfo = {
  numero: "2024/0847",
  juzgado: "Juzgado Primera Instancia nº 4",
  procedimiento: "Juicio Ordinario",
  cuantia: "45.000 €",
  fechaInicio: "2024-01-02",
  contraParte: "Constructora ABC, S.L.",
}

function getStatusBadge(estado: string) {
  switch (estado) {
    case "activo":
      return <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">Activo</Badge>
    case "en_espera":
      return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-0 dark:bg-amber-900/30 dark:text-amber-500">En espera</Badge>
    case "cerrado":
      return <Badge variant="secondary">Cerrado</Badge>
    default:
      return <Badge variant="outline">{estado}</Badge>
  }
}

function getUrgenciaBadge(urgencia: string) {
  switch (urgencia) {
    case "vencido":
      return <Badge className="bg-destructive/10 text-destructive border-0 hover:bg-destructive/20">Vencido</Badge>
    case "hoy":
      return <Badge className="bg-amber-100 text-amber-700 border-0 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-500">Hoy</Badge>
    case "proximo":
      return <Badge className="bg-primary/10 text-primary border-0 hover:bg-primary/20">7 días</Badge>
    case "pendiente":
      return <Badge variant="secondary" className="border-0">Pendiente</Badge>
    default:
      return <Badge variant="outline">{urgencia}</Badge>
  }
}

function getConfidenceBadge(confidence: string | null) {
  if (!confidence) return null
  switch (confidence) {
    case "alta":
      return <Badge className="bg-primary/10 text-primary border-0 text-[10px] font-semibold">Alta confianza</Badge>
    case "media":
      return <Badge className="bg-amber-100 text-amber-700 border-0 text-[10px] font-semibold dark:bg-amber-900/30 dark:text-amber-500">Media</Badge>
    case "baja":
      return <Badge variant="secondary" className="border-0 text-[10px] font-semibold">Baja</Badge>
    default:
      return null
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

export function AsuntoDetail({ id, titulo, cliente, estado }: AsuntoDetailProps) {
  const [documentFilter, setDocumentFilter] = useState("todos")
  const [chatInput, setChatInput] = useState("")
  const [activeTab, setActiveTab] = useState<"documentos" | "plazos">("plazos")
  const chatEndRef = useRef<HTMLDivElement>(null)

  const filteredDocuments = documents.filter(
    (doc) => documentFilter === "todos" || doc.type === documentFilter
  )

  return (
    <div className="space-y-6 px-4 lg:px-6">
      {/* Header with breadcrumb */}
      <div className="space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/asuntos" className="text-muted-foreground hover:text-foreground transition-colors">Asuntos</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="size-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium">{titulo}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">{titulo}</h1>
              {getStatusBadge(estado)}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{cliente}</span> · Exp. {caseInfo.numero}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-border/60">
              <FileText className="mr-2 size-4" />
              Generar informe
            </Button>
            <Button size="sm">
              <Calendar className="mr-2 size-4" />
              Añadir plazo
            </Button>
          </div>
        </div>
      </div>

      {/* Split View Layout */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left Column - Plazos, Documentos & AI Chat */}
        <div className="lg:col-span-3 space-y-6">
          {/* Tab selector */}
          <div className="flex gap-1 rounded-lg bg-muted/50 p-1">
            <button
              onClick={() => setActiveTab("plazos")}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "plazos"
                  ? "bg-card text-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Clock className="mr-2 inline-block size-4" />
              Plazos
            </button>
            <button
              onClick={() => setActiveTab("documentos")}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "documentos"
                  ? "bg-card text-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="mr-2 inline-block size-4" />
              Documentos
            </button>
          </div>

          {/* Plazos Panel */}
          {activeTab === "plazos" && (
            <Card className="border-border/60 shadow-soft">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-serif text-lg">Plazos procesales</CardTitle>
                    <CardDescription>Fechas límite y vencimientos detectados</CardDescription>
                  </div>
                  <Badge variant="outline" className="gap-1.5 border-primary/30 text-primary">
                    <Sparkles className="size-3" />
                    2 detectados por IA
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Accordion type="single" collapsible className="space-y-2">
                  {plazos.map((plazo) => (
                    <AccordionItem 
                      key={plazo.id} 
                      value={plazo.id}
                      className={`rounded-lg border px-4 ${
                        plazo.aiDetected 
                          ? "border-primary/20 bg-gradient-to-r from-primary/[0.03] to-transparent" 
                          : "border-border/60"
                      }`}
                    >
                      <AccordionTrigger className="hover:no-underline py-3">
                        <div className="flex flex-1 items-center gap-3">
                          <div className={`flex size-8 items-center justify-center rounded-lg ${
                            plazo.urgencia === "vencido" || plazo.urgencia === "hoy"
                              ? "bg-destructive/10"
                              : "bg-muted"
                          }`}>
                            {plazo.urgencia === "vencido" || plazo.urgencia === "hoy" ? (
                              <AlertTriangle className="size-4 text-destructive" />
                            ) : (
                              <Clock className="size-4 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-foreground">{plazo.plazo}</span>
                              {plazo.aiDetected && (
                                <Sparkles className="size-3 text-primary" />
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">{formatDate(plazo.vence)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getConfidenceBadge(plazo.confidence)}
                            {getUrgenciaBadge(plazo.urgencia)}
                          </div>
                        </div>
                      </AccordionTrigger>
                      {plazo.fundamento && (
                        <AccordionContent className="pb-4 pt-0">
                          <div className="ml-11 rounded-lg bg-muted/50 p-3 text-sm">
                            <p className="font-medium text-foreground mb-1">Fundamento legal</p>
                            <p className="text-muted-foreground">{plazo.fundamento}</p>
                          </div>
                        </AccordionContent>
                      )}
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          )}

          {/* Documentos Panel */}
          {activeTab === "documentos" && (
            <Card className="border-border/60 shadow-soft">
              <CardHeader className="pb-3">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="font-serif text-lg">Documentos</CardTitle>
                    <CardDescription>Archivos del expediente</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Select value={documentFilter} onValueChange={setDocumentFilter}>
                      <SelectTrigger className="w-32 h-9 border-border/60">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="documento">Documentos</SelectItem>
                        <SelectItem value="prueba">Pruebas</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="sm">
                      <Upload className="mr-2 size-4" />
                      Subir
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 rounded-lg border-2 border-dashed border-border/60 bg-muted/30 p-6 text-center transition-colors hover:border-primary/30 hover:bg-muted/50">
                  <Upload className="mx-auto mb-2 size-8 text-muted-foreground/60" />
                  <p className="text-sm text-muted-foreground">
                    Arrastra archivos aquí o haz clic para seleccionar
                  </p>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Nombre</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Tipo</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Fecha</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-right">Tamaño</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.map((doc) => (
                      <TableRow key={doc.id} className="group cursor-pointer">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                              <File className="size-4 text-muted-foreground" />
                            </div>
                            <span className="group-hover:text-primary transition-colors">{doc.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize border-border/60 font-normal">
                            {doc.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="tabular-nums text-muted-foreground">
                          {formatDate(doc.date)}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {doc.size}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* AI Chat - Glassmorphism Style */}
          <Card className="relative overflow-hidden border-border/60 bg-gradient-to-br from-card via-card to-primary/[0.02] shadow-soft">
            {/* Decorative gradient border */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-soft">
                  <Scale className="size-5 text-primary-foreground" strokeWidth={1.5} />
                </div>
                <div>
                  <CardTitle className="font-serif text-lg">Asistente Kairos</CardTitle>
                  <CardDescription className="flex items-center gap-1.5">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex size-2 rounded-full bg-primary"></span>
                    </span>
                    IA especializada en este expediente
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex h-80 flex-col">
                {/* Messages area */}
                <div className="flex-1 space-y-4 overflow-y-auto pb-4 pr-2">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div className={`flex size-8 flex-shrink-0 items-center justify-center rounded-full ${
                        message.role === "user"
                          ? "bg-muted"
                          : "bg-primary/10"
                      }`}>
                        {message.role === "user" ? (
                          <User className="size-4 text-muted-foreground" />
                        ) : (
                          <Bot className="size-4 text-primary" />
                        )}
                      </div>
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                          message.role === "user"
                            ? "bg-foreground text-background rounded-br-md"
                            : "bg-muted/70 backdrop-blur-sm border border-border/40 rounded-bl-md"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {/* Input area */}
                <div className="flex gap-2 border-t border-border/60 pt-4">
                  <Input
                    placeholder="Pregunta sobre este expediente..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 border-border/60 bg-muted/30 focus:bg-card"
                  />
                  <Button size="icon" className="shrink-0">
                    <Send className="size-4" />
                    <span className="sr-only">Enviar</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Case Info & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Case Info Card */}
          <Card className="border-border/60 shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="font-serif text-lg">Información del caso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Juzgado</p>
                  <p className="font-medium text-foreground">{caseInfo.juzgado}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Procedimiento</p>
                  <p className="font-medium text-foreground">{caseInfo.procedimiento}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Cuantía</p>
                  <p className="font-medium text-foreground">{caseInfo.cuantia}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Contraparte</p>
                  <p className="font-medium text-foreground">{caseInfo.contraParte}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="border-border/60 shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="font-serif text-lg">Cronología procesal</CardTitle>
              <CardDescription>Hitos y etapas del procedimiento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-0">
                {hitos.map((hito, index) => (
                  <div key={hito.id} className="relative flex gap-4 pb-6 last:pb-0">
                    {/* Vertical line */}
                    {index < hitos.length - 1 && (
                      <div className={`absolute left-[15px] top-8 h-[calc(100%-16px)] w-px ${
                        hito.completado ? "bg-primary" : "bg-border"
                      }`} />
                    )}
                    
                    {/* Icon */}
                    <div className={`relative z-10 flex size-8 flex-shrink-0 items-center justify-center rounded-full ring-4 ring-card ${
                      hito.completado
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground border border-border"
                    }`}>
                      {hito.completado ? (
                        <CheckCircle2 className="size-4" strokeWidth={2.5} />
                      ) : (
                        <Circle className="size-3" strokeWidth={2} />
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pt-0.5">
                      <p className={`font-medium leading-tight ${
                        hito.completado ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {hito.titulo}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {hito.fecha ? formatDate(hito.fecha) : "Pendiente"}
                      </p>
                      <p className="mt-1.5 text-sm text-muted-foreground">
                        {hito.descripcion}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

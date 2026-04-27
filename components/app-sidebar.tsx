"use client"

import * as React from "react"
import {
  Briefcase,
  Calendar,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Scale,
  Search,
  Settings,
  Users,
  Sparkles,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "María García",
    email: "maria@kairos.legal",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    {
      title: "Resumen",
      url: "/overview",
      icon: LayoutDashboard,
    },
    {
      title: "Asuntos",
      url: "/asuntos",
      icon: Briefcase,
    },
    {
      title: "Calendario",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Documentos",
      url: "#",
      icon: FileText,
    },
    {
      title: "Clientes",
      url: "#",
      icon: Users,
    },
  ],
  navSecondary: [
    {
      title: "Configuración",
      url: "#",
      icon: Settings,
    },
    {
      title: "Ayuda",
      url: "#",
      icon: HelpCircle,
    },
    {
      title: "Buscar",
      url: "#",
      icon: Search,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Kairos Legal"
              className="data-[slot=sidebar-menu-button]:!p-2 hover:bg-transparent group"
            >
              <a href="/overview" className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-soft transition-transform group-hover:scale-105">
                  <Scale className="!size-5 text-primary-foreground" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                  <span className="font-serif text-base font-semibold tracking-tight text-foreground">Kairos</span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Legal Platform</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 px-2">
            Principal
          </SidebarGroupLabel>
          <NavMain items={data.navMain} />
        </SidebarGroup>
        
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 px-2">
            Configuración
          </SidebarGroupLabel>
          <NavSecondary items={data.navSecondary} />
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-sidebar-border">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

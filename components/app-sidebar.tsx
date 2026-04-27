"use client"

import * as React from "react"
import {
  Briefcase,
  Calendar,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Search,
  Settings,
  Users,
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
              className="data-[slot=sidebar-menu-button]:!p-2 hover:bg-sidebar-accent group"
            >
              <a href="/overview" className="flex items-center gap-3">
                <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                  <span className="text-base font-medium tracking-tight text-sidebar-foreground">KAIROS</span>
                  <span className="text-[11px] text-sidebar-foreground/60">Legal Platform</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50 px-2">
            Principal
          </SidebarGroupLabel>
          <NavMain items={data.navMain} />
        </SidebarGroup>
        
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50 px-2">
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

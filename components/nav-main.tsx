"use client"

import { Plus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { LucideIcon } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}) {
  const pathname = usePathname()

  return (
    <>
      {/* New Case Button - White bg, navy text */}
      <SidebarMenu className="mb-2">
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            tooltip="Nuevo asunto"
            className="bg-white text-[hsl(209,51%,23%)] hover:bg-white/90 h-9 font-medium"
          >
            <Link href="/asuntos/new">
              <Plus className="!size-4" strokeWidth={2.5} />
              <span>Nuevo asunto</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      
      {/* Nav Items */}
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`)
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                tooltip={item.title}
                isActive={isActive}
                className={`h-9 transition-colors ${
                  isActive 
                    ? "bg-white/15 border-l-2 border-white text-white" 
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
              >
                <Link href={item.url}>
                  {item.icon && <item.icon className="!size-4" strokeWidth={1.75} />}
                  <span className="font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </>
  )
}

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
      {/* New Case Button */}
      <SidebarMenu className="mb-2">
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            tooltip="Nuevo asunto"
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground h-9 font-medium shadow-soft transition-all duration-200"
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
                className="h-9 transition-colors"
              >
                <Link href={item.url}>
                  {item.icon && <item.icon className="!size-[18px]" strokeWidth={1.75} />}
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

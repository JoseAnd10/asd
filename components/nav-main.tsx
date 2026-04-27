"use client"

import { Plus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { LucideIcon } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
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
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <>
      {/* New Case Button - Muted gold */}
      <SidebarMenu className="mb-2">
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            tooltip="Nuevo asunto"
            className="bg-[#C9A84C] text-[#1E2A3A] hover:bg-[#B89A3E] h-9 font-medium"
          >
            <Link href="/asuntos/new">
              <Plus className="!size-4" strokeWidth={2.5} />
              {!isCollapsed && <span>Nuevo asunto</span>}
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
                    ? "bg-white/[0.12] border-l-2 border-[#C9A84C] text-white" 
                    : "text-white/65 hover:bg-white/[0.06] hover:text-white/85"
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

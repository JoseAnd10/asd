"use client"

import * as React from "react"
import type { LucideIcon } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavSecondary({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
}) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton 
            asChild 
            tooltip={item.title}
            className="h-9 text-white/65 hover:text-white/85 hover:bg-white/[0.06] transition-colors"
          >
            <a href={item.url}>
              <item.icon className="!size-4" strokeWidth={1.75} />
              <span className="font-medium">{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

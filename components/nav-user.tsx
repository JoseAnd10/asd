"use client"

import {
  Bell,
  CreditCard,
  LogOut,
  ChevronsUpDown,
  User,
  Settings,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-12 transition-colors"
            >
              <Avatar className="h-9 w-9 rounded-lg ring-1 ring-border/40">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-foreground">{user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl border-border/60 shadow-soft-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={8}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-3 px-2 py-2.5 text-left text-sm">
                <Avatar className="h-10 w-10 rounded-lg ring-1 ring-border/40">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-foreground">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/60" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2 py-2">
                <User className="size-4 text-muted-foreground" />
                <span>Mi cuenta</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 py-2">
                <Settings className="size-4 text-muted-foreground" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 py-2">
                <CreditCard className="size-4 text-muted-foreground" />
                <span>Facturación</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 py-2">
                <Bell className="size-4 text-muted-foreground" />
                <span>Notificaciones</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-border/60" />
            <DropdownMenuItem className="gap-2 py-2 text-destructive focus:text-destructive">
              <LogOut className="size-4" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

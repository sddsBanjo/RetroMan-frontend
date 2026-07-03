"use client"

import { Gamepad2, BarChart3 } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { authClient } from "@/lib/auth-client"

const data = {
    navMain: [
        {
            title: "Games",
            url: "/games",
            icon: Gamepad2
        },
        {
            title: "Stats",
            url: "/stats",
            icon: BarChart3
        }
    ]
}

export function AppSidebar({ ...props }) {
    const { data: session, isPending } = authClient.useSession()
    const user = session?.user
        ? {
            name: session.user.name ?? "Usuário",
            email: session.user.email ?? "",
            image:
                session.user.image ??
                `https://api.dicebear.com/10.x/adventurer-neutral/svg?seed=${session.user.name}`,
        }
    : null
    
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:p-1.5!"
                        >
                            <a href="/games">
                                <Gamepad2 className="size-5!" />
                                <span className="text-base font-semibold">RetroMan</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                {user && <NavUser user={user} />}
            </SidebarFooter>
        </Sidebar>
    )
}
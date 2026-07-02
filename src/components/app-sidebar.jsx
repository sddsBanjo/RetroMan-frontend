"use client"

import { ChartBar, LayoutDashboard, Link, Link2 } from "lucide-react"

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

const data = {
    user: {
        name: "Guilherme",
        email: "marques.guilhermeh@gmail.com",
        avatar: "https://avataaars.io/?avatarStyle=Transparent&topType=LongHairBun&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=ShirtCrewNeck&clotheColor=Black&eyeType=Default&eyebrowType=Default&mouthType=Twinkle&skinColor=Light"
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard
        },
        {
            title: "Links",
            url: "/links",
            icon: Link2
        },
        {
            title: "Analytics",
            url: "/analytics",
            icon: ChartBar
        }
    ]
}

export function AppSidebar({ ...props }) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:p-1.5!"
                        >
                            <a href="#">
                                <Link className="size-5!" />
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
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
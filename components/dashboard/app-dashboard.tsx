"use client";

import { cn } from "@/lib/utils";
import { Search, Settings, ShoppingBag, User, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "../ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const menuItems = [
    { title: "Shop", href: "/shop", icon: ShoppingBag },
    { title: "Search", href: "/search", icon: Search },
    { title: "Account", href: "/account", icon: User },
    { title: "Settings", href: "/settings", icon: Settings },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
    const { state } = useSidebar();
    const pathname = usePathname();

    return (
        <Sidebar
            className={cn(
                "border-r-2 bg-white",
                state !== "collapsed" ? "w-[240px]" : "group-data-[collapsible=icon]:w-[64px]"
            )}
            collapsible="icon"
            {...props}
        >
            <SidebarContent className="overflow-x-hidden px-4 py-6 space-y-4">
                <SidebarGroup>
                    <SidebarGroupLabel className="flex items-center gap-2 py-4 px-6 bg-[#1E3A8A] text-white">
                        {state !== "collapsed" && (
                            <>
                                <Zap className="w-8 h-8 text-[#F59E0B]" /> {/* Orange accent */}
                                <span className="text-lg font-bold">BLUSH</span>
                            </>
                        )}
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="py-3 space-y-4">
                        <SidebarMenu>
                            <TooltipProvider>
                                {menuItems.map(({ title, href, icon: Icon }) => {
                                    const isActive = pathname === href;
                                    return (
                                        <SidebarMenuItem key={title}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <SidebarMenuButton asChild>
                                                        <Link
                                                            href={href}
                                                            className={cn(
                                                                "flex items-center gap-4 rounded-xl mx-4 px-4 py-3 transition-all duration-300 ease-in-out",
                                                                isActive
                                                                    ? "bg-[#3B82F6]/10 text-[#3B82F6] font-semibold"
                                                                    : "text-[#1E3A8A] hover:text-[#3B82F6] hover:bg-[#3B82F6]/5",
                                                                state === "collapsed" && "justify-center items-center mx-auto px-0"
                                                            )}
                                                        >
                                                            <Icon
                                                                className={cn(
                                                                    "w-6 h-6 shrink-0 text-[#1D4ED8]",
                                                                    isActive && "text-[#3B82F6]"
                                                                )}
                                                            />
                                                            <span
                                                                className={cn(
                                                                    "transition-all duration-300 ease-in-out text-lg font-bold text-[#2563EB]",
                                                                    state === "collapsed"
                                                                        ? "opacity-0 w-0 overflow-hidden"
                                                                        : "opacity-100 w-auto"
                                                                )}
                                                            >
                                                                {title}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </TooltipTrigger>
                                                {state === "collapsed" && (
                                                    <TooltipContent side="right">
                                                        {title}
                                                    </TooltipContent>
                                                )}
                                            </Tooltip>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </TooltipProvider>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
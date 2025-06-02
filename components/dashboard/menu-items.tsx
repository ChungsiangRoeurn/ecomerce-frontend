"use client";

import { cn } from "@/lib/utils";
import { BarChart, Box, LucideIcon, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const iconMap: Record<string, LucideIcon> = {
    BarChart,
    Box,
    Plus,
    Trash2,
};

interface MenuItemProps {
    title: string;
    href: string;
    icon: string;
    isSubItem?: boolean;
    isCollapsed?: boolean;
}

export function MenuItem({ title, href, icon, isSubItem = false, isCollapsed = false }: MenuItemProps) {
    const pathname = usePathname();
    const isActive = pathname === href;
    const Icon = iconMap[icon];

    if (!Icon) {
        console.warn(`Icon "${icon}" not found in iconMap`);
        return null;
    }

    return (
        <SidebarMenuItem className="list-none"> {/* Added list-none to remove bullets */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <SidebarMenuButton asChild>
                        <Link
                            href={href}
                            className={cn(
                                "flex items-center gap-4 rounded-lg transition-all duration-300",
                                isSubItem ? "ml-8 px-2 py-1" : "mx-4 px-2 py-1", // Adjusted padding for sub-items
                                isActive
                                    ? "bg-blue-100 text-blue-600 font-semibold"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600",
                                isCollapsed && !isSubItem && "justify-center mx-auto px-0"
                            )}
                        >
                            <Icon
                                className={cn(
                                    isSubItem ? "w-5 h-5" : "w-6 h-6",
                                    "shrink-0 text-blue-700",
                                    isActive && "text-blue-600"
                                )}
                            />
                            <span
                                className={cn(
                                    "text-base font-medium",
                                    isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
                                )}
                            >
                                {title}
                            </span>
                        </Link>
                    </SidebarMenuButton>
                </TooltipTrigger>
                {isCollapsed && (
                    <TooltipContent side="right">
                        {title}
                    </TooltipContent>
                )}
            </Tooltip>
        </SidebarMenuItem>
    );
}
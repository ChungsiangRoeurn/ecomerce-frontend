"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, LucideIcon, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Separator } from "../ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    useSidebar,
} from "../ui/sidebar";
import { TooltipProvider } from "../ui/tooltip";
import { MenuItem, iconMap } from "./menu-items";

const brandIconMap: Record<string, LucideIcon> = {
    Zap,
};

interface MenuItemProps {
    title: string;
    href: string;
    icon: string;
    subItems?: { title: string; href: string; icon: string }[];
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    menuItems: MenuItemProps[];
    brandName?: string;
    brandIcon?: string;
    brandIconColor?: string;
    brandBgColor?: string;
}

export function AppSidebar({
    menuItems: initialMenuItems,
    brandName = "BLUSH",
    brandIcon = "Zap",
    brandIconColor = "text-yellow-500",
    brandBgColor = "bg-blue-900",
    ...props
}: AppSidebarProps) {
    const { state } = useSidebar();
    const pathname = usePathname();
    const BrandIcon = brandIconMap[brandIcon] || Zap;

    const menuItems = useMemo(() => {
        return initialMenuItems.map((item) => ({
            ...item,
            subItems: item.subItems?.map((sub) => ({
                ...sub,
                icon: sub.icon in iconMap ? sub.icon : "Box",
            })),
        }));
    }, [initialMenuItems]);

    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

    const toggleMenu = (title: string) => {
        setOpenMenus((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    const renderIcon = (iconName: string) => {
        const Icon = iconMap[iconName] || Zap;
        return (
            <Icon
                className={cn(
                    "w-6 h-6 shrink-0",
                    pathname === iconName && "text-blue-600",
                    "text-blue-700"
                )}
            />
        );
    };

    return (
        <Sidebar
            className={cn(
                "border-r-2 transition-all duration-300",
                state !== "collapsed" ? "w-[240px]" : "w-[64px]"
            )}
            collapsible="icon"
            {...props}
        >
            <SidebarContent className="overflow-x-hidden p-4 space-y-4">
                <SidebarGroup>
                    <SidebarGroupLabel
                        className={cn(
                            "flex items-center gap-2 p-4 rounded-md text-white",
                            brandBgColor,
                            state === "collapsed" && "justify-center"
                        )}
                        aria-label={`${brandName} Brand`}
                    >
                        {state !== "collapsed" && (
                            <>
                                <BrandIcon className={cn("w-8 h-8", brandIconColor)} />
                                <span className="text-lg font-bold">{brandName}</span>
                            </>
                        )}
                    </SidebarGroupLabel>
                    <Separator className="my-2 bg-gray-200" />
                    <SidebarGroupContent className="space-y-1">
                        <TooltipProvider>
                            <div className="flex flex-col items-center w-full gap-1">
                                {menuItems.map((item, index) => (
                                    <div key={item.title} className="w-full flex justify-center">
                                        {item.subItems ? (
                                            <Collapsible
                                                open={openMenus[item.title] || false}
                                                onOpenChange={() => toggleMenu(item.title)}
                                            >
                                                <CollapsibleTrigger asChild>
                                                    <div
                                                        className={cn(
                                                            "flex items-center justify-between w-full p-2 rounded-lg cursor-pointer transition-colors",
                                                            pathname === item.href
                                                                ? "bg-blue-100 text-blue-600 font-semibold"
                                                                : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                                                        )}
                                                        role="button"
                                                        aria-expanded={openMenus[item.title] || false}
                                                        aria-controls={`submenu-${item.title}`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            {renderIcon(item.icon)}
                                                            <span
                                                                className={cn(
                                                                    "text-base font-medium",
                                                                    state === "collapsed" && "opacity-0 w-0 overflow-hidden"
                                                                )}
                                                            >
                                                                {item.title}
                                                            </span>
                                                        </div>
                                                        {state !== "collapsed" && (
                                                            openMenus[item.title] ? (
                                                                <ChevronUp className="w-5 h-5" />
                                                            ) : (
                                                                <ChevronDown className="w-5 h-5" />
                                                            )
                                                        )}
                                                    </div>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent
                                                    id={`submenu-${item.title}`}
                                                    className="pl-4 space-y-1 list-none"
                                                >
                                                    {item.subItems.map((subItem) => (
                                                        <MenuItem
                                                            key={subItem.title}
                                                            title={subItem.title}
                                                            href={subItem.href}
                                                            icon={subItem.icon}
                                                            isSubItem={true}
                                                            isCollapsed={state === "collapsed"}
                                                        />
                                                    ))}
                                                </CollapsibleContent>
                                            </Collapsible>
                                        ) : (
                                            <MenuItem
                                                title={item.title}
                                                href={item.href}
                                                icon={item.icon}
                                                isCollapsed={state === "collapsed"}
                                            />
                                        )}
                                        {index < menuItems.length - 1 && (
                                            <Separator className="my-1 bg-gray-200" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </TooltipProvider>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
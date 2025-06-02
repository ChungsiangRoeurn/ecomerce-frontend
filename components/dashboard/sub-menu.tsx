"use client";

import { SidebarMenu } from "../ui/sidebar";
import { MenuItem } from "./menu-items";


interface SubmenuProps {
    subItems: { title: string; href: string; icon: string }[];
    isCollapsed: boolean;
}

export function Submenu({ subItems, isCollapsed }: SubmenuProps) {
    if (isCollapsed) return null;

    return (
        <SidebarMenu>
            {subItems.map((subItem) => (
                <MenuItem
                    key={subItem.title}
                    title={subItem.title}
                    href={subItem.href}
                    icon={subItem.icon}
                    isSubItem={true}
                    isCollapsed={isCollapsed}
                />
            ))}
        </SidebarMenu>
    );
}
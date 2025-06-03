"use client";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { MenuIcon, PanelLeftCloseIcon } from "lucide-react";
import { useEffect, useState } from "react";

const menuItems = [
    { title: "Dashboard", href: "/dashboard", icon: "BarChart" },
];

function SidebarToggleButton() {
    const { toggleSidebar, state } = useSidebar();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) return null;

    return (
        <div className="p-2">
            <Button
                variant="outline"
                onClick={toggleSidebar}
                className="flex items-center gap-2"
            >
                {state === "collapsed" ? <MenuIcon className="h-4 w-4" /> : <PanelLeftCloseIcon className="h-4 w-4" />}
                <span className="hidden sm:inline">{state === "collapsed" ? "Open Sidebar" : "Close Sidebar"}</span>
            </Button>
        </div>
    );
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="flex">
            <AppSidebar menuItems={menuItems} />
            <main className="flex-1 p-4 space-y-4">
                <SidebarToggleButton />
                {children}
            </main>
        </SidebarProvider>
    );
}

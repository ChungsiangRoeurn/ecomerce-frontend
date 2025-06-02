import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const menuItems = [
    { title: "Dashboard", href: "/dashboard", icon: "BarChart" },
    {
        title: "Products",
        href: "/products",
        icon: "Box",
        subItems: [
            { title: "Add Product", href: "/add-product", icon: "Plus" },
            { title: "Update Product", href: "/update-product", icon: "Plus" },
            { title: "Delete Product", href: "/delete-product", icon: "Trash2" },
        ],
    },
];

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="flex">
            <AppSidebar menuItems={menuItems} />
            <main className="flex-1 p-6">{children}</main>
        </SidebarProvider>
    );
}
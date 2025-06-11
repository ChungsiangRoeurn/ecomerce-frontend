"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/hooks/type";
import { ProductTable } from "@/components/dashboard/products/ProductTable";
import { ProductDialog } from "@/components/dashboard/products/ProductDialog";

type ProductFormData = {
  name: string;
  price: number;
  description: string;
  stock: number;
};

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Moisturizer",
      price: 29.99,
      description: "Hydrating cream",
      stock: 50,
    },
    {
      id: 2,
      name: "Cleanser",
      price: 15.99,
      description: "Gentle face wash",
      stock: 30,
    },
    {
      id: 3,
      name: "Sunscreen",
      price: 19.99,
      description: "SPF 50 protection",
      stock: 20,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    description: "",
    stock: 0,
  });

  const handleOpenForm = (product?: Product) => {
    setEditingProduct(product ?? null);
    setFormData(product ?? { name: "", price: 0, description: "", stock: 0 });
    setIsDialogOpen(true);
  };

  const handleInputChange = (id: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [id]: id === "price" || id === "stock" ? Number(value) || 0 : value,
    }));
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      alert("Product name is required");
      return;
    }

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...p, ...formData } : p
        )
      );
    } else {
      setProducts((prev) => [
        ...prev,
        {
          id: prev.length ? prev[prev.length - 1].id + 1 : 1,
          ...formData,
        },
      ]);
    }

    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const stats = [
    { title: "Products", value: products.length, desc: "Total products" },
    { title: "Orders", value: 567, desc: "Completed orders" },
    { title: "Revenue", value: "$89,123", desc: "Monthly revenue" },
    {
      title: "Low Stock",
      value: products.filter((p) => p.stock < 10).length,
      desc: "Products under 10 units",
    },
  ];

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-6 space-y-8 overflow-auto">
        <header className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-blue-900">Blush Dashboard</h1>
          <Button
            className="bg-blue-800 hover:bg-blue-900 text-white"
            onClick={() => handleOpenForm()}
          >
            + Add Product
          </Button>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
            >
              <div className="text-2xl font-bold text-blue-900">
                {stat.value}
              </div>
              <div className="text-lg font-semibold">{stat.title}</div>
              <div className="text-gray-500">{stat.desc}</div>
            </div>
          ))}
        </section>

        <section>
          <ProductTable
            products={products}
            onEdit={handleOpenForm}
            onDelete={handleDelete}
            formatPrice={(price) => currencyFormatter.format(price)}
          />
        </section>
      </main>

      <ProductDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        formData={formData}
        onChange={handleInputChange}
        onSave={handleSave}
        editingProduct={editingProduct}
      />
    </div>
  );
}

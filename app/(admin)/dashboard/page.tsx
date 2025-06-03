'use client'

import { Button } from "@/components/ui/button"
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card"
import {
    Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import React, { useState } from "react"

interface Product {
    id: number
    name: string
    price: number
    description: string
    stock: number
}

export default function Page() {
    const [products, setProducts] = useState<Product[]>([
        { id: 1, name: "Moisturizer", price: 29.99, description: "Hydrating cream", stock: 50 },
        { id: 2, name: "Cleanser", price: 15.99, description: "Gentle face wash", stock: 30 },
        { id: 3, name: "Sunscreen", price: 19.99, description: "SPF 50 protection", stock: 20 },
    ])

    const [open, setOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [formData, setFormData] = useState({
        name: "", price: 0, description: "", stock: 0,
    })

    function openForm(product?: Product) {
        if (product) {
            setEditingProduct(product)
            setFormData(product)
        } else {
            setEditingProduct(null)
            setFormData({ name: "", price: 0, description: "", stock: 0 })
        }
        setOpen(true)
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" || name === "stock" ? parseFloat(value) || 0 : value,
        }))
    }

    function onSave() {
        if (formData.name.trim() === "") return alert("Product name is required")

        if (editingProduct) {
            setProducts((prev) =>
                prev.map((p) => (p.id === editingProduct.id ? { ...p, ...formData } : p))
            )
        } else {
            const newProduct: Product = {
                id: products.length ? products[products.length - 1].id + 1 : 1,
                ...formData,
            }
            setProducts((prev) => [...prev, newProduct])
        }
        setOpen(false)
    }

    function onDelete(id: number) {
        if (confirm("Are you sure you want to delete this product?")) {
            setProducts((prev) => prev.filter((p) => p.id !== id))
        }
    }

    const currency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })

    const stats = [
        { title: "Products", value: products.length, desc: "Total products" },
        { title: "Orders", value: 567, desc: "Completed orders" },
        { title: "Revenue", value: "$89,123", desc: "Monthly revenue" },
        {
            title: "Low Stock",
            value: products.filter(p => p.stock < 10).length,
            desc: "Products under 10 units"
        },
    ]

    return (
        <div className="flex min-h-screen">
            <main className="flex-1 p-6 space-y-8 overflow-auto">
                {/* Header */}
                <header className="flex items-center justify-between">
                    <h1 className="text-4xl font-bold text-blue-900">Blush Dashboard</h1>
                    <Button className="bg-blue-800 hover:bg-blue-900 text-white" onClick={() => openForm()}>
                        + Add Product
                    </Button>
                </header>

                {/* Stats */}
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map(({ title, value, desc }) => (
                        <Card key={title} className="shadow bg-white">
                            <CardHeader>
                                <CardTitle className="text-rose-800">{title}</CardTitle>
                                <CardDescription>{desc}</CardDescription>
                            </CardHeader>
                            <CardContent className="text-3xl font-semibold text-rose-900">{value}</CardContent>
                        </Card>
                    ))}
                </section>

                {/* Product Table */}
                <section>
                    <Card className="overflow-auto">
                        <CardHeader>
                            <CardTitle>Skincare Products</CardTitle>
                            <CardDescription>Manage your product list</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table className="w-full text-center">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-center">Name</TableHead>
                                        <TableHead className="text-center">Price</TableHead>
                                        <TableHead className="text-center">Description</TableHead>
                                        <TableHead className="text-center">Stock</TableHead>
                                        <TableHead className="text-center">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {products.map((product) => (
                                        <TableRow key={product.id} className="text-center">
                                            <TableCell className="align-middle">{product.name}</TableCell>
                                            <TableCell className="align-middle">{currency.format(product.price)}</TableCell>
                                            <TableCell className="align-middle">{product.description}</TableCell>
                                            <TableCell className="align-middle">{product.stock}</TableCell>
                                            <TableCell className="space-x-2 align-middle">
                                                <div className="flex justify-center gap-2">
                                                    <Button size="sm" variant="outline" onClick={() => openForm(product)}>
                                                        Edit
                                                    </Button>
                                                    <Button size="sm" variant="destructive" onClick={() => onDelete(product.id)}>
                                                        Delete
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </section>

            </main>

            {/* Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                    </DialogHeader>

                    <form className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={onChange} required />
                        </div>
                        <div>
                            <Label htmlFor="price">Price ($)</Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={onChange}
                                step="0.01"
                                min="0"
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" name="description" value={formData.description} onChange={onChange} />
                        </div>
                        <div>
                            <Label htmlFor="stock">Stock</Label>
                            <Input
                                id="stock"
                                name="stock"
                                type="number"
                                value={formData.stock}
                                onChange={onChange}
                                min="0"
                            />
                        </div>
                    </form>

                    <DialogFooter className="pt-4">
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={onSave}>{editingProduct ? "Update" : "Create"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

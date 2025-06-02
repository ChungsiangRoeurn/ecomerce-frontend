'use client'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
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
        name: "",
        price: 0,
        description: "",
        stock: 0,
    })

    function openForm(product?: Product) {
        if (product) {
            setEditingProduct(product)
            setFormData({
                name: product.name,
                price: product.price,
                description: product.description,
                stock: product.stock,
            })
        } else {
            setEditingProduct(null)
            setFormData({
                name: "",
                price: 0,
                description: "",
                stock: 0,
            })
        }
        setOpen(true)
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" || name === "stock" ? Number(value) : value,
        }))
    }

    function onSave() {
        if (editingProduct) {
            setProducts((prev) =>
                prev.map((p) =>
                    p.id === editingProduct.id
                        ? { ...p, ...formData }
                        : p
                )
            )
            // In a real app, you'd call the POST /update-product API here
        } else {
            const newProduct: Product = {
                id: products.length ? products[products.length - 1].id + 1 : 1,
                name: formData.name,
                price: formData.price,
                description: formData.description,
                stock: formData.stock,
            }
            setProducts((prev) => [...prev, newProduct])
        }
        setOpen(false)
    }

    function onDelete(id: number) {
        if (confirm("Are you sure you want to delete this product?")) {
            setProducts((prev) => prev.filter((p) => p.id !== id))
            // In a real app, you'd call the DEL /delete-product API here
        }
    }

    return (
        <div className="flex min-h-screen">
            {/* Main content */}
            <main className="flex-1 p-6 space-y-6 overflow-auto">
                <header className="flex items-center justify-between">
                    <h1 className="text-4xl font-extrabold text-rose-900 tracking-tight">
                        Dashboard
                    </h1>
                    <Button
                        className="bg-rose-700 hover:bg-rose-800 text-white"
                        onClick={() => openForm()}
                    >
                        Add New Product
                    </Button>
                </header>

                {/* Stats cards */}
                <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { title: "Products", value: products.length.toString(), desc: "Total products" },
                        { title: "Orders", value: "567", desc: "Completed orders" },
                        { title: "Revenue", value: "$89,123", desc: "Monthly revenue" },
                        { title: "Low Stock", value: products.filter(p => p.stock < 10).length.toString(), desc: "Products under 10 units" },
                    ].map(({ title, value, desc }) => (
                        <Card key={title} className="bg-white shadow">
                            <CardHeader>
                                <CardTitle className="text-rose-800">{title}</CardTitle>
                                <CardDescription>{desc}</CardDescription>
                            </CardHeader>
                            <CardContent className="text-3xl font-bold text-rose-900">
                                {value}
                            </CardContent>
                        </Card>
                    ))}
                </section>

                {/* Products table */}
                <section>
                    <Card className="overflow-auto">
                        <CardHeader>
                            <CardTitle>Skincare Products</CardTitle>
                            <CardDescription>Manage products with CRUD actions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Stock</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {products.map(({ id, name, price, description, stock }) => (
                                        <TableRow key={id}>
                                            <TableCell>{name}</TableCell>
                                            <TableCell>${price.toFixed(2)}</TableCell>
                                            <TableCell>{description}</TableCell>
                                            <TableCell>{stock}</TableCell>
                                            <TableCell>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="mr-2"
                                                    onClick={() =>
                                                        openForm({ id, name, price, description, stock })
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => onDelete(id)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </section>
            </main>

            {/* Create/Edit Product Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">Product Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={onChange}
                                placeholder="Enter product name"
                            />
                        </div>
                        <div>
                            <Label htmlFor="price">Price ($)</Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={onChange}
                                placeholder="Enter price"
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={onChange}
                                placeholder="Enter description"
                            />
                        </div>
                        <div>
                            <Label htmlFor="stock">Stock</Label>
                            <Input
                                id="stock"
                                name="stock"
                                type="number"
                                value={formData.stock}
                                onChange={onChange}
                                placeholder="Enter stock quantity"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            onClick={() => setOpen(false)}
                            variant="outline"
                            className="mr-2"
                        >
                            Cancel
                        </Button>
                        <Button onClick={onSave}>{editingProduct ? "Update" : "Create"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
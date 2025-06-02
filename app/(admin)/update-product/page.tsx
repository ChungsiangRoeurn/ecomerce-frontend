"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function UpdateProductPage() {
    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/admin/update-product", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId, name, price, category }),
            });

            if (response.ok) {
                alert("Product updated successfully!");
                setProductId("");
                setName("");
                setPrice("");
                setCategory(""); // Reset the form
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update product.");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">Update Product</h1>
                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="productId" className="text-lg text-blue-700">
                            Product ID
                        </Label>
                        <Input
                            id="productId"
                            type="text"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            className="w-full"
                            required
                            placeholder="Enter Product ID"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-lg text-blue-700">
                            Product Name
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full"
                            placeholder="Enter Product Name"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="price" className="text-lg text-blue-700">
                            Price
                        </Label>
                        <Input
                            id="price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full"
                            placeholder="Enter Price"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category" className="text-lg text-blue-700">
                            Category
                        </Label>
                        <Input
                            id="category"
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full"
                            placeholder="Enter Category"
                        />
                    </div>
                    {error && (
                        <p className="text-red-600 text-sm text-center">{error}</p>
                    )}
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 text-white hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Product"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function DeleteProductPage() {
    const [productId, setProductId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/admin/delete-product?productId=${productId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Product deleted successfully!");
                setProductId(""); // Reset the form
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to delete product.");
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
                <h1 className="text-3xl font-bold text-red-900 mb-6 text-center">Delete Product</h1>
                <form onSubmit={handleDelete} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="productId" className="text-lg text-red-700">
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
                    {error && (
                        <p className="text-red-600 text-sm text-center">{error}</p>
                    )}
                    <Button
                        type="submit"
                        className="w-full bg-red-600 text-white hover:bg-red-700"
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete Product"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
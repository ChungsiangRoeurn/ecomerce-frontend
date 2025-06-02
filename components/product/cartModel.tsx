"use client";

import { useState } from "react";
import { addToCart } from "@/actions/products/add2cart";
import { on } from "events";

interface Variant {
  variant_id: number;
  size_label: string;
  price: string;
}

interface Product {
  product_id: number;
  product_name: string;
  variants: Variant[];
}

interface CartModalProps {
  product: Product;
  onClose: () => void;
  onCartChange?: () => void; // Optional function prop
}

interface VariantPayload {
  variant_id: number;
  quantity: number;
}

interface Payload {
  user_id: string;
  product_id: number;
  variants: VariantPayload[];
}

export default function CartModal({ product, onClose, onCartChange }: CartModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(product.variants[0]);
  const [quantity, setQuantity] = useState<number>(1);

  const handleSubmit = async () => {
    if (!selectedVariant || quantity <= 0) {
      alert("Please select a valid variant and quantity.");
      return;
    }

    const userData = localStorage.getItem("userInfo");
    if (!userData) {
      alert("Please log in to add items to your cart.");
      return;
    }

    const userId = JSON.parse(userData).id;

    const payload: Payload = {
      user_id: userId,
      product_id: product.product_id,
      variants: [
        {
          variant_id: selectedVariant.variant_id,
          quantity,
        },
      ],
    };

    try {
      const res = await addToCart(payload);

      if (res.success) {
        alert("Product added to cart successfully!");
        onCartChange?.(); // Call the optional function if provided
        window.dispatchEvent(new Event("cart-updated"));
        onClose();
      } else {
        alert("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Cart submission failed:", error);
      alert("An error occurred while adding to cart.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{product.product_name}</h2>

        {/* Variant Selection */}
        <label className="block mb-2 font-semibold">Choose Variant:</label>
        <select
          value={selectedVariant.size_label}
          onChange={(e) =>
            setSelectedVariant(
              product.variants.find((v) => v.size_label === e.target.value) || product.variants[0]
            )
          }
          className="w-full border rounded p-2 mb-4"
        >
          {product.variants.map((variant) => (
            <option key={variant.variant_id} value={variant.size_label}>
              {variant.size_label} - ${parseFloat(variant.price).toFixed(2)}
            </option>
          ))}
        </select>

        {/* Quantity Selection */}
        <label className="block mb-2 font-semibold">Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full border rounded p-2 mb-4"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

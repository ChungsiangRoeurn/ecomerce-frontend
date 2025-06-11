"use client";

import Image from "next/image";

interface Variant {
  size_label: string;
  price: string;
}

interface ProductCardProps {
  product: any;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  onAddToCart: () => void;
}

export default function ProductCard({
  product,
  isActive,
  onHover,
  onLeave,
  onAddToCart,
}: ProductCardProps) {
  const variant = product.variants?.[0];

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:cursor-pointer ${
        isActive ? "scale-105 z-10" : "opacity-60"
      }`}
    >
      <div className="relative w-full h-40 overflow-hidden">
        <Image
          src={product.image_url}
          alt={product.product_name}
          fill
          className={`object-contain transition-all duration-300 ${
            !isActive ? "blur-sm" : ""
          }`}
        />
      </div>

      <div className="p-4 text-center">
        <h3 className="text-[15px] font-semibold text-indigo-900 truncate">
          {product.product_name}
        </h3>
        <p className="text-sm text-gray-600">{variant?.size_label}</p>
        <p className="text-xl font-bold text-amber-600 mt-2">
          ${variant ? parseFloat(variant.price).toFixed(2) : "0.00"}
        </p>

        <button
          onClick={onAddToCart}
          className="mt-4 w-full bg-indigo-800 hover:bg-indigo-900 text-white py-2 rounded-md"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

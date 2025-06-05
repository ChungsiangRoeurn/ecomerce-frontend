// components/Hero.tsx
"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import CartModal from "@/components/product/cartModel";
import Image from "next/image";
import OnTredn from "@/actions/products/on-trend";
import CategoryNavigation from "@/components/product/categories";


export default function Hero() {
  const [onTrendProducts, setOnTrendProducts] = useState<any[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("Serum");
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  useEffect(() => {
    async function fetchOnTrend() {
      try {
        const products = await OnTredn(currentCategory);
        setOnTrendProducts(products);
      } catch (error) {
        console.error("Error fetching on-trend products:", error);
      }
    }
    fetchOnTrend();
  }, [currentCategory]);


  return (
        <main className="min-h-screen bg-gray-50">
      <CategoryNavigation
        currentCategory={currentCategory}
        onCategorySelect={setCurrentCategory}
      />

      {/* BANNER */}
      <div className="relative w-full h-[20rem] md:h-[17rem]">
        <Image
          src="http://178.128.101.64:9000/products-all-images/page-cover.png"
          alt="Holiday promotion"
          fill
          style={{ objectFit: "cover" }}
          className="brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/10  px-4">
          <div className="text-white text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight drop-shadow-md">
            FREE DELIVERY
          </div>
          <div className="text-amber-300 text-lg sm:text-2xl md:text-3xl font-semibold mt-2 drop-shadow-md">
            On Orders Over $50
          </div>
          <div className="mt-4 sm:mt-6 bg-indigo-800 hover:bg-indigo-900 text-white rounded-full px-6 py-2 sm:px-8 sm:py-3 transition-colors shadow-lg">
            <span className="text-lg sm:text-xl md:text-2xl font-bold">
              Shop 30% Off Now
            </span>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 py-8 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-900 mb-6">
          {currentCategory}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {onTrendProducts.map((product) => {
            const variant = product.variants?.[0];
            return (
              <ProductCard
                key={product.product_id}
                product={product}
                isActive={
                  activeCardId === product.product_id || activeCardId === null
                }
                onHover={() => setActiveCardId(product.product_id)}
                onLeave={() => setActiveCardId(null)}
                onAddToCart={() => setSelectedProduct(product)}
              />
            );
          })}
        </div>
      </section>

      {/* MODAL */}
      {selectedProduct && (
        <CartModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </main>
  );
}

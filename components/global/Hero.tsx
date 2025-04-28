"use client";

import ProductCard from "@/components/product/ProductCard";
import { bestsellers, promotions } from "@/lib/contants";
import Image from "next/image";

export default function Hero() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="relative w-full h-[32rem] md:h-[36rem]">
        <Image
          src="/banner.png"
          alt="Holiday promotion"
          fill
          style={{ objectFit: "cover" }}
          className="brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/30">
          <div className="text-white text-5xl md:text-6xl font-bold tracking-tight drop-shadow-md">
            FREE DELIVERY
          </div>
          <div className="text-amber-300 text-2xl md:text-3xl font-semibold mt-2 drop-shadow-md">
            On Orders Over $50
          </div>
          <div className="mt-6 bg-indigo-800 hover:bg-indigo-900 text-white rounded-full px-8 py-3 transition-colors shadow-lg">
            <span className="text-xl md:text-2xl font-bold">
              Shop 30% Off Now
            </span>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-8 my-8">
        <h2 className="text-3xl font-bold text-indigo-900 mb-6">Bestsellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {bestsellers.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              price={product.price}
              image={product.image}
              size={product.size}
            />
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-8 my-8">
        <h2 className="text-3xl font-bold text-indigo-900 mb-6">Promotion</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {promotions.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              price={product.price}
              image={product.image}
              size={product.size}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

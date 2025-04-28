'use client'

import ProductCard from '@/components/product/ProductCard'
import { bestsellers } from '@/lib/contants'
import Image from 'next/image'

export default function Hero() {
  return (
    <main className="min-h-screen">
      <div className="relative w-full h-90">
        <Image 
          src="/banner.png" 
          alt="Holiday promotion"
          fill
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-purple-700 text-5xl font-bold">FREE</div>
          <div className="text-orange-600 text-3xl font-bold">DELIVERY</div>
          <div className="mt-4 bg-purple-700 text-white rounded-full px-6 py-3">
            <span className="text-2xl font-bold">30% off</span>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-6 border border-purple-300 rounded-lg my-6">
        <h2 className="text-2xl font-bold mb-4">Bestsellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
    </main>
  )
}
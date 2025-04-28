import { categories } from '@/lib/contants';
import { ArrowLeftRight, CircleUserRound, Globe, Search, ShoppingCart } from 'lucide-react';
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Navbar = () => {
  return (
    <main>
      <header className="bg-yellow-400 p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href='/' className="text-blue-900 font-bold text-4xl transition-transform hover:scale-105">
            BLUSH
          </Link>

          <div className="flex items-center space-x-3 flex-1 max-w-xl mx-6">
            <div className="flex w-full shadow-sm rounded-md overflow-hidden">
              <div className="bg-white px-3 py-2 border-y border-l border-gray-300 hover:bg-gray-50 transition-colors flex items-center cursor-pointer">
                <span className="text-sm font-semibold text-gray-700">ALL</span>
              </div>
              <Input
  placeholder="Search for products..."
  className="rounded-none border-y border-r bg-white border-gray-300 py-2 px-4 w-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200 appearance-none focus:bg-white active:bg-white"
/>
              <Button className="bg-orange-500 hover:bg-orange-600 rounded-l-none border-none transition-colors" size="icon">
                <Search className="h-5 w-5 text-white" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center group hover:text-blue-900 cursor-pointer">
              <Globe className="h-5 w-5 mr-1" />
              <div className="font-medium group-hover:font-bold transition-all">EN</div>
            </div>
            
            <div className="text-center group cursor-pointer hover:text-blue-900">
              <div className="flex items-center">
                <ArrowLeftRight className="h-5 w-5 mr-1" />
                <div>
                  <div className="text-sm font-medium group-hover:font-bold transition-all">Returns</div>
                  <div className="text-xs">& Orders</div>
                </div>
              </div>
            </div>
            
            <div className="relative group cursor-pointer hover:text-blue-900">
              <div className="flex flex-col items-center">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
                <span className="text-sm mt-1">Cart</span>
              </div>
            </div>
            
            <Link href="/signIn" className="flex flex-col items-center group hover:text-blue-900">
              <CircleUserRound className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span className="text-sm mt-1">Sign In</span>
            </Link>
          </div>
        </div>
      </header>
      
      <nav className="bg-purple-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto">
          <ul className="flex justify-around px-4">
            {categories.map((category, index) => (
              <li key={index} className="py-2">
                <Link href={`/category/${category.toLowerCase()}`} className="hover:underline hover:text-yellow-200 transition-colors px-4 py-2">
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </main>
  );
}

export default Navbar;
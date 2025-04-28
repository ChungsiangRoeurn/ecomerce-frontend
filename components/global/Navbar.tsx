import { categories } from "@/lib/contants";
import {
  ArrowLeftRight,
  CircleUserRound,
  Globe,
  Search,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Navbar = () => {
  return (
    <main>
      <header className="bg-indigo-800 p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-white font-bold text-4xl transition-transform hover:scale-105"
          >
            BLUSH
          </Link>

          <div className="flex items-center space-x-3 flex-1 max-w-xl mx-6">
            <div className="flex w-full shadow-sm rounded-md overflow-hidden">
              <div className="bg-gray-100 px-3 py-2 border-y border-l border-gray-200 hover:bg-gray-200 transition-colors flex items-center cursor-pointer">
                <span className="text-sm font-semibold text-gray-800">ALL</span>
              </div>
              <Input
                placeholder="Search for products..."
                className="rounded-none bg-gray-100 py px-4 w-full text-gray-800 placeholder-gray-500 focus:outline-none transition-colors"
              />
              <Button
                className="bg-amber-500 hover:bg-amber-600 rounded-l-none border-none transition-colors"
                size="icon"
              >
                <Search className="size-5 text-white" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center group hover:text-indigo-200 cursor-pointer">
              <Globe className="h-5 w-5 mr-1 text-white group-hover:text-indigo-200" />
              <div className="font-medium transition-colors text-white group-hover:text-indigo-200">
                EN
              </div>
            </div>

            <div className="text-center group cursor-pointer hover:text-indigo-200">
              <div className="flex items-center">
                <ArrowLeftRight className="h-5 w-5 mr-1 text-white group-hover:text-indigo-200" />
                <div>
                  <div className="text-sm font-medium transition-colors text-white group-hover:text-indigo-200">
                    Returns
                  </div>
                  <div className="text-xs text-gray-300"> & Orders</div>
                </div>
              </div>
            </div>

            <div className="relative group cursor-pointer hover:text-indigo-200">
              <div className="flex flex-col items-center">
                <ShoppingCart className="h-6 w-6 text-white group-hover:text-indigo-200" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
                <span className="text-sm mt-1 text-white group-hover:text-indigo-200">
                  Cart
                </span>
              </div>
            </div>

            <Link
              href="/signIn"
              className="flex flex-col items-center group hover:text-indigo-200"
            >
              <CircleUserRound className="h-6 w-6 text-white group-hover:scale-110 group-hover:text-indigo-200 transition-all" />
              <span className="text-sm mt-1 text-white group-hover:text-indigo-200">
                Sign In
              </span>
            </Link>
          </div>
        </div>
      </header>

      <nav className="bg-indigo-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto">
          <ul className="flex justify-around px-4">
            {categories.map((category, index) => (
              <li key={index} className="py-2">
                <Link
                  href={`/category/${category.toLowerCase()}`}
                  className="hover:underline hover:text-amber-300 transition-colors px-4 py-2"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </main>
  );
};

export default Navbar;

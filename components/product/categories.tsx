"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import getCategories from "@/actions/products/getCategories";

interface CategoryNavigationProps {
  currentCategory: string;
  onCategorySelect: (category: string) => void;
}

export default function CategoryNavigation({
  currentCategory,
  onCategorySelect,
}: CategoryNavigationProps) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetched = await getCategories();
        const names = fetched.map((cat: any) => cat.name); // ✅ Fixed
        setCategories(names);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <nav className="bg-indigo-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto overflow-x-auto">
        <ul className="flex flex-wrap sm:flex-nowrap justify-start sm:justify-around px-4 gap-2 sm:gap-0">
          {categories.map((category, index) => (
            <li key={index} className="py-2">
              <Link
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onCategorySelect(category);
                }}
                className={`transition-colors px-4 py-2 whitespace-nowrap block ${
                  category === currentCategory
                    ? "underline text-amber-300"
                    : "hover:underline hover:text-amber-300"
                }`}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

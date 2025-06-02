'use client';

import QRCheckoutModal from "@/pages/qr-checkout";
import removeFromCart from "@/actions/products/removeFromCart";
import {
  CircleUserRound,
  Globe,
  Search,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState, useRef } from "react";


interface CartItem {
  cart_id: number;
  product_id: number;
  name: string;
  variant_id: number;
  size_label: string;
  price: string;
  quantity: number;
}

const Navbar = () => {
  const [userNameFirstLetter, setUserNameFirstLetter] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  const [qrCode, setQRCode] = useState<string | null>(null);
  const [md5, setMd5] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);

    try {
      // Simulate cart/checkout logic success
      const cartValid = true; // Replace with real validation
      if (!cartValid) {
        alert('Cart validation failed');
        setIsProcessing(false);
        return;
      }

      // Now request the QR code from your API
      const res = await fetch('/api/bakong', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bakongID: 'minhseuh_hin@oski',
          username: 'MINHSEU HIN',
          location: 'Phnom Penh',
          amount: 20,
        }),
      });

      const data = await res.json();
      if (data) {
        setQRCode(data.qr);
        setMd5(data.md5);
      } else {
        alert(data.error || 'Failed to generate QR');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Something went wrong during checkout');
    } finally {
      setIsProcessing(false);
    }
  };


  
  // Fetch cart
  const fetchCart = async () => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) return;
    const userId = JSON.parse(userInfo).id;
    
    try {
      const res = await fetch('/api/cart/fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId })
      });
      
      if (!res.ok) {
        const text = await res.text();
        console.error("Non-JSON error:", text);
        return;
      }
      
      const cart = await res.json();
      if (cart?.cart) setCartItems(cart.cart);
    } catch (err) {
      console.error("Client fetch cart error:", err);
    }
  };
  // Get user info
  useEffect(() => {
    const userData = localStorage.getItem("userInfo");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.name) setUserNameFirstLetter(user.name.charAt(0).toUpperCase());
        else if (user.username) setUserNameFirstLetter(user.username.charAt(0).toUpperCase());
      } catch {
        setUserNameFirstLetter(null);
      }
    }
  }, []);
  useEffect(() => {
    fetchCart();
  }, []);


  // Handle click outside cart or dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (
        cartRef.current && !cartRef.current.contains(event.target as Node)
      ) {
        setShowCart(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Remove from cart
  const handleRemove = async (cart_id: number) => {
    try {
      await removeFromCart(cart_id);
      setCartItems(prev => prev.filter(item => item.cart_id !== cart_id));
      if (cartItems.length === 1) {
        setShowCart(false); // Close cart if it becomes empty
      }
    } catch (err) {
      console.error("Failed to remove item from cart:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUserNameFirstLetter(null);
    setDropdownOpen(false);
  };

  return (
    <header className="bg-indigo-800 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-4xl hover:scale-105 transition">
          BLUSH
        </Link>

        {/* Search */}
        <div className="flex items-center space-x-3 flex-1 max-w-xl mx-6">
          <div className="flex w-full shadow-sm rounded-md overflow-hidden">
            <div className="bg-gray-100 px-3 py-2 border-y border-l border-gray-200 hover:bg-gray-200 flex items-center cursor-pointer">
              <span className="text-sm font-semibold text-gray-800">ALL</span>
            </div>
            <Input
              placeholder="Search for products..."
              className="rounded-none bg-gray-100 px-4 w-full text-gray-800 placeholder-gray-500 focus:outline-none"
            />
            <Button className="bg-amber-500 hover:bg-amber-600 rounded-l-none border-none" size="icon">
              <Search className="size-5 text-white" />
            </Button>
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center text-white hover:text-indigo-200 cursor-pointer">
            <Globe className="h-5 w-5 mr-1" />
            <div className="font-medium">EN</div>
          </div>

          {/* Cart Icon */}
          <div className="relative" ref={cartRef}>
            <button onClick={() => setShowCart(!showCart)} className="relative text-white text-xl">
              🛒
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Cart Dropdown */}
            {showCart && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 p-4">
                <h4 className="font-bold mb-2">Your Cart</h4>
                {cartItems.length === 0 ? (
                  <p className="text-sm text-gray-500">Your cart is empty.</p>
                ) : (
                  <ul className="space-y-2 max-h-60 overflow-y-auto">
                    {cartItems.map((item) => (
                      <li key={item.cart_id} className="flex justify-between items-center text-sm border-b pb-2">
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p>{item.size_label} × {item.quantity}</p>
                          <p className="text-amber-600">${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => handleRemove(item.cart_id)}
                          className="text-red-500 text-xs hover:underline"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  onClick={handleCheckout}
                  className="w-full mt-4 text-center text-white bg-indigo-700 hover:bg-indigo-800 font-bold py-2 rounded"
                >
                  {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                </button>
                  {qrCode && <QRCheckoutModal md5={md5} qr={qrCode} onClose={() => setQRCode(null)} />}

              </div>
            )}
          </div>

          {/* Profile Icon / Dropdown */}
          {userNameFirstLetter ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                title="Profile"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-indigo-900 font-bold text-lg"
              >
                {userNameFirstLetter}
              </button>
              {dropdownOpen && (
                <div className="absolute -translate-x-48 mt-2 w-56 bg-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <button
                    onClick={logout}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white font-bold"
                  >
                    Logout
                  </button>
                  <Link
                    href="/orders"
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white font-bold"
                  >
                    Order History
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link href="/signUp" className="flex flex-col items-center text-white hover:text-indigo-200">
              <CircleUserRound className="h-6 w-6" />
              <span className="text-sm mt-1">Sign Up</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

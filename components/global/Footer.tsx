import { Facebook, Instagram, Mail, Phone, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Brand Mission */}
        <div className="space-y-4">
          <Link
            href="/"
            className="text-3xl font-bold text-white hover:text-amber-300 transition-colors"
          >
            BLUSH
          </Link>
          <p className="text-gray-300 text-sm leading-relaxed">
            Empowering beauty with premium skincare, makeup, and wellness
            products. Discover your glow with BLUSH.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-300 hover:text-amber-300 transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-300 hover:text-amber-300 transition-colors"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-300 hover:text-amber-300 transition-colors"
            >
              <Facebook className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Product Brand */}
        <div>
          <h3 className="text-lg font-semibold text-amber-300 mb-4">
            Our Products
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link
                href="/category/skincare"
                className="hover:text-white transition-colors"
              >
                Skincare
              </Link>
            </li>
            <li>
              <Link
                href="/category/makeup"
                className="hover:text-white transition-colors"
              >
                Makeup
              </Link>
            </li>
            <li>
              <Link
                href="/category/haircare"
                className="hover:text-white transition-colors"
              >
                Haircare
              </Link>
            </li>
            <li>
              <Link
                href="/category/fragrance"
                className="hover:text-white transition-colors"
              >
                Fragrance
              </Link>
            </li>
            <li>
              <Link
                href="/category/bath-body"
                className="hover:text-white transition-colors"
              >
                Bath & Body
              </Link>
            </li>
          </ul>
        </div>

        {/* Our Location */}
        <div>
          <h3 className="text-lg font-semibold text-amber-300 mb-4">
            Our Location
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            BLUSH Headquarters
            <br />
            123 Glow Street, Suite 100
            <br />
            San Francisco, CA 94105
            <br />
            United States
          </p>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold text-amber-300 mb-4">
            Contact Us
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              <a
                href="mailto:support@blush.com"
                className="hover:text-white transition-colors"
              >
                support@blush.com
              </a>
            </li>
            <li className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              <a
                href="tel:+18005551234"
                className="hover:text-white transition-colors"
              >
                +1 (800) 555-1234
              </a>
            </li>
          </ul>
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">
              Stay Updated
            </h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-gray-800 bg-gray-100 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-300"
                aria-label="Email for newsletter"
              />
              <button
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-r-md transition-colors"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-indigo-800 pt-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} BLUSH. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/faq" className="hover:text-white transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

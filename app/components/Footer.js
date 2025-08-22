"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-5 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">QuickCart</h2>
          <p className="text-gray-400">
            QuickCart brings you the best products at unbeatable prices. Shop
            smart, live better!
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul>
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white transition">
                Products
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white transition">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Follow Us</h2>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition">
              <FaFacebookF size={20} />
            </Link>
            <Link href="#" className="hover:text-white transition">
              <FaTwitter size={20} />
            </Link>
            <Link href="#" className="hover:text-white transition">
              <FaInstagram size={20} />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} QuickCart. All rights reserved.
      </div>
    </footer>
  );
}

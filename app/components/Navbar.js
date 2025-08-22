"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname(); // Get current path

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Login", href: "/login" },
  ];

  return (
    <nav className="flex justify-between items-center px-5 md:px-20 py-5 shadow">
      <h1 className="text-2xl font-bold">QuickCart</h1>
      <div className="flex gap-5">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`hover:text-blue-500 transition ${
              pathname === item.href ? "text-blue-500 font-semibold border-b-2 border-blue-500" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

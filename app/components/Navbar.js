"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut({ redirect: false });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    ...(session
      ? [
          { name: "Add Product", href: "/dashboard/add-product" },
          {
            name: "Logout",
            href: "#",
            onClick: handleLogout,
            loading: isLoggingOut,
          },
        ]
      : [{ name: "Login", href: "/login" }]),
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black px-5 md:px-20 py-4 shadow flex justify-between items-center ">
      <h1 className="text-2xl font-bold">QuickCart</h1>

      {/* Hamburger Button */}
      <button
        className="md:hidden text-gray-700 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6">
        {navItems.map((item) =>
          item.onClick ? (
            <button
              key={item.name}
              onClick={item.onClick}
              disabled={item.loading}
              className="hover:text-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              {item.loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
                  Logging out...
                </>
              ) : (
                item.name
              )}
            </button>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-blue-500 transition ${
                pathname === item.href
                  ? "text-blue-500 font-semibold border-b-2 border-blue-500"
                  : ""
              }`}
            >
              {item.name}
            </Link>
          )
        )}
        {session && (
          <img
            src={session.user.image}
            alt={session.user.name}
            className="w-8 h-8 rounded-full"
          />
          
        )}
         <span className="text-sm">{session.user.name}</span>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full backdrop-blur-3xl shadow-md z-50 md:hidden flex flex-col items-start px-5 py-4 gap-4">
          {navItems.map((item) =>
            item.onClick ? ( 
              <button
                key={item.name}
                onClick={item.onClick}
                disabled={item.loading}
                className="hover:text-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 w-full text-left"
              >
                {item.loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
                    Logging out...
                  </>
                ) : (
                  item.name
                )}
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`hover:text-blue-500 transition w-full ${
                  pathname === item.href
                    ? "text-blue-500 font-semibold border-b-2 border-blue-500"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            )
          )}
          {session && (
            <div className="flex items-center gap-2">
              <img
                src={session.user.image}
                alt={session.user.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm">{session.user.name}</span>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

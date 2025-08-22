"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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
      ? [{ 
          name: "Logout", 
          href: "#", 
          onClick: handleLogout,
          loading: isLoggingOut
        }] 
      : [{ name: "Login", href: "/login" }]
    ),
  ];

  return (
    <nav className="flex justify-between items-center px-5 md:px-20 py-5 shadow">
      <h1 className="text-2xl font-bold">QuickCart</h1>
      <div className="flex items-center gap-5">
        {navItems.map((item) => (
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
                pathname === item.href ? "text-blue-500 font-semibold border-b-2 border-blue-500" : ""
              }`}
            >
              {item.name}
            </Link>
          )
        ))}
        {session && (
          <div className="flex items-center ml-4">
            <img 
              src={session.user.image} 
              alt={session.user.name}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm text-gray-600">{session.user.name}</span>
          </div>
        )}
      </div>
    </nav>
  );
}
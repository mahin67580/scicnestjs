"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center h-[70vh] bg-blue-400 text-white text-center px-5 md:px-20">
      <h1 className="text-4xl md:text-6xl font-bold mb-5 md:mb-8">
        Shop Smart, Live Better
      </h1>
      <p className="text-lg md:text-xl max-w-xl mb-6 md:mb-10">
        Discover the best products at unbeatable prices. Your one-stop solution for online shopping.
      </p>
      <Link
        href="/products"
        className="bg-white text-blue-400 font-bold px-6 py-3 rounded hover:bg-gray-100 transition"
      >
        Browse Products
      </Link>
    </section>
  );
}

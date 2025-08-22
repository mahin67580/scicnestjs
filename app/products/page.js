"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import productsData from "../../data/products.json";

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <Navbar />
      <main className="px-5 md:px-20 py-10 text-center">
        <h1 className="text-4xl font-bold mb-10">Our Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {productsData.map((product) => (
            <div key={product.id} className="border rounded-lg p-5 shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="font-bold text-lg mb-4">{product.price}</p>
              <button
                onClick={() => setSelectedProduct(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Details
              </button>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
              <h2 className="text-2xl text-black font-bold mb-4">{selectedProduct.name}</h2>
              <p className=" text-black mb-2">{selectedProduct.description}</p>
              <p className="font-bold text-black text-lg mb-4">{selectedProduct.price}</p>
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition"
              >
                X
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

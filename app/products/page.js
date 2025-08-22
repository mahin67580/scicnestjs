"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function Products() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchProducts();
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center flex-grow">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="px-5 md:px-20 py-10 text-center">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Our Products</h1>
          <div className="text-sm text-gray-600">
            Welcome, {session?.user?.name}!
          </div>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg p-5 shadow hover:shadow-lg transition"
              >
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                )}
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="font-bold text-lg mb-4">${product.price}</p>
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Details
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
              {selectedProduct.image && (
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
              )}
              <h2 className="text-2xl text-black font-bold mb-4">{selectedProduct.name}</h2>
              <p className="text-black mb-2">{selectedProduct.description}</p>
              <p className="font-bold text-black text-lg mb-4">${selectedProduct.price}</p>
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

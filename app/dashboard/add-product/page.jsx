"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

export default function AddProduct() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!session) return null;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("description", form.description);
            formData.append("price", form.price);
            if (form.image) {
                formData.append("image", form.image);
            }

            const res = await fetch("/api/products/add", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to add product");
            }

            setSuccessMessage("✅ Product added successfully!");
            setForm({ name: "", description: "", price: "", image: null });
        } catch (err) {
            setErrorMessage(`❌ ${err.message}`);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Navbar />
            <main className="px-5 md:px-20 py-10">
                <h1 className="text-3xl font-bold mb-6">Add a New Product</h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto"
                >
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-black font-semibold mb-1">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border text-black border-gray-300 rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-black font-semibold mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full border text-black border-gray-300 rounded px-3 py-2"
                            required
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="price" className="block font-semibold text-black mb-1">
                            Price (USD)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            id="price"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            className="w-full border text-black border-gray-300 rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="image" className="block text-black  font-semibold mb-1">
                            Product Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={(e) =>
                                setForm({ ...form, image: e.target.files[0] })
                            }
                            className="w-full text-black"
                            required
                        />
                    </div>


                    {successMessage && (
                        <p className="text-green-600 mb-4">{successMessage}</p>
                    )}
                    {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "Adding..." : "Add Product"}
                    </button>
                </form>
            </main>
        </>
    );
}

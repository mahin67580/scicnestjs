"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function Login() {
  

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-[70vh] px-5 md:px-20">
        <h1 className="text-4xl font-bold mb-6">Login to QuickCart</h1>
        <p className="mb-8 text-gray-600 text-center max-w-md">
          Use your Google account to login and start exploring our products.
        </p>

        <button
          onClick={() => signIn("google")}
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition mb-4 w-full max-w-xs"
        >
          Sign in with Google
        </button>

        <p className="text-gray-500 mt-4">
          By signing in, you agree to our Terms & Privacy Policy.
        </p>
      </main>
    </>
  );
}

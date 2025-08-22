import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectToDB();

    const products = await Product.find().sort({ createdAt: -1 }); // Newest first

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}

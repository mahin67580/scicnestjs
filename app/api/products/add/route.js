import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    await connectToDB();
    const formData = await req.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const price = parseFloat(formData.get("price"));
    const imageFile = formData.get("image");

    if (!name || !description || !price || !imageFile) {
      return NextResponse.json(
        { message: "Missing fields" },
        { status: 400 }
      );
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "quickcart_products" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    const newProduct = new Product({
      name,
      description,
      price,
      image: result.secure_url,
    });

    await newProduct.save();

    return NextResponse.json({ message: "Product added" }, { status: 201 });
  } catch (error) {
    console.error("Error uploading product:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

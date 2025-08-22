"use client";

import Link from "next/link";

const highlights = [
  {
    id: 1,
    title: "Smartphone Deals",
    description: "Get the latest smartphones at unbeatable prices.",
    image: "https://assets.techrepublic.com/uploads/2024/06/tr_20240624-best-smartphone-deals.jpg",
  },
  {
    id: 2,
    title: "Home Essentials",
    description: "Everything you need to make your home cozy and smart.",
    image: "https://cdn.vox-cdn.com/thumbor/XjsBf1Kxn7OeIV16PU-3VbHTY0E=/0x0:1800x1160/1200x0/filters:focal(0x0:1800x1160):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/8616869/SummerHomeEssentials_Indoor_numbers.jpg",
  },
  {
    id: 3,
    title: "Fitness Gear",
    description: "Top-quality fitness equipment to stay in shape.",
    image: "https://powertec.com/cdn/shop/articles/0dc20654-c842-4dd1-bb59-8966cf4f4d10-356655.png?v=1719178326",
  },
];

export default function ProductHighlights() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {highlights.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <Link
                  href="/products"
                  className="text-blue-500 font-semibold hover:underline"
                >
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

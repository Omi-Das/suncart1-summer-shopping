import Image from "next/image";
import Link from "next/link";
import products from "@/data/products.json";

export default function Home() {
  // Select 6 popular products
  const popularProducts = products.slice(0, 3);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-400 to-yellow-500 text-white rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-6 py-16 md:px-12 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Summer Sale 50% OFF
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              🔥 Hot Deals on All Summer Essentials 🔥
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Shop Now
              </Link>
              <div className="bg-orange-600 text-white px-8 py-3 rounded-full font-semibold border-2 border-white">
                Limited Time Offer
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-slate-900">
          🔥 Popular Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="aspect-square relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  unoptimized={true}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-slate-900">
                  {product.name}
                </h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(product.rating) ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-slate-600">
                    {product.rating}
                  </span>
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-4">
                  ${product.price}
                </p>
                <Link
                  href={`/products/${product.id}`}
                  className="w-full bg-slate-900 text-white py-2 px-4 rounded-md hover:bg-slate-800 transition text-center block"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Summer Care Tips */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900">
            ☀️ Summer Care Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-3 text-slate-900">
                Skincare Protection
              </h3>
              <p className="text-slate-600">
                Apply sunscreen daily, even on cloudy days. Use SPF 30+ and reapply every 2 hours when outdoors.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-3 text-slate-900">
                Stay Hydrated
              </h3>
              <p className="text-slate-600">
                Drink plenty of water throughout the day. Aim for at least 8 glasses to combat dehydration in hot weather.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-3 text-slate-900">
                Sun Safety
              </h3>
              <p className="text-slate-600">
                Wear protective clothing, hats, and sunglasses. Seek shade during peak sun hours (10 AM - 4 PM).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Brands */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-slate-900">
          🏆 Top Brands
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "SunShade", logo: "S" },
            { name: "AquaWear", logo: "A" },
            { name: "SkinGuard", logo: "G" },
            { name: "CoastalComfort", logo: "C" },
          ].map((brand, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                {brand.logo}
              </div>
              <h3 className="font-semibold text-slate-900">{brand.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
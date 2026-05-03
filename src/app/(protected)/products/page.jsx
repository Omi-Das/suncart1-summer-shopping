import Image from "next/image";
import Link from "next/link";
import products from "@/data/products.json";

export default function ProductsPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-slate-900">
        All Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
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
              <h2 className="font-semibold text-lg mb-2 text-slate-900">
                {product.name}
              </h2>
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
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import products from '@/data/products.json';

const ProductPage = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const id = Number(params?.id);
  const product = products.find((item) => item.id === id);

  useEffect(() => {
    if (!isPending && !session?.user && params?.id) {
      router.replace(`/login?redirect=/products/${params.id}`);
    }
  }, [isPending, session, params, router]);

  if (isPending) {
    return <p className="text-center text-slate-600">Checking access...</p>;
  }

  if (!session?.user) {
    return null;
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 text-center shadow">
        <h1 className="text-2xl font-bold text-slate-900">Product not found</h1>
        <p className="mt-2 text-slate-600">The item you requested does not exist.</p>
        <Link
          href="/products"
          className="mt-5 inline-block rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto grid max-w-5xl gap-8 rounded-2xl bg-white p-6 shadow-md md:grid-cols-2 md:p-8">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          unoptimized
          className="object-cover"
        />
      </div>
      <div className="space-y-4">
        <p className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
          {product.category}
        </p>
        <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>
        <p className="text-slate-700">{product.description}</p>
        <div className="space-y-2 text-slate-700">
          <p><span className="font-semibold">Brand:</span> {product.brand}</p>
          <p><span className="font-semibold">Price:</span> ${product.price}</p>
          <p><span className="font-semibold">Rating:</span> {product.rating} / 5</p>
          <p><span className="font-semibold">Stock:</span> {product.stock} available</p>
        </div>
        <button className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700">
          Place Order
        </button>
      </div>
    </section>
  );
};

export default ProductPage;
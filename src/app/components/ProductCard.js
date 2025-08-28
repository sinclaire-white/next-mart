'use client';
import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="object-contain h-48 w-full p-4 bg-gray-50"
        />
      ) : (
        <div className="text-6xl flex justify-center items-center h-48">{product.emoji}</div>
      )}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold mb-2">{product.name}</h3>
          <p className="text-emerald-700 font-semibold text-xl">${product.price}</p>
        </div>
        <Link
          href={`/products/${product.id}`}
          className="mt-4 inline-block bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

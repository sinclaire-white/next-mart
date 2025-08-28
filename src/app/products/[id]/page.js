// app/products/[id]/page.js
'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        setError('Product not found');
      }
    } catch (err) {
      setError('Error fetching product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <LoadingSpinner size="lg" />
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{error || 'Product not found'}</h1>
            <button
              onClick={() => router.push('/products')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Products
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => router.push('/products')}
            className="text-emerald-700 hover:text-emerald-800 mb-8 inline-block font-medium"
          >
            ← Back to Products
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Image / Emoji */}
            <div className="flex justify-center items-center bg-white rounded-2xl p-8 shadow-md">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain max-h-96 rounded-lg w-full"
                />
              ) : (
                <div className="text-9xl">{product.emoji || '📦'}</div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
                <span className="inline-block bg-emerald-100 text-emerald-800 text-sm px-4 py-1 rounded-full font-semibold">
                  {product.category || 'Uncategorized'}
                </span>
              </div>

              <div className="text-4xl font-bold text-emerald-700">${product.price?.toFixed(2)}</div>

              {product.description && (
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}

              {product.features?.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Features</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-600">
                        <span className="text-emerald-500 mr-3 mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Buttons */}
              <div className="space-y-4">
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                  Add to Cart
                </button>
                <button className="w-full border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white font-bold py-3 px-6 rounded-xl transition-colors">
                  Add to Wishlist
                </button>
              </div>

              {/* Product Meta */}
              <div className="border-t border-gray-200 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-semibold">SKU:</span> {product.sku || product.id || 'N/A'}
                </div>
                <div>
                  <span className="font-semibold">Availability:</span> {product.stock || 'In Stock'}
                </div>
                <div>
                  <span className="font-semibold">Shipping:</span> {product.shipping || 'Free'}
                </div>
                <div>
                  <span className="font-semibold">Returns:</span> {product.returns || '30 days'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

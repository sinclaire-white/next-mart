'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Swal from 'sweetalert2';

export default function NavBar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You will be signed out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444', // red
      cancelButtonColor: '#6b7280', // gray
      confirmButtonText: 'Yes, sign out',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await signOut({ redirect: false });
        Swal.fire({
          icon: 'success',
          title: 'Signed out!',
          text: 'You have been logged out successfully.',
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error('Error signing out:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while signing out.',
        });
      }
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-3xl font-bold text-emerald-700">
                ProductHub
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-emerald-700 font-medium transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-emerald-700 font-medium transition-colors">
              Products
            </Link>
            {session ? (
              <>
                <Link href="/dashboard/add-product" className="text-gray-700 hover:text-emerald-700 font-medium transition-colors">
                  Add Product
                </Link>
                <span className="text-gray-700 px-3 py-2 font-medium">
                  Hi, {session.user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Sign In
                </Link>
                <Link href="/register" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 bg-gray-50 rounded-lg mt-2">
              <Link href="/" className="block text-gray-700 hover:text-emerald-700 px-3 py-2 rounded-md text-base font-medium">
                Home
              </Link>
              <Link href="/products" className="block text-gray-700 hover:text-emerald-700 px-3 py-2 rounded-md text-base font-medium">
                Products
              </Link>
              {session ? (
                <>
                  <Link href="/dashboard/add-product" className="block text-gray-700 hover:text-emerald-700 px-3 py-2 rounded-md text-base font-medium">
                    Add Product
                  </Link>
                  <div className="px-3 py-2 text-gray-700">
                    Hi, {session.user.email}
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-base font-medium transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block bg-blue-600 text-white px-3 py-2 rounded-lg text-base font-medium hover:bg-blue-700">
                    Sign In
                  </Link>
                  <Link href="/register" className="block bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-base font-medium hover:bg-gray-300">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const [modalContent, setModalContent] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (content) => setModalContent(content) || setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <footer className="bg-zinc-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div>
            <h3 className="text-3xl font-bold text-emerald-400 mb-4">ProductHub</h3>
            <p className="text-zinc-300 mb-4 leading-relaxed">
              Your one-stop solution for product management and discovery. Find amazing products and manage your inventory with ease.
            </p>
            <div className="flex space-x-4 text-xl">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-emerald-400 transition-colors">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-emerald-400 transition-colors">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-emerald-400 transition-colors">
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Middle Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-zinc-300 hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link href="/products" className="text-zinc-300 hover:text-emerald-400 transition-colors">Products</Link></li>
              <li><button onClick={() => openModal('About')} className="text-zinc-300 hover:text-emerald-400 transition-colors">About</button></li>
              <li><button onClick={() => openModal('Contact')} className="text-zinc-300 hover:text-emerald-400 transition-colors">Contact</button></li>
            </ul>
          </div>

          {/* Right Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><button onClick={() => openModal('Help')} className="text-zinc-300 hover:text-emerald-400 transition-colors">Help Center</button></li>
              <li><button onClick={() => openModal('Terms')} className="text-zinc-300 hover:text-emerald-400 transition-colors">Terms of Service</button></li>
              <li><button onClick={() => openModal('Privacy')} className="text-zinc-300 hover:text-emerald-400 transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => openModal('FAQ')} className="text-zinc-300 hover:text-emerald-400 transition-colors">FAQ</button></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-700 text-center">
          <p className="text-zinc-300">© {new Date().getFullYear()} ProductHub. All rights reserved.</p>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
          <div className="bg-white text-black rounded-lg max-w-lg w-full p-6 relative">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
            <h2 className="text-2xl font-bold mb-4">{modalContent}</h2>
            <p className="text-gray-700">
              {modalContent === 'About' && 'This is a demo About text for ProductHub. Here you can write something about your company.'}
              {modalContent === 'Contact' && 'You can contact us at contact@example.com or call 123-456-7890.'}
              {modalContent === 'Help' && 'Here you can provide help and support information.'}
              {modalContent === 'Terms' && 'These are the demo terms of service for your website.'}
              {modalContent === 'Privacy' && 'This is the demo privacy policy text.'}
              {modalContent === 'FAQ' && 'Frequently Asked Questions can go here as demo content.'}
            </p>
          </div>
        </div>
      )}
    </footer>
  );
}

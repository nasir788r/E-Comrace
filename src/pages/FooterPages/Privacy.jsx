import React from 'react';
import { ChevronRight, Lock, Eye, Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="bg-white min-h-screen pb-20">
      <section className="pt-12 md:pt-20 pb-16 bg-gray-50 rounded-b-[40px] md:rounded-b-[80px]">
        <div className="container mx-auto px-4 md:px-10">
          <nav className="flex items-center gap-2 text-gray-400 text-xs mb-6">
            <Link to="/" className="hover:text-black">Home</Link>
            <ChevronRight size={14} />
            <span className="text-black font-medium">Privacy Policy</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6">Your Privacy Matters</h1>
            <p className="text-gray-600 text-lg">We value the trust you place in SHOP.CO. This policy outlines how we collect, use, and protect your personal information.</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border rounded-[32px] hover:shadow-lg transition-shadow">
              <div className="bg-black text-white w-12 h-12 rounded-xl flex items-center justify-center mb-6"><Eye size={20}/></div>
              <h3 className="font-bold text-xl mb-4">Data Collection</h3>
              <p className="text-gray-500 text-sm leading-relaxed">We collect names, emails, and addresses to process orders and improve your shopping experience.</p>
            </div>

            <div className="p-8 border rounded-[32px] hover:shadow-lg transition-shadow">
              <div className="bg-black text-white w-12 h-12 rounded-xl flex items-center justify-center mb-6"><Lock size={20}/></div>
              <h3 className="font-bold text-xl mb-4">Secure Payments</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Your payment data is encrypted and handled by certified third-party providers (Stripe/PayPal).</p>
            </div>

            <div className="p-8 border rounded-[32px] hover:shadow-lg transition-shadow">
              <div className="bg-black text-white w-12 h-12 rounded-xl flex items-center justify-center mb-6"><Cookie size={20}/></div>
              <h3 className="font-bold text-xl mb-4">Cookies</h3>
              <p className="text-gray-500 text-sm leading-relaxed">We use cookies to remember your cart items and analyze site traffic to serve you better.</p>
            </div>
          </div>

          <div className="mt-20 max-w-4xl border-t pt-10">
            <h2 className="text-2xl font-bold mb-6 italic">GDPR & Compliance</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Residents of the EEA have certain rights under the General Data Protection Regulation (GDPR), including the right to access, correct, or delete personal data. To exercise these rights, please contact us at privacy@shop.co.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
import React, { useState } from 'react';
import { 
  ChevronRight, CreditCard, Plus, Trash2, 
  ShieldCheck, Lock, ExternalLink, Info 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SAVED_CARDS = [
  {
    id: 1,
    type: "Visa",
    last4: "4242",
    expiry: "12/25",
    isDefault: true,
    bank: "Chase Bank"
  },
  {
    id: 2,
    type: "Mastercard",
    last4: "8812",
    expiry: "09/24",
    isDefault: false,
    bank: "Digital Bank"
  }
];

const Payments = () => {
  return (
    <div className="bg-[#F2F0F1] min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-10">
        
        {/* Header Section */}
        <div className="mb-10">
          <nav className="flex items-center gap-2 text-gray-400 text-xs mb-4">
            <Link to="/account" className="hover:text-black">Account</Link>
            <ChevronRight size={14} />
            <span className="text-black font-medium">Payment Methods</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tighter">
            Billing & Payments
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Saved Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold">Your Saved Cards</h3>
                <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-800 transition-all">
                  <Plus size={16} /> Add New Card
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SAVED_CARDS.map((card) => (
                  <div key={card.id} className={`p-6 rounded-[24px] border-2 transition-all relative ${card.isDefault ? 'border-black' : 'border-gray-100'}`}>
                    {card.isDefault && (
                      <span className="absolute top-4 right-4 bg-black text-white text-[10px] px-2 py-1 rounded-full uppercase font-bold tracking-widest">
                        Default
                      </span>
                    )}
                    <CreditCard className="mb-6 text-gray-400" size={32} />
                    <div className="space-y-1 mb-6">
                      <p className="text-lg font-bold tracking-widest">•••• •••• •••• {card.last4}</p>
                      <p className="text-xs text-gray-400 uppercase font-bold">{card.bank}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Expires</p>
                        <p className="text-sm font-bold">{card.expiry}</p>
                      </div>
                      <button className="text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Billing Address Summary */}
            <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Default Billing Address</h3>
              <div className="flex justify-between items-start bg-gray-50 p-6 rounded-2xl">
                <div>
                  <p className="font-bold">John Doe</p>
                  <p className="text-sm text-gray-500 mt-1">123 Fashion Ave, Suite 45<br />New York, NY 10001<br />United States</p>
                </div>
                <button className="text-sm font-bold underline">Change</button>
              </div>
            </div>
          </div>

          {/* Right: Security Sidebar */}
          <div className="space-y-6">
            <div className="bg-black text-white rounded-[32px] p-8">
              <div className="flex items-center gap-3 mb-6 text-yellow-400">
                <ShieldCheck size={28} />
                <h4 className="font-bold text-lg uppercase tracking-tight">Secure Payments</h4>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Your payment information is processed securely. We do not store your full credit card details on our servers.
              </p>
              <div className="space-y-3 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3 text-xs text-gray-300">
                  <Lock size={14} /> PCI DSS Compliant
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-300">
                  <Lock size={14} /> 256-bit SSL Encryption
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-8 shadow-sm">
                <h4 className="font-bold flex items-center gap-2 mb-4">
                    <Info size={18} className="text-gray-400" /> Need Help?
                </h4>
                <p className="text-xs text-gray-500 mb-4">Having trouble with a payment or need to request a refund?</p>
                <Link to="/support" className="text-sm font-bold flex items-center justify-between group">
                    Visit Support Center 
                    <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Payments;
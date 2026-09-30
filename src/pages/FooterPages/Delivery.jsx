import React from 'react';
import { 
  ChevronRight, Truck, Globe, MapPin, 
  Clock, Package, ShieldCheck, Info 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SHIPPING_METHODS = [
  {
    type: "Standard Delivery",
    time: "3-5 Business Days",
    price: "Free",
    desc: "Available for all orders over $50."
  },
  {
    type: "Express Shipping",
    time: "1-2 Business Days",
    price: "$15.00",
    desc: "Order before 2 PM for same-day dispatch."
  },
  {
    type: "International",
    time: "7-14 Business Days",
    price: "$25.00",
    desc: "Includes tracking and customs insurance."
  }
];

const Delivery = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Header */}
      <section className="pt-12 md:pt-20 pb-10 border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-10">
          <nav className="flex items-center gap-2 text-gray-400 text-xs md:text-sm mb-6">
            <Link to="/" className="hover:text-black">Home</Link>
            <ChevronRight size={14} />
            <span className="text-black font-medium">Delivery Details</span>
          </nav>
          <h1 className="font-display text-4xl md:text-7xl font-bold uppercase tracking-tighter">
            Fast. Reliable. <br /> To Your Door.
          </h1>
        </div>
      </section>

      {/* 2. Visual Delivery Timeline */}
      <section className="py-16 bg-[#F2F0F1]">
        <div className="container mx-auto px-4 md:px-10">
          <h2 className="text-center font-display text-2xl md:text-4xl font-bold uppercase mb-12">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Package />, title: "Order Placed", desc: "We receive and verify your style choices." },
              { icon: <Clock />, title: "Processing", desc: "Quality check and careful packaging (12-24h)." },
              { icon: <Truck />, title: "On its Way", desc: "Handed to our premium courier partners." },
              { icon: <MapPin />, title: "Delivered", desc: "Safely arrived at your preferred destination." }
            ].map((step, i) => (
              <div key={i} className="relative text-center flex flex-col items-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg mb-4 z-10">
                  {step.icon}
                </div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm px-4">{step.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full border-t-2 border-dashed border-gray-300 -z-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Shipping Options Table */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <h2 className="font-display text-3xl md:text-5xl font-bold uppercase mb-6">Shipping Methods</h2>
              <p className="text-gray-500 mb-8">We partner with global couriers like DHL, FedEx, and UPS to ensure your fashion arrives in pristine condition.</p>
              
              <div className="space-y-4">
                {SHIPPING_METHODS.map((method, i) => (
                  <div key={i} className="p-6 border rounded-[24px] flex justify-between items-center hover:bg-black hover:text-white transition-all group">
                    <div>
                      <h4 className="font-bold text-lg">{method.type}</h4>
                      <p className="text-sm text-gray-500 group-hover:text-gray-400">{method.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl">{method.price}</p>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400">{method.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Tracking Sidebar */}
            <div className="lg:w-1/3 bg-black text-white p-8 md:p-10 rounded-[40px] shadow-2xl">
              <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Globe className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 italic">International Tracking</h3>
              <p className="text-gray-400 text-sm mb-8">Want to know exactly where your order is? Enter your 12-digit tracking number below.</p>
              
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Order Number (e.g. #123456)" 
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-white transition-colors"
                />
                <button className="w-full bg-white text-black py-4 rounded-2xl font-bold hover:bg-gray-200 transition-colors uppercase text-sm">
                  Track My Order
                </button>
              </div>

              <div className="mt-8 flex items-start gap-3 bg-white/5 p-4 rounded-2xl">
                <ShieldCheck className="text-green-400 shrink-0" size={18} />
                <p className="text-[10px] text-gray-300">All shipments are carbon-offset and insured against loss or damage.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Fine Print */}
      <section className="pb-20">
        <div className="container mx-auto px-4 md:px-10">
          <div className="bg-gray-50 rounded-[30px] p-8 md:p-12">
            <div className="flex items-center gap-2 mb-6">
              <Info className="text-gray-400" size={20} />
              <h3 className="font-bold uppercase tracking-widest text-sm">Important Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-600 leading-relaxed">
              <p>Please note that delivery times are estimates and start from the date of dispatch, rather than the date of order. We aim to ship all orders within 24 hours.</p>
              <p>Customs duties and taxes are not included in the item price or shipping cost for international orders. These charges are the buyer's responsibility.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Delivery;
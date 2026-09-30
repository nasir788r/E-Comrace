import React, { useState } from 'react';
import { 
  Package, Truck, CheckCircle2, MapPin, 
  Calendar, AlertCircle, ChevronRight, RefreshCw 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ACTIVE_SHIPMENTS = [
  {
    id: "SCO-92841",
    status: "In Transit",
    step: 3,
    estimatedDate: "Oct 28, 2023",
    items: 3,
    destination: "123 Fashion Ave, New York, NY"
  }
];

const ManageDeliveries = () => {
  return (
    <div className="bg-[#F2F0F1] min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-10">
        
        {/* Header */}
        <div className="mb-10">
          <nav className="flex items-center gap-2 text-gray-400 text-xs mb-4">
            <Link to="/account" className="hover:text-black">Account</Link>
            <ChevronRight size={14} />
            <span className="text-black font-medium">Manage Deliveries</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tighter">
            Track & Manage
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Tracking View */}
          <div className="lg:col-span-2 space-y-6">
            {ACTIVE_SHIPMENTS.map((shipment) => (
              <div key={shipment.id} className="bg-white rounded-[32px] p-6 md:p-10 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order ID</p>
                    <h2 className="text-xl font-bold">{shipment.id}</h2>
                  </div>
                  <div className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
                    <RefreshCw size={14} className="animate-spin-slow" /> {shipment.status}
                  </div>
                </div>

                {/* Progress Stepper */}
                <div className="relative mb-12">
                  <div className="flex justify-between items-center w-full">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className="relative z-10">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-colors ${
                          step <= shipment.step 
                          ? 'bg-black border-black text-white' 
                          : 'bg-white border-gray-100 text-gray-300'
                        }`}>
                          {step < shipment.step ? <CheckCircle2 size={20} /> : step}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Progress Line Background */}
                  <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 -z-0"></div>
                  {/* Active Progress Line */}
                  <div 
                    className="absolute top-5 left-0 h-1 bg-black transition-all duration-1000 -z-0"
                    style={{ width: `${(shipment.step - 1) * 33.33}%` }}
                  ></div>
                  
                  <div className="flex justify-between mt-4 text-[10px] md:text-xs font-bold uppercase text-gray-400">
                    <span>Confirmed</span>
                    <span>Processing</span>
                    <span className="text-black">Shipped</span>
                    <span>Delivered</span>
                  </div>
                </div>

                {/* Shipment Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl">
                  <div className="flex gap-4">
                    <Calendar className="text-gray-400" />
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Estimated Arrival</p>
                      <p className="font-bold">{shipment.estimatedDate}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <MapPin className="text-gray-400" />
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Shipping To</p>
                      <p className="font-bold text-sm">{shipment.destination}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-[32px] p-8 shadow-sm">
              <h3 className="font-bold text-lg mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-4 rounded-2xl border hover:bg-black hover:text-white transition-all flex items-center justify-between group">
                  <span className="text-sm font-bold">Change Address</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full text-left p-4 rounded-2xl border hover:bg-black hover:text-white transition-all flex items-center justify-between group">
                  <span className="text-sm font-bold">Reschedule Delivery</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full text-left p-4 rounded-2xl border border-red-100 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-between group">
                  <span className="text-sm font-bold">Report Issue</span>
                  <AlertCircle size={18} />
                </button>
              </div>
            </div>

            <div className="bg-black text-white rounded-[32px] p-8">
              <Package className="mb-4 text-yellow-400" />
              <h4 className="font-bold mb-2">Delivery Guard</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Your package is covered by SHOP.CO Protection. If it's lost or damaged, we'll replace it for free.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ManageDeliveries;
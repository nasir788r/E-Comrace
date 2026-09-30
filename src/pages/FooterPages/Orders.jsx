import React from 'react';
import { ChevronRight, Package, ExternalLink, RefreshCw, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const ORDER_HISTORY = [
  {
    id: "SCO-92841",
    date: "Oct 22, 2023",
    status: "Delivered",
    total: 245.00,
    items: [
      { name: "Gradient Graphic T-shirt", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200" },
      { name: "Polo with Tipping Details", img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=200" }
    ]
  },
  {
    id: "SCO-81722",
    date: "Sep 15, 2023",
    status: "Cancelled",
    total: 89.00,
    items: [
      { name: "Black Striped T-shirt", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=200" }
    ]
  },
  {
    id: "SCO-76543",
    date: "Aug 02, 2023",
    status: "Delivered",
    total: 156.00,
    items: [
      { name: "Skinny Fit Jeans", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200" }
    ]
  }
];

const Orders = () => {
  return (
    <div className="bg-[#F2F0F1] min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-10">
        
        {/* Header & Filter Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <nav className="flex items-center gap-2 text-gray-400 text-xs mb-4">
              <Link to="/account" className="hover:text-black">Account</Link>
              <ChevronRight size={14} />
              <span className="text-black font-medium">My Orders</span>
            </nav>
            <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tighter">
              Order History
            </h1>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search all orders..." 
              className="pl-12 pr-6 py-3 bg-white rounded-full border-none shadow-sm focus:ring-2 ring-black outline-none text-sm w-full md:w-80"
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {ORDER_HISTORY.map((order) => (
            <div key={order.id} className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 hover:border-black transition-colors">
              {/* Order Meta Header */}
              <div className="bg-gray-50/50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b">
                <div className="flex gap-8">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Order Placed</p>
                    <p className="text-sm font-bold">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Total Amount</p>
                    <p className="text-sm font-bold">${order.total.toFixed(2)}</p>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Order ID</p>
                    <p className="text-sm font-bold">#{order.id}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                    }`}>
                      {order.status}
                    </span>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-wrap gap-4 items-center flex-1">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded-xl bg-gray-100" 
                      />
                      <div className="md:hidden lg:block">
                        <p className="text-sm font-bold line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-400">Qty: 1</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button className="flex-1 md:flex-none px-6 py-3 bg-black text-white rounded-full text-xs font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                    <RefreshCw size={14} /> Buy it again
                  </button>
                  <button className="flex-1 md:flex-none px-6 py-3 border border-gray-200 rounded-full text-xs font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    View Details <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Mockup */}
        {ORDER_HISTORY.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[40px]">
            <Package className="mx-auto text-gray-200 mb-4" size={64} />
            <h2 className="text-2xl font-bold uppercase font-display">No orders yet</h2>
            <p className="text-gray-500 mt-2 mb-8">When you buy something, it will appear here.</p>
            <Link to="/shop" className="bg-black text-white px-10 py-4 rounded-full font-bold uppercase text-sm">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
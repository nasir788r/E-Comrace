// import React from 'react';
// import {
//   ChevronRight,
//   Search,
//   Truck,
//   RotateCcw,
//   CreditCard,
//   UserCircle,
//   MessageSquare,
//   Mail,
//   Phone
// } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const HELP_CATEGORIES = [
//   { icon: <Truck className="w-8 h-8" />, title: "Shipping & Delivery", desc: "Track orders and delivery times." },
//   { icon: <RotateCcw className="w-8 h-8" />, title: "Returns & Refunds", desc: "Start a return or check status." },
//   { icon: <CreditCard className="w-8 h-8" />, title: "Payments", desc: "Methods, invoices, and security." },
//   { icon: <UserCircle className="w-8 h-8" />, title: "Account", desc: "Manage profile and preferences." }
// ];

// const FAQS = [
//   { q: "How do I track my order?", a: "Once your order ships, you will receive an email with a tracking link. You can also track it in your Account dashboard." },
//   { q: "What is your return policy?", a: "We offer a 30-day return policy for all unworn items with original tags still attached." },
//   { q: "Do you ship internationally?", a: "Yes, SHOP.CO ships to over 50 countries worldwide. Shipping costs vary by location." }
// ];

// const Support = () => {
//   return (
//     <div className="bg-white min-h-screen">
//       {/* 1. Search Hero Section */}
//       <section className="bg-black text-white pt-16 pb-24 md:pt-24 md:pb-32 rounded-b-[40px] md:rounded-b-[80px]">
//         <div className="container mx-auto px-4 md:px-10 text-center">
//           <nav className="flex items-center justify-center gap-2 text-gray-400 text-xs md:text-sm mb-8">
//             <Link to="/" className="hover:text-white">Home</Link>
//             <ChevronRight size={14} />
//             <span className="text-white font-medium">Support</span>
//           </nav>

//           <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8">
//             How can we help?
//           </h1>

//           <div className="max-w-2xl mx-auto relative group">
//             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
//             <input
//               type="text"
//               placeholder="Search for articles, orders, or topics..."
//               className="w-full pl-14 pr-6 py-4 md:py-5 rounded-2xl text-black outline-none shadow-2xl text-sm md:text-base"
//             />
//           </div>
//         </div>
//       </section>

//       {/* 2. Topic Grid */}
//       <section className="py-16 md:py-24">
//         <div className="container mx-auto px-4 md:px-10">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {HELP_CATEGORIES.map((cat, i) => (
//               <div key={i} className="p-8 border border-gray-100 rounded-[30px] hover:border-black hover:shadow-xl transition-all cursor-pointer group">
//                 <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors">
//                   {cat.icon}
//                 </div>
//                 <h3 className="font-bold text-lg mb-2">{cat.title}</h3>
//                 <p className="text-gray-500 text-sm leading-relaxed">{cat.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 3. Popular FAQs */}
//       <section className="py-16 bg-[#F2F0F1] rounded-[40px] mx-4">
//         <div className="container mx-auto px-4 md:px-10 max-w-4xl">
//           <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center mb-12 tracking-tight">
//             Popular Questions
//           </h2>
//           <div className="space-y-4">
//             {FAQS.map((faq, i) => (
//               <details key={i} className="group bg-white rounded-2xl p-6 border border-gray-100 cursor-pointer">
//                 <summary className="flex items-center justify-between font-bold list-none">
//                   {faq.q}
//                   <span className="transition-transform group-open:rotate-180">
//                     <ChevronRight size={18} />
//                   </span>
//                 </summary>
//                 <p className="mt-4 text-gray-500 text-sm leading-relaxed border-t pt-4">
//                   {faq.a}
//                 </p>
//               </details>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 4. Direct Contact Options */}
//       <section className="py-20 md:py-32 text-center">
//         <div className="container mx-auto px-4">
//           <h2 className="font-display text-3xl md:text-5xl font-bold uppercase mb-4">Still need help?</h2>
//           <p className="text-gray-500 mb-12">Our support team is available 24/7 to assist you.</p>

//           <div className="flex flex-col md:flex-row justify-center items-center gap-6">
//             <div className="flex items-center gap-4 bg-white border p-6 rounded-2xl w-full md:w-auto">
//               <div className="bg-black text-white p-3 rounded-full"><MessageSquare size={20} /></div>
//               <div className="text-left">
//                 <p className="text-xs font-bold text-gray-400 uppercase">Live Chat</p>
//                 <p className="font-bold">Chat with us now</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4 bg-white border p-6 rounded-2xl w-full md:w-auto">
//               <div className="bg-black text-white p-3 rounded-full"><Mail size={20} /></div>
//               <div className="text-left">
//                 <p className="text-xs font-bold text-gray-400 uppercase">Email Us</p>
//                 <p className="font-bold">support@shop.co</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4 bg-white border p-6 rounded-2xl w-full md:w-auto">
//               <div className="bg-black text-white p-3 rounded-full"><Phone size={20} /></div>
//               <div className="text-left">
//                 <p className="text-xs font-bold text-gray-400 uppercase">Call Us</p>
//                 <p className="font-bold">+1 (555) 000-SHOP</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Support;

import React, { useState, useMemo } from "react";
import {
  ChevronRight,
  Search,
  Truck,
  RotateCcw,
  CreditCard,
  UserCircle,
  MessageSquare,
  Mail,
  Phone,
  X,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";

const HELP_CATEGORIES = [
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Shipping",
    desc: "Track orders and delivery.",
  },
  {
    icon: <RotateCcw className="w-8 h-8" />,
    title: "Returns",
    desc: "Start a return or refund.",
  },
  {
    icon: <CreditCard className="w-8 h-8" />,
    title: "Payments",
    desc: "Invoices and security.",
  },
  {
    icon: <UserCircle className="w-8 h-8" />,
    title: "Account",
    desc: "Manage your profile.",
  },
];

const FAQS = [
  {
    q: "How do I track my order?",
    a: "Once your order ships, you will receive an email with a tracking link. You can also track it in your Account dashboard.",
  },
  {
    q: "What is your return policy?",
    a: "We offer a 30-day return policy for all unworn items with original tags still attached.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, SHOP.CO ships to over 50 countries worldwide. Shipping costs vary by location.",
  },
  {
    q: "How can I change my shipping address?",
    a: "You can change your address within 2 hours of placing an order via the 'Orders' section in your account.",
  },
];

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Logic to filter FAQs based on search input
  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) =>
      faq.q.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Search Hero Section */}
      <section className="bg-black text-white pt-16 pb-24 md:pt-24 md:pb-32 rounded-b-[40px] md:rounded-b-[80px] transition-all">
        <div className="container mx-auto px-4 md:px-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-gray-400 text-xs md:text-sm mb-8">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-white font-medium">Support</span>
          </nav>

          <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            How can we help?
          </h1>

          <div className="max-w-2xl mx-auto relative group">
            <Search
              className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                searchQuery ? "text-black" : "text-gray-400"
              } group-focus-within:text-black`}
              size={20}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for questions..."
              className="w-full pl-14 pr-12 py-4 md:py-5 rounded-2xl bg-[#111] text-white caret-white placeholder-gray-400 outline-none shadow-2xl text-sm md:text-base focus:ring-4 ring-white/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 p-1 rounded-full text-black transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. Topic Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {HELP_CATEGORIES.map((cat, i) => (
              <div
                key={i}
                className="p-6 md:p-8 border border-gray-100 rounded-[30px] hover:border-black hover:shadow-xl transition-all cursor-pointer group active:scale-95"
              >
                <div className="bg-gray-50 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-black group-hover:text-white transition-colors">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2">
                  {cat.title}
                </h3>
                <p className="text-gray-500 text-[10px] md:text-sm leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Dynamic FAQs */}
      <section className="py-16 bg-[#F2F0F1] rounded-[40px] mx-4 overflow-hidden">
        <div className="container mx-auto px-4 md:px-10 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight">
              {searchQuery
                ? `Results for "${searchQuery}"`
                : "Popular Questions"}
            </h2>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-sm underline mt-2 text-gray-500"
              >
                Show all
              </button>
            )}
          </div>

          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-2xl p-6 border border-gray-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                >
                  <summary className="flex items-center justify-between font-bold list-none text-sm md:text-base">
                    {faq.q}
                    <span className="transition-transform duration-300 group-open:rotate-180 text-gray-400">
                      <ChevronRight size={18} />
                    </span>
                  </summary>
                  <p className="mt-4 text-gray-500 text-xs md:text-sm leading-relaxed border-t pt-4">
                    {faq.a}
                  </p>
                </details>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No matching questions found.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Combined Contact Section & Form */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-tight">
                Still need help? <br /> Reach out to us.
              </h2>
              <p className="text-gray-500 max-w-md">
                Our specialized support team is ready to assist you with any
                inquiries regarding your orders or our services.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className="bg-black text-white p-3 rounded-xl">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400">LIVE CHAT</p>
                    <p className="font-bold">Available 24/7</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 border rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className="bg-black text-white p-3 rounded-xl">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400">EMAIL</p>
                    <p className="font-bold">support@shop.co</p>
                  </div>
                </div>
              </div>
            </div>

            <form
              className="bg-white border p-8 rounded-[32px] shadow-sm space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-400">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-gray-50 p-3 rounded-xl outline-none border focus:border-black transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-400">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-gray-50 p-3 rounded-xl outline-none border focus:border-black transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-400">
                  Subject
                </label>
                <select className="w-full bg-gray-50 p-3 rounded-xl outline-none border focus:border-black transition-colors">
                  <option>Order Tracking</option>
                  <option>Return Request</option>
                  <option>Product Inquiry</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-400">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="How can we help?"
                  className="w-full bg-gray-50 p-3 rounded-xl outline-none border focus:border-black transition-colors resize-none"
                ></textarea>
              </div>
              <button className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-900 transition-all active:scale-95">
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;

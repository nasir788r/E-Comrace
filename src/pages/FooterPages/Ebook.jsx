import React, { useState } from 'react';
import { ChevronRight, Download, BookOpen, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Ebook = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email) setIsSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Split Hero Section */}
      <section className="relative pt-12 md:pt-20 overflow-hidden">
        <div className="container mx-auto px-4 md:px-10">
          <nav className="flex items-center gap-2 text-gray-400 text-xs mb-8">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-black font-medium">Free Resources</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Text Content */}
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                Exclusive Release
              </span>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-[0.9]">
                The Art of <br /> Essential <br /> Style.
              </h1>
              <p className="text-gray-500 text-lg md:text-xl max-w-xl">
                Download our 50-page digital guide on building a timeless capsule wardrobe that lasts a lifetime.
              </p>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto lg:mx-0">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    className="flex-1 px-6 py-4 bg-gray-100 rounded-full outline-none focus:ring-2 ring-black transition-all"
                  />
                  <button className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase text-sm hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                    Get Free Copy <Download size={18} />
                  </button>
                </form>
              ) : (
                <div className="bg-green-50 border border-green-100 p-6 rounded-[24px] flex items-center gap-4 animate-in zoom-in-95 duration-300">
                  <div className="bg-green-500 text-white p-2 rounded-full"><CheckCircle size={24}/></div>
                  <div className="text-left">
                    <p className="font-bold text-green-900">Check your inbox!</p>
                    <p className="text-green-700 text-sm">We've sent the download link to {email}.</p>
                  </div>
                </div>
              )}
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                * Join 50,000+ stylish readers worldwide.
              </p>
            </div>

            {/* Visual Book Mockup */}
            <div className="flex-1 relative">
              <div className="relative z-10 bg-black aspect-[3/4] w-full max-w-md mx-auto rounded-r-[40px] rounded-l-[10px] shadow-2xl flex flex-col justify-end p-10 overflow-hidden group">
                {/* Book Cover Design */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800')] bg-cover grayscale"></div>
                <div className="relative z-20">
                    <h2 className="font-display text-4xl text-white font-bold uppercase leading-none mb-4">Minimalist <br /> Manifesto</h2>
                    <div className="h-1 w-20 bg-yellow-400 mb-6"></div>
                    <p className="text-gray-400 text-xs font-bold tracking-widest uppercase">Volume 01 // 2026 Edition</p>
                </div>
                {/* Spine shadow effect */}
                <div className="absolute top-0 left-0 w-4 h-full bg-gradient-to-r from-black/50 to-transparent"></div>
              </div>
              {/* Decorative Background Circles */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-gray-100 rounded-full -z-10 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What's Inside Section */}
      <section className="py-20 mt-20 bg-black text-white rounded-t-[40px] md:rounded-t-[80px]">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="space-y-4">
              <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto md:mx-0">
                <BookOpen className="text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight">The Capsule Concept</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Learn how to create 30+ outfits using only 12 essential pieces from our signature collection.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto md:mx-0">
                <Star className="text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight">Celebrity Stylist Tips</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Pro-secrets on fabric care, layering techniques, and matching colors for every season.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto md:mx-0">
                <CheckCircle className="text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight">Seasonal Checklists</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Interactive checklists to help you audit your closet and identify what's truly missing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CTA Footer */}
      <section className="py-20 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase mb-8">Ready to upgrade your look?</h2>
          <Link to="/shop" className="group inline-flex items-center gap-3 font-bold uppercase tracking-widest text-sm border-b-2 border-black pb-2 hover:gap-5 transition-all">
            Shop the Collection <ArrowRight size={20} />
          </Link>
      </section>
    </div>
  );
};

export default Ebook;
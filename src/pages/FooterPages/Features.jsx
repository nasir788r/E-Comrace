import React from 'react';
import { ChevronRight, Sparkles, Wind, Droplets, Recycle, Smartphone, Zap, ShieldCheck, Shirt } from 'lucide-react';

const FEATURE_LIST = [
  {
    icon: <Wind className="w-6 h-6" />,
    title: "Breathable Fabrics",
    description: "Advanced weave technology that allows maximum airflow, keeping you cool in any climate."
  },
  {
    icon: <Droplets className="w-6 h-6" />,
    title: "Moisture Wicking",
    description: "Stay dry with fabrics designed to pull sweat away from the body to the exterior of the garment."
  },
  {
    icon: <Recycle className="w-6 h-6" />,
    title: "Sustainable Sourcing",
    description: "100% organic cotton and recycled polyester. Style that respects the planet."
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Anti-Wrinkle Tech",
    description: "Look sharp all day. Our premium blends are engineered to resist creasing and maintain shape."
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Smart Sizing",
    description: "AI-driven size recommendations to ensure the perfect fit, every single time you order."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Durable Stitched",
    description: "Reinforced seams and high-tension threads mean your favorite pieces last for years."
  }
];

const Features = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Header Section */}
      <section className="pt-12 md:pt-20 pb-10">
        <div className="container mx-auto px-4 md:px-10">
          <nav className="flex items-center gap-2 text-gray-400 text-xs md:text-sm mb-6">
            <span className="hover:text-black cursor-pointer">Home</span>
            <ChevronRight size={14} />
            <span className="text-black font-medium">Features</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-10">
            <div className="max-w-2xl">
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-none">
                Beyond <br /> Just Fashion.
              </h1>
              <p className="text-gray-500 mt-6 text-sm md:text-lg">
                Explore the innovation and craftsmanship built into every SHOP.CO garment. We blend high-street aesthetics with high-performance technology.
              </p>
            </div>
            <div className="hidden lg:block bg-black text-white p-6 rounded-2xl rotate-3">
               <Zap className="fill-yellow-400 text-yellow-400 mb-2" />
               <p className="font-bold uppercase text-xs tracking-widest">Next-Gen Wear</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Features Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {FEATURE_LIST.map((feature, index) => (
              <div key={index} className="group p-8 rounded-[32px] border border-gray-100 hover:bg-black hover:text-white transition-all duration-500">
                <div className="w-14 h-14 bg-gray-100 group-hover:bg-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <div className="group-hover:text-white text-black italic">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold uppercase mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-500 group-hover:text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. "The Core" Visual Section */}
      <section className="py-20 bg-[#F2F0F1]">
        <div className="container mx-auto px-4 md:px-10">
          <div className="bg-white rounded-[40px] p-8 md:p-20 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <span className="bg-black text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                Our Standard
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold uppercase leading-tight">
                Crafted for <br /> the modern human.
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                We spent 18 months developing our signature cotton-blend. It’s softer than silk, more durable than denim, and designed to move with your body’s natural contours.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-center gap-3 font-bold text-sm">
                  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  Ethically Manufactured
                </li>
                <li className="flex items-center gap-3 font-bold text-sm">
                   <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  Carbon-Neutral Shipping
                </li>
              </ul>
            </div>
            <div className="flex-1 relative">
               <img 
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800" 
                alt="Fabric detail" 
                className="rounded-[30px] w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
               />
               <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
                  <Shirt size={32} />
                  <p className="mt-2 font-bold text-xs uppercase tracking-tighter">Premium Grade</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
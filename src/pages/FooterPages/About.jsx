import React from 'react';
import { ChevronRight, Target, Users, ShieldCheck, Zap } from 'lucide-react';

const VALUES = [
  {
    icon: <Target className="w-8 h-8 text-black" />,
    title: "Our Mission",
    description: "To provide the world with high-quality, sustainable fashion that doesn't break the bank."
  },
  {
    icon: <Zap className="w-8 h-8 text-black" />,
    title: "Fast Fashion, Faster Delivery",
    description: "We believe in speed. From the runway to your doorstep in record time."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-black" />,
    title: "Quality Guaranteed",
    description: "Every stitch is inspected. Every fabric is tested. We don't compromise on quality."
  },
  {
    icon: <Users className="w-8 h-8 text-black" />,
    title: "Community Driven",
    description: "Built by a community of fashion enthusiasts who want to redefine style."
  }
];

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section */}
      <section className="bg-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-10">
          <nav className="flex items-center gap-2 text-gray-500 text-xs md:text-sm mb-6">
            <span>Home</span> <ChevronRight size={14} /> <span className="text-black font-medium">About Us</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-7xl font-bold uppercase leading-tight tracking-tighter">
              We are redefining <br /> the way you dress.
            </h1>
            <p className="text-gray-500 mt-6 text-base md:text-lg leading-relaxed">
              Founded in 2023, SHOP.CO was born out of a simple idea: that high-end fashion should be accessible to everyone. We scout the globe for the finest materials and the boldest designs.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Brand Story / Image Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <img 
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800" 
                alt="Our Studio" 
                className="rounded-[30px] w-full h-[400px] md:h-[600px] object-cover shadow-2xl"
              />
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="font-display text-3xl md:text-5xl font-bold uppercase">The SHOP.CO Story</h2>
              <p className="text-gray-500 leading-loose text-sm md:text-base">
                What started as a small studio in London has grown into a global community. We don't just sell clothes; we provide the tools for self-expression. Every collection we release is a reflection of our commitment to craftsmanship and modern aesthetics.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div>
                  <h3 className="font-bold text-3xl md:text-4xl">200+</h3>
                  <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">Global Brands</p>
                </div>
                <div>
                  <h3 className="font-bold text-3xl md:text-4xl">2M+</h3>
                  <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="bg-black text-white py-16 md:py-24 rounded-t-[40px] md:rounded-t-[80px]">
        <div className="container mx-auto px-4 md:px-10 text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase">What We Stand For</h2>
        </div>
        <div className="container mx-auto px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((value, index) => (
            <div key={index} className="bg-white/5 border border-white/10 p-8 rounded-[20px] hover:bg-white/10 transition-colors">
              <div className="bg-white p-3 rounded-xl w-fit mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Join the Team CTA */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase mb-6">Work With Us</h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-10">
            We're always looking for creative minds to join our mission. Explore our open positions and let's build the future of fashion together.
          </p>
          <button className="bg-black text-white px-12 py-4 rounded-full font-bold hover:scale-105 transition-transform uppercase tracking-widest text-sm">
            View Careers
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
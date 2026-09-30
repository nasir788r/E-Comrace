import React from 'react';
import { ChevronRight, ArrowUpRight, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PROJECTS = [
  {
    id: 1,
    title: "The Urban Nomad",
    year: "Winter 2024",
    category: "Streetwear",
    img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800",
    span: "md:col-span-2 md:row-span-2" // Large featured item
  },
  {
    id: 2,
    title: "Minimalist Soul",
    year: "Autumn 2024",
    category: "Essentials",
    img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800",
    span: "md:col-span-1 md:row-span-1"
  },
  {
    id: 3,
    title: "Neon Nights",
    year: "Summer 2024",
    category: "Activewear",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
    span: "md:col-span-1 md:row-span-2"
  },
  {
    id: 4,
    title: "Desert Bloom",
    year: "Spring 2024",
    category: "Linen Series",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800",
    span: "md:col-span-1 md:row-span-1"
  }
];

const Works = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Creative Hero Section */}
      <section className="pt-12 md:pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-10">
          <nav className="flex items-center gap-2 text-gray-400 text-xs md:text-sm mb-8">
            <Link to="/" className="hover:text-black">Home</Link>
            <ChevronRight size={14} />
            <span className="text-black font-medium">Our Works</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-display text-5xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter leading-none">
                Crafting <br /> Visual <br /> Stories.
              </h1>
            </div>
            <div className="lg:col-span-4 pb-4">
              <p className="text-gray-500 text-base md:text-lg leading-relaxed border-l-2 border-black pl-6">
                Our works represent the intersection of culture, art, and high-performance fashion. Every collection is a chapter in our ongoing journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Masonry Portfolio Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[400px]">
            {PROJECTS.map((project) => (
              <div 
                key={project.id} 
                className={`${project.span} group relative overflow-hidden rounded-[30px] bg-gray-100`}
              >
                {/* Image */}
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                
                {/* Overlay Details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-gray-300 font-bold">{project.category}</span>
                      <h3 className="text-2xl md:text-3xl font-display font-bold uppercase mt-1">{project.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{project.year}</p>
                    </div>
                    <button className="bg-white text-black p-4 rounded-full mb-2">
                       <ArrowUpRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Always visible label on mobile */}
                <div className="absolute top-4 right-4 md:hidden bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                  {project.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Behind the Scenes (Video/Interactive Section) */}
      <section className="bg-black py-20 md:py-32 rounded-[40px] md:rounded-[80px] mx-4 mb-10 overflow-hidden">
        <div className="container mx-auto px-4 md:px-10 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full mb-8">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
            <span className="text-[10px] uppercase font-bold tracking-widest">Process Film</span>
          </div>
          <h2 className="font-display text-4xl md:text-7xl font-bold uppercase mb-12 tracking-tighter">
            See How We <br /> Bring Style to Life.
          </h2>
          
          <div className="relative max-w-5xl mx-auto rounded-[40px] overflow-hidden group cursor-pointer">
             <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200" 
              className="w-full aspect-video object-cover opacity-60 group-hover:opacity-40 transition-opacity"
              alt="Studio Video"
             />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white text-black p-6 md:p-10 rounded-full group-hover:scale-110 transition-transform">
                   <PlayCircle size={48} className="md:w-16 md:h-16" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. Contact/CTA */}
      <section className="py-20 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold uppercase mb-6">Want to collaborate?</h2>
        <p className="text-gray-500 mb-10">We're always looking for photographers, designers, and stylists.</p>
        <button className="px-10 py-4 bg-black text-white rounded-full font-bold uppercase text-sm hover:scale-105 transition-transform">
          Contact the Studio
        </button>
      </section>
    </div>
  );
};

export default Works;
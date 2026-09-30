import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { FASHION_STYLES } from "../../data/fashionCatalog";

const BrowseByStyle = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[#E7E5E4]">
      <div className="container mx-auto px-4 md:px-8 lg:px-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#78716C] mb-2">
            <Sparkles size={13} className="text-[#C8A96B]" />
            <span>Curated Universes</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#111111] tracking-tight">
            Browse By Aesthetic & Occasion
          </h2>
          <p className="text-[#78716C] text-sm mt-3 font-normal">
            Whether preparing for high-profile galas or curating everyday quiet luxury, explore wardrobes tailored to specific disciplines.
          </p>
        </div>

        {/* Asymmetric Luxury Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[280px] md:auto-rows-[340px]">
          {FASHION_STYLES.map((style, idx) => {
            const colSpan = idx === 0 || idx === 3 ? "md:col-span-5" : "md:col-span-7";

            return (
              <div
                key={style.id}
                onClick={() => navigate(style.path)}
                className={`relative rounded-[28px] overflow-hidden group cursor-pointer shadow-xs hover:shadow-2xl transition-all duration-700 ${colSpan} bg-[#111111] border border-[#E7E5E4]`}
              >
                {/* Background Image with Hover Zoom */}
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-full object-cover object-center opacity-85 group-hover:opacity-75 group-hover:scale-105 transition-all duration-1000 ease-out"
                  loading="lazy"
                />

                {/* Dark Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 group-hover:from-black/90 transition-all duration-500" />

                {/* Top Badge: Item Count */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                    {style.itemCount}
                  </span>
                </div>

                {/* Arrow Top Right */}
                <div className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 group-hover:bg-[#C8A96B] text-white group-hover:text-[#111111] flex items-center justify-center transition-all duration-300 backdrop-blur-md">
                  <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

                {/* Content Overlay Bottom */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-white uppercase tracking-wide mb-1">
                    {style.name}
                  </h3>
                  <p className="text-neutral-300 text-xs md:text-sm line-clamp-1 font-normal opacity-90 group-hover:opacity-100 transition">
                    {style.description}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#C8A96B] opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span>Explore Universe</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrowseByStyle;

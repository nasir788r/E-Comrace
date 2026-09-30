import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Award, Feather, Globe2 } from "lucide-react";

const EditorialStory = () => {
  return (
    <section className="py-20 md:py-28 bg-[#111111] text-white overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-8 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Story / Editorial Double Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="aspect-[4/5] rounded-[32px] overflow-hidden bg-neutral-900 shadow-2xl relative border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80"
                  alt="Atelier Craftsmanship"
                  className="w-full h-full object-cover object-top hover:scale-104 transition-transform duration-1000"
                  loading="lazy"
                />
              </div>

              {/* Inset Overlaid Card */}
              <div className="hidden sm:block absolute -bottom-8 -right-8 w-64 bg-[#1C1917] p-5 rounded-2xl border border-white/15 shadow-2xl backdrop-blur-md">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A96B] block mb-1">
                  Atelier Dispatch
                </span>
                <p className="font-serif text-sm italic text-neutral-300">
                  "True luxury is not defined by excess, but by the quiet authority of flawless cut and uncompromising fabric."
                </p>
                <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#78716C]">
                  Valérie Moreau • Creative Director
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 text-[#C8A96B] px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase border border-white/15">
              <Sparkles size={13} />
              <span>The Atelier Manifesto</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
              An Obsession with <br />
              <span className="italic font-normal text-neutral-300">Material Honesty &</span> <br />
              Sculptural Precision.
            </h2>

            <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
              Founded on the belief that garments should outlive micro-trends, L'ÉTOILE works exclusively with heritage mills in Biella, Como, and Porto. We reject fast synthetic fibers in favor of breathable noble textiles that age with distinction.
            </p>

            {/* Feature Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#C8A96B]">
                  <Feather size={18} />
                </div>
                <h4 className="font-serif font-bold text-base uppercase">Pure Fibers</h4>
                <p className="text-xs text-neutral-400 leading-snug">
                  100% natural Mulberry silk, long-staple cotton, and organic cashmere.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#C8A96B]">
                  <Award size={18} />
                </div>
                <h4 className="font-serif font-bold text-base uppercase">Master Guilds</h4>
                <p className="text-xs text-neutral-400 leading-snug">
                  Every silhouette is hand-finished by master tailors in family-owned ateliers.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#C8A96B]">
                  <Globe2 size={18} />
                </div>
                <h4 className="font-serif font-bold text-base uppercase">Zero Waste</h4>
                <p className="text-xs text-neutral-400 leading-snug">
                  Limited production runs that respect planetary boundaries.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link to="/about">
                <button className="bg-white text-[#111111] hover:bg-[#C8A96B] hover:text-[#111111] transition-all px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-3 cursor-pointer group shadow-lg">
                  <span>Discover Our Provenance</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialStory;

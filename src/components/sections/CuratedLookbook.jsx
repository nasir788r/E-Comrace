import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, ShoppingBag, Eye } from "lucide-react";

const LOOKS = [
  {
    id: "look-1",
    title: "Look 01: The Parisian Silk Silhouette",
    tagline: "Eveningwear & Formal Receptions",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80",
    item: {
      id: "women-01",
      name: "Mulberry Silk Bias-Cut Slip Dress",
      price: "$285",
      category: "Ladies • Eveningwear",
      fabric: "22-Momme Como Silk",
    },
    hotspot: { x: "48%", y: "45%" },
  },
  {
    id: "look-2",
    title: "Look 02: Modern Sartorial Wool",
    tagline: "Autumn Business & Gallery Galas",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
    item: {
      id: "men-02",
      name: "Double-Breasted Wool Melange Blazer",
      price: "$345",
      category: "Men • Sartorial Tailoring",
      fabric: "Super 130s Virgin Wool",
    },
    hotspot: { x: "52%", y: "40%" },
  }
];

const CuratedLookbook = () => {
  const [activeLook, setActiveLook] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[#E7E5E4]">
      <div className="container mx-auto px-4 md:px-8 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#78716C] mb-2">
              <Sparkles size={13} className="text-[#C8A96B]" />
              <span>Interactive Campaign</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#111111] tracking-tight">
              Shop The Runway Look
            </h2>
            <p className="text-[#78716C] text-xs md:text-sm mt-1 max-w-lg">
              Hover over the editorial lookbook silhouettes to explore fabrics and instant garment curation.
            </p>
          </div>

          {/* Look Switchers */}
          <div className="flex items-center gap-2">
            {LOOKS.map((look, i) => (
              <button
                key={look.id}
                onClick={() => setActiveLook(i)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeLook === i
                    ? "bg-[#111111] text-[#FFFFFF] shadow-sm"
                    : "bg-[#FAFAF9] text-[#78716C] border border-[#E7E5E4] hover:text-[#111111]"
                }`}
              >
                Look 0{i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Look Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAFAF9] rounded-[36px] p-6 sm:p-10 border border-[#E7E5E4]">
          {/* Large Visual */}
          <div className="lg:col-span-7 relative rounded-[28px] overflow-hidden aspect-[4/5] bg-neutral-200 border border-[#E7E5E4] group">
            <img
              src={LOOKS[activeLook].image}
              alt={LOOKS[activeLook].title}
              key={LOOKS[activeLook].image}
              className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-103 animate-fadeIn"
            />

            {/* Interactive Pin */}
            <div
              className="absolute w-7 h-7 rounded-full bg-[#111111] text-[#FFFFFF] border-2 border-[#FFFFFF] flex items-center justify-center shadow-2xl cursor-pointer animate-bounce z-20"
              style={{
                top: LOOKS[activeLook].hotspot.y,
                left: LOOKS[activeLook].hotspot.x,
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#C8A96B]" />
            </div>

            {/* Floating Tag */}
            <div className="absolute bottom-6 left-6 right-6 bg-[#FFFFFF]/95 backdrop-blur-md p-4 rounded-2xl border border-[#E7E5E4] shadow-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#78716C]">
                  {LOOKS[activeLook].item.category}
                </span>
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#171717]">
                  {LOOKS[activeLook].item.name}
                </h4>
              </div>
              <span className="font-bold text-base text-[#292524]">
                {LOOKS[activeLook].item.price}
              </span>
            </div>
          </div>

          {/* Narrative & Quick Buy Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C8A96B]">
                {LOOKS[activeLook].tagline}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-black uppercase text-[#111111]">
                {LOOKS[activeLook].title}
              </h3>
              <p className="text-[#78716C] text-sm leading-relaxed">
                Sculpted from noble natural textiles with meticulous French seams and mother-of-pearl closures. Every proportion is designed for relaxed movement without sacrificing structure.
              </p>
            </div>

            {/* Featured Garment Card */}
            <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E7E5E4] shadow-sm space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#78716C] font-medium">Textile Heritage</span>
                <span className="font-bold text-[#111111]">{LOOKS[activeLook].item.fabric}</span>
              </div>
              <div className="flex justify-between items-center text-xs pt-2 border-t border-[#E7E5E4]">
                <span className="text-[#78716C] font-medium">Availability</span>
                <span className="font-bold text-[#C8A96B]">In Stock • Ready to Dispatch</span>
              </div>
            </div>

            {/* Action */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link to={`/productpages/${LOOKS[activeLook].item.id}`} className="flex-1">
                <button className="w-full bg-[#111111] text-[#FFFFFF] hover:bg-[#C8A96B] hover:text-[#111111] py-4 rounded-full text-xs font-bold uppercase tracking-widest transition flex items-center justify-center gap-2 shadow-lg cursor-pointer">
                  <span>Shop Featured Silhouette</span>
                  <ArrowRight size={14} />
                </button>
              </Link>
              <Link to="/shop" className="sm:w-auto">
                <button className="w-full sm:w-auto bg-[#FFFFFF] border border-[#E7E5E4] hover:border-[#111111] text-[#111111] px-6 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition cursor-pointer">
                  <span>Full Catalog</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CuratedLookbook;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ShieldCheck, Flame, Compass } from "lucide-react";
import { BRAND_PARTNERS } from "../../data/fashionCatalog";

const HERO_CURATIONS = [
  {
    id: "all",
    label: "Runway Capsule",
    tagline: "Autumn / Winter '26 Couture",
    titlePrimary: "Architectural Tailoring.",
    titleSecondary: "Pure Form & Silk.",
    desc: "A timeless wardrobe sculpted from Super 130s Italian virgin wool, 22-momme Mulberry silk, and Mongolian cashmere. Proportions crafted to transcend seasons.",
    primaryImg: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
    secondaryImg: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    lookLabel: "Look 01 • Double-Breasted Melange",
    fabric: "Super 130s Merino • Biella, Italy",
    ctaLink: "/shop",
  },
  {
    id: "men",
    label: "Men's Sartorial",
    tagline: "Bespoke Gents Atelier",
    titlePrimary: "Impeccable Shirts &",
    titleSecondary: "Precision Blazers.",
    desc: "Crafted from Egyptian Giza long-staple cotton, Japanese selvedge denim, and structured Italian blazers for the modern gentleman.",
    primaryImg: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85",
    secondaryImg: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    lookLabel: "Look 02 • Tailored Wool Suit",
    fabric: "100% Giza Cotton & Selvedge Denim",
    ctaLink: "/shop/men",
  },
  {
    id: "ladies",
    label: "Ladies' Couture",
    tagline: "High Fashion & Eveningwear",
    titlePrimary: "Flowing Mulberry Silk &",
    titleSecondary: "Sculpted Hourglass.",
    desc: "Effortlessly fluid silks, hand-pleated gowns, and cashmere knits tailored to frame the silhouette with quiet luxury.",
    primaryImg: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85",
    secondaryImg: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    lookLabel: "Look 03 • Silk Crepe Evening Gown",
    fabric: "22-Momme Mulberry Silk • Como, Italy",
    ctaLink: "/shop/women",
  },
  {
    id: "kids",
    label: "Kids Atelier",
    tagline: "Boys & Girls Collection",
    titlePrimary: "Organic Cotton &",
    titleSecondary: "Playful Elegance.",
    desc: "Delicate broderie dresses for girls, organic striped shirts and denim jackets for boys. Pure natural textiles for gentle comfort.",
    primaryImg: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1200&q=85",
    secondaryImg: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80",
    lookLabel: "Look 04 • Broderie & Denim Duo",
    fabric: "100% GOTS Certified Organic Cotton",
    ctaLink: "/shop/kids",
  }
];

const Hero = () => {
  const [activeTab, setActiveTab] = useState("all");
  const current = HERO_CURATIONS.find((c) => c.id === activeTab) || HERO_CURATIONS[0];

  return (
    <section className="relative bg-[#FAFAF9] overflow-hidden border-b border-[#E7E5E4]">
      {/* Subtle background ambient luxury accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C8A96B]/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-neutral-200/40 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="container mx-auto px-4 md:px-8 lg:px-10 pt-6 pb-16 md:pt-10 md:pb-20 relative z-10">
        {/* Department Switcher Tabs on Top of Hero */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-8 sm:mb-12 no-scrollbar gap-2">
          {HERO_CURATIONS.map((curation) => (
            <button
              key={curation.id}
              onClick={() => setActiveTab(curation.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex-shrink-0 cursor-pointer ${
                activeTab === curation.id
                  ? "bg-[#111111] text-[#FFFFFF] shadow-md scale-102"
                  : "bg-[#FFFFFF] text-[#78716C] hover:text-[#111111] border border-[#E7E5E4] hover:border-[#111111]/40"
              }`}
            >
              {curation.label}
            </button>
          ))}
        </div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial Typography & Actions */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8 animate-fadeIn">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 bg-[#FFFFFF] border border-[#E7E5E4] text-[#111111] px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase shadow-xs">
              <Sparkles size={13} className="text-[#C8A96B]" />
              <span>{current.tagline}</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[66px] leading-[1.04] font-black uppercase text-[#111111] tracking-tight">
              {current.titlePrimary} <br />
              <span className="italic font-normal text-[#171717]">
                {current.titleSecondary}
              </span>
            </h1>

            {/* Description */}
            <p className="text-[#78716C] text-sm md:text-base leading-relaxed max-w-lg font-normal">
              {current.desc}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link to={current.ctaLink}>
                <button className="w-full sm:w-auto bg-[#111111] text-[#FFFFFF] hover:bg-[#C8A96B] hover:text-[#111111] px-9 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group cursor-pointer">
                  <span>Explore Collection</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <Link to="/new-arrivals">
                <button className="w-full sm:w-auto bg-[#FFFFFF] border border-[#E7E5E4] hover:border-[#111111] text-[#111111] px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-xs hover:shadow-md flex items-center justify-center gap-2 cursor-pointer">
                  <span>New Runway Drops</span>
                </button>
              </Link>
            </div>

            {/* Value Indicators / Heritage Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E7E5E4]">
              <div>
                <h4 className="font-serif text-2xl md:text-3xl font-bold text-[#111111]">
                  100%
                </h4>
                <p className="text-[#78716C] text-[11px] uppercase tracking-wider mt-0.5 font-medium">
                  Noble Natural Fibers
                </p>
              </div>
              <div>
                <h4 className="font-serif text-2xl md:text-3xl font-bold text-[#111111]">
                  Biella & Como
                </h4>
                <p className="text-[#78716C] text-[11px] uppercase tracking-wider mt-0.5 font-medium">
                  Heritage Guilds
                </p>
              </div>
              <div>
                <h4 className="font-serif text-2xl md:text-3xl font-bold text-[#111111]">
                  48h Express
                </h4>
                <p className="text-[#78716C] text-[11px] uppercase tracking-wider mt-0.5 font-medium">
                  Insured Delivery
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Editorial Double-Card Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Primary Large Runway Image */}
              <div className="aspect-[4/5] rounded-[32px] overflow-hidden bg-[#FFFFFF] shadow-2xl relative border border-[#E7E5E4] group">
                <img
                  src={current.primaryImg}
                  alt={current.lookLabel}
                  key={current.primaryImg}
                  className="w-full h-full object-cover object-top hover:scale-104 transition-all duration-1000 animate-fadeIn"
                />

                {/* Floating Top Tag: Look Identification */}
                <div className="absolute top-5 left-5 bg-[#FFFFFF]/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-[#E7E5E4] flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#C8A96B] animate-pulse" />
                  <div>
                    <span className="block text-[9px] font-bold uppercase tracking-widest text-[#78716C]">
                      Campaign Editorial
                    </span>
                    <span className="font-serif font-bold text-xs text-[#111111]">
                      {current.lookLabel}
                    </span>
                  </div>
                </div>

                {/* Floating Bottom Provenance Tag */}
                <div className="absolute bottom-5 left-5 bg-[#111111]/90 backdrop-blur-md text-[#FFFFFF] px-4 py-3 rounded-2xl shadow-xl border border-white/10 max-w-[240px]">
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck size={14} className="text-[#C8A96B]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A96B]">
                      Certified Material
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-200 leading-snug">
                    {current.fabric}
                  </p>
                </div>
              </div>

              {/* Overlapping Secondary Detail Card (Floating Bottom Right) */}
              <div className="hidden sm:block absolute -bottom-6 -right-6 w-44 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#FFFFFF] bg-[#FAFAF9] z-20 group hover:scale-105 transition-transform duration-500">
                <img
                  src={current.secondaryImg}
                  alt="Garment Craft Detail"
                  key={current.secondaryImg}
                  className="w-full h-full object-cover object-center animate-fadeIn"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFFFFF] truncate">
                    Detail View • 100% Pure
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Partner Stockists Marquee */}
      <div className="bg-[#FFFFFF] py-6 border-t border-b border-[#E7E5E4] overflow-hidden">
        <div className="container mx-auto px-4 mb-2 text-center">
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#78716C]">
            Selected Luxury Stockists & Collaborating Ateliers
          </span>
        </div>
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="flex gap-14 md:gap-24 animate-marquee font-serif text-xl md:text-2xl font-bold tracking-[0.2em] text-[#111111]/70 uppercase py-2">
            {[...BRAND_PARTNERS, ...BRAND_PARTNERS].map((brand, idx) => (
              <span
                key={idx}
                className="hover:text-[#C8A96B] transition-colors cursor-pointer flex items-center gap-14 md:gap-24"
              >
                <span>{brand.name}</span>
                <span className="text-[#C8A96B] text-sm font-sans font-normal">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

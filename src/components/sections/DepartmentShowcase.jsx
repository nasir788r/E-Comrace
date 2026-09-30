import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const DEPARTMENTS_DATA = [
  {
    id: "men",
    title: "Men's Collection",
    tagline: "Tailored Shirts, Selvedge Denim & Outerwear",
    itemCount: "50+ Silhouettes",
    path: "/shop/men",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
    badge: "Gents Atelier"
  },
  {
    id: "women",
    title: "Ladies' Collection",
    tagline: "Silk Gowns, Cashmere Knits & High Fashion",
    itemCount: "65+ Silhouettes",
    path: "/shop/women",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    badge: "Haute Couture"
  },
  {
    id: "boys",
    title: "Kids: Boys",
    tagline: "Organic Striped Tees, Denim & Everyday Sets",
    itemCount: "25+ Silhouettes",
    path: "/shop/boys",
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80",
    badge: "Boys 3-12Y"
  },
  {
    id: "girls",
    title: "Kids: Girls",
    tagline: "Broderie Anglaise Dresses & Plissé Skirts",
    itemCount: "28+ Silhouettes",
    path: "/shop/girls",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=80",
    badge: "Girls 3-12Y"
  }
];

const DepartmentShowcase = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[#E7E5E4]">
      <div className="container mx-auto px-4 md:px-8 lg:px-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#78716C] mb-2">
              <Sparkles size={13} className="text-[#C8A96B]" />
              <span>Wardrobe Departments</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#111111] tracking-tight">
              Shop By Category & Age
            </h2>
            <p className="text-[#78716C] text-xs md:text-sm mt-1 max-w-lg">
              Explore bespoke curation for Men, Ladies, and Children (Boys & Girls).
            </p>
          </div>

          <Link
            to="/shop"
            className="text-xs font-bold uppercase tracking-widest text-[#111111] hover:text-[#C8A96B] transition-colors flex items-center gap-1.5"
          >
            <span>View All Departments</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEPARTMENTS_DATA.map((dept) => (
            <Link
              key={dept.id}
              to={dept.path}
              className="group relative rounded-3xl overflow-hidden bg-[#111111] aspect-[3/4] flex flex-col justify-between p-6 shadow-xs hover:shadow-2xl border border-[#E7E5E4] transition-all duration-500"
            >
              {/* Image with subtle hover zoom */}
              <img
                src={dept.image}
                alt={dept.title}
                className="absolute inset-0 w-full h-full object-cover object-top opacity-85 group-hover:opacity-75 group-hover:scale-106 transition-all duration-700 ease-out"
                loading="lazy"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 group-hover:from-black/95 transition-all duration-500" />

              {/* Top Row: Badge & Item Count */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="bg-[#FFFFFF]/20 backdrop-blur-md text-[#FFFFFF] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                  {dept.badge}
                </span>
                <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">
                  {dept.itemCount}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 space-y-1.5">
                <h3 className="font-serif text-2xl font-bold uppercase text-[#FFFFFF] tracking-wide">
                  {dept.title}
                </h3>
                <p className="text-xs text-neutral-300 leading-snug line-clamp-1 font-normal opacity-90">
                  {dept.tagline}
                </p>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#C8A96B] group-hover:translate-x-1 transition-transform duration-300">
                  <span>Explore Department</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartmentShowcase;

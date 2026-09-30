import React, { useState } from "react";
import ProductCard from "../ProductCard";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const ProductSection = ({ title, subtitle, products = [] }) => {
  const [activeTab, setActiveTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);

  // Department Category Filter Tabs
  const tabs = [
    { id: "All", label: "All Curations" },
    { id: "Men", label: "Men" },
    { id: "Ladies", label: "Ladies" },
    { id: "Boys", label: "Kids: Boys" },
    { id: "Girls", label: "Kids: Girls" },
  ];

  const filteredProducts = activeTab === "All"
    ? products
    : products.filter((p) => {
        const target = activeTab.toLowerCase();
        const subCat = (p.subCategory || "").toLowerCase();
        const gender = (p.gender || "").toLowerCase();
        const cat = (p.category || "").toLowerCase();
        const itemTitle = (p.title || p.name || "").toLowerCase();

        if (target === "men") {
          const isGirlsOrWomen =
            gender === "women" ||
            subCat === "ladies" ||
            subCat === "girls" ||
            itemTitle.includes("women") ||
            itemTitle.includes("sharara") ||
            itemTitle.includes("anarkali");
          return !isGirlsOrWomen && (subCat === "men" || gender === "men" || itemTitle.includes("men"));
        }
        if (target === "ladies") {
          const isExplicitMen =
            subCat === "men" ||
            gender === "men" ||
            cat === "men" ||
            itemTitle.includes("men's") ||
            itemTitle.includes("mens") ||
            itemTitle.includes("dress shirt") ||
            itemTitle.includes("flannel shirt") ||
            itemTitle.includes("tracksuit");
          if (isExplicitMen) return false;

          return (
            subCat === "ladies" ||
            gender === "women" ||
            itemTitle.includes("women") ||
            itemTitle.includes("ladies") ||
            itemTitle.includes("kurti") ||
            itemTitle.includes("kurta") ||
            itemTitle.includes("anarkali") ||
            itemTitle.includes("sharara") ||
            (itemTitle.includes("dress") && !itemTitle.includes("shirt")) ||
            itemTitle.includes("skirt")
          );
        }
        if (target === "boys") {
          const isGirls = subCat === "girls" || itemTitle.includes("girl") || itemTitle.includes("skirt");
          return !isGirls && (subCat === "boys" || (gender === "kids" && (itemTitle.includes("boy") || !itemTitle.includes("girl"))));
        }
        if (target === "girls") {
          const isBoys = subCat === "boys" || itemTitle.includes("boy");
          return !isBoys && (subCat === "girls" || (gender === "kids" && itemTitle.includes("girl")));
        }
        return subCat === target || gender === target || cat === target;
      });

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <section className="py-16 md:py-24 border-b border-[#E7E5E4] bg-[#FAFAF9] last:border-0">
      <div className="container mx-auto px-4 md:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#78716C] mb-2">
              <Sparkles size={13} className="text-[#C8A96B]" />
              <span>{subtitle || "Curated Garment Edit"}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#111111] tracking-tight">
              {title}
            </h2>
          </div>

          {/* Department Tabs: Men, Ladies, Boys, Girls */}
          <div className="flex flex-wrap items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setVisibleCount(8);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#111111] text-[#FFFFFF] shadow-md"
                    : "bg-[#FFFFFF] text-[#78716C] hover:text-[#111111] border border-[#E7E5E4] hover:border-[#111111]/40"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-[#78716C] italic font-serif">
              No garments found in {activeTab}. Explore our full catalog.
            </div>
          )}
        </div>

        {/* Bottom CTA / View More */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          {filteredProducts.length > visibleCount && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="px-8 py-3.5 rounded-full border border-[#E7E5E4] bg-[#FFFFFF] hover:border-[#111111] text-[#111111] text-xs font-bold uppercase tracking-widest transition cursor-pointer shadow-xs hover:shadow-md"
            >
              Load More Pieces
            </button>
          )}

          <Link to={`/shop/${activeTab !== "All" ? activeTab.toLowerCase() : ""}`}>
            <button className="px-8 py-3.5 rounded-full bg-[#111111] text-[#FFFFFF] hover:bg-[#C8A96B] hover:text-[#111111] text-xs font-bold uppercase tracking-widest transition flex items-center gap-2 shadow-lg hover:shadow-xl group cursor-pointer">
              <span>View All {activeTab !== "All" ? activeTab : "Silhouettes"}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
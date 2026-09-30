import React from "react";
import { SlidersHorizontal, ChevronRight, Check, X, RotateCcw } from "lucide-react";

const DEPARTMENTS = [
  { id: "all", label: "All Curations" },
  { id: "men", label: "Men's Collection" },
  { id: "women", label: "Ladies' Atelier" },
  { id: "boys", label: "Kids: Boys (3-12Y)" },
  { id: "girls", label: "Kids: Girls (3-12Y)" },
];

const GARMENT_TYPES = [
  { id: "all", label: "All Garments" },
  { id: "shirts", label: "Shirts & Polos" },
  { id: "t-shirts", label: "T-Shirts" },
  { id: "tailoring", label: "Tailoring & Blazers" },
  { id: "dresses", label: "Silk Dresses" },
  { id: "tops", label: "Tops & Cashmere" },
  { id: "jeans", label: "Selvedge Jeans" },
  { id: "pants", label: "Pants & Trousers" },
  { id: "jackets", label: "Jackets & Outerwear" },
  { id: "skirts", label: "Plissé Skirts" },
];

const STYLES = [
  "All Styles",
  "Formal",
  "Casual",
  "Party",
  "Gym",
];

const COLORS = [
  { name: "Obsidian", value: "#141414" },
  { name: "Chalk White", value: "#F8F8F8" },
  { name: "Camel", value: "#C2A684" },
  { name: "Charcoal", value: "#383B3E" },
  { name: "Navy", value: "#1C2430" },
  { name: "Olive", value: "#4B5320" },
  { name: "Champagne", value: "#EADDC7" },
  { name: "Cognac", value: "#5C3317" },
];

const SIZES = ["Small", "Medium", "Large", "X-Large", "One Size"];

export default function FilterSidebar({
  isMobile = false,
  activeCategory,
  setActiveCategory,
  activeGarmentType = "all",
  setActiveGarmentType,
  activeStyle,
  setActiveStyle,
  selectedColors = [],
  setSelectedColors,
  selectedSizes = [],
  setSelectedSizes,
  priceRange,
  setPriceRange,
  onResetFilters,
}) {
  const handleToggleColor = (colorHex) => {
    if (selectedColors.includes(colorHex)) {
      setSelectedColors(selectedColors.filter((c) => c !== colorHex));
    } else {
      setSelectedColors([...selectedColors, colorHex]);
    }
  };

  const handleToggleSize = (sz) => {
    if (selectedSizes.includes(sz)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== sz));
    } else {
      setSelectedSizes([...selectedSizes, sz]);
    }
  };

  return (
    <aside
      className={`${
        isMobile
          ? "w-full"
          : "w-[280px] bg-white border border-neutral-200/80 rounded-[28px] p-6 shadow-xs"
      } space-y-6 select-none`}
    >
      {/* Sidebar Header */}
      {!isMobile && (
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-neutral-800" />
            <h2 className="font-serif font-bold text-lg uppercase tracking-wider text-neutral-900">
              Refine Edit
            </h2>
          </div>
          <button
            onClick={onResetFilters}
            className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 hover:text-black flex items-center gap-1 transition cursor-pointer"
            title="Reset all filters"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        </div>
      )}

      {/* 1. Department Filter (Men, Ladies, Boys, Girls) */}
      <div className="space-y-3 pb-5 border-b border-neutral-100">
        <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900">
          Department / Wardrobe
        </h3>
        <div className="space-y-1">
          {DEPARTMENTS.map((dept) => {
            const isActive =
              (activeCategory || "all").toLowerCase() === dept.id.toLowerCase();
            return (
              <button
                key={dept.id}
                type="button"
                onClick={() => setActiveCategory(dept.id)}
                className={`w-full flex items-center justify-between text-xs py-2 px-3 rounded-xl transition cursor-pointer ${
                  isActive
                    ? "bg-black text-white font-bold"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-black font-medium"
                }`}
              >
                <span>{dept.label}</span>
                <ChevronRight size={14} className={isActive ? "text-white" : "text-neutral-300"} />
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Garment Type Filter */}
      {setActiveGarmentType && (
        <div className="space-y-3 pb-5 border-b border-neutral-100">
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900">
            Garment Type
          </h3>
          <div className="space-y-1">
            {GARMENT_TYPES.map((gt) => {
              const isActive =
                (activeGarmentType || "all").toLowerCase() === gt.id.toLowerCase();
              return (
                <button
                  key={gt.id}
                  type="button"
                  onClick={() => setActiveGarmentType(gt.id)}
                  className={`w-full flex items-center justify-between text-xs py-1.5 px-3 rounded-xl transition cursor-pointer ${
                    isActive
                      ? "bg-neutral-100 text-black font-bold"
                      : "text-neutral-500 hover:bg-neutral-50 hover:text-black"
                  }`}
                >
                  <span>{gt.label}</span>
                  {isActive && <Check size={13} className="text-black" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Price Range Slider */}
      <div className="space-y-3 pb-5 border-b border-neutral-100">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900">
            Price Ceiling
          </h3>
          <span className="font-sans text-xs font-bold text-black">
            Up to ${priceRange.max}
          </span>
        </div>
        <input
          type="range"
          min="50"
          max="800"
          step="25"
          value={priceRange.max}
          onChange={(e) =>
            setPriceRange((prev) => ({ ...prev, max: Number(e.target.value) }))
          }
          className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black"
        />
        <div className="flex justify-between text-[11px] text-neutral-400 font-medium">
          <span>$50</span>
          <span>$800+</span>
        </div>
      </div>

      {/* 3. Color Swatches Filter */}
      <div className="space-y-3 pb-5 border-b border-neutral-100">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900">
            Shades & Hues
          </h3>
          {selectedColors.length > 0 && (
            <span className="text-[10px] text-neutral-400">
              ({selectedColors.length} active)
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2.5">
          {COLORS.map((c) => {
            const isSelected = selectedColors.includes(c.value);
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => handleToggleColor(c.value)}
                className={`w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center transition-transform cursor-pointer ${
                  isSelected ? "ring-2 ring-black ring-offset-2 scale-110" : "hover:scale-105"
                }`}
                style={{ backgroundColor: c.value }}
                title={c.name}
              >
                {isSelected && (
                  <Check
                    size={13}
                    className={
                      c.value === "#F8F8F8" || c.value === "#EADDC7"
                        ? "text-black"
                        : "text-white"
                    }
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Size Filter */}
      <div className="space-y-3 pb-5 border-b border-neutral-100">
        <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900">
          Size
        </h3>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((sz) => {
            const isSelected = selectedSizes.includes(sz);
            return (
              <button
                key={sz}
                type="button"
                onClick={() => handleToggleSize(sz)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border transition cursor-pointer ${
                  isSelected
                    ? "bg-black text-white border-black font-bold"
                    : "bg-[#FAF9F6] text-neutral-600 border-neutral-200 hover:border-black"
                }`}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Aesthetic / Occasion Style */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900">
          Aesthetic Style
        </h3>
        <div className="space-y-1">
          {STYLES.map((st) => {
            const isActive =
              (activeStyle || "all styles").toLowerCase() === st.toLowerCase();
            return (
              <button
                key={st}
                type="button"
                onClick={() =>
                  setActiveStyle(st === "All Styles" ? "all" : st.toLowerCase())
                }
                className={`w-full text-left text-xs py-1.5 px-3 rounded-lg transition cursor-pointer ${
                  isActive
                    ? "bg-neutral-100 text-black font-bold"
                    : "text-neutral-500 hover:text-black"
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

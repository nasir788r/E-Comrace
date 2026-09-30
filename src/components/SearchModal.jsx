import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeSearchModal } from "../redux/reducer/uiReducer";
import { Search, X, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TRENDING_TAGS = [
  "Double-Breasted Blazer",
  "Cashmere Turtleneck",
  "Mulberry Silk Dress",
  "Gabardine Trench",
  "Leather Moto Jacket",
  "Wide-Leg Trousers",
  "Suede Boots",
];

const SearchModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearchModalOpen = useSelector((state) => state.ui?.isSearchModalOpen);
  const products = useSelector((state) => state.products?.products || []);

  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery("");
    }
  }, [isSearchModalOpen]);

  // Global shortcut: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isSearchModalOpen) {
          dispatch(closeSearchModal());
        } else {
          dispatch({ type: "OPEN_SEARCH_MODAL" });
        }
      } else if (e.key === "Escape" && isSearchModalOpen) {
        dispatch(closeSearchModal());
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchModalOpen, dispatch]);

  if (!isSearchModalOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        const titleMatch = (p.title || p.name || "").toLowerCase().includes(q);
        const catMatch = (p.category || "").toLowerCase().includes(q);
        const styleMatch = (p.style || "").toLowerCase().includes(q);
        const tagMatch = (p.tag || "").toLowerCase().includes(q);
        const descMatch = (p.description || "").toLowerCase().includes(q);
        return titleMatch || catMatch || styleMatch || tagMatch || descMatch;
      })
    : [];

  const handleSelectProduct = (productId) => {
    dispatch(closeSearchModal());
    navigate(`/productpages/${productId}`);
  };

  const handleSelectTag = (tag) => {
    setQuery(tag);
  };

  const handleViewAllResults = () => {
    dispatch(closeSearchModal());
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="fixed inset-0 z-[1600] flex items-start justify-center pt-16 md:pt-24 p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => dispatch(closeSearchModal())}
      />

      <div className="relative w-full max-w-3xl bg-[#FFFFFF] rounded-3xl shadow-2xl overflow-hidden z-10 animate-fadeIn border border-[#E7E5E4] flex flex-col">
        {/* Search Input Bar */}
        <div className="p-6 border-b border-[#E7E5E4] flex items-center gap-4 bg-[#FAFAF9]">
          <Search size={22} className="text-[#78716C] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim()) {
                handleViewAllResults();
              }
            }}
            placeholder="Search silhouettes, virgin wool, silk, cashmere..."
            className="flex-1 bg-transparent text-base md:text-lg outline-none font-medium placeholder:text-[#78716C] text-[#111111]"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs bg-[#E7E5E4] text-[#111111] rounded-full w-5 h-5 flex items-center justify-center hover:bg-[#C8A96B] cursor-pointer"
            >
              ×
            </button>
          )}
          <button
            onClick={() => dispatch(closeSearchModal())}
            className="p-1.5 text-[#78716C] hover:text-[#111111] rounded-full hover:bg-[#E7E5E4] transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Trending Searches */}
          {!query && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#78716C] mb-4">
                <TrendingUp size={14} className="text-[#C8A96B]" />
                <span>Trending Searches in Runway Capsule</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {TRENDING_TAGS.map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectTag(tag)}
                    className="bg-[#FAFAF9] border border-[#E7E5E4] hover:bg-[#111111] hover:text-[#FFFFFF] hover:border-[#111111] transition px-4 py-2 rounded-full text-xs font-medium text-[#111111] cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#78716C] mb-4">
                <Sparkles size={14} className="text-[#C8A96B]" />
                <span>Curated Editorial Picks</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {products.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProduct(p.id)}
                    className="flex items-center gap-3 p-2.5 rounded-2xl border border-[#E7E5E4] hover:border-[#111111] hover:bg-[#FAFAF9] cursor-pointer transition"
                  >
                    <img
                      src={p.image || p.img}
                      alt={p.title}
                      className="w-14 h-16 object-cover rounded-xl bg-[#FAFAF9] flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#78716C] truncate">
                        {p.category}
                      </p>
                      <h4 className="font-serif font-bold text-sm text-[#171717] truncate">
                        {p.title}
                      </h4>
                      <p className="text-xs font-bold text-[#292524] mt-0.5">
                        ${p.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {query && (
            <div>
              <div className="flex justify-between items-center text-xs text-[#78716C] font-bold uppercase tracking-widest mb-4">
                <span>Search Results ({filteredProducts.length})</span>
                {filteredProducts.length > 0 && (
                  <button
                    onClick={handleViewAllResults}
                    className="text-[#111111] hover:text-[#C8A96B] hover:underline font-bold cursor-pointer"
                  >
                    View All in Catalog →
                  </button>
                )}
              </div>

              {filteredProducts.length > 0 ? (
                <div className="space-y-3">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p.id)}
                      className="flex items-center gap-4 p-3 rounded-2xl border border-[#E7E5E4] hover:border-[#111111] hover:bg-[#FAFAF9] cursor-pointer transition group"
                    >
                      <img
                        src={p.image || p.img}
                        alt={p.title}
                        className="w-16 h-20 object-cover rounded-xl bg-[#FAFAF9] flex-shrink-0 group-hover:scale-104 transition duration-300"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#78716C]">
                          {p.category} • {p.style}
                        </span>
                        <h4 className="font-serif font-bold text-base text-[#171717] truncate mt-0.5 group-hover:text-[#C8A96B] transition">
                          {p.title}
                        </h4>
                        <p className="text-xs text-[#78716C] line-clamp-1 mt-0.5">
                          {p.subtitle || p.description}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0 pr-2">
                        <div className="text-base font-bold text-[#292524] font-sans">
                          ${p.price}
                        </div>
                        {p.oldPrice && (
                          <div className="text-xs text-[#78716C] line-through">
                            ${p.oldPrice}
                          </div>
                        )}
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-[#78716C] group-hover:text-[#111111] group-hover:translate-x-1 transition"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="font-serif text-lg font-bold mb-1 text-[#111111]">
                    No matching pieces found for "{query}"
                  </p>
                  <p className="text-xs text-[#78716C] max-w-sm mx-auto">
                    Try refining your search terms or explore our curated categories.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#FAFAF9] border-t border-[#E7E5E4] flex items-center justify-between text-[11px] text-[#78716C]">
          <span>Press <kbd className="bg-[#E7E5E4] px-1.5 py-0.5 rounded text-[#111111]">ESC</kbd> to close</span>
          <span>Press <kbd className="bg-[#E7E5E4] px-1.5 py-0.5 rounded text-[#111111]">ENTER</kbd> for all results</span>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;

import React, { useState } from "react";
import { useParams,Link } from "react-router-dom";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import FilterSidebar from "../CategoryPage/FilterSidebar/FilterSidebar";
import ProductGrid from "../CategoryPage/ProductGrid/ProductGrid";

export default function CasualProducts() {
  const { categoryName } = useParams();
  const [filters, setFilters] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => setIsFilterOpen(prev => !prev);

  const currentTitle = categoryName
    ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    : "Casual";

  return (
    <div className="bg-white min-h-screen w-full flex flex-col items-center">

      <div className={`fixed inset-0 z-50 lg:hidden transition-all ${isFilterOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-black/40 ${isFilterOpen ? "opacity-100" : "opacity-0"}`} onClick={toggleFilter} />
        <div className={`absolute bottom-0 left-0 right-0 top-20 bg-white rounded-t-[20px] h-[90vh] overflow-y-auto transition-transform ${isFilterOpen ? "translate-y-0" : "translate-y-full"}`}>
          <div className="p-5">
            <div className="flex justify-between items-center mb-4 border-b pb-4">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={toggleFilter}><X size={24} /></button>
            </div>
            <FilterSidebar
              isMobile
              onApply={(data) => {
                setFilters(data);
                setIsFilterOpen(false);
              }}
            />
          </div>
        </div>
      </div>

      <main className="w-full max-w-[1240px] mt-[60px] px-4">
        <nav className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-black">
            Home
          </Link>
          {" / "}
          <span className="text-black font-medium">{currentTitle}</span>
        </nav>
        <div className="flex gap-8">
          <div className="hidden lg:block shrink-0">
            <FilterSidebar onApply={setFilters} />
          </div>
          <section className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-[28px] sm:text-[32px] font-bold">{currentTitle}</h1>
              <button onClick={toggleFilter} className="lg:hidden bg-[#F0F0F0] p-2.5 rounded-full">
                <SlidersHorizontal size={24} className="text-[#00000066]" />
              </button>
            </div>
            <div className="mb-4 text-gray-600 text-sm w-full">
              <span className="flex justify-end items-center gap-1 w-full">
                Showing 1-10 of 100 Products Sort by: Most Popular
                <ChevronDown className="h-4 w-4 text-gray-600" />
              </span>
            </div>
            <ProductGrid category={categoryName || "casual"} filters={filters} />
          </section>
        </div>
      </main>
    </div>
  );
}
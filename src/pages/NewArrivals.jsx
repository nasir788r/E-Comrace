import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, Sparkles } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FASHION_PRODUCTS } from "../data/fashionCatalog";

const NewArrivals = () => {
  const { newArrivals } = useSelector((state) => state.home || {});
  const [sortBy, setSortBy] = useState("Latest");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const rawProducts = newArrivals && newArrivals.length > 0 ? newArrivals : FASHION_PRODUCTS;

  const sortedProducts = [...rawProducts].sort((a, b) => {
    if (sortBy === "Price Low→High") return Number(a.price) - Number(b.price);
    if (sortBy === "Price High→Low") return Number(b.price) - Number(a.price);
    if (sortBy === "Rating") return Number(b.rating || 0) - Number(a.rating || 0);
    return 0;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy]);

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-24 text-[#141414]">
      {/* Editorial Header */}
      <div className="border-b border-neutral-200/80 bg-white">
        <div className="container mx-auto px-4 md:px-10 py-10 md:py-14 text-center">
          <nav className="flex justify-center items-center gap-2 text-neutral-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Link to="/" className="hover:text-black">Home</Link>
            <ChevronRight size={13} />
            <span className="text-black font-bold">New Runway Drop</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#EFECE6] text-neutral-800 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
            <Sparkles size={13} className="text-amber-600" />
            <span>Autumn / Winter '26 Collection</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-neutral-900">
            New Runway Arrivals
          </h1>

          <p className="text-neutral-500 mt-3 max-w-lg mx-auto text-xs sm:text-sm leading-relaxed">
            Freshly revealed silhouettes from our European partner ateliers. Limited numbered production runs.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 md:px-10 py-8 md:py-12">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
            Showing {currentProducts.length} of {sortedProducts.length} Silhouettes
          </span>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-400 font-semibold uppercase tracking-wider">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs font-bold text-neutral-800 outline-none focus:border-black cursor-pointer shadow-xs"
            >
              <option>Latest</option>
              <option>Price Low→High</option>
              <option>Price High→Low</option>
              <option>Rating</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-14 pt-8 border-t border-neutral-200 flex justify-between items-center">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-6 py-2.5 rounded-full border border-neutral-200 text-xs font-bold uppercase tracking-widest hover:border-black disabled:opacity-30 transition"
            >
              Previous
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-full text-xs font-bold transition ${
                    currentPage === page ? "bg-black text-white" : "hover:bg-neutral-200"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-6 py-2.5 rounded-full border border-neutral-200 text-xs font-bold uppercase tracking-widest hover:border-black disabled:opacity-30 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewArrivals;

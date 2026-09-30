import React, { useState, useEffect } from "react";
import { ChevronRight, Percent, Clock, Sparkles } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FASHION_PRODUCTS } from "../data/fashionCatalog";

const OnSale = () => {
  const reduxProducts = useSelector((state) => state.products?.products || []);
  const allProducts = reduxProducts.length > 0 ? reduxProducts : FASHION_PRODUCTS;

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const [timeLeft, setTimeLeft] = useState({
    hours: "18",
    minutes: "42",
    seconds: "15",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight - now;

      if (diff <= 0) {
        setTimeLeft({ hours: "00", minutes: "00", seconds: "00" });
      } else {
        const hours = String(Math.floor(diff / 1000 / 60 / 60)).padStart(2, "0");
        const minutes = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, "0");
        const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filter products that have discounts
  const saleProducts = allProducts.filter(
    (p) => Number(p.oldPrice) > Number(p.price) || Boolean(p.discount)
  );

  const displayList = saleProducts.length > 0 ? saleProducts : allProducts.slice(0, 8);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = displayList.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(displayList.length / productsPerPage);

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-24 text-[#141414]">
      {/* Flash Sale Marquee Bar */}
      <div className="bg-[#8A1818] text-white py-2.5 overflow-hidden">
        <div className="flex gap-8 whitespace-nowrap animate-marquee text-xs font-bold uppercase tracking-[0.25em]">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              <span>EXCLUSIVE ATELIER ARCHIVE SALE • UP TO 35% OFF NOBLE FIBERS</span>
              <span>•</span>
              <span>USE CODE: <strong className="underline">ATELIER20</strong> AT CHECKOUT</span>
              <span>•</span>
              <span>COMPLIMENTARY EXPRESS DISPATCH OVER $150</span>
              <span>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-neutral-200/80 bg-white">
        <div className="container mx-auto px-4 md:px-10 py-10 md:py-14">
          <nav className="flex items-center gap-2 text-neutral-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Link to="/" className="hover:text-black">Home</Link>
            <ChevronRight size={13} />
            <span className="text-black font-bold">Archive & Private Sale</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
                <Percent size={13} />
                <span>Limited Seasonal Privileges</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-neutral-900">
                The Archive Edit
              </h1>
              <p className="text-neutral-500 text-xs md:text-sm mt-1 max-w-md leading-relaxed">
                Rare past-season silhouettes and limited archive pieces made available with privileged acquisition rates.
              </p>
            </div>

            {/* Countdown Box */}
            <div className="bg-[#FAF9F6] border border-neutral-200 rounded-2xl p-4 flex items-center gap-4 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <Clock size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">
                  Archive Window Closes In:
                </span>
                <span className="font-mono text-lg font-black text-neutral-900">
                  {timeLeft.hours} : {timeLeft.minutes} : {timeLeft.seconds}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="container mx-auto px-4 md:px-10 py-8 md:py-12">
        <div className="mb-6 flex justify-between items-center text-xs font-bold uppercase tracking-widest text-neutral-400">
          <span>{displayList.length} Archive Pieces Available</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
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

export default OnSale;

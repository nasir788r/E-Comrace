import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  SlidersHorizontal,
  ChevronRight,
  ChevronDown,
  LayoutGrid,
  Grid3X3,
  X,
  Sparkles,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "./ShopSidebar";
import { FASHION_PRODUCTS } from "../data/fashionCatalog";

const Shop = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const reduxProducts = useSelector((state) => state.products?.products || []);
  const allProducts = reduxProducts.length > 0 ? reduxProducts : FASHION_PRODUCTS;

  const [activeCategory, setActiveCategory] = useState(categoryName || "all");
  const [activeGarmentType, setActiveGarmentType] = useState(
    searchParams.get("category") || "all"
  );
  const [activeStyle, setActiveStyle] = useState("all");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 800 });
  const [sortBy, setSortBy] = useState("Featured");
  const [gridCols, setGridCols] = useState(3); // 2, 3, or 4
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    if (categoryName) {
      setActiveCategory(categoryName.toLowerCase());
    } else {
      setActiveCategory("all");
    }
  }, [categoryName]);

  useEffect(() => {
    const queryCategory = searchParams.get("category");
    if (queryCategory) {
      setActiveGarmentType(queryCategory.toLowerCase());
    } else {
      setActiveGarmentType("all");
    }
  }, [searchParams]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (cat === "all") {
      navigate("/shop");
    } else {
      navigate(`/shop/${cat.toLowerCase()}`);
    }
    setShowMobileFilter(false);
  };

  const handleResetFilters = () => {
    setActiveCategory("all");
    setActiveGarmentType("all");
    setActiveStyle("all");
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange({ min: 0, max: 800 });
    setSortBy("Featured");
    navigate("/shop");
  };

  // Filter products accurately across Men, Ladies, Kids (Boys/Girls), Garments, Colors, Sizes, Price
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // 1. Department / Gender Match
      const cat = (product.category || "").toLowerCase();
      const gender = (product.gender || "").toLowerCase();
      const subCat = (product.subCategory || "").toLowerCase();
      const pTitle = (product.title || product.name || "").toLowerCase();
      const targetCat = (activeCategory || "all").toLowerCase();

      let deptMatch = true;
      if (targetCat !== "all") {
        if (targetCat === "men") {
          deptMatch =
            gender === "men" ||
            subCat === "men" ||
            cat === "men" ||
            pTitle.includes("men");
        } else if (targetCat === "women" || targetCat === "ladies") {
          const isExplicitMen =
            gender === "men" ||
            subCat === "men" ||
            cat === "men" ||
            pTitle.includes("men's") ||
            pTitle.includes("mens") ||
            pTitle.includes("dress shirt") ||
            pTitle.includes("flannel shirt") ||
            pTitle.includes("tracksuit");

          if (isExplicitMen) {
            deptMatch = false;
          } else {
            deptMatch =
              gender === "women" ||
              subCat === "ladies" ||
              cat === "women" ||
              cat === "ladies" ||
              pTitle.includes("women") ||
              pTitle.includes("ladies");
          }
        } else if (targetCat === "kids" || targetCat === "children") {
          deptMatch =
            gender === "kids" ||
            subCat === "boys" ||
            subCat === "girls";
        } else if (targetCat === "boys") {
          const isGirls =
            subCat === "girls" ||
            pTitle.includes("girl") ||
            pTitle.includes("skirt") ||
            pTitle.includes("frock");
          deptMatch =
            !isGirls &&
            (subCat === "boys" ||
              (gender === "kids" && (pTitle.includes("boy") || !pTitle.includes("girl"))));
        } else if (targetCat === "girls") {
          const isBoys =
            subCat === "boys" ||
            pTitle.includes("boy");
          deptMatch =
            !isBoys &&
            (subCat === "girls" ||
              (gender === "kids" && pTitle.includes("girl")));
        } else {
          deptMatch =
            cat === targetCat ||
            subCat === targetCat ||
            (product.style || "").toLowerCase() === targetCat;
        }
      }

      // 2. Garment Type Match
      let garmentMatch = true;
      if (activeGarmentType && activeGarmentType !== "all") {
        const targetGt = activeGarmentType.toLowerCase();
        garmentMatch =
          cat.includes(targetGt) ||
          pTitle.includes(targetGt) ||
          (product.style || "").toLowerCase().includes(targetGt);
      }

      // 3. Style match
      const styleMatch =
        activeStyle === "all" ||
        (product.style || "").toLowerCase() === activeStyle.toLowerCase();

      // 4. Price match
      const price = Number(product.price) || 0;
      const priceMatch = price <= priceRange.max;

      // 5. Exact Color match
      const colorMatch =
        selectedColors.length === 0 ||
        (product.colors &&
          product.colors.some((c) => selectedColors.includes(c.value)));

      // 6. Size match
      const sizeMatch =
        selectedSizes.length === 0 ||
        (product.sizes &&
          product.sizes.some((sz) => selectedSizes.includes(sz)));

      // 7. Search query
      const searchMatch =
        !searchQuery.trim() ||
        pTitle.includes(searchQuery.toLowerCase()) ||
        cat.includes(searchQuery.toLowerCase()) ||
        subCat.includes(searchQuery.toLowerCase());

      return (
        deptMatch &&
        garmentMatch &&
        styleMatch &&
        priceMatch &&
        colorMatch &&
        sizeMatch &&
        searchMatch
      );
    });
  }, [
    allProducts,
    activeCategory,
    activeGarmentType,
    activeStyle,
    priceRange,
    selectedColors,
    selectedSizes,
    searchQuery,
  ]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "Price: Low to High") {
      list.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "Price: High to Low") {
      list.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "Patron Rating") {
      list.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
    } else if (sortBy === "Newest Drops") {
      list.reverse();
    }
    return list;
  }, [filteredProducts, sortBy]);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    activeCategory,
    activeGarmentType,
    activeStyle,
    selectedColors,
    selectedSizes,
    priceRange,
    sortBy,
    searchQuery,
  ]);

  // Pagination calculation
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const activeFiltersCount =
    (activeCategory !== "all" ? 1 : 0) +
    (activeGarmentType !== "all" ? 1 : 0) +
    (activeStyle !== "all" ? 1 : 0) +
    selectedColors.length +
    selectedSizes.length +
    (priceRange.max < 800 ? 1 : 0);

  const getDepartmentTitle = () => {
    if (searchQuery) return `Search: "${searchQuery}"`;
    const cat = (activeCategory || "all").toLowerCase();
    let name = "Atelier Ready-To-Wear";
    if (cat === "men") name = "Men's Collection";
    else if (cat === "women" || cat === "ladies") name = "Ladies' Atelier";
    else if (cat === "boys") name = "Kids: Boys Collection (3-12Y)";
    else if (cat === "girls") name = "Kids: Girls Collection (3-12Y)";
    else if (cat === "kids") name = "Kids & Children Collection";
    else if (cat !== "all") {
      name = `${cat.charAt(0).toUpperCase() + cat.slice(1)} Silhouettes`;
    }

    if (activeGarmentType && activeGarmentType !== "all") {
      const gName =
        activeGarmentType.charAt(0).toUpperCase() + activeGarmentType.slice(1);
      return `${name} — ${gName}`;
    }
    return name;
  };

  return (
    <div className="bg-[#FAF9F6] text-[#141414] min-h-screen pb-24">
      {/* 1. Header / Breadcrumbs */}
      <div className="border-b border-neutral-200/80 bg-white">
        <div className="container mx-auto px-4 md:px-10 py-8">
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
            <Link to="/" className="hover:text-black">Home</Link>
            <ChevronRight size={12} />
            <Link to="/shop" className="hover:text-black">Collection</Link>
            {activeCategory !== "all" && (
              <>
                <ChevronRight size={12} />
                <span className="text-black font-bold uppercase">
                  {activeCategory === "men"
                    ? "Men"
                    : activeCategory === "women" || activeCategory === "ladies"
                    ? "Ladies"
                    : activeCategory === "boys"
                    ? "Kids: Boys"
                    : activeCategory === "girls"
                    ? "Kids: Girls"
                    : activeCategory}
                </span>
              </>
            )}
            {activeGarmentType !== "all" && (
              <>
                <ChevronRight size={12} />
                <span className="text-neutral-500 font-semibold uppercase">{activeGarmentType}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black uppercase text-neutral-900 tracking-tight">
                {getDepartmentTitle()}
              </h1>
              <p className="text-neutral-500 text-xs md:text-sm mt-1 max-w-xl">
                Precision garments tailored in limited numbered editions. Cut from certified noble textiles.
              </p>
            </div>

            {/* Total Results Count */}
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Showing {sortedProducts.length} Silhouettes
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-10 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* 2. Desktop Filter Sidebar */}
          <div className="hidden lg:block shrink-0 sticky top-28">
            <FilterSidebar
              activeCategory={activeCategory}
              setActiveCategory={handleCategoryChange}
              activeGarmentType={activeGarmentType}
              setActiveGarmentType={setActiveGarmentType}
              activeStyle={activeStyle}
              setActiveStyle={setActiveStyle}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              selectedSizes={selectedSizes}
              setSelectedSizes={setSelectedSizes}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* 3. Main Catalog View */}
          <div className="flex-1 w-full">
            {/* Top Toolbar: Sorting, Mobile Filter Button, Grid Layout Switcher */}
            <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-xs">
              {/* Mobile Filter Toggle Button */}
              <button
                onClick={() => setShowMobileFilter(true)}
                className="lg:hidden flex items-center gap-2 bg-neutral-100 hover:bg-black hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition"
              >
                <SlidersHorizontal size={15} />
                <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
              </button>

              {/* Active Filter Tags */}
              <div className="hidden sm:flex flex-wrap items-center gap-2">
                {activeCategory !== "all" && (
                  <span className="inline-flex items-center gap-1.5 bg-[#FAF9F6] border border-neutral-200 text-neutral-700 text-xs px-3 py-1 rounded-full font-medium">
                    <span>Department: {activeCategory}</span>
                    <button onClick={() => handleCategoryChange("all")}><X size={12} /></button>
                  </span>
                )}
                {activeGarmentType !== "all" && (
                  <span className="inline-flex items-center gap-1.5 bg-[#FAF9F6] border border-neutral-200 text-neutral-700 text-xs px-3 py-1 rounded-full font-medium">
                    <span>Type: {activeGarmentType}</span>
                    <button onClick={() => setActiveGarmentType("all")}><X size={12} /></button>
                  </span>
                )}
                {selectedSizes.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1.5 bg-[#FAF9F6] border border-neutral-200 text-neutral-700 text-xs px-3 py-1 rounded-full font-medium">
                    <span>Size: {s}</span>
                    <button onClick={() => setSelectedSizes(selectedSizes.filter((sz) => sz !== s))}><X size={12} /></button>
                  </span>
                ))}
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-red-600 transition ml-1"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Right Controls: Sort Dropdown & Grid View Toggle */}
              <div className="flex items-center gap-4 ml-auto">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-neutral-400 font-semibold uppercase tracking-wider hidden md:inline">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#FAF9F6] border border-neutral-200 rounded-xl px-3 py-2 text-xs font-bold text-neutral-800 outline-none focus:border-black cursor-pointer"
                  >
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Patron Rating</option>
                    <option>Newest Drops</option>
                  </select>
                </div>

                {/* Desktop Grid Layout Buttons */}
                <div className="hidden md:flex items-center gap-1 border-l border-neutral-200 pl-4">
                  <button
                    onClick={() => setGridCols(2)}
                    className={`p-1.5 rounded-lg transition ${
                      gridCols === 2 ? "bg-black text-white" : "text-neutral-400 hover:text-black"
                    }`}
                    title="2 Columns (Editorial Big View)"
                  >
                    <LayoutGrid size={16} />
                  </button>
                  <button
                    onClick={() => setGridCols(3)}
                    className={`p-1.5 rounded-lg transition ${
                      gridCols === 3 ? "bg-black text-white" : "text-neutral-400 hover:text-black"
                    }`}
                    title="3 Columns (Standard Grid)"
                  >
                    <Grid3X3 size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Cards Grid */}
            {currentProducts.length > 0 ? (
              <div
                className={`grid gap-4 md:gap-6 ${
                  gridCols === 2
                    ? "grid-cols-2 md:grid-cols-2"
                    : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3"
                }`}
              >
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} data={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-16 text-center border border-neutral-200/80 space-y-4">
                <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                  <SlidersHorizontal size={24} />
                </div>
                <h3 className="font-serif text-2xl font-bold uppercase text-neutral-900">
                  No matching garments found
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Try adjusting your price threshold, clearing filters, or exploring other categories.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-black text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-14 pt-8 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-6 py-2.5 rounded-full border border-neutral-200 text-xs font-bold uppercase tracking-widest hover:border-black disabled:opacity-30 disabled:pointer-events-none transition"
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 rounded-full text-xs font-bold transition ${
                        currentPage === page
                          ? "bg-black text-white shadow-sm"
                          : "text-neutral-600 hover:bg-neutral-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-6 py-2.5 rounded-full border border-neutral-200 text-xs font-bold uppercase tracking-widest hover:border-black disabled:opacity-30 disabled:pointer-events-none transition"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Bottom Drawer */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-[1400] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowMobileFilter(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto bg-white rounded-t-3xl p-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-6">
              <h3 className="font-serif text-xl font-bold uppercase">Refine Selection</h3>
              <button
                onClick={() => setShowMobileFilter(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-black"
              >
                <X size={20} />
              </button>
            </div>
            <FilterSidebar
              isMobile
              activeCategory={activeCategory}
              setActiveCategory={handleCategoryChange}
              activeGarmentType={activeGarmentType}
              setActiveGarmentType={setActiveGarmentType}
              activeStyle={activeStyle}
              setActiveStyle={setActiveStyle}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              selectedSizes={selectedSizes}
              setSelectedSizes={setSelectedSizes}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              onResetFilters={handleResetFilters}
            />
            <div className="mt-6 pt-4 border-t border-neutral-100 flex gap-3">
              <button
                onClick={handleResetFilters}
                className="w-1/3 py-3 border border-neutral-300 rounded-full text-xs font-bold uppercase tracking-wider"
              >
                Reset
              </button>
              <button
                onClick={() => setShowMobileFilter(false)}
                className="w-2/3 bg-black text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;

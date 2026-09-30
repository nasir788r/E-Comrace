import React, { useState, useEffect, useRef } from "react";
import {
  ShoppingBag,
  Search,
  Menu,
  Heart,
  User,
  X,
  Sparkles,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleCartDrawer } from "../redux/reducer/cartReducer";
import { toggleWishlistDrawer } from "../redux/reducer/wishlistReducer";
import { openSearchModal } from "../redux/reducer/uiReducer";
import BrandLogo from "./BrandLogo";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = useSelector((state) => state.cart?.cartCount || 0);
  const wishlistCount = useSelector((state) => state.wishlist?.wishlistCount || 0);
  const user = useSelector((state) => state.user?.user);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Active desktop hover dropdown (null, "men", "women", "kids")
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimeoutRef = useRef(null);

  // Mobile menu collapsible sections
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const handleMouseEnter = (menuKey) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menuKey);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  return (
    <>
      {/* 1. Top Announcement Marquee Ticker */}
      {showAnnouncement && (
        <div className="bg-[#111111] text-white text-[11px] md:text-xs py-2 px-4 relative z-[70] overflow-hidden border-b border-[#E7E5E4]/20">
          <div className="flex items-center justify-between container mx-auto">
            <div className="flex-1 overflow-hidden relative">
              <div className="flex gap-8 whitespace-nowrap animate-marquee font-medium tracking-widest uppercase">
                {[...Array(2)].map((_, i) => (
                  <span key={i} className="flex items-center gap-6">
                    <span className="flex items-center gap-1.5 text-[#C8A96B]">
                      <Sparkles size={12} /> COMPLIMENTARY EXPRESS SHIPPING OVER $150
                    </span>
                    <span className="text-[#78716C]">•</span>
                    <span>
                      USE CODE: <strong className="text-white underline decoration-[#C8A96B]">ATELIER20</strong> FOR 20% OFF
                    </span>
                    <span className="text-[#78716C]">•</span>
                    <span className="text-neutral-300">NEW MEN, LADIES & KIDS COLLECTIONS NOW LIVE</span>
                    <span className="text-[#78716C]">•</span>
                    <span>WHITE-GLOVE WORLDWIDE DISPATCH</span>
                    <span className="text-[#78716C]">•</span>
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => setShowAnnouncement(false)}
              className="text-[#78716C] hover:text-[#C8A96B] ml-4 p-0.5 rounded transition flex-shrink-0 cursor-pointer"
              title="Dismiss announcement"
              aria-label="Dismiss announcement"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* 2. Main Luxury Header: Left Logo | Center Nav Links | Right Cart & Profile */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 bg-[#FFFFFF] border-b border-[#E7E5E4] ${
          isScrolled ? "py-3 shadow-xs" : "py-4"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 lg:px-10 flex items-center justify-between gap-6">
          {/* LEFT: Mobile Menu Toggle + Brand Logo */}
          <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-[#111111] hover:text-[#C8A96B] transition cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>

            {/* Logo on the LEFT SIDE */}
            <BrandLogo variant="full" />
          </div>

          {/* CENTER: Navigation Bar Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#111111]">
            {/* HOME */}
            <Link
              to="/"
              className={`hover:text-[#C8A96B] transition-colors relative py-1 group ${
                location.pathname === "/" ? "text-[#C8A96B]" : ""
              }`}
            >
              <span>Home</span>
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-[#C8A96B] transition-all duration-300 ${
                  location.pathname === "/" ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>

            {/* MEN DROPDOWN */}
            <div
              className="relative py-1"
              onMouseEnter={() => handleMouseEnter("men")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to="/shop/men"
                className="flex items-center gap-1.5 hover:text-[#C8A96B] transition-colors py-1 group"
              >
                <span>Men</span>
                <ChevronDown
                  size={13}
                  className={`text-[#78716C] group-hover:text-[#C8A96B] transition-transform duration-200 ${
                    activeDropdown === "men" ? "rotate-180" : ""
                  }`}
                />
              </Link>

              {activeDropdown === "men" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-72 bg-[#FFFFFF] rounded-2xl shadow-2xl border border-[#E7E5E4] p-4 animate-fadeIn z-50">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E7E5E4]">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#78716C]">
                      Men's Atelier
                    </span>
                    <Link
                      to="/shop/men"
                      className="text-[10px] font-bold text-[#C8A96B] hover:underline uppercase"
                    >
                      View All →
                    </Link>
                  </div>
                  <div className="space-y-1 text-xs font-medium">
                    <Link
                      to="/shop/men"
                      className="block px-3 py-2 rounded-xl hover:bg-[#FAFAF9] hover:text-[#C8A96B] text-[#111111] font-bold transition"
                    >
                      All Men's Collection
                    </Link>
                    <Link
                      to="/shop/men?category=shirts"
                      className="block px-3 py-2 rounded-xl hover:bg-[#FAFAF9] hover:text-[#C8A96B] text-[#78716C] transition"
                    >
                      Shirts & Fine Polos
                    </Link>
                    <Link
                      to="/shop/men?category=t-shirts"
                      className="block px-3 py-2 rounded-xl hover:bg-[#FAFAF9] hover:text-[#C8A96B] text-[#78716C] transition"
                    >
                      Heavyweight T-Shirts
                    </Link>
                    <Link
                      to="/shop/men?category=jeans"
                      className="block px-3 py-2 rounded-xl hover:bg-[#FAFAF9] hover:text-[#C8A96B] text-[#78716C] transition"
                    >
                      Selvedge Denim & Trousers
                    </Link>
                    <Link
                      to="/shop/men?category=tailoring"
                      className="block px-3 py-2 rounded-xl hover:bg-[#FAFAF9] hover:text-[#C8A96B] text-[#78716C] transition"
                    >
                      Tailored Wool Blazers
                    </Link>
                    <Link
                      to="/shop/men?category=jackets"
                      className="block px-3 py-2 rounded-xl hover:bg-[#FAFAF9] hover:text-[#C8A96B] text-[#78716C] transition"
                    >
                      Leather & Outerwear
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* WOMEN / LADIES DROPDOWN */}
            <div
              className="relative py-1"
              onMouseEnter={() => handleMouseEnter("women")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to="/shop/women"
                className="flex items-center gap-1.5 hover:text-[#C8A96B] transition-colors py-1 group"
              >
                <span>Ladies</span>
                <ChevronDown
                  size={13}
                  className={`text-[#78716C] group-hover:text-[#C8A96B] transition-transform duration-200 ${
                    activeDropdown === "women" ? "rotate-180" : ""
                  }`}
                />
              </Link>

              {activeDropdown === "women" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-72 bg-[#FFFFFF] rounded-2xl shadow-2xl border border-[#E7E5E4] p-4 animate-fadeIn z-50">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E7E5E4]">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#78716C]">
                      Ladies' Haute Couture
                    </span>
                    <Link
                      to="/shop/women"
                      className="text-[10px] font-bold text-[#C8A96B] hover:underline uppercase"
                    >
                      View All →
                    </Link>
                  </div>
                  <div className="space-y-1 text-xs font-medium">
                    <Link
                      to="/shop/women"
                      className="block px-3 py-2 rounded-xl hover:bg-[#FAFAF9] hover:text-[#C8A96B] text-[#111111] font-bold transition"
                    >
                      All Ladies' Collection
                    </Link>
                    <Link
                      to="/shop/women?category=dresses"
                      className="block px-3 py-2 rounded-xl hover:bg-[#FAFAF9] hover:text-[#C8A96B] text-[#78716C] transition"
                    >
                      Mulberry Silk Dresses
                    </Link>
                    <Link
                      to="/shop/women?category=tops"
                      className="block px-3 py-2 rounded-xl hover:bg-[#FAFAF9] hover:text-[#C8A96B] text-[#78716C] transition"
                    >
                      Cashmere Tops & Blouses
                    </Link>
                    <Link
                      to="/shop/women?category=pants"
                      className="block px-3 py-2 rounded-xl hover:bg-[#FAFAF9] hover:text-[#C8A96B] text-[#78716C] transition"
                    >
                      Wide-Leg Pleated Pants
                    </Link>
                    <Link
                      to="/shop/women?category=tailoring"
                      className="block px-3 py-2 rounded-xl hover:bg-[#FAFAF9] hover:text-[#C8A96B] text-[#78716C] transition"
                    >
                      Sculpted Hourglass Blazers
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* KIDS DROPDOWN (BOYS & GIRLS) */}
            <div
              className="relative py-1"
              onMouseEnter={() => handleMouseEnter("kids")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to="/shop/kids"
                className="flex items-center gap-1.5 hover:text-[#C8A96B] transition-colors py-1 group"
              >
                <span>Kids</span>
                <ChevronDown
                  size={13}
                  className={`text-[#78716C] group-hover:text-[#C8A96B] transition-transform duration-200 ${
                    activeDropdown === "kids" ? "rotate-180" : ""
                  }`}
                />
              </Link>

              {activeDropdown === "kids" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-[#FFFFFF] rounded-2xl shadow-2xl border border-[#E7E5E4] p-5 animate-fadeIn z-50">
                  <div className="grid grid-cols-2 gap-4">
                    {/* BOYS Column */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#111111] block pb-1 border-b border-[#E7E5E4]">
                        👦 Boys (3-12Y)
                      </span>
                      <Link
                        to="/shop/boys"
                        className="block px-2 py-1.5 rounded-lg hover:bg-[#FAFAF9] hover:text-[#C8A96B] text-[#111111] font-bold text-xs"
                      >
                        All Boys Edit →
                      </Link>
                      <Link
                        to="/shop/boys?category=shirts"
                        className="block px-2 py-1 rounded-lg hover:bg-[#FAFAF9] hover:text-[#C8A96B] text-[#78716C] text-xs"
                      >
                        Striped Tees & Shirts
                      </Link>
                      <Link
                        to="/shop/boys?category=jackets"
                        className="block px-2 py-1 rounded-lg hover:bg-[#FAFAF9] hover:text-[#C8A96B] text-[#78716C] text-xs"
                      >
                        Denim Jackets
                      </Link>
                      <Link
                        to="/shop/boys?category=tops"
                        className="block px-2 py-1 rounded-lg hover:bg-[#FAFAF9] hover:text-[#C8A96B] text-[#78716C] text-xs"
                      >
                        Fleece Hoodies
                      </Link>
                    </div>

                    {/* GIRLS Column */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#111111] block pb-1 border-b border-[#E7E5E4]">
                        👧 Girls (3-12Y)
                      </span>
                      <Link
                        to="/shop/girls"
                        className="block px-2 py-1.5 rounded-lg hover:bg-[#FAFAF9] hover:text-[#C8A96B] text-[#111111] font-bold text-xs"
                      >
                        All Girls Edit →
                      </Link>
                      <Link
                        to="/shop/girls?category=dresses"
                        className="block px-2 py-1 rounded-lg hover:bg-[#FAFAF9] hover:text-[#C8A96B] text-[#78716C] text-xs"
                      >
                        Broderie Dresses
                      </Link>
                      <Link
                        to="/shop/girls?category=tops"
                        className="block px-2 py-1 rounded-lg hover:bg-[#FAFAF9] hover:text-[#C8A96B] text-[#78716C] text-xs"
                      >
                        Poplin Blouses
                      </Link>
                      <Link
                        to="/shop/girls?category=skirts"
                        className="block px-2 py-1 rounded-lg hover:bg-[#FAFAF9] hover:text-[#C8A96B] text-[#78716C] text-xs"
                      >
                        Plissé Skirts
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* NEW ARRIVALS */}
            <Link
              to="/new-arrivals"
              className="hover:text-[#C8A96B] transition-colors relative py-1 group"
            >
              <span>New Arrivals</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C8A96B] transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* SALE */}
            <Link
              to="/on-sale"
              className="hover:text-[#C8A96B] transition-colors relative py-1 group flex items-center gap-1.5"
            >
              <span>Sale</span>
              <span className="bg-[#C8A96B] text-[#111111] text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                Archive
              </span>
            </Link>

            {/* BRANDS */}
            <Link
              to="/brands"
              className="hover:text-[#C8A96B] transition-colors relative py-1 group"
            >
              <span>Brands</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C8A96B] transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          {/* RIGHT SIDE: Search, Wishlist, Cart ("add cart"), Profile */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => dispatch(openSearchModal())}
              className="flex items-center gap-2 bg-[#FAFAF9] hover:bg-[#FFFFFF] border border-[#E7E5E4] hover:border-[#111111]/30 transition text-[#78716C] hover:text-[#111111] px-3 py-2 rounded-full text-xs font-medium cursor-pointer"
              title="Search collection"
            >
              <Search size={16} />
              <span className="hidden xl:inline text-xs font-normal text-[#78716C]">
                Search...
              </span>
              <kbd className="hidden lg:inline bg-[#FFFFFF] text-[10px] text-[#78716C] px-1.5 py-0.5 rounded font-mono border border-[#E7E5E4]">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => dispatch(toggleWishlistDrawer())}
              className="relative p-2 text-[#111111] hover:text-[#C8A96B] transition cursor-pointer"
              title="Saved Items"
              aria-label="Wishlist"
            >
              <Heart
                size={20}
                className={wishlistCount > 0 ? "fill-red-500 text-red-500" : ""}
              />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#111111] text-[#FFFFFF] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-fadeIn">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag / Add Cart Button */}
            <button
              onClick={() => dispatch(toggleCartDrawer())}
              className="relative p-2 text-[#111111] hover:text-[#C8A96B] transition cursor-pointer group"
              title="Shopping Cart"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={20} className="group-hover:scale-105 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#111111] text-[#FFFFFF] group-hover:bg-[#C8A96B] group-hover:text-[#111111] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center transition-colors animate-fadeIn">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Button */}
            <button
              onClick={() => (user ? navigate("/account") : navigate("/login"))}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-[#FAFAF9] hover:bg-[#FFFFFF] text-[#111111] hover:text-[#C8A96B] transition cursor-pointer overflow-hidden border border-[#E7E5E4] hover:border-[#111111]/30 ml-1"
              title={user ? "My Account" : "Sign In / Profile"}
              aria-label="User Profile"
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={18} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 3. Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-[1100] transition-all duration-300 lg:hidden ${
          isMobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className={`absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`absolute top-0 left-0 h-full w-[85%] max-w-sm bg-[#FFFFFF] shadow-2xl flex flex-col justify-between transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="overflow-y-auto">
            {/* Drawer Header with Logo */}
            <div className="flex items-center justify-between p-6 border-b border-[#E7E5E4]">
              <div onClick={() => setIsMobileMenuOpen(false)}>
                <BrandLogo variant="compact" />
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-[#78716C] hover:text-[#111111] rounded-full cursor-pointer"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search Box */}
            <div className="p-6 pb-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  dispatch(openSearchModal());
                }}
                className="w-full flex items-center gap-3 bg-[#FAFAF9] border border-[#E7E5E4] px-4 py-3 rounded-xl text-xs text-[#78716C] font-medium"
              >
                <Search size={16} />
                <span>Search men, ladies, kids...</span>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-6 space-y-3 text-sm font-semibold uppercase tracking-wider text-[#111111]">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-[#111111] hover:text-[#C8A96B] border-b border-[#E7E5E4]/60"
              >
                Home
              </Link>

              {/* MEN Section */}
              <div className="border-b border-[#E7E5E4]/60 pb-2">
                <div className="flex items-center justify-between py-2">
                  <Link
                    to="/shop/men"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[#111111] font-bold hover:text-[#C8A96B]"
                  >
                    Men's Collection
                  </Link>
                  <button
                    onClick={() =>
                      setMobileExpandedSection(
                        mobileExpandedSection === "men" ? null : "men"
                      )
                    }
                    className="p-1 text-[#78716C]"
                  >
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform ${
                        mobileExpandedSection === "men" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
                {mobileExpandedSection === "men" && (
                  <div className="pl-4 pb-2 space-y-2 text-xs font-normal text-[#78716C] animate-fadeIn">
                    <Link to="/shop/men" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-[#111111]">View All Men</Link>
                    <Link to="/shop/men?category=shirts" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-[#111111]">Shirts & Polos</Link>
                    <Link to="/shop/men?category=jeans" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-[#111111]">Jeans & Trousers</Link>
                    <Link to="/shop/men?category=tailoring" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-[#111111]">Blazers & Suits</Link>
                    <Link to="/shop/men?category=jackets" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-[#111111]">Leather & Jackets</Link>
                  </div>
                )}
              </div>

              {/* WOMEN Section */}
              <div className="border-b border-[#E7E5E4]/60 pb-2">
                <div className="flex items-center justify-between py-2">
                  <Link
                    to="/shop/women"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[#111111] font-bold hover:text-[#C8A96B]"
                  >
                    Ladies' Collection
                  </Link>
                  <button
                    onClick={() =>
                      setMobileExpandedSection(
                        mobileExpandedSection === "women" ? null : "women"
                      )
                    }
                    className="p-1 text-[#78716C]"
                  >
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform ${
                        mobileExpandedSection === "women" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
                {mobileExpandedSection === "women" && (
                  <div className="pl-4 pb-2 space-y-2 text-xs font-normal text-[#78716C] animate-fadeIn">
                    <Link to="/shop/women" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-[#111111]">View All Ladies</Link>
                    <Link to="/shop/women?category=dresses" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-[#111111]">Silk Dresses</Link>
                    <Link to="/shop/women?category=tops" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-[#111111]">Tops & Cashmere Knits</Link>
                    <Link to="/shop/women?category=pants" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-[#111111]">Pleated Trousers</Link>
                    <Link to="/shop/women?category=tailoring" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-[#111111]">Tailored Blazers</Link>
                  </div>
                )}
              </div>

              {/* KIDS Section */}
              <div className="border-b border-[#E7E5E4]/60 pb-2">
                <div className="flex items-center justify-between py-2">
                  <Link
                    to="/shop/kids"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[#111111] font-bold hover:text-[#C8A96B]"
                  >
                    Kids Collection
                  </Link>
                  <button
                    onClick={() =>
                      setMobileExpandedSection(
                        mobileExpandedSection === "kids" ? null : "kids"
                      )
                    }
                    className="p-1 text-[#78716C]"
                  >
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform ${
                        mobileExpandedSection === "kids" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
                {mobileExpandedSection === "kids" && (
                  <div className="pl-4 pb-2 space-y-2 text-xs font-normal text-[#78716C] animate-fadeIn">
                    <Link to="/shop/boys" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 font-semibold text-[#111111] hover:text-[#C8A96B]">
                      👦 Boys (Shirts, Jeans, Jackets)
                    </Link>
                    <Link to="/shop/girls" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 font-semibold text-[#111111] hover:text-[#C8A96B]">
                      👧 Girls (Dresses, Blouses, Skirts)
                    </Link>
                    <Link to="/shop/kids" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 text-[#78716C] hover:text-[#111111]">
                      View All Kids Pieces
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/new-arrivals"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-[#111111] hover:text-[#C8A96B] border-b border-[#E7E5E4]/60"
              >
                <span>New Arrivals</span>
                <span className="text-[10px] bg-[#111111] text-[#FFFFFF] px-2 py-0.5 rounded-full font-bold">
                  SS/26
                </span>
              </Link>

              <Link
                to="/on-sale"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-[#111111] hover:text-[#C8A96B] border-b border-[#E7E5E4]/60 font-bold"
              >
                <span>Sale Archive</span>
                <span className="text-[10px] bg-[#C8A96B] text-[#111111] px-2 py-0.5 rounded-full font-bold">
                  Up to 35%
                </span>
              </Link>

              <Link
                to="/brands"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-[#111111] hover:text-[#C8A96B]"
              >
                Partner Brands
              </Link>
            </nav>
          </div>

          {/* Drawer Footer with Cart & Profile links */}
          <div className="p-6 border-t border-[#E7E5E4] bg-[#FAFAF9] space-y-3">
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  dispatch(toggleWishlistDrawer());
                }}
                className="flex-1 bg-[#FFFFFF] border border-[#E7E5E4] hover:border-[#111111] py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 text-[#111111] transition cursor-pointer"
              >
                <Heart size={14} className={wishlistCount > 0 ? "fill-red-500 text-red-500" : ""} />
                Wishlist ({wishlistCount})
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  dispatch(toggleCartDrawer());
                }}
                className="flex-1 bg-[#111111] text-[#FFFFFF] hover:bg-[#C8A96B] hover:text-[#111111] py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <ShoppingBag size={14} />
                Bag ({cartCount})
              </button>
            </div>

            <div className="text-center pt-2">
              <Link
                to={user ? "/account" : "/login"}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-semibold text-[#78716C] hover:text-[#111111] uppercase tracking-wider inline-flex items-center gap-1.5"
              >
                <User size={14} />
                {user ? "My Atelier Account" : "Sign In to Your Account"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

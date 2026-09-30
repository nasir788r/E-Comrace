import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { addToCart } from "../../../redux/reducer/cartReducer";
import { toggleWishlist } from "../../../redux/reducer/wishlistReducer";
import { showToast } from "../../../redux/reducer/uiReducer";
import { FASHION_PRODUCTS, PRESS_TESTIMONIALS } from "../../../data/fashionCatalog";
import ProductCard from "../../../components/ProductCard";
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Ruler,
  Check,
  ChevronDown,
  X,
  Sparkles,
} from "lucide-react";

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const allCatalogProducts = useSelector((state) => state.products?.products || FASHION_PRODUCTS);

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [reviewsList, setReviewsList] = useState([]);

  // New review form state
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const isWishlisted = product ? wishlistItems.some((item) => item.id === product.id) : false;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const loadProductData = async () => {
      // 1. Try finding in local catalog first
      const catalogMatch = FASHION_PRODUCTS.find((p) => p.id === id);
      if (catalogMatch) {
        setupProductState(catalogMatch);
        return;
      }

      // 2. Try Firestore
      try {
        if (db && id) {
          const docRef = doc(db, "products", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setupProductState({ id: docSnap.id, ...data });
            return;
          }
        }
      } catch (err) {
        console.warn("Firestore PDP fetch fallback:", err.message);
      }

      // 3. Fallback to first fashion product if id not found
      setupProductState(FASHION_PRODUCTS[0]);
    };

    loadProductData();
  }, [id]);

  const setupProductState = (data) => {
    const imagesArr =
      Array.isArray(data.images) && data.images.length > 0
        ? data.images
        : [data.image || data.img || data.imageUrl].filter(Boolean);

    const resolveDetailColors = (item) => {
      if (Array.isArray(item.colors) && item.colors.length > 0) {
        return item.colors.map((c) =>
          typeof c === "string" ? { name: c, value: c } : c
        );
      }
      if (item.color) {
        return [
          {
            name: item.colorName || item.color,
            value: item.color.startsWith("#") ? item.color : "#141414",
          },
        ];
      }
      const t = (item.title || item.name || "").toLowerCase();
      if (t.includes("white")) return [{ name: "Ivory White", value: "#FAF9F6" }];
      if (t.includes("blue") || t.includes("indigo") || t.includes("denim"))
        return [{ name: "Deep Raw Indigo", value: "#1A2B44" }];
      if (t.includes("camel") || t.includes("beige"))
        return [{ name: "Oatmeal Camel", value: "#C2A684" }];
      if (t.includes("pink") || t.includes("rose"))
        return [{ name: "Powder Rose", value: "#E8B4B8" }];
      return [{ name: "Obsidian Black", value: "#141414" }];
    };

    const finalColors = resolveDetailColors(data);

    setProduct({
      ...data,
      images: imagesArr,
      colors: finalColors,
      sizes: data.sizes || ["Small", "Medium", "Large", "X-Large"],
      features: data.features || [
        "100% Sustainably sourced noble textile",
        "Hand-finished in European partner ateliers",
        "Breathable and temperature-regulating",
        "Includes complimentary dust garment bag",
      ],
    });

    setActiveImage(imagesArr[0]);
    setSelectedColor(finalColors[0]?.value || "#141414");
    setSelectedSize(data.sizes?.[0] || "Medium");
    setQty(1);

    // Initial reviews
    setReviewsList([
      {
        name: "Charlotte Beaumont",
        role: "Verified Patron",
        date: "September 15, 2026",
        rating: 5,
        heading: "Unmatched textile quality & silhouette",
        text: "The fabric drape is astonishing. You can immediately feel the weight and pedigree of the materials. Arrived within two days."
      },
      {
        name: "Henri de Saint-Germain",
        role: "Verified Patron",
        date: "September 08, 2026",
        rating: 5,
        heading: "A timeless modern classic",
        text: "The fit is immaculate straight out of the box. Beautiful horn buttons and satin finish. Highly recommended."
      },
      {
        name: "Sophia Chen",
        role: "Verified Patron",
        date: "August 28, 2026",
        rating: 5,
        heading: "Exceptional presentation",
        text: "Packaged in an elegant gift box with personalized monogramming. An authentic high-luxury shopping experience."
      }
    ]);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-serif text-lg font-bold">Curating Garment Details...</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart(product, {
        selectedSize,
        selectedColor,
        quantity: qty,
      })
    );
    dispatch(showToast(`Added ${qty} × ${product.title || product.name} (${selectedSize}) to bag`));
  };

  const handleBuyNow = () => {
    dispatch(
      addToCart(product, {
        selectedSize,
        selectedColor,
        quantity: qty,
      })
    );
    navigate("/shiping");
  };

  const handleWishlistToggle = () => {
    dispatch(toggleWishlist(product));
    dispatch(
      showToast(
        isWishlisted
          ? `Removed from wishlist`
          : `Saved ${product.title || product.name} to wishlist`,
        "wishlist"
      )
    );
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    const newRev = {
      name: reviewName.trim(),
      role: "Verified Patron",
      date: "Just now",
      rating: Number(reviewRating),
      heading: "Patron Review",
      text: reviewComment.trim(),
    };

    setReviewsList([newRev, ...reviewsList]);
    setReviewName("");
    setReviewComment("");
    setIsWriteReviewOpen(false);
    dispatch(showToast("Thank you. Your patron review has been recorded."));
  };

  const relatedProducts = allCatalogProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const faqs = [
    {
      q: "What is your complimentary express delivery timeframe?",
      a: "All orders receive white-glove dispatched delivery within 2 to 4 business days. Priority DHL Express tracking is provided immediately upon atelier handoff."
    },
    {
      q: "How do I request white-glove returns or size exchanges?",
      a: "We offer complimentary 30-day returns and exchanges. Simply generate a prepaid courier label through your account or contact our concierge for scheduled home courier pickup."
    },
    {
      q: "How should I care for this noble textile?",
      a: "Due to the natural fibers (virgin wool, cashmere, and Mulberry silk), we recommend specialist dry cleaning or gentle hand-washing with specialized wool/silk detergent."
    },
    {
      q: "Are custom alterations or bespoke sizing available?",
      a: "Yes. Inquire via our VIP Concierge for bespoke garment adjustments or visiting tailor appointments in select international cities."
    }
  ];

  return (
    <div className="bg-[#FAF9F6] text-[#141414] min-h-screen pb-24">
      {/* 1. Breadcrumbs */}
      <div className="border-b border-neutral-100 bg-white">
        <div className="container mx-auto px-4 md:px-10 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">
          <Link to="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-black">Collection</Link>
          <span className="mx-2">/</span>
          <Link to={`/category/${product.category?.toLowerCase() || 'tailoring'}`} className="hover:text-black">
            {product.category || "Tailoring"}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-black font-bold truncate max-w-xs inline-block align-bottom">
            {product.title || product.name}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-10 py-10 md:py-16">
        {/* 2. Top PDP Section: Gallery & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Image Gallery (Thumbs + Large Preview) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnail Column */}
            {product.images?.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-24 flex-shrink-0">
                {product.images.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-20 md:w-full aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-neutral-100 ${
                      activeImage === imgUrl ? "border-black shadow-md scale-102" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover object-center" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Interactive Zoomable Preview */}
            <div className="flex-1 aspect-[3/4] rounded-[28px] overflow-hidden bg-[#EFECE6] border border-neutral-200 relative group shadow-lg">
              <img
                src={activeImage || product.image || product.img}
                alt={product.title || product.name}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {product.tag && (
                <div className="absolute top-5 left-5 bg-black/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-md">
                  {product.tag}
                </div>
              )}

              {/* Hover Inspect Note */}
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
                Hover to Inspect Texture
              </div>
            </div>
          </div>

          {/* Right Column: Garment Specs & Ordering */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              {/* Category & Star Rating */}
              <div className="flex items-center justify-between text-xs uppercase tracking-widest font-bold text-neutral-400 mb-2">
                <span>{product.category || "Atelier Silhouette"}</span>
                <div className="flex items-center gap-1.5 text-neutral-900">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={13} className="fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-xs">{(product.rating || 4.9).toFixed(1)}</span>
                  <span className="text-neutral-400">({reviewsList.length + 24} patrons)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-black uppercase text-neutral-900 tracking-tight leading-tight mb-2">
                {product.title || product.name}
              </h1>

              {/* Subtitle */}
              {product.subtitle && (
                <p className="font-serif text-sm text-neutral-500 italic mb-4">
                  {product.subtitle}
                </p>
              )}

              {/* Price & Discount */}
              <div className="flex items-center gap-4 py-3 border-y border-neutral-200 mb-6">
                <span className="font-sans text-3xl font-bold text-neutral-900">
                  ${product.price}
                </span>
                {product.oldPrice && product.oldPrice > product.price && (
                  <>
                    <span className="font-sans text-xl text-neutral-400 line-through">
                      ${product.oldPrice}
                    </span>
                    <span className="bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {product.discount || `Save $${product.oldPrice - product.price}`}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-neutral-600 text-sm leading-relaxed mb-6 font-normal">
                {product.description || "An exemplary execution of modern luxury tailoring. Cut from premier fibers with impeccable hand-finishing for refined ease."}
              </p>

              {/* Color Swatch Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider mb-3">
                    <span className="flex items-center gap-1.5">
                      <span>Selected Shade:</span>
                      <span className="text-neutral-400 font-medium normal-case">
                        ({product.colors.length} {product.colors.length === 1 ? "color option" : "color options"})
                      </span>
                    </span>
                    <span className="text-neutral-900 font-semibold">
                      {product.colors.find((c) => c.value === selectedColor)?.name || "Primary Tone"}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    {product.colors.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(c.value)}
                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                          selectedColor === c.value
                            ? "ring-2 ring-black ring-offset-2 scale-110 shadow-sm"
                            : "hover:scale-105"
                        }`}
                        style={{ backgroundColor: c.value }}
                        title={c.name}
                      >
                        {selectedColor === c.value && (
                          <Check size={16} className={c.value === "#F8F8F8" || c.value === "#ECEAE6" ? "text-black" : "text-white"} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection & Size Guide */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider mb-3">
                  <span>Choose Fit / Size:</span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="flex items-center gap-1 text-neutral-500 hover:text-black transition lowercase underline tracking-normal text-xs"
                  >
                    <Ruler size={13} />
                    <span>Size Guide & Measurements</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider border transition cursor-pointer ${
                        selectedSize === sz
                          ? "bg-black text-white border-black shadow-sm"
                          : "bg-white text-neutral-700 border-neutral-200 hover:border-black"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stock Status Alert */}
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-xl mb-6 border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>In Stock • Ready for White-Glove Dispatch within 24 Hours</span>
              </div>

              {/* Quantity Stepper & Add to Bag */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity */}
                  <div className="flex items-center justify-between bg-white border border-neutral-200 rounded-full px-4 py-3.5 w-32 shadow-xs">
                    <button
                      onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                      className="text-neutral-500 hover:text-black font-bold text-lg px-1 cursor-pointer"
                    >
                      −
                    </button>
                    <span className="font-bold text-sm">{qty}</span>
                    <button
                      onClick={() => setQty((prev) => prev + 1)}
                      className="text-neutral-500 hover:text-black font-bold text-lg px-1 cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag CTA */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-black text-white hover:bg-neutral-800 transition py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2.5 shadow-xl cursor-pointer"
                  >
                    <ShoppingBag size={16} />
                    <span>Add To Shopping Bag</span>
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={handleWishlistToggle}
                    className={`w-14 h-14 rounded-full border flex items-center justify-center transition cursor-pointer ${
                      isWishlisted
                        ? "bg-red-50 border-red-200 text-red-500 shadow-sm"
                        : "bg-white border-neutral-200 hover:border-black text-neutral-700"
                    }`}
                    title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
                  >
                    <Heart size={20} className={isWishlisted ? "fill-red-500" : ""} />
                  </button>
                </div>

                {/* Instant Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-[#1A1A1A] hover:bg-black text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition border border-white/10 shadow-md cursor-pointer"
                >
                  Instant Checkout • ${(product.price * qty).toFixed(0)}
                </button>
              </div>
            </div>

            {/* Value Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-neutral-200 text-center">
              <div className="flex flex-col items-center gap-1.5">
                <Truck size={20} className="text-neutral-800" />
                <span className="text-[11px] font-bold text-neutral-800 uppercase">Express Delivery</span>
                <span className="text-[10px] text-neutral-400">Complimentary over $150</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <RotateCcw size={20} className="text-neutral-800" />
                <span className="text-[11px] font-bold text-neutral-800 uppercase">30-Day Returns</span>
                <span className="text-[10px] text-neutral-400">White-glove courier pickup</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <ShieldCheck size={20} className="text-neutral-800" />
                <span className="text-[11px] font-bold text-neutral-800 uppercase">Certified Provenance</span>
                <span className="text-[10px] text-neutral-400">100% Authentic Ateliers</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Detailed Tabs Section (Craftsmanship, Reviews, FAQs) */}
        <div className="mt-20 md:mt-28">
          <div className="border-b border-neutral-200">
            <div className="flex justify-center gap-8 md:gap-16 text-xs md:text-sm font-bold uppercase tracking-[0.18em]">
              {[
                { id: "details", label: "Design & Craftsmanship" },
                { id: "reviews", label: `Patron Reviews (${reviewsList.length + 24})` },
                { id: "faqs", label: "Client Inquiries & FAQs" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 border-b-2 transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "border-black text-black font-black"
                      : "border-transparent text-neutral-400 hover:text-black"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="py-12">
            {/* Design & Craftsmanship Tab */}
            {activeTab === "details" && (
              <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-14 border border-neutral-200/80 shadow-xs animate-fadeIn space-y-8">
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold uppercase mb-4">
                    The Creative Vision
                  </h3>
                  <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
                    {product.longDescription || product.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-neutral-100">
                  <h4 className="font-serif text-xl font-bold uppercase mb-4">
                    Artisanal Specifications & Attributes
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features?.map((f, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-black flex-shrink-0" />
                        <span className="text-xs md:text-sm text-neutral-700 font-medium">
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Patron Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="max-w-5xl mx-auto animate-fadeIn space-y-10">
                {/* Rating Overview Card */}
                <div className="bg-white rounded-3xl p-8 md:p-10 border border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-center md:text-left space-y-2">
                    <div className="font-serif text-5xl font-black text-neutral-900">
                      {(product.rating || 4.9).toFixed(1)}
                    </div>
                    <div className="flex text-amber-400 gap-1 justify-center md:justify-start">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} className="fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">
                      Based on {reviewsList.length + 24} Verified Patron Evaluations
                    </p>
                  </div>

                  {/* Rating Breakdown Bars */}
                  <div className="w-full md:w-64 space-y-2 text-xs">
                    {[
                      { stars: "5 Stars", pct: "92%" },
                      { stars: "4 Stars", pct: "7%" },
                      { stars: "3 Stars", pct: "1%" },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="w-14 text-neutral-500 font-medium">{row.stars}</span>
                        <div className="flex-1 bg-neutral-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-black h-full rounded-full" style={{ width: row.pct }} />
                        </div>
                        <span className="w-8 text-right font-bold text-neutral-700">{row.pct}</span>
                      </div>
                    ))}
                  </div>

                  {/* Write Review CTA */}
                  <button
                    onClick={() => setIsWriteReviewOpen(true)}
                    className="bg-black text-white hover:bg-neutral-800 px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition cursor-pointer shadow-md"
                  >
                    Compose a Review
                  </button>
                </div>

                {/* Reviews List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reviewsList.map((rev, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-200/80 shadow-xs space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex text-amber-400 gap-1">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} size={14} className="fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-[11px] text-neutral-400 font-medium">{rev.date}</span>
                      </div>
                      <h4 className="font-bold text-base text-neutral-900">"{rev.heading}"</h4>
                      <p className="text-neutral-600 text-sm leading-relaxed">{rev.text}</p>
                      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                        <span className="font-bold text-neutral-800">{rev.name}</span>
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <Check size={12} /> {rev.role}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs Tab */}
            {activeTab === "faqs" && (
              <div className="max-w-3xl mx-auto space-y-4 animate-fadeIn">
                {faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full flex items-center justify-between p-6 text-left font-serif font-bold text-base md:text-lg text-neutral-900 cursor-pointer hover:bg-neutral-50 transition"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          size={18}
                          className={`transform transition-transform duration-300 text-neutral-500 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6 pt-1 text-neutral-600 text-sm leading-relaxed border-t border-neutral-100 animate-fadeIn">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* 4. Complete the Look / You May Also Like */}
        <div className="mt-20 md:mt-28 pt-16 border-t border-neutral-200">
          <div className="text-center mb-12">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-400 block mb-2">
              Curated Wardrobe Companions
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-black uppercase text-neutral-900 tracking-tight">
              Complete The Silhouette
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-[1500] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSizeGuideOpen(false)} />
          <div className="relative bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl z-10 animate-fadeIn border border-neutral-100">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-6">
              <h3 className="font-serif text-2xl font-bold uppercase">Atelier Size & Measurement Guide</h3>
              <button onClick={() => setIsSizeGuideOpen(false)} className="p-1 rounded-full hover:bg-neutral-100">
                <X size={20} />
              </button>
            </div>
            <p className="text-xs text-neutral-500 mb-6">
              Our silhouettes are cut according to modern European atelier proportions. All values in inches and centimeters.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF9F6] text-neutral-700 uppercase font-bold tracking-wider">
                  <tr>
                    <th className="p-3">Size</th>
                    <th className="p-3">Chest (in / cm)</th>
                    <th className="p-3">Waist (in / cm)</th>
                    <th className="p-3">Sleeve (in / cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  <tr>
                    <td className="p-3 font-bold">Small (36R)</td>
                    <td className="p-3">36 - 38 in / 91 - 96 cm</td>
                    <td className="p-3">30 - 32 in / 76 - 81 cm</td>
                    <td className="p-3">33.5 in / 85 cm</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">Medium (38R)</td>
                    <td className="p-3">38 - 40 in / 97 - 102 cm</td>
                    <td className="p-3">32 - 34 in / 81 - 86 cm</td>
                    <td className="p-3">34.5 in / 87 cm</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">Large (40R)</td>
                    <td className="p-3">40 - 42 in / 103 - 107 cm</td>
                    <td className="p-3">34 - 36 in / 86 - 91 cm</td>
                    <td className="p-3">35.5 in / 90 cm</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">X-Large (42R)</td>
                    <td className="p-3">42 - 44 in / 108 - 112 cm</td>
                    <td className="p-3">36 - 38 in / 91 - 96 cm</td>
                    <td className="p-3">36.5 in / 93 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="bg-black text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Write a Review Modal */}
      {isWriteReviewOpen && (
        <div className="fixed inset-0 z-[1500] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsWriteReviewOpen(false)} />
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl z-10 animate-fadeIn border border-neutral-100">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-6">
              <h3 className="font-serif text-2xl font-bold uppercase">Compose Patron Review</h3>
              <button onClick={() => setIsWriteReviewOpen(false)} className="p-1 rounded-full hover:bg-neutral-100">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="e.g. Laurent de Vigny"
                  className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Garment Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      type="button"
                      key={starVal}
                      onClick={() => setReviewRating(starVal)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        size={22}
                        className={starVal <= reviewRating ? "text-amber-400 fill-amber-400" : "text-neutral-300"}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Your Critique & Impressions
                </label>
                <textarea
                  rows={4}
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share notes regarding the textile drape, hand-feel, fit accuracy, and craftsmanship..."
                  className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl p-4 text-xs outline-none focus:border-black leading-relaxed"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition shadow-lg cursor-pointer"
              >
                Submit Critique
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

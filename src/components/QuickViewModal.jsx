import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeQuickView, showToast } from "../redux/reducer/uiReducer";
import { addToCart } from "../redux/reducer/cartReducer";
import { toggleWishlist } from "../redux/reducer/wishlistReducer";
import { X, Star, Heart, Check, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickViewModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isQuickViewOpen, quickViewProduct } = useSelector((state) => state.ui);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [selectedColor, setSelectedColor] = useState("");
  const [qty, setQty] = useState(1);

  const product = quickViewProduct;
  const isWishlisted = product ? wishlistItems.some((item) => item.id === product.id) : false;

  useEffect(() => {
    if (product) {
      const defaultImg = product.image || product.img || product.images?.[0];
      setSelectedImage(defaultImg);
      const defaultCol = product.colors?.[0]?.value || "#111111";
      setSelectedColor(defaultCol);
      const defSize = product.sizes?.[0] || "Medium";
      setSelectedSize(defSize);
      setQty(1);
    }
  }, [product]);

  if (!isQuickViewOpen || !product) return null;

  const images = product.images && product.images.length > 0
    ? product.images
    : [product.image || product.img].filter(Boolean);

  const handleAddToCart = () => {
    dispatch(
      addToCart(product, {
        selectedSize,
        selectedColor,
        quantity: qty,
      })
    );
    dispatch(showToast(`Added ${qty} × ${product.title || product.name} (${selectedSize}) to bag`));
    dispatch(closeQuickView());
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
    dispatch(
      showToast(
        isWishlisted
          ? `Removed from your wishlist`
          : `Saved ${product.title || product.name} to wishlist`,
        "wishlist"
      )
    );
  };

  const handleGoToProduct = () => {
    dispatch(closeQuickView());
    navigate(`/productpages/${product.id}`);
  };

  return (
    <div className="fixed inset-0 z-[1500] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => dispatch(closeQuickView())}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#FFFFFF] rounded-3xl shadow-2xl overflow-hidden z-10 animate-fadeIn border border-[#E7E5E4] max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={() => dispatch(closeQuickView())}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-[#FFFFFF]/90 hover:bg-[#111111] hover:text-[#FFFFFF] text-[#111111] rounded-full flex items-center justify-center transition border border-[#E7E5E4] shadow-xs cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Left: Gallery */}
        <div className="w-full md:w-1/2 bg-[#FAFAF9] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E7E5E4]">
          <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#E7E5E4] relative shadow-xs">
            <img
              src={selectedImage || product.image || product.img}
              alt={product.title || product.name}
              className="w-full h-full object-contain md:object-cover object-center transition-all duration-500"
            />
            {product.tag && (
              <span className="absolute top-4 left-4 bg-[#111111] text-[#FFFFFF] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-xs">
                {product.tag}
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1 no-scrollbar">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-14 h-18 rounded-lg overflow-hidden border-2 flex-shrink-0 transition cursor-pointer ${
                    selectedImage === imgUrl ? "border-[#111111] scale-105" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Controls */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[90vh] md:max-h-[600px] bg-[#FFFFFF]">
          <div>
            <div className="flex items-center justify-between text-xs text-[#78716C] font-bold uppercase tracking-widest mb-2">
              <span>{product.category || "Atelier Ready-To-Wear"}</span>
              <div className="flex items-center gap-1 text-[#171717]">
                <Star size={13} className="fill-[#C8A96B] text-[#C8A96B]" />
                <span className="font-semibold">{product.rating || 4.9}</span>
                <span className="text-[#78716C]">({product.reviewCount || 34})</span>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#171717] leading-tight mb-2">
              {product.title || product.name}
            </h2>

            {product.subtitle && (
              <p className="text-xs text-[#78716C] italic mb-4 font-serif">
                {product.subtitle}
              </p>
            )}

            {/* Pricing */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl font-bold text-[#292524] font-sans">
                ${product.price}
              </span>
              {product.oldPrice && product.oldPrice > product.price && (
                <>
                  <span className="text-[#78716C] line-through text-base">
                    ${product.oldPrice}
                  </span>
                  <span className="bg-[#C8A96B] text-[#111111] text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                    Save ${product.oldPrice - product.price}
                  </span>
                </>
              )}
            </div>

            <p className="text-[#78716C] text-xs md:text-sm leading-relaxed mb-6">
              {product.description || "Designed with timeless elegance and precision tailoring using responsibly sourced premium fibers."}
            </p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-5">
                <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider mb-2 text-[#111111]">
                  <span>Color:</span>
                  <span className="text-[#78716C] font-normal">
                    {product.colors.find((c) => c.value === selectedColor)?.name || "Selected"}
                  </span>
                </div>
                <div className="flex gap-2">
                  {product.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(c.value)}
                      className={`w-8 h-8 rounded-full border border-[#E7E5E4] flex items-center justify-center transition-all cursor-pointer ${
                        selectedColor === c.value ? "ring-2 ring-[#111111] ring-offset-2 scale-110 shadow-xs" : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: c.value }}
                      title={c.name}
                    >
                      {selectedColor === c.value && (
                        <Check size={14} className={c.value === "#F8F8F8" || c.value === "#ECEAE6" || c.value === "#FFFFFF" ? "text-black" : "text-white"} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider mb-2 text-[#111111]">
                <span>Size:</span>
                <span className="text-[#78716C] font-normal">{selectedSize}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(product.sizes || ["Small", "Medium", "Large", "X-Large"]).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 text-xs font-medium rounded-xl border transition cursor-pointer ${
                      selectedSize === sz
                        ? "bg-[#111111] text-[#FFFFFF] border-[#111111]"
                        : "bg-[#FAFAF9] hover:bg-[#FFFFFF] text-[#111111] border-[#E7E5E4]"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#E7E5E4] space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center justify-between bg-[#FAFAF9] border border-[#E7E5E4] rounded-full px-4 py-2.5 w-28">
                <button
                  onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                  className="text-[#78716C] hover:text-[#111111] font-bold text-base px-1 cursor-pointer"
                >
                  −
                </button>
                <span className="text-xs font-bold text-[#111111]">{qty}</span>
                <button
                  onClick={() => setQty((prev) => prev + 1)}
                  className="text-[#78716C] hover:text-[#111111] font-bold text-base px-1 cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#111111] text-[#FFFFFF] hover:bg-[#C8A96B] hover:text-[#111111] transition py-3 rounded-full text-xs md:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                Add to Shopping Bag • ${(product.price * qty).toFixed(0)}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={handleToggleWishlist}
                className={`w-11 h-11 rounded-full border border-[#E7E5E4] flex items-center justify-center transition cursor-pointer ${
                  isWishlisted
                    ? "bg-red-50 text-red-500 border-red-200"
                    : "bg-[#FFFFFF] hover:border-[#111111] text-[#111111]"
                }`}
                title="Save to Wishlist"
              >
                <Heart size={18} className={isWishlisted ? "fill-red-500" : ""} />
              </button>
            </div>

            {/* View Full Product Link */}
            <button
              onClick={handleGoToProduct}
              className="w-full text-center text-xs font-semibold uppercase tracking-widest text-[#78716C] hover:text-[#111111] flex items-center justify-center gap-1.5 py-1.5 transition cursor-pointer"
            >
              View Complete Garment Details & Editorial Notes
              <ArrowRight size={13} />
            </button>

            {/* Value Props */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E7E5E4] text-[11px] text-[#78716C]">
              <div className="flex items-center gap-1.5">
                <Truck size={14} className="text-[#111111]" />
                <span>Complimentary express delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#111111]" />
                <span>White-glove 30-day returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, Eye, ShoppingBag, Star, Check } from "lucide-react";
import { addToCart } from "../redux/reducer/cartReducer";
import { toggleWishlist } from "../redux/reducer/wishlistReducer";
import { openQuickView, showToast } from "../redux/reducer/uiReducer";

// Helper to resolve exact colors:
// If a product has 1 color -> 1 dot. If 2 colors -> 2 dots. Never arbitrary fake counts.
const resolveExactProductColors = (data) => {
  if (!data) return [];
  if (Array.isArray(data.colors) && data.colors.length > 0) {
    return data.colors.map((c) =>
      typeof c === "string" ? { name: c, value: c } : c
    );
  }
  if (data.color) {
    const val = data.color.startsWith("#")
      ? data.color
      : data.color === "black"
      ? "#111111"
      : data.color === "white"
      ? "#FFFFFF"
      : data.color === "blue"
      ? "#1A2B44"
      : data.color === "red"
      ? "#B22222"
      : "#111111";
    return [{ name: data.colorName || data.color, value: val }];
  }
  const t = (data.title || data.name || "").toLowerCase();
  if (t.includes("black")) return [{ name: "Obsidian Black", value: "#111111" }];
  if (t.includes("white")) return [{ name: "White", value: "#FFFFFF" }];
  if (t.includes("blue") || t.includes("jean")) return [{ name: "Navy Blue", value: "#1A2B44" }];
  if (t.includes("red") || t.includes("plaid")) return [{ name: "Crimson Red", value: "#B22222" }];
  if (t.includes("green") || t.includes("olive")) return [{ name: "Olive Green", value: "#4B5320" }];
  if (t.includes("camel") || t.includes("brown")) return [{ name: "Camel", value: "#C8A96B" }];
  if (t.includes("grey") || t.includes("gray")) return [{ name: "Grey", value: "#78716C" }];
  return [{ name: "Classic Shade", value: "#111111" }];
};

const ProductCard = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const [isHovered, setIsHovered] = useState(false);

  const resolvedColors = resolveExactProductColors(data);
  const [selectedColor, setSelectedColor] = useState(
    resolvedColors[0]?.value || null
  );

  if (!data) return null;

  const title = data.title || data.name || "Untitled Garment";
  const primaryImg = data.image || data.img || data.imageUrl || (data.images && data.images[0]);
  const secondaryImg = data.hoverImage || (data.images && data.images[1]) || primaryImg;
  const price = Number(data.price) || 0;
  const oldPrice = Number(data.oldPrice) || 0;
  const discount =
    oldPrice > price
      ? `-${Math.round(((oldPrice - price) / oldPrice) * 100)}%`
      : data.discount || null;

  const isWishlisted = wishlistItems.some((item) => item.id === data.id);
  const departmentLabel = data.subCategory || data.gender || "Atelier";

  const handleCardClick = () => {
    navigate(`/productpages/${data.id}`);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist(data));
    dispatch(
      showToast(
        isWishlisted
          ? `Removed "${title}" from wishlist`
          : `Saved "${title}" to your wishlist`,
        "wishlist"
      )
    );
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    dispatch(openQuickView(data));
  };

  const handleQuickAdd = (e, size = "Medium") => {
    e.stopPropagation();
    dispatch(
      addToCart(data, {
        selectedSize: size,
        selectedColor: selectedColor || resolvedColors[0]?.value || "#111111",
        quantity: 1,
      })
    );
    dispatch(showToast(`Added ${title} (${size}) to shopping bag`));
  };

  const getDisplayDepartment = (label) => {
    const l = (label || "").toLowerCase();
    if (l.includes("women") || l.includes("ladies")) return "Ladies";
    if (l.includes("boy")) return "Kids: Boys";
    if (l.includes("girl")) return "Kids: Girls";
    if (l.includes("kid")) return "Kids";
    return "Men";
  };

  const badgeText = getDisplayDepartment(departmentLabel);

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-[#FFFFFF] rounded-2xl p-3 border border-[#E7E5E4] hover:border-[#111111]/40 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between cursor-pointer select-none relative overflow-hidden"
    >
      {/* 1. Garment Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#FAFAF9] mb-3 border border-[#E7E5E4]/80 flex items-center justify-center">
        {/* Primary & Secondary Images (Fade and smooth zoom on hover) */}
        <img
          src={primaryImg}
          alt={title}
          className={`absolute inset-0 w-full h-full object-contain md:object-cover object-center transition-all duration-700 ease-out ${
            isHovered && secondaryImg ? "opacity-0 scale-105" : "opacity-100 scale-100"
          }`}
          loading="lazy"
        />

        {secondaryImg && (
          <img
            src={secondaryImg}
            alt={`${title} alternate view`}
            className={`absolute inset-0 w-full h-full object-contain md:object-cover object-center transition-all duration-700 ease-out ${
              isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
            loading="lazy"
          />
        )}

        {/* Sale Badge: Visible cleanly in top left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {discount && (
            <span className="bg-[#C8A96B] text-[#111111] text-[9px] md:text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-xs">
              SALE {discount}
            </span>
          )}

          {/* Department badge reveals smoothly on hover */}
          <span
            className={`text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#111111]/90 text-[#FFFFFF] backdrop-blur-xs transition-all duration-300 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            {badgeText}
          </span>
        </div>

        {/* Action Buttons: Wishlist & Quick View - REVEAL ONLY ON HOVER */}
        <div
          className={`absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-20 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3 pointer-events-none"
          }`}
        >
          {/* Wishlist Button */}
          <button
            type="button"
            onClick={handleWishlistToggle}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-xs border border-[#E7E5E4] cursor-pointer ${
              isWishlisted
                ? "bg-[#FFFFFF] text-red-500 scale-105"
                : "bg-[#FFFFFF]/95 text-[#111111] hover:bg-[#111111] hover:text-[#FFFFFF]"
            }`}
            title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
          >
            <Heart size={15} className={isWishlisted ? "fill-red-500" : ""} />
          </button>

          {/* Quick View Button */}
          <button
            type="button"
            onClick={handleQuickView}
            className="w-8 h-8 rounded-full bg-[#FFFFFF]/95 text-[#111111] hover:bg-[#111111] hover:text-[#FFFFFF] border border-[#E7E5E4] flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-xs cursor-pointer"
            title="Quick View Piece"
          >
            <Eye size={15} />
          </button>
        </div>

        {/* Hover Quick Size & Add To Bag Drawer: SLIDES UP ONLY ON HOVER */}
        <div
          className={`absolute bottom-0 inset-x-0 p-2.5 z-20 transition-all duration-400 ease-out ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-full pointer-events-none"
          }`}
        >
          <div className="bg-[#FFFFFF]/95 backdrop-blur-md rounded-xl p-2.5 shadow-xl border border-[#E7E5E4] flex flex-col gap-2">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#78716C] px-0.5">
              <span>Quick Add Size</span>
              <span className="text-[#C8A96B] font-medium">Click to Add</span>
            </div>

            {/* Size Selectors */}
            <div className="flex justify-between gap-1">
              {(data.sizes || ["S", "M", "L", "XL"]).slice(0, 4).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={(e) => handleQuickAdd(e, size)}
                  className="flex-1 py-1.5 text-[10px] font-bold rounded-lg bg-[#FAFAF9] border border-[#E7E5E4] hover:bg-[#111111] hover:text-[#FFFFFF] hover:border-[#111111] text-[#111111] transition-colors cursor-pointer text-center"
                >
                  {size.length > 3 ? size.charAt(0) : size}
                </button>
              ))}
            </div>

            {/* Instant Add to Bag Button */}
            <button
              type="button"
              onClick={(e) => handleQuickAdd(e, "Medium")}
              className="w-full bg-[#111111] hover:bg-[#C8A96B] text-[#FFFFFF] hover:text-[#111111] py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <ShoppingBag size={12} />
              <span>Add to Shopping Bag</span>
            </button>
          </div>
        </div>

        {/* Mobile Quick Add (Touch Screens) */}
        <button
          type="button"
          onClick={(e) => handleQuickAdd(e, "Medium")}
          className="md:hidden absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-[#111111] text-[#FFFFFF] flex items-center justify-center shadow-md active:scale-95 transition"
          title="Add to bag"
        >
          <ShoppingBag size={13} />
        </button>
      </div>

      {/* 2. Garment Essential Info */}
      <div className="flex flex-col gap-1 px-1">
        {/* Title */}
        <h3 className="font-serif font-bold text-sm sm:text-base text-[#171717] leading-snug truncate group-hover:text-[#C8A96B] transition-colors">
          {title}
        </h3>

        {/* Price Row */}
        <div className="flex items-center justify-between gap-2 pt-0.5">
          <div className="flex items-center gap-2">
            <span className="font-sans font-bold text-sm sm:text-base text-[#292524]">
              ${price}
            </span>
            {oldPrice > price && (
              <span className="font-sans text-xs text-[#78716C] line-through">
                ${oldPrice}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-[#171717] text-xs">
            <Star size={11} className="fill-[#C8A96B] text-[#C8A96B]" />
            <span className="font-bold text-[11px]">{Number(data.rating || 4.9).toFixed(1)}</span>
          </div>
        </div>

        {/* HOVER REVEAL DETAILS: Color Swatches & Category Info only appear when hovered */}
        <div
          className={`overflow-hidden transition-all duration-400 ease-out ${
            isHovered
              ? "max-h-12 opacity-100 mt-1.5 pt-1.5 border-t border-[#E7E5E4]"
              : "max-h-0 opacity-0 mt-0 pt-0 border-transparent pointer-events-none"
          }`}
        >
          <div className="flex items-center justify-between text-[10px] text-[#78716C]">
            {/* EXACT Color Swatches */}
            {resolvedColors.length > 0 && (
              <div className="flex items-center gap-1.5">
                {resolvedColors.map((c, i) => (
                  <span
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedColor(c.value);
                    }}
                    className={`w-3 h-3 rounded-full border border-[#E7E5E4] transition-all cursor-pointer ${
                      selectedColor === c.value
                        ? "ring-2 ring-[#111111] ring-offset-1 scale-110 shadow-xs"
                        : "hover:scale-110 opacity-80 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
                <span className="text-[10px] text-[#78716C] font-medium ml-1">
                  {resolvedColors.length === 1 ? "1 shade" : `${resolvedColors.length} shades`}
                </span>
              </div>
            )}

            <span className="uppercase font-semibold tracking-wider text-[9px] text-[#78716C]">
              {data.category || "Collection"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

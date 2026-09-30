import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  closeCartDrawer,
  incrementQty,
  decrementQty,
  removeItem,
  applyPromoCode,
  removePromoCode,
} from "../redux/reducer/cartReducer";
import { showToast } from "../redux/reducer/uiReducer";
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, isDrawerOpen, promoCode, discountPercentage, freeShippingThreshold } = useSelector(
    (state) => state.cart
  );

  const [promoInput, setPromoInput] = useState("");

  if (!isDrawerOpen) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (item.qty || 1),
    0
  );

  const discountAmount = subtotal * (discountPercentage || 0);
  const eligibleForFreeShipping = subtotal >= freeShippingThreshold;
  const shippingFee = subtotal === 0 || eligibleForFreeShipping ? 0 : 15;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    dispatch(applyPromoCode(promoInput));
    if (["ATELIER20", "VOGUE20", "SHOP20"].includes(promoInput.trim().toUpperCase())) {
      dispatch(showToast("20% Runway Discount Applied Successfully!"));
    } else {
      dispatch(showToast(`Code "${promoInput.toUpperCase()}" applied`, "info"));
    }
    setPromoInput("");
  };

  const handleCheckout = () => {
    dispatch(closeCartDrawer());
    navigate("/shiping");
  };

  const handleViewCart = () => {
    dispatch(closeCartDrawer());
    navigate("/cart");
  };

  return (
    <div className="fixed inset-0 z-[1200] overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => dispatch(closeCartDrawer())}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFFFF] shadow-2xl flex flex-col animate-slideInRight border-l border-[#E7E5E4]">
          {/* Header */}
          <div className="p-6 border-b border-[#E7E5E4] flex items-center justify-between bg-[#FFFFFF]">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#111111]" />
              <h2 className="font-serif text-xl font-bold uppercase tracking-wider text-[#111111]">
                Shopping Bag
              </h2>
              <span className="text-xs bg-[#111111] text-[#FFFFFF] font-bold px-2 py-0.5 rounded-full ml-1">
                {items.reduce((acc, it) => acc + (it.qty || 1), 0)}
              </span>
            </div>
            <button
              onClick={() => dispatch(closeCartDrawer())}
              className="p-2 text-[#78716C] hover:text-[#111111] rounded-full hover:bg-[#FAFAF9] transition cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-[#FAFAF9] px-6 py-4 border-b border-[#E7E5E4]">
            <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider mb-2">
              {eligibleForFreeShipping ? (
                <span className="text-[#111111] flex items-center gap-1.5 font-bold">
                  <Sparkles size={14} className="text-[#C8A96B]" /> Unlocked Complimentary Express Transit!
                </span>
              ) : (
                <span className="text-[#78716C]">
                  Add <span className="font-bold text-[#111111]">${amountNeeded.toFixed(0)}</span> more for Free Express
                </span>
              )}
              <span className="text-[10px] text-[#78716C] font-bold">{shippingProgress}%</span>
            </div>
            <div className="w-full bg-[#E7E5E4] h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  eligibleForFreeShipping ? "bg-[#C8A96B]" : "bg-[#111111]"
                }`}
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] flex items-center justify-center text-[#78716C]">
                  <ShoppingBag size={28} />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold mb-1 text-[#111111]">Your Shopping Bag is Empty</h3>
                  <p className="text-xs text-[#78716C] max-w-xs">
                    Curate your signature wardrobe from our latest runway and timeless essentials.
                  </p>
                </div>
                <button
                  onClick={() => {
                    dispatch(closeCartDrawer());
                    navigate("/shop");
                  }}
                  className="bg-[#111111] text-[#FFFFFF] hover:bg-[#C8A96B] hover:text-[#111111] px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartId}
                  className="flex gap-4 p-3 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] relative group transition hover:bg-[#FFFFFF]"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-[#FFFFFF] rounded-xl overflow-hidden flex-shrink-0 border border-[#E7E5E4]">
                    <img
                      src={item.image || item.img || item.images?.[0]}
                      alt={item.title || item.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0 pr-6">
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#171717] truncate">
                        {item.title || item.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-[#78716C] mt-1">
                        <span>Size: <strong className="text-[#171717]">{item.selectedSize || "M"}</strong></span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <span>Color:</span>
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-[#E7E5E4] inline-block"
                            style={{ backgroundColor: item.selectedColor || "#111111" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-[#FFFFFF] border border-[#E7E5E4] rounded-full px-2.5 py-1">
                        <button
                          onClick={() => dispatch(decrementQty(item.cartId))}
                          className="text-[#78716C] hover:text-[#111111] font-bold text-xs px-1 cursor-pointer"
                        >
                          −
                        </button>
                        <span className="text-xs font-bold px-2 text-[#111111]">{item.qty}</span>
                        <button
                          onClick={() => dispatch(incrementQty(item.cartId))}
                          className="text-[#78716C] hover:text-[#111111] font-bold text-xs px-1 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-sm font-bold text-[#292524]">
                        ${((Number(item.price) || 0) * item.qty).toFixed(0)}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => dispatch(removeItem(item.cartId))}
                    className="absolute top-3 right-3 text-[#78716C] hover:text-red-500 transition p-1 cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E7E5E4] bg-[#FAFAF9] space-y-4">
              {/* Promo Code Input */}
              {promoCode ? (
                <div className="flex items-center justify-between bg-[#C8A96B]/15 border border-[#C8A96B]/30 rounded-xl px-4 py-2 text-xs">
                  <div className="flex items-center gap-2 text-[#111111] font-semibold">
                    <Tag size={14} className="text-[#C8A96B]" />
                    <span>Code {promoCode} ({(discountPercentage * 100).toFixed(0)}% OFF)</span>
                  </div>
                  <button
                    onClick={() => dispatch(removePromoCode())}
                    className="text-[#78716C] hover:text-red-600 font-bold ml-2 cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. ATELIER20)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 bg-[#FFFFFF] border border-[#E7E5E4] rounded-xl px-3 py-2 text-xs uppercase outline-none focus:border-[#111111]"
                  />
                  <button
                    type="submit"
                    className="bg-[#111111] text-[#FFFFFF] hover:bg-[#C8A96B] hover:text-[#111111] px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#78716C]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#171717]">${subtotal.toFixed(0)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#111111] font-medium">
                    <span>Privilege Discount</span>
                    <span className="text-[#C8A96B] font-bold">-${discountAmount.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Transit</span>
                  <span className="font-semibold text-[#171717]">
                    {shippingFee === 0 ? "Complimentary" : `$${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#111111] pt-2 border-t border-[#E7E5E4]">
                  <span>Estimated Total</span>
                  <span className="font-sans text-lg text-[#292524]">${grandTotal.toFixed(0)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#111111] text-[#FFFFFF] hover:bg-[#C8A96B] hover:text-[#111111] py-4 rounded-full text-xs font-bold uppercase tracking-widest transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  Proceed to Secure Checkout
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={handleViewCart}
                  className="w-full bg-[#FFFFFF] border border-[#E7E5E4] py-3 rounded-full text-xs font-bold uppercase tracking-widest text-[#111111] hover:border-[#111111] transition cursor-pointer"
                >
                  View Full Shopping Bag
                </button>
              </div>

              <p className="text-[10px] text-center text-[#78716C]">
                Taxes calculated at checkout • White-glove insured delivery
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;

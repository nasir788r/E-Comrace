import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQty,
  decrementQty,
  removeItem,
  applyPromoCode,
  removePromoCode,
  clearCart,
} from "../../redux/reducer/cartReducer";
import { showToast } from "../../redux/reducer/uiReducer";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag,
  X,
  CreditCard,
  Lock,
} from "lucide-react";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, promoCode, discountPercentage, freeShippingThreshold } = useSelector(
    (state) => state.cart
  );

  const [promoInput, setPromoInput] = useState("");
  const [giftWrapping, setGiftWrapping] = useState(false);
  const [orderNote, setOrderNote] = useState("");

  const subtotal = items.reduce(
    (acc, it) => acc + (Number(it.price) || 0) * (it.qty || 1),
    0
  );

  const discountAmount = subtotal * (discountPercentage || 0);
  const giftWrapFee = giftWrapping ? 10 : 0;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingFee = subtotal === 0 || isFreeShipping ? 0 : 15;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee + giftWrapFee);

  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    dispatch(applyPromoCode(promoInput));
    if (["ATELIER20", "VOGUE20", "SHOP20"].includes(promoInput.trim().toUpperCase())) {
      dispatch(showToast("20% Runway Privilege Applied!"));
    } else {
      dispatch(showToast(`Code "${promoInput.toUpperCase()}" applied`, "info"));
    }
    setPromoInput("");
  };

  return (
    <div className="bg-[#FAF9F6] text-[#141414] min-h-screen pb-24">
      {/* 1. Header */}
      <div className="border-b border-neutral-200/80 bg-white">
        <div className="container mx-auto px-4 md:px-10 py-8">
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
            <Link to="/" className="hover:text-black">Home</Link>
            <span>/</span>
            <span className="text-black font-bold">Shopping Bag</span>
          </nav>
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-3xl md:text-5xl font-black uppercase tracking-tight text-neutral-900">
              Shopping Bag ({items.reduce((acc, it) => acc + (it.qty || 1), 0)})
            </h1>
            {items.length > 0 && (
              <button
                onClick={() => dispatch(clearCart())}
                className="text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-red-600 transition"
              >
                Clear Entire Bag
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-10 py-10 md:py-14">
        {items.length === 0 ? (
          /* Empty Bag State */
          <div className="bg-white rounded-3xl border border-neutral-200 p-12 md:p-20 text-center max-w-2xl mx-auto shadow-xs space-y-6">
            <div className="w-20 h-20 rounded-full bg-[#FAF9F6] border border-neutral-200 flex items-center justify-center mx-auto text-neutral-400">
              <ShoppingBag size={36} />
            </div>
            <div>
              <h2 className="font-serif text-3xl font-bold uppercase mb-2">
                Your Shopping Bag Is Currently Empty
              </h2>
              <p className="text-neutral-500 text-sm max-w-md mx-auto">
                Explore our Autumn / Winter '26 runway capsule, tailoring edits, and noble cashmere knits.
              </p>
            </div>
            <Link to="/shop">
              <button className="bg-black text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition shadow-lg">
                Explore The Collection
              </button>
            </Link>
          </div>
        ) : (
          /* Active Cart Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Cart Items List & Gift Notes */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Shipping Banner */}
              <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs">
                <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider mb-2">
                  {isFreeShipping ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                      <Sparkles size={14} /> You've unlocked Complimentary Express Delivery!
                    </span>
                  ) : (
                    <span className="text-neutral-600">
                      Add <strong className="text-black font-sans">${amountNeeded.toFixed(0)}</strong> more for Free Express Delivery
                    </span>
                  )}
                  <span className="font-bold text-neutral-500">{shippingProgress}%</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      isFreeShipping ? "bg-emerald-600" : "bg-black"
                    }`}
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Card */}
              <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs divide-y divide-neutral-100 overflow-hidden">
                {items.map((item) => (
                  <div
                    key={item.cartId}
                    className="p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between hover:bg-[#FCFBF8] transition"
                  >
                    {/* Image & Title */}
                    <div className="flex gap-4 items-center">
                      <Link
                        to={`/productpages/${item.id}`}
                        className="w-24 h-32 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 flex-shrink-0"
                      >
                        <img
                          src={item.image || item.img || item.images?.[0]}
                          alt={item.title || item.name}
                          className="w-full h-full object-cover object-center hover:scale-105 transition duration-500"
                        />
                      </Link>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                          {item.category || "Atelier"}
                        </span>
                        <Link to={`/productpages/${item.id}`}>
                          <h3 className="font-serif font-bold text-base md:text-lg text-neutral-900 hover:text-neutral-600 transition">
                            {item.title || item.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-3 text-xs text-neutral-500 pt-1">
                          <span>Size: <strong className="text-black font-medium">{item.selectedSize || "M"}</strong></span>
                          <span>•</span>
                          <div className="flex items-center gap-1.5">
                            <span>Color:</span>
                            <span
                              className="w-3 h-3 rounded-full border border-neutral-300 inline-block"
                              style={{ backgroundColor: item.selectedColor || "#141414" }}
                            />
                          </div>
                        </div>
                        <p className="font-sans font-bold text-sm text-neutral-900 pt-1 sm:hidden">
                          ${(Number(item.price) || 0) * (item.qty || 1)}
                        </p>
                      </div>
                    </div>

                    {/* Stepper, Total & Remove */}
                    <div className="flex items-center justify-between w-full sm:w-auto sm:gap-8 pt-3 sm:pt-0">
                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-[#FAF9F6] border border-neutral-200 rounded-full px-3 py-1.5 shadow-xs">
                        <button
                          onClick={() => dispatch(decrementQty(item.cartId))}
                          className="text-neutral-500 hover:text-black font-bold text-sm px-1.5 cursor-pointer"
                        >
                          −
                        </button>
                        <span className="font-bold text-xs px-3">{item.qty || 1}</span>
                        <button
                          onClick={() => dispatch(incrementQty(item.cartId))}
                          className="text-neutral-500 hover:text-black font-bold text-sm px-1.5 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <div className="hidden sm:block text-right min-w-[80px]">
                        <span className="font-sans font-bold text-base text-neutral-900">
                          ${((Number(item.price) || 0) * (item.qty || 1)).toFixed(0)}
                        </span>
                        <p className="text-[10px] text-neutral-400 font-medium">
                          ${Number(item.price) || 0} each
                        </p>
                      </div>

                      {/* Trash Button */}
                      <button
                        onClick={() => dispatch(removeItem(item.cartId))}
                        className="text-neutral-400 hover:text-red-500 transition p-2 rounded-full hover:bg-neutral-100"
                        title="Remove piece"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Atelier White-Glove Packaging & Gift Box Option */}
              <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles size={20} className="text-amber-600" />
                    <div>
                      <h4 className="font-serif font-bold text-sm uppercase">
                        Signature Atelier Gift Presentation (+ $10)
                      </h4>
                      <p className="text-xs text-neutral-500">
                        Hardcover embossed gift box with satin ribbon, protective tissue, and personalized gift calligraphy.
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={giftWrapping}
                    onChange={(e) => setGiftWrapping(e.target.checked)}
                    className="w-5 h-5 accent-black rounded cursor-pointer"
                  />
                </div>

                {giftWrapping && (
                  <div className="pt-3 border-t border-neutral-100">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Calligraphy Gift Note Message
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. For Eleanor, with love from Paris."
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-black"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Summary & Checkout */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-neutral-200/80 p-6 md:p-8 shadow-sm space-y-6 sticky top-28">
              <h2 className="font-serif text-xl font-bold uppercase tracking-wider pb-4 border-b border-neutral-100">
                Order Summary
              </h2>

              {/* Promo Code Form */}
              <div>
                {promoCode ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 text-xs">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold">
                      <Tag size={15} />
                      <span>Code {promoCode} ({(discountPercentage * 100).toFixed(0)}% OFF)</span>
                    </div>
                    <button
                      onClick={() => dispatch(removePromoCode())}
                      className="text-emerald-700 hover:text-red-600 font-bold p-1"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. ATELIER20)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-[#FAF9F6] border border-neutral-200 rounded-xl px-4 py-3 text-xs uppercase outline-none focus:border-black font-medium"
                    />
                    <button
                      type="submit"
                      className="bg-black text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Breakdown */}
              <div className="space-y-3 text-xs text-neutral-600 border-b border-neutral-100 pb-5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-neutral-900 font-sans">${subtotal.toFixed(0)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Privilege Discount</span>
                    <span>-${discountAmount.toFixed(0)}</span>
                  </div>
                )}
                {giftWrapFee > 0 && (
                  <div className="flex justify-between">
                    <span>Signature Gift Presentation</span>
                    <span className="font-bold text-neutral-900 font-sans">${giftWrapFee}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-neutral-900">
                    {shippingFee === 0 ? "Complimentary" : `$${shippingFee}`}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline pt-1">
                <span className="font-serif text-lg font-bold text-neutral-900 uppercase">
                  Estimated Total
                </span>
                <div className="text-right">
                  <span className="font-sans text-2xl font-black text-neutral-900">
                    ${grandTotal.toFixed(0)}
                  </span>
                  <p className="text-[10px] text-neutral-400">All applicable duties included</p>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate("/shiping")}
                className="w-full bg-black text-white hover:bg-neutral-800 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition flex items-center justify-center gap-2.5 shadow-xl cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={14} />
              </button>

              {/* Security & Guarantees */}
              <div className="pt-4 space-y-2.5 text-[11px] text-neutral-500 border-t border-neutral-100">
                <div className="flex items-center gap-2">
                  <Lock size={14} className="text-neutral-700" />
                  <span>256-Bit SSL Encrypted End-to-End Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw size={14} className="text-neutral-700" />
                  <span>30-Day White-Glove Complimentary Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={14} className="text-neutral-700" />
                  <span>Carbon-Neutral Worldwide Courier Transit</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

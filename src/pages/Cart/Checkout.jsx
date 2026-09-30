import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { clearCart } from "../../redux/reducer/cartReducer";
import { showToast } from "../../redux/reducer/uiReducer";
import PaymentModal from "./PaymentModal";
import {
  ShieldCheck,
  Lock,
  Truck,
  CreditCard,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import BrandLogo from "../../components/BrandLogo";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, promoCode, discountPercentage, freeShippingThreshold } = useSelector(
    (state) => state.cart
  );
  const user = useSelector((state) => state.user?.user);

  // Form Fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("United States");
  const [stateRegion, setStateRegion] = useState("");
  const [zipCode, setZipCode] = useState("");

  // Shipping & Payment Options
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Card fields
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const subtotal = items.reduce(
    (acc, it) => acc + (Number(it.price) || 0) * (it.qty || 1),
    0
  );
  const discountAmount = subtotal * (discountPercentage || 0);
  const isFreeStandard = subtotal >= freeShippingThreshold;
  const shippingCost = shippingMethod === "white-glove" ? 25 : isFreeStandard ? 0 : 15;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !address.trim() || !city.trim() || !zipCode.trim()) {
      dispatch(showToast("Please fulfill all required address fields.", "error"));
      return;
    }

    if (items.length === 0) {
      dispatch(showToast("Your shopping bag is empty.", "error"));
      navigate("/shop");
      return;
    }

    const orderData = {
      orderId: `LETOILE-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...items],
      total: grandTotal,
      customer: { firstName, lastName, email, phone, address, city, country, stateRegion, zipCode },
      shippingMethod,
      paymentMethod,
    };

    setCompletedOrder(orderData);
    setIsModalOpen(true);
    dispatch(clearCart());
  };

  return (
    <div className="bg-[#FAF9F6] text-[#141414] min-h-screen pb-24 font-sans">
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        orderDetails={completedOrder}
      />

      {/* Checkout Header */}
      <div className="border-b border-neutral-200/80 bg-white">
        <div className="container mx-auto px-4 md:px-10 py-6">
          <div className="flex items-center justify-between">
            <BrandLogo variant="compact" />
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              <Lock size={14} className="text-emerald-700" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-10 py-10 md:py-14">
        {items.length === 0 && !isModalOpen ? (
          <div className="max-w-md mx-auto text-center py-20 space-y-4">
            <p className="font-serif text-2xl font-bold">Your shopping bag is empty.</p>
            <button
              onClick={() => navigate("/shop")}
              className="bg-black text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Checkout Steps */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Customer & Shipping Address */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-neutral-100">
                  <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold font-sans">
                    1
                  </div>
                  <h2 className="font-serif text-xl font-bold uppercase tracking-wider text-neutral-900">
                    Shipping Destination
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Camille"
                      className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-black font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Laurent"
                      className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-black font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. camille@atelier.com"
                      className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-black font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-black font-medium"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Street Address & Suite *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 740 Park Avenue, Apt 14B"
                      className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-black font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="New York"
                      className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-black font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      State / Province *
                    </label>
                    <input
                      type="text"
                      required
                      value={stateRegion}
                      onChange={(e) => setStateRegion(e.target.value)}
                      placeholder="NY"
                      className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-black font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Postal / Zip Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="10021"
                      className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-black font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Country
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-black font-medium"
                    >
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>France</option>
                      <option>Italy</option>
                      <option>Germany</option>
                      <option>Canada</option>
                      <option>Switzerland</option>
                      <option>Japan</option>
                      <option>United Arab Emirates</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2: Delivery Method */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-neutral-100">
                  <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold font-sans">
                    2
                  </div>
                  <h2 className="font-serif text-xl font-bold uppercase tracking-wider text-neutral-900">
                    Delivery Speed & Packaging
                  </h2>
                </div>

                <div className="space-y-3">
                  {/* Standard Express */}
                  <label
                    onClick={() => setShippingMethod("standard")}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition cursor-pointer ${
                      shippingMethod === "standard"
                        ? "border-black bg-[#FAF9F6]"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingOption"
                        checked={shippingMethod === "standard"}
                        onChange={() => setShippingMethod("standard")}
                        className="accent-black w-4 h-4 cursor-pointer"
                      />
                      <div>
                        <p className="font-bold text-xs uppercase tracking-wider text-neutral-900">
                          DHL Express Insured Courier
                        </p>
                        <p className="text-[11px] text-neutral-500">
                          Estimated delivery in 2 to 4 business days
                        </p>
                      </div>
                    </div>
                    <span className="font-bold font-sans text-xs">
                      {isFreeStandard ? "Complimentary ($0)" : "$15"}
                    </span>
                  </label>

                  {/* White-Glove VIP Courier */}
                  <label
                    onClick={() => setShippingMethod("white-glove")}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition cursor-pointer ${
                      shippingMethod === "white-glove"
                        ? "border-black bg-[#FAF9F6]"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingOption"
                        checked={shippingMethod === "white-glove"}
                        onChange={() => setShippingMethod("white-glove")}
                        className="accent-black w-4 h-4 cursor-pointer"
                      />
                      <div>
                        <p className="font-bold text-xs uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
                          <span>White-Glove Priority VIP Courier</span>
                          <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                            VIP Choice
                          </span>
                        </p>
                        <p className="text-[11px] text-neutral-500">
                          Next business day with scheduled personal concierge handover
                        </p>
                      </div>
                    </div>
                    <span className="font-bold font-sans text-xs">$25</span>
                  </label>
                </div>
              </div>

              {/* Step 3: Payment Options */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-neutral-100">
                  <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold font-sans">
                    3
                  </div>
                  <h2 className="font-serif text-xl font-bold uppercase tracking-wider text-neutral-900">
                    Payment Gateway
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: "card", label: "Credit Card" },
                    { id: "apple", label: "Apple Pay" },
                    { id: "paypal", label: "PayPal" },
                    { id: "klarna", label: "Klarna (4x)" },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition ${
                        paymentMethod === method.id
                          ? "bg-black text-white border-black shadow-sm"
                          : "bg-[#FAF9F6] border-neutral-200 text-neutral-700 hover:border-black"
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="•••• •••• •••• ••••"
                          className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-black font-mono"
                        />
                        <CreditCard size={18} className="absolute right-4 top-3.5 text-neutral-400" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-black font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                          Security CVC
                        </label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="•••"
                          className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-black font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod !== "card" && (
                  <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-neutral-200 text-xs text-neutral-600 text-center">
                    You will be directed to authorize payment through <strong className="text-black uppercase">{paymentMethod}</strong> upon completing this step.
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Review & Placement */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-6 sticky top-28">
              <h2 className="font-serif text-xl font-bold uppercase tracking-wider pb-4 border-b border-neutral-100">
                Order Review ({items.length})
              </h2>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto divide-y divide-neutral-100 pr-1 no-scrollbar space-y-1">
                {items.map((item) => (
                  <div key={item.cartId} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.image || item.img}
                        alt=""
                        className="w-12 h-14 object-cover rounded-xl bg-neutral-100 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-serif font-bold text-neutral-900 truncate">
                          {item.title || item.name}
                        </p>
                        <p className="text-[10px] text-neutral-400">
                          {item.selectedSize || "M"} • Qty: {item.qty}
                        </p>
                      </div>
                    </div>
                    <span className="font-sans font-bold text-neutral-900">
                      ${((Number(item.price) || 0) * (item.qty || 1)).toFixed(0)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Summary */}
              <div className="space-y-2 text-xs text-neutral-600 border-t border-neutral-100 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-neutral-900 font-sans">${subtotal.toFixed(0)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Privilege ({promoCode})</span>
                    <span>-${discountAmount.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery ({shippingMethod === "white-glove" ? "White-Glove VIP" : "Express"})</span>
                  <span className="font-bold text-neutral-900 font-sans">
                    {shippingCost === 0 ? "Complimentary" : `$${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-neutral-900 pt-3 border-t border-neutral-200">
                  <span className="font-serif uppercase">Total Due</span>
                  <span className="font-sans text-xl">${grandTotal.toFixed(0)}</span>
                </div>
              </div>

              {/* Authorize Button */}
              <button
                type="submit"
                className="w-full bg-black text-white hover:bg-neutral-800 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition flex items-center justify-center gap-2 shadow-xl cursor-pointer"
              >
                <span>Authorize & Place Order</span>
                <ArrowRight size={14} />
              </button>

              <div className="pt-2 text-[11px] text-center text-neutral-400">
                By placing your order, you agree to L'ÉTOILE's terms of service and white-glove return policy.
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Checkout;

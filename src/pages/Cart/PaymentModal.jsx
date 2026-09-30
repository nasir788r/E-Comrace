import React from "react";
import { Check, X, Package, Truck, Calendar, ArrowRight, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({ isOpen, onClose, orderDetails }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const orderId = orderDetails?.orderId || `LETOILE-${Math.floor(100000 + Math.random() * 900000)}`;
  const orderItems = orderDetails?.items || [];
  const total = orderDetails?.total || 0;

  // Estimated delivery date (3 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const formattedDate = deliveryDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleReturnHome = () => {
    onClose();
    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={handleReturnHome}
      />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-10 z-10 animate-fadeIn border border-neutral-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleReturnHome}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition"
        >
          <X size={20} />
        </button>

        {/* Success Icon */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-xs">
            <Check size={32} strokeWidth={2.5} />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-700 block">
            Payment & Allocation Confirmed
          </span>
          <h2 className="font-serif text-3xl font-black uppercase text-neutral-900 tracking-tight">
            Thank You For Your Patronage
          </h2>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Your garment order has been received by our European fulfillment atelier. An authenticated receipt has been dispatched to your email.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-[#FAF9F6] rounded-2xl p-5 border border-neutral-200/80 space-y-4 mb-6">
          <div className="flex items-center justify-between text-xs pb-3 border-b border-neutral-200">
            <span className="text-neutral-500 uppercase font-semibold">Order Reference:</span>
            <span className="font-mono font-bold text-neutral-900">{orderId}</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-neutral-700">
            <Calendar size={16} className="text-neutral-500 flex-shrink-0" />
            <div>
              <span className="font-bold">Estimated White-Glove Arrival:</span>
              <p className="text-neutral-500">{formattedDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-neutral-700">
            <Truck size={16} className="text-neutral-500 flex-shrink-0" />
            <div>
              <span className="font-bold">Courier Dispatch:</span>
              <p className="text-neutral-500">DHL Express Worldwide (Tracking will activate within 12h)</p>
            </div>
          </div>
        </div>

        {/* Purchased Pieces Summary */}
        {orderItems.length > 0 && (
          <div className="space-y-3 mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Allocated Silhouettes ({orderItems.length})
            </h4>
            <div className="max-h-40 overflow-y-auto divide-y divide-neutral-100 pr-1 no-scrollbar">
              {orderItems.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.image || item.img}
                      alt={item.title || item.name}
                      className="w-10 h-12 object-cover rounded-lg bg-neutral-100 flex-shrink-0"
                    />
                    <div className="min-w-0 truncate">
                      <p className="font-serif font-bold text-neutral-900 truncate">
                        {item.title || item.name}
                      </p>
                      <p className="text-[10px] text-neutral-400">
                        Size: {item.selectedSize || "M"} • Qty: {item.qty || 1}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold font-sans ml-4 text-neutral-900">
                    ${((Number(item.price) || 0) * (item.qty || 1)).toFixed(0)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-neutral-200 text-sm font-bold">
              <span>Total Debited:</span>
              <span className="font-sans text-lg">${Number(total).toFixed(0)}</span>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="space-y-2">
          <button
            onClick={handleReturnHome}
            className="w-full bg-black text-white hover:bg-neutral-800 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Return To Atelier Collection</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
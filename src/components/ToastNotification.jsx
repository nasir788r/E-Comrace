import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideToast } from "../redux/reducer/uiReducer";
import { CheckCircle2, Heart, AlertCircle, X } from "lucide-react";

const ToastNotification = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.ui?.toast);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, dispatch]);

  if (!toast) return null;

  const isWishlist = toast.toastType === "wishlist";
  const isError = toast.toastType === "error";

  return (
    <div className="fixed bottom-6 right-6 z-[2000] max-w-sm w-full animate-fadeIn transition-all">
      <div className="bg-[#141414] text-white p-4 rounded-xl shadow-2xl border border-white/10 flex items-center gap-3 backdrop-blur-md">
        <div className="flex-shrink-0">
          {isWishlist ? (
            <Heart size={20} className="text-red-400 fill-red-400" />
          ) : isError ? (
            <AlertCircle size={20} className="text-amber-400" />
          ) : (
            <CheckCircle2 size={20} className="text-emerald-400" />
          )}
        </div>
        <div className="flex-1 text-sm font-medium text-gray-100 leading-snug">
          {toast.message}
        </div>
        <button
          onClick={() => dispatch(hideToast())}
          className="text-gray-400 hover:text-white transition p-1"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;

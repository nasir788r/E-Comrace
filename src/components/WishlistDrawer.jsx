import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  closeWishlistDrawer,
  removeFromWishlist,
  clearWishlist,
} from "../redux/reducer/wishlistReducer";
import { addToCart } from "../redux/reducer/cartReducer";
import { showToast } from "../redux/reducer/uiReducer";
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WishlistDrawer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, isDrawerOpen } = useSelector((state) => state.wishlist || { items: [], isDrawerOpen: false });

  if (!isDrawerOpen) return null;

  const handleMoveToCart = (product) => {
    dispatch(
      addToCart(product, {
        selectedSize: product.sizes?.[0] || "Medium",
        selectedColor: product.colors?.[0]?.value || "#111111",
        quantity: 1,
      })
    );
    dispatch(removeFromWishlist(product.id));
    dispatch(showToast(`Moved ${product.title || product.name} to your shopping bag`));
  };

  const handleAddAllToCart = () => {
    items.forEach((p) => {
      dispatch(
        addToCart(p, {
          selectedSize: p.sizes?.[0] || "Medium",
          selectedColor: p.colors?.[0]?.value || "#111111",
          quantity: 1,
        })
      );
    });
    dispatch(clearWishlist());
    dispatch(showToast(`Moved all ${items.length} items to your shopping bag`));
    dispatch(closeWishlistDrawer());
  };

  return (
    <div className="fixed inset-0 z-[1200] overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => dispatch(closeWishlistDrawer())}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFFFF] shadow-2xl flex flex-col animate-slideInRight border-l border-[#E7E5E4]">
          {/* Header */}
          <div className="p-6 border-b border-[#E7E5E4] flex items-center justify-between bg-[#FFFFFF]">
            <div className="flex items-center gap-2">
              <Heart size={20} className="text-red-500 fill-red-500" />
              <h2 className="font-serif text-xl font-bold uppercase tracking-wider text-[#111111]">
                Saved Items
              </h2>
              <span className="text-xs bg-[#111111] text-[#FFFFFF] font-bold px-2 py-0.5 rounded-full ml-1">
                {items.length}
              </span>
            </div>
            <button
              onClick={() => dispatch(closeWishlistDrawer())}
              className="p-2 text-[#78716C] hover:text-[#111111] rounded-full hover:bg-[#FAFAF9] transition cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] flex items-center justify-center text-[#78716C]">
                  <Heart size={28} />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold mb-1 text-[#111111]">Your Wishlist is Empty</h3>
                  <p className="text-xs text-[#78716C] max-w-xs">
                    Save pieces you love while browsing by clicking the heart icon on any product.
                  </p>
                </div>
                <button
                  onClick={() => {
                    dispatch(closeWishlistDrawer());
                    navigate("/shop");
                  }}
                  className="bg-[#111111] text-[#FFFFFF] hover:bg-[#C8A96B] hover:text-[#111111] px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              items.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] relative group transition hover:bg-[#FFFFFF]"
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      dispatch(closeWishlistDrawer());
                      navigate(`/productpages/${product.id}`);
                    }}
                    className="w-20 h-24 bg-[#FFFFFF] rounded-xl overflow-hidden flex-shrink-0 border border-[#E7E5E4] cursor-pointer"
                  >
                    <img
                      src={product.image || product.img || product.images?.[0]}
                      alt={product.title || product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0 pr-6">
                    <div>
                      <h4
                        onClick={() => {
                          dispatch(closeWishlistDrawer());
                          navigate(`/productpages/${product.id}`);
                        }}
                        className="font-serif font-bold text-sm text-[#171717] truncate cursor-pointer hover:text-[#C8A96B] transition"
                      >
                        {product.title || product.name}
                      </h4>
                      <p className="text-[11px] text-[#78716C] uppercase tracking-wider mt-0.5">
                        {product.category || "Atelier"}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-[#292524]">
                          ${product.price}
                        </span>
                        {product.oldPrice && (
                          <span className="text-xs text-[#78716C] line-through">
                            ${product.oldPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-2">
                      <button
                        onClick={() => handleMoveToCart(product)}
                        className="bg-[#111111] text-[#FFFFFF] hover:bg-[#C8A96B] hover:text-[#111111] text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                      >
                        <ShoppingBag size={12} />
                        Move to Bag
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => {
                      dispatch(removeFromWishlist(product.id));
                      dispatch(showToast(`Removed from wishlist`, "wishlist"));
                    }}
                    className="absolute top-3 right-3 text-[#78716C] hover:text-red-500 transition p-1 cursor-pointer"
                    title="Remove from wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E7E5E4] bg-[#FAFAF9] space-y-3">
              <button
                onClick={handleAddAllToCart}
                className="w-full bg-[#111111] text-[#FFFFFF] hover:bg-[#C8A96B] hover:text-[#111111] py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                Move All ({items.length}) to Shopping Bag
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => dispatch(clearWishlist())}
                className="w-full text-center text-xs font-semibold text-[#78716C] hover:text-red-600 transition py-1 cursor-pointer"
              >
                Clear Entire Wishlist
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistDrawer;

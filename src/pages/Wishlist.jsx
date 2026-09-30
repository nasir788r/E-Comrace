import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearWishlist, removeFromWishlist } from "../redux/reducer/wishlistReducer";
import { addToCart } from "../redux/reducer/cartReducer";
import { showToast } from "../redux/reducer/uiReducer";
import ProductCard from "../components/ProductCard";
import { Heart, ShoppingBag, Trash2, ArrowRight, ChevronRight } from "lucide-react";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  const handleAddAllToCart = () => {
    wishlistItems.forEach((product) => {
      dispatch(
        addToCart(product, {
          selectedSize: product.sizes?.[0] || "Medium",
          selectedColor: product.colors?.[0]?.value || "#141414",
          quantity: 1,
        })
      );
    });
    dispatch(clearWishlist());
    dispatch(showToast(`Transferred all ${wishlistItems.length} pieces to your shopping bag`));
  };

  return (
    <div className="bg-[#FAF9F6] text-[#141414] min-h-screen pb-24">
      {/* Header */}
      <div className="border-b border-neutral-200/80 bg-white">
        <div className="container mx-auto px-4 md:px-10 py-8">
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
            <Link to="/" className="hover:text-black">Home</Link>
            <ChevronRight size={12} />
            <span className="text-black font-bold">Saved Silhouettes</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black uppercase text-neutral-900 tracking-tight">
                Wishlist & Private Edits ({wishlistItems.length})
              </h1>
              <p className="text-neutral-500 text-xs md:text-sm mt-1">
                Your personally curated selection of runway pieces and noble essentials.
              </p>
            </div>

            {wishlistItems.length > 0 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddAllToCart}
                  className="bg-black text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition shadow-md flex items-center gap-2"
                >
                  <ShoppingBag size={14} />
                  <span>Transfer All to Bag</span>
                </button>
                <button
                  onClick={() => dispatch(clearWishlist())}
                  className="border border-neutral-300 text-neutral-600 hover:text-red-600 hover:border-red-300 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-10 py-10 md:py-14">
        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-3xl border border-neutral-200 p-12 md:p-20 text-center max-w-xl mx-auto shadow-xs space-y-6">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-400 flex items-center justify-center mx-auto">
              <Heart size={32} />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold uppercase mb-2">
                No Pieces Saved In Your Wishlist
              </h2>
              <p className="text-neutral-500 text-xs max-w-sm mx-auto">
                While browsing our collection, click the heart icon on any garment to save it here for future consideration.
              </p>
            </div>
            <Link to="/shop">
              <button className="bg-black text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition shadow-lg">
                Explore The Collection
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

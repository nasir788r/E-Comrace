const initialState = {
  items: [],
  wishlistCount: 0,
  isDrawerOpen: false,
};

export const TOGGLE_WISHLIST = "TOGGLE_WISHLIST";
export const REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST";
export const CLEAR_WISHLIST = "CLEAR_WISHLIST";
export const OPEN_WISHLIST_DRAWER = "OPEN_WISHLIST_DRAWER";
export const CLOSE_WISHLIST_DRAWER = "CLOSE_WISHLIST_DRAWER";
export const TOGGLE_WISHLIST_DRAWER = "TOGGLE_WISHLIST_DRAWER";

export const toggleWishlist = (product) => ({
  type: TOGGLE_WISHLIST,
  payload: product,
});

export const removeFromWishlist = (productId) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: productId,
});

export const clearWishlist = () => ({
  type: CLEAR_WISHLIST,
});

export const openWishlistDrawer = () => ({
  type: OPEN_WISHLIST_DRAWER,
});

export const closeWishlistDrawer = () => ({
  type: CLOSE_WISHLIST_DRAWER,
});

export const toggleWishlistDrawer = () => ({
  type: TOGGLE_WISHLIST_DRAWER,
});

export default function wishlistReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_WISHLIST: {
      const product = action.payload;
      const exists = state.items.some((item) => item.id === product.id);
      let updated;
      if (exists) {
        updated = state.items.filter((item) => item.id !== product.id);
      } else {
        updated = [...state.items, { ...product, addedAt: Date.now() }];
      }
      return {
        ...state,
        items: updated,
        wishlistCount: updated.length,
      };
    }

    case REMOVE_FROM_WISHLIST: {
      const updated = state.items.filter((item) => item.id !== action.payload);
      return {
        ...state,
        items: updated,
        wishlistCount: updated.length,
      };
    }

    case CLEAR_WISHLIST:
      return {
        ...state,
        items: [],
        wishlistCount: 0,
      };

    case OPEN_WISHLIST_DRAWER:
      return { ...state, isDrawerOpen: true };

    case CLOSE_WISHLIST_DRAWER:
      return { ...state, isDrawerOpen: false };

    case TOGGLE_WISHLIST_DRAWER:
      return { ...state, isDrawerOpen: !state.isDrawerOpen };

    default:
      return state;
  }
}

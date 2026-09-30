const initialState = {
  items: [],
  cartCount: 0,
  isDrawerOpen: false,
  promoCode: null,
  discountPercentage: 0,
  freeShippingThreshold: 150,
};

export const INCREMENT_QTY = "INCREMENT_QTY";
export const DECREMENT_QTY = "DECREMENT_QTY";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const ADD_TO_CART = "ADD_TO_CART";
export const OPEN_CART_DRAWER = "OPEN_CART_DRAWER";
export const CLOSE_CART_DRAWER = "CLOSE_CART_DRAWER";
export const TOGGLE_CART_DRAWER = "TOGGLE_CART_DRAWER";
export const APPLY_PROMO_CODE = "APPLY_PROMO_CODE";
export const REMOVE_PROMO_CODE = "REMOVE_PROMO_CODE";
export const CLEAR_CART = "CLEAR_CART";

export const incrementQty = (cartId) => ({ type: INCREMENT_QTY, payload: cartId });
export const decrementQty = (cartId) => ({ type: DECREMENT_QTY, payload: cartId });
export const removeItem = (cartId) => ({ type: REMOVE_ITEM, payload: cartId });
export const addToCart = (product, options = {}) => ({
  type: ADD_TO_CART,
  payload: { ...product, ...options },
});
export const openCartDrawer = () => ({ type: OPEN_CART_DRAWER });
export const closeCartDrawer = () => ({ type: CLOSE_CART_DRAWER });
export const toggleCartDrawer = () => ({ type: TOGGLE_CART_DRAWER });
export const applyPromoCode = (code) => ({ type: APPLY_PROMO_CODE, payload: code });
export const removePromoCode = () => ({ type: REMOVE_PROMO_CODE });
export const clearCart = () => ({ type: CLEAR_CART });

export default function cartReducer(state = initialState, action) {
  let newItems;
  switch (action.type) {
    case ADD_TO_CART: {
      const payload = action.payload;
      const quantityToAdd = payload.quantity || payload.qty || 1;
      const selectedSize = payload.selectedSize || payload.size || "Medium";
      const selectedColor = payload.selectedColor || payload.color || (payload.colors?.[0]?.value || "#111111");

      const existingIndex = state.items.findIndex(
        (item) =>
          item.id === payload.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      if (existingIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, qty: item.qty + quantityToAdd }
            : item
        );
      } else {
        const newItem = {
          ...payload,
          selectedSize,
          selectedColor,
          qty: quantityToAdd,
          cartId: Date.now() + "_" + Math.random().toString(36).substr(2, 9),
        };
        newItems = [...state.items, newItem];
      }

      return {
        ...state,
        items: newItems,
        cartCount: newItems.reduce((total, item) => total + item.qty, 0),
        isDrawerOpen: true, // Auto slide-out drawer on addition
      };
    }

    case INCREMENT_QTY: {
      newItems = state.items.map((item) =>
        item.cartId === action.payload ? { ...item, qty: item.qty + 1 } : item
      );
      return {
        ...state,
        items: newItems,
        cartCount: newItems.reduce((total, item) => total + item.qty, 0),
      };
    }

    case DECREMENT_QTY: {
      newItems = state.items.map((item) =>
        item.cartId === action.payload && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      );
      return {
        ...state,
        items: newItems,
        cartCount: newItems.reduce((total, item) => total + item.qty, 0),
      };
    }

    case REMOVE_ITEM: {
      newItems = state.items.filter((item) => item.cartId !== action.payload);
      return {
        ...state,
        items: newItems,
        cartCount: newItems.reduce((total, item) => total + item.qty, 0),
      };
    }

    case OPEN_CART_DRAWER:
      return { ...state, isDrawerOpen: true };

    case CLOSE_CART_DRAWER:
      return { ...state, isDrawerOpen: false };

    case TOGGLE_CART_DRAWER:
      return { ...state, isDrawerOpen: !state.isDrawerOpen };

    case APPLY_PROMO_CODE: {
      const code = (action.payload || "").trim().toUpperCase();
      let discount = 0;
      if (code === "ATELIER20" || code === "VOGUE20" || code === "SHOP20") {
        discount = 0.20; // 20% off
      } else if (code === "VIP10") {
        discount = 0.10;
      } else if (code === "ATELIER50") {
        discount = 0.50;
      }
      return {
        ...state,
        promoCode: code,
        discountPercentage: discount,
      };
    }

    case REMOVE_PROMO_CODE:
      return {
        ...state,
        promoCode: null,
        discountPercentage: 0,
      };

    case CLEAR_CART:
      return {
        ...state,
        items: [],
        cartCount: 0,
        promoCode: null,
        discountPercentage: 0,
      };

    default:
      return state;
  }
}

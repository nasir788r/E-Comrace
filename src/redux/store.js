import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
import cartReducer from "./reducer/cartReducer.js";
import wishlistReducer from "./reducer/wishlistReducer.js";
import uiReducer from "./reducer/uiReducer.js";
import productReducer from "./products/productReducer.js";
import { FASHION_PRODUCTS, BRAND_PARTNERS, PRESS_TESTIMONIALS } from "../data/fashionCatalog.js";

const initialUserState = {
  user: null,
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

const initialHomeState = {
  newArrivals: FASHION_PRODUCTS.slice(0, 8),
  topSelling: [...FASHION_PRODUCTS].reverse().slice(0, 8),
  reviews: PRESS_TESTIMONIALS,
  homeData: {
    heroHeadline: "Modern Luxury Reimagined.\nAutumn / Winter '26 Collection",
    heroDescription: "Explore architectural silhouettes, ultra-fine cashmere knits, and precision-tailored outerwear crafted by premier European ateliers.",
    heroBanner: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
    brands: BRAND_PARTNERS.map(b => b.name),
    headings: {
      dressStyle: "Curated Universes",
      customers: "Critical Acclaim & Verified Voices"
    }
  },
  brands: BRAND_PARTNERS.map(b => b.name),
};

const homeReducer = (state = initialHomeState, action) => {
  switch (action.type) {
    case "SET_NEW_ARRIVALS":
      return {
        ...state,
        newArrivals: action.payload && action.payload.length > 0 ? action.payload : state.newArrivals
      };
    case "SET_TOP_SELLING":
      return {
        ...state,
        topSelling: action.payload && action.payload.length > 0 ? action.payload : state.topSelling
      };
    case "SET_REVIEWS":
      return {
        ...state,
        reviews: action.payload && action.payload.length > 0 ? action.payload : state.reviews
      };
    case "SET_HOME_DATA":
      return {
        ...state,
        homeData: { ...state.homeData, ...action.payload }
      };
    case "SET_BRANDS":
      return {
        ...state,
        brands: action.payload && action.payload.length > 0 ? action.payload : state.brands
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  home: homeReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  ui: uiReducer,
  products: productReducer,
});

const persistConfig = {
  key: "root_letoile",
  storage,
  whitelist: ["user", "cart", "wishlist"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers =
  (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

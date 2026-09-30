import {
  PRODUCTS_LOADING,
  PRODUCTS_SUCCESS,
  PRODUCTS_ERROR,
} from "./productTypes";
import { FASHION_PRODUCTS } from "../../data/fashionCatalog";

const initialState = {
  products: FASHION_PRODUCTS,
  brands: [
    "CHANEL",
    "GUCCI",
    "PRADA",
    "SAINT LAURENT",
    "BOTTEGA VENETA",
    "BALENCIAGA",
    "JACQUEMUS",
    "LOEWE"
  ],
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_LOADING:
      return {
        ...state,
        loading: state.products.length === 0, // Only show loading if we don't have products yet
        error: null,
      };

    case PRODUCTS_SUCCESS: {
      const incoming = action.payload;
      // If firebase returned products, use them; if empty, preserve rich default catalog
      const finalProducts = (incoming && incoming.length > 0) ? incoming : state.products;
      return {
        ...state,
        loading: false,
        products: finalProducts,
      };
    }

    case PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;

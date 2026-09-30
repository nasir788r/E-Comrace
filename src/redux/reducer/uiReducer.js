const initialState = {
  quickViewProduct: null,
  isQuickViewOpen: false,
  toast: null,
  isSearchModalOpen: false,
  activeCurrency: "USD",
};

export const OPEN_QUICK_VIEW = "OPEN_QUICK_VIEW";
export const CLOSE_QUICK_VIEW = "CLOSE_QUICK_VIEW";
export const SHOW_TOAST = "SHOW_TOAST";
export const HIDE_TOAST = "HIDE_TOAST";
export const OPEN_SEARCH_MODAL = "OPEN_SEARCH_MODAL";
export const CLOSE_SEARCH_MODAL = "CLOSE_SEARCH_MODAL";
export const SET_CURRENCY = "SET_CURRENCY";

export const openQuickView = (product) => ({
  type: OPEN_QUICK_VIEW,
  payload: product,
});

export const closeQuickView = () => ({
  type: CLOSE_QUICK_VIEW,
});

export const showToast = (message, toastType = "success") => ({
  type: SHOW_TOAST,
  payload: { message, toastType, id: Date.now() },
});

export const hideToast = () => ({
  type: HIDE_TOAST,
});

export const openSearchModal = () => ({
  type: OPEN_SEARCH_MODAL,
});

export const closeSearchModal = () => ({
  type: CLOSE_SEARCH_MODAL,
});

export const setCurrency = (currency) => ({
  type: SET_CURRENCY,
  payload: currency,
});

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_QUICK_VIEW:
      return {
        ...state,
        quickViewProduct: action.payload,
        isQuickViewOpen: true,
      };

    case CLOSE_QUICK_VIEW:
      return {
        ...state,
        quickViewProduct: null,
        isQuickViewOpen: false,
      };

    case SHOW_TOAST:
      return {
        ...state,
        toast: action.payload,
      };

    case HIDE_TOAST:
      return {
        ...state,
        toast: null,
      };

    case OPEN_SEARCH_MODAL:
      return {
        ...state,
        isSearchModalOpen: true,
      };

    case CLOSE_SEARCH_MODAL:
      return {
        ...state,
        isSearchModalOpen: false,
      };

    case SET_CURRENCY:
      return {
        ...state,
        activeCurrency: action.payload,
      };

    default:
      return state;
  }
}

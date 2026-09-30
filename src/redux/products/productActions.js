import { collection, onSnapshot } from "../../firebase";
import { db } from "../../firebase";
import {
  PRODUCTS_LOADING,
  PRODUCTS_SUCCESS,
  PRODUCTS_ERROR,
} from "./productTypes";

let unsubscribe = null;

export const listenToProducts = () => {
  return (dispatch) => {
    dispatch({ type: PRODUCTS_LOADING });

    try {
      unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        dispatch({
          type: PRODUCTS_SUCCESS,
          payload: list,
        });
      });
    } catch (error) {
      dispatch({
        type: PRODUCTS_ERROR,
        payload: error.message,
      });
    }
  };
};


export const stopProductsListener = () => {
  return () => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
  };
};

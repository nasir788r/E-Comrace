
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

let unsubscribeBrands = null;

export const listenToBrands = () => (dispatch) => {
  
  const docRef = doc(db, "site_content", "home_page"); 

  unsubscribeBrands = onSnapshot(docRef, (snapshot) => {
    const data = snapshot.data();
    

   
    const brands = data?.brands || [];
    

    dispatch({ type: "SET_BRANDS", payload: brands });
  });
};

export const stopBrandsListener = () => {
  if (unsubscribeBrands) unsubscribeBrands();
};

import { db } from './firebase'; 
import { collection, onSnapshot, query, orderBy, doc } from 'firebase/firestore';
import { store } from './redux/store';

import { FASHION_PRODUCTS } from './data/fashionCatalog';

export const startFirebaseSync = () => {
  try {
    console.log("Firebase Sync Started...");

    // Sync Home Page content
    try {
      const homeDocRef = doc(db, "site_content", "home_page");
      onSnapshot(homeDocRef, (docSnap) => {
        if (docSnap.exists()) {
          store.dispatch({ type: 'SET_HOME_DATA', payload: docSnap.data() });
        }
      }, (err) => {
        console.warn("Firebase home_page listener notice:", err.message);
      });
    } catch (e) {
      console.warn("Could not attach home_page listener:", e);
    }

    // Sync Products
    try {
      const productsQuery = query(collection(db, "products"), orderBy("createdAt", "desc"));
      onSnapshot(productsQuery, (snapshot) => {
        if (!snapshot.empty) {
          const allProducts = snapshot.docs.map(doc => {
            const data = doc.data();
            const titleLower = (data.title || data.name || "").toLowerCase();
            const descLower = (data.description || "").toLowerCase();
            const catLower = (data.category || "").toLowerCase();

            // Strict Department & Gender Classification
            let gender = "Men";
            let subCategory = "Men";

            // 1. Kids (Boys vs Girls)
            if (
              catLower === "kids" ||
              titleLower.includes("boy") ||
              titleLower.includes("girl") ||
              titleLower.includes("kid") ||
              titleLower.includes("child") ||
              descLower.includes("boy") ||
              descLower.includes("girl")
            ) {
              if (
                titleLower.includes("girl") ||
                descLower.includes("girl") ||
                titleLower.includes("skirt") ||
                titleLower.includes("frock")
              ) {
                gender = "Kids";
                subCategory = "Girls";
              } else {
                gender = "Kids";
                subCategory = "Boys";
              }
            } else {
              // 2. Strict Men check (men's dress shirts, mens, male, etc. are ALWAYS Men)
              const isMenExplicit =
                titleLower.includes("men's") ||
                titleLower.includes("mens") ||
                titleLower.includes(" men ") ||
                titleLower.startsWith("men ") ||
                titleLower.endsWith(" men") ||
                catLower === "men" ||
                titleLower.includes("dress shirt") ||
                titleLower.includes("flannel shirt") ||
                titleLower.includes("tracksuit") ||
                descLower.includes("mens dress shirt") ||
                descLower.includes("mens button down") ||
                descLower.includes("for men") ||
                descLower.includes("men's ");

              // 3. Strict Women check (traditional kurtas, shararas, female dresses, etc.)
              const isWomenExplicit =
                titleLower.includes("women") ||
                titleLower.includes("ladies") ||
                titleLower.includes("kurti") ||
                titleLower.includes("kurta") ||
                titleLower.includes("anarkali") ||
                titleLower.includes("sharara") ||
                titleLower.includes("salwar") ||
                titleLower.includes("saree") ||
                titleLower.includes("gown") ||
                catLower === "women" ||
                catLower === "ladies" ||
                (titleLower.includes("dress") &&
                  !titleLower.includes("dress shirt") &&
                  !titleLower.includes("shirt") &&
                  !titleLower.includes("mens") &&
                  !descLower.includes("mens"));

              if (isMenExplicit && !isWomenExplicit) {
                gender = "Men";
                subCategory = "Men";
              } else if (isWomenExplicit && !isMenExplicit) {
                gender = "Women";
                subCategory = "Ladies";
              } else if (data.gender === "Women" || data.gender === "Ladies") {
                if (isMenExplicit) {
                  gender = "Men";
                  subCategory = "Men";
                } else {
                  gender = "Women";
                  subCategory = "Ladies";
                }
              } else if (data.gender === "Men") {
                gender = "Men";
                subCategory = "Men";
              } else if (isWomenExplicit) {
                gender = "Women";
                subCategory = "Ladies";
              } else {
                gender = "Men";
                subCategory = "Men";
              }
            }

            // Accurate Exact Colors Mapping:
            // If product has 1 color, show exactly 1 color.
            // If product has 2 colors, show 2 colors.
            let colors = [];
            if (Array.isArray(data.colors) && data.colors.length > 0) {
              colors = data.colors.map(c => typeof c === 'string' ? { name: c, value: c } : c);
            } else if (data.color) {
              colors = [{ name: data.colorName || "Color", value: data.color }];
            } else {
              if (titleLower.includes("black")) colors = [{ name: "Obsidian Black", value: "#141414" }];
              else if (titleLower.includes("white")) colors = [{ name: "Optical White", value: "#FFFFFF" }];
              else if (titleLower.includes("blue") || titleLower.includes("jean")) colors = [{ name: "Deep Indigo", value: "#1A2B44" }];
              else if (titleLower.includes("red") || titleLower.includes("plaid")) colors = [{ name: "Crimson Red", value: "#B22222" }];
              else if (titleLower.includes("green") || titleLower.includes("olive")) colors = [{ name: "Olive Green", value: "#4B5320" }];
              else if (titleLower.includes("brown") || titleLower.includes("camel") || titleLower.includes("tan")) colors = [{ name: "Camel", value: "#C2A684" }];
              else if (titleLower.includes("grey") || titleLower.includes("gray")) colors = [{ name: "Charcoal Grey", value: "#7A8288" }];
              else colors = [{ name: "Classic Shade", value: "#141414" }];
            }

            return {
              id: doc.id,
              ...data,
              title: data.title || data.name || "Untitled Garment",
              name: data.title || data.name || "Untitled Garment",
              image: data.image || data.img || data.imageUrl,
              img: data.image || data.img || data.imageUrl,
              price: Number(data.price) || 0,
              gender,
              subCategory,
              colors,
            };
          });

          // Combine FASHION_PRODUCTS + Firestore products so every category is fully stocked
          const combined = [
            ...FASHION_PRODUCTS,
            ...allProducts.filter(fp => !FASHION_PRODUCTS.some(cp => cp.id === fp.id))
          ];

          console.log("Products synced from Firebase + Atelier:", combined.length);
          store.dispatch({ type: 'SET_NEW_ARRIVALS', payload: combined });
          store.dispatch({ type: 'SET_TOP_SELLING', payload: [...combined].reverse() });
          store.dispatch({ type: 'PRODUCTS_SUCCESS', payload: combined });
        }
      }, (err) => {
        console.warn("Firebase products listener notice:", err.message);
      });
    } catch (e) {
      console.warn("Could not attach products listener:", e);
    }

    // Sync Reviews
    try {
      const reviewsQuery = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
      onSnapshot(reviewsQuery, (snapshot) => {
        if (!snapshot.empty) {
          const allReviews = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              name: data.name || "Anonymous Patron",
              comment: data.comment || data.content || "Exceptional quality.", 
              rating: data.rating || 5
            };
          });

          console.log("Reviews fetched from Firebase:", allReviews.length);
          store.dispatch({ type: 'SET_REVIEWS', payload: allReviews });
        }
      }, (err) => {
        console.warn("Firebase reviews listener notice:", err.message);
      });
    } catch (e) {
      console.warn("Could not attach reviews listener:", e);
    }
  } catch (globalErr) {
    console.warn("Global Firebase sync error caught:", globalErr);
  }
};
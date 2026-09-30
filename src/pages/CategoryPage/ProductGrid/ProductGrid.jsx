import React, { useState, useEffect } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { db, collection, getDocs } from "../../../firebase";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductGrid({ category = "casual", filters = {} }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const params = useParams();
  const navigate = useNavigate();
  const activeCategory = params.category || category;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, [activeCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, category]);

  const filteredProducts = products.filter(item => {
    let match = true;

    if (activeCategory) {
      match = match && item.category?.toLowerCase() === activeCategory.toLowerCase();
    }
    if (filters.type) {
      match = match && item.type?.toLowerCase() === filters.type.toLowerCase();
    }
    if (filters.style) {
      match = match && item.style?.toLowerCase() === filters.style.toLowerCase();
    }
    if (filters.color) {
      // Color map to convert hex codes to names (same as your FilterSidebar)
      const colorMap = {
        "#00C12B": "green",
        "#F50606": "red",
        "#F5DD06": "yellow",
        "#F57906": "orange",
        "#06CAF5": "cyan",
        "#063AF5": "blue",
        "#7D06F5": "purple",
        "#F506A4": "pink",
        "#FFFFFF": "white",
        "#000000": "black",
      };

      // item.color could be name or hex
      const itemColorName = colorMap[item.color?.toUpperCase()] || item.color;
      match = match && itemColorName?.toLowerCase() === filters.color.toLowerCase();
    }

    if (filters.size) {
      match = match && item.size?.toLowerCase() === filters.size.toLowerCase();
    }
    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      match = match && item.price >= filters.minPrice && item.price <= filters.maxPrice;
    }
    return match;
  });
  console.log("Filter color:", filters.color);
console.log("Products colors:", products.map(p => p.color));

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className="w-full px-0 md:px-0">
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          No products found for this selection.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 md:gap-y-8">
          {currentItems.map(item => (
            <div
              key={item.id}
              onClick={() => navigate(`/productpages/${item.id}`)}
              className="bg-white rounded-[20px] cursor-pointer"
            >
              <div className="aspect-square bg-[#F0EEED] rounded-[20px] overflow-hidden mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
              <h3 className="font-bold text-sm md:text-xl mb-1 truncate">
                {item.title}
              </h3>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.floor(item.rating) ? "#FFC633" : "none"}
                    stroke={i < Math.floor(item.rating) ? "#FFC633" : "#D1D5DB"}
                  />
                ))}
                <span className="text-xs text-gray-500">{item.reviews}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg md:text-2xl font-bold">
                  ${item.price}
                </span>
                {item.oldPrice && (
                  <>
                    <span className="line-through text-gray-400 text-sm md:text-xl">
                      ${item.oldPrice}
                    </span>
                    <span className="text-[10px] md:text-xs text-red-500 bg-red-100 px-2 py-1 rounded-full">
                      {item.discount}
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {filteredProducts.length > 0 && (
        <div className="flex justify-between items-center mt-10 border-t pt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="flex items-center gap-2 px-3 py-2 border rounded-lg disabled:opacity-40 hover:bg-gray-50"
          >
            <ArrowLeft size={16} /> Previous
          </button>

          <span className="font-semibold text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="flex items-center gap-2 px-3 py-2 border rounded-lg disabled:opacity-40 hover:bg-gray-50"
          >
            Next <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
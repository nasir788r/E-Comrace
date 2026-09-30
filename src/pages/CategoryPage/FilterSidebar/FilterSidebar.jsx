import React, { useState } from "react";
import { ChevronRight, SlidersHorizontal, Check, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FilterSidebar({ isMobile = false, onApply }) {
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [minPrice, setMinPrice] = useState(5);   
  const [maxPrice, setMaxPrice] = useState(200); 
  
  const [selectedStyle, setSelectedStyle] = useState("");

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
  const colorList = Object.keys(colorMap);

  const sizes = [
    "XX-Small", "X-Small", "Small", "Medium",
    "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"
  ];

  const PRICE_MIN = 5;   
  const PRICE_MAX = 200; 

  const updateFilters = (newUpdate) => {
    const currentFilters = {
     
      style: selectedStyle,
      color: selectedColor,
      size: selectedSize,
      minPrice,
      maxPrice,
      ...newUpdate
    };
    onApply(currentFilters);
  };

  const handleStyleClick = (style) => {
    setSelectedStyle(style);
    const path = style.toLowerCase() === "casual" ? "/categorypage" : `/category/${style.toLowerCase()}`;
    navigate(path);
  };

 
  const leftPos = ((minPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const rightPos = 100 - ((maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  return (
    <aside className={`${isMobile ? "w-full" : "w-[295px] border border-[#0000001A] rounded-[20px] px-6"} py-5 flex flex-col bg-white shadow-sm`}>

      {!isMobile && (
        <div className="flex justify-between items-center border-b border-[#0000001A] pb-4 mb-4">
          <h2 className="text-xl font-bold">Filters</h2>
          <SlidersHorizontal size={20} className="text-[#00000066]" />
        </div>
      )}

      <div className="flex-1 space-y-6">

     
        <div className="border-b border-[#0000001A] pb-4">
          {[ "T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans","Kids","Men","Women"].map((style) => (
            <div
              key={style}
                 onClick={() => handleStyleClick(style)}
              className={`flex justify-between items-center py-2 cursor-pointer transition-colors  "text-black font-semibold" : "text-[#00000099] hover:text-black"`}
            >
              <span className="text-base">{style}</span>
              <ChevronRight size={16} />
            </div>
          ))}
        </div>

  
        <div className="border-b border-[#0000001A] pb-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Price</h3>
            <ChevronUp size={20} />
          </div>
          <div className="relative h-1.5 bg-[#F0F0F0] rounded-full mx-2">
            <div
              className="absolute h-full bg-black rounded-full"
              style={{ left: `${leftPos}%`, right: `${rightPos}%` }}
            />
            <input
              type="range" min={PRICE_MIN} max={PRICE_MAX} value={minPrice}
              onChange={(e) => {
                const val = Math.min(+e.target.value, maxPrice - 5); 
                setMinPrice(val);
                updateFilters({ minPrice: val });
              }}
              className="absolute w-full -top-1 opacity-0 z-30 cursor-pointer"
            />
            <input
              type="range" min={PRICE_MIN} max={PRICE_MAX} value={maxPrice}
              onChange={(e) => {
                const val = Math.max(+e.target.value, minPrice + 5); 
                setMaxPrice(val);
                updateFilters({ maxPrice: val });
              }}
              className="absolute w-full -top-1 opacity-0 z-30 cursor-pointer"
            />

            <div className="absolute w-5 h-5 bg-black rounded-full -top-1.5 shadow-md border-2 border-white" style={{ left: `calc(${leftPos}% - 10px)` }} />
            <div className="absolute w-5 h-5 bg-black rounded-full -top-1.5 shadow-md border-2 border-white" style={{ left: `calc(${100 - rightPos}% - 10px)` }} />
          </div>
          <div className="flex justify-between mt-5 text-sm font-medium">
            <span>${minPrice}</span>
            <span>${maxPrice}</span>
          </div>
        </div>

       
        <div className="border-b border-[#0000001A] pb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Colors</h3>
            <ChevronUp size={20} />
          </div>
          <div className="grid grid-cols-5 gap-3">
            {colorList.map((color) => (
              <button
                key={color}
                onClick={() => {
                  const val = selectedColor === color ? "" : color;
                  setSelectedColor(val); 
                  updateFilters({ color: val ? colorMap[val] : "" }); 
                }}
                className={`w-[37px] h-[37px] rounded-full border border-[#0000001A] flex items-center justify-center transition-all ${selectedColor === color ? "ring-2 ring-offset-2 ring-black scale-110" : ""}`}
                style={{ backgroundColor: color }}
              >
                {selectedColor === color && (
                  <Check size={16} className={color === "#FFFFFF" ? "text-black" : "text-white"} />
                )}
              </button>
            ))}
          </div>
        </div>

 
        <div className="border-b border-[#0000001A] pb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Size</h3>
            <ChevronUp size={20} />
          </div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  const val = selectedSize === size ? "" : size;
                  setSelectedSize(val);
                  updateFilters({ size: val });
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${selectedSize === size ? "bg-black text-white" : "bg-[#F0F0F0] text-[#00000099] hover:bg-black hover:text-white"}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

      
        <div className="pb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Dress Style</h3>
            <ChevronUp size={20} />
          </div>
          {["Casual", "Formal", "Party", "Gym"].map((style) => (
            <div
              key={style}
              onClick={() => handleStyleClick(style)}
              className="flex justify-between items-center py-2 text-[#00000099] hover:text-black cursor-pointer group"
            >
              <span className="text-base group-hover:font-medium">{style}</span>
              <ChevronRight size={16} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => updateFilters({})}
        className="w-full bg-black text-white py-4 rounded-full font-medium mt-4 hover:bg-gray-800 transition-all active:scale-95"
      >
        Apply Filter
      </button>
    </aside>
  );
}

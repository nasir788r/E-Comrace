
import React from "react";
import vector from "../../assets/vector1.png";

const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-3 sm:p-4 gap-3 sm:gap-4 w-full border-b border-gray-100 last:border-none">
      <div className="flex gap-3 sm:gap-4 w-full items-stretch"> 
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-2xl flex-shrink-0 bg-[#F0EEED]" 
        />
        <div className="flex flex-col justify-between w-full h-24 sm:h-32 py-0.5">
          <div className="flex justify-between items-start w-full">
            <h3 className="font-bold text-[13px] sm:text-xl text-black leading-tight truncate max-w-32 sm:max-w-none">
              {item.title}
            </h3>
            <button onClick={onRemove} className="flex-shrink-0">
              <img src={vector} alt="delete" className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="flex flex-col justify-between flex-grow">
            <div className="mt-0.5">
              <p className="text-[10px] sm:text-sm text-gray-500">
                Size: <span className="text-gray-400">{item.size}</span>
              </p>
              <p className="text-[10px] sm:text-sm text-gray-500 leading-tight">
                Color: <span className="text-gray-400">{item.color}</span>
              </p>
            </div>
            
            <div className="flex justify-between items-center w-full mt-auto">
              <p className="font-bold text-base sm:text-2xl text-black">${item.price}</p>

              <div className="flex items-center rounded-full gap-3 sm:gap-6 bg-[#F0F0F0] px-3 py-1 sm:px-5 sm:py-2">
                <button
                  className="text-base sm:text-xl font-medium"
                  onClick={onDecrement}
                >
                  -
                </button>

                <span className="text-[11px] sm:text-base font-medium">
                  {item.qty}
                </span>
                <button
                  className="text-base sm:text-xl font-medium"
                  onClick={onIncrement}
                >
                  +
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

















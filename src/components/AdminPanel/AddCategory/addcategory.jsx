import React, { useState } from "react";
import { db, collection, addDoc } from "../../../firebase";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");

  const handleAdd = async () => {
    if(!categoryName) return;
    await addDoc(collection(db, "categories"), { name: categoryName });
    alert("Category Added!");
    setCategoryName("");
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-700">
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 text-center">
        <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6">📁</div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Create Category</h2>
        <p className="text-gray-400 text-sm mb-8">Organize your products into groups</p>
        
        <div className="space-y-4">
          <input 
            className="w-full bg-gray-50 border-none rounded-2xl p-5 outline-none focus:ring-2 focus:ring-orange-400 transition-all" 
            placeholder="e.g. Summer Collection"
            value={categoryName} onChange={(e) => setCategoryName(e.target.value)}
          />
          <button 
            onClick={handleAdd}
            className="w-full py-5 bg-orange-500 text-white rounded-2rem font-bold text-lg shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all"
          >
            Save Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
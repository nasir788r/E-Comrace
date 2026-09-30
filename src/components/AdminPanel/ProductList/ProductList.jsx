import React, { useState, useEffect } from "react";
import { db, collection, onSnapshot, deleteDoc, doc, updateDoc } from "../../../firebase";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
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

  useEffect(() => {
    const unsubProducts = onSnapshot(collection(db, "products"), (snap) => {
      setProducts(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    const unsubCats = onSnapshot(collection(db, "categories"), (snap) => {
      setCategories(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => { unsubProducts(); unsubCats(); };
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unsigned_preset");
      const res = await fetch("https://api.cloudinary.com/v1_1/dkjz9brjc/image/upload", {
        method: "POST", body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setCurrentProduct({ ...currentProduct, image: data.secure_url });
      }
    } catch (err) {
      alert("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (uploading) return alert("Please wait for image upload...");
    try {
      const productRef = doc(db, "products", currentProduct.id);
      await updateDoc(productRef, {
        title: currentProduct.title,
        category: currentProduct.category || "",
        price: Number(currentProduct.price),
        oldPrice: currentProduct.oldPrice ? Number(currentProduct.oldPrice) : null,
        stock: Number(currentProduct.stock || 0),
        image: currentProduct.image,
          color: currentProduct.color || "",
      });
      alert("Updated Successfully!");
      setIsEditModalOpen(false);
    } catch (err) { alert(err.message); }
  };

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure?")) deleteDoc(doc(db, "products", id));
  };

  return (
    <div className="animate-in fade-in duration-700 p-4 max-w-7xl mx-auto">


      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h2 className="text-5xl font-black text-gray-900 tracking-tighter italic uppercase leading-none">Live Inventory</h2>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-2 ml-1">Management System</p>
        </div>
        <div className="bg-black text-white px-6 py-3 rounded-2xl font-black text-sm tracking-widest">
          TOTAL: {products.length}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-12 overflow-x-auto pb-4 no-scrollbar">
        <button onClick={() => setSelectedCategory("All")} className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${selectedCategory === "All" ? "bg-black text-white shadow-lg" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}`}>All Items</button>
        {categories.map((cat) => (
          <button key={cat.id} onClick={() => setSelectedCategory(cat.name)} className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${selectedCategory === cat.name ? "bg-black text-white shadow-lg" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}`}>{cat.name}</button>
        ))}
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(selectedCategory === "All" ? products : products.filter(p => p.category === selectedCategory)).map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-[3rem] border border-gray-50 shadow-sm hover:shadow-2xl transition-all group">
            <div className="h-72 rounded-[2.5rem] overflow-hidden bg-gray-50 mb-6 relative">
              <span className="absolute top-4 left-4 z-10 bg-white/95 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">{item.category}</span>
              <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
            </div>
            <div className="px-2">
              <h3 className="text-xl font-black text-gray-900 mb-1 truncate uppercase italic tracking-tighter">{item.title}</h3>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-2xl font-extrabold text-gray-900 tracking-tight">${item.price}</span>
                <span className="ml-auto text-[10px] font-black text-gray-400 uppercase">Stock: {item.stock || 0}</span>
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setCurrentProduct(item); setIsEditModalOpen(true); }} className="flex-1 py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest">Edit Details</button>
                <button onClick={() => deleteProduct(item.id)} className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-xl">🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>


      {isEditModalOpen && currentProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-white w-full max-w-[380px] rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-7 pb-2 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black italic tracking-tighter uppercase leading-tight">Modify Item</h2>
                <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">Update parameters & image</p>
              </div>

              <div className="relative group overflow-hidden w-16 h-16 rounded-2xl border-2 border-gray-100 shadow-inner">
                <img src={currentProduct.image} className="w-full h-full object-cover" alt="" />
                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <span className="text-[8px] text-white font-black uppercase text-center leading-tight">{uploading ? "..." : "Edit"}</span>
                  <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
              </div>
            </div>

            <form onSubmit={handleUpdate} className="p-7 pt-4 space-y-3">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-gray-400 ml-2">Title</label>
                <input type="text" className="w-full bg-gray-50 border-none rounded-2xl p-3.5 text-xs focus:ring-1 focus:ring-black font-bold"
                  value={currentProduct.title} onChange={(e) => setCurrentProduct({ ...currentProduct, title: e.target.value })} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-gray-400 ml-2">Category</label>
                  <select className="w-full bg-gray-50 border-none rounded-2xl p-3.5 text-xs font-bold appearance-none cursor-pointer"
                    value={currentProduct.category} onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}>
                    {categories.map((cat) => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-gray-400 ml-2">Stock Count</label>
                  <input type="number" className="w-full bg-gray-50 border-none rounded-2xl p-3.5 text-xs font-bold"
                    value={currentProduct.stock || ""} onChange={(e) => setCurrentProduct({ ...currentProduct, stock: e.target.value })} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-gray-400 ml-2">Price ($)</label>
                  <input type="number" className="w-full bg-gray-50 border-none rounded-2xl p-3.5 text-xs font-bold"
                    value={currentProduct.price} onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })} />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-gray-400 ml-2">Old Price ($)</label>
                  <input type="number" className="w-full bg-gray-50 border-none rounded-2xl p-3.5 text-xs text-red-400 font-bold"
                    value={currentProduct.oldPrice || ""} onChange={(e) => setCurrentProduct({ ...currentProduct, oldPrice: e.target.value })} />
                </div>
              </div>
              {/* Color Selection */}
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-gray-400 ml-2">
                  Color
                </label>

                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-2xl">
                  {Object.entries(colorMap).map(([hex, name]) => (
                    <button
                      key={hex}
                      type="button"
                      onClick={() =>
                        setCurrentProduct({ ...currentProduct, color: hex })
                      }
                      className={`w-7 h-7 rounded-full border-2 transition-all
          ${currentProduct.color === hex
                          ? "border-black scale-110"
                          : "border-gray-200"
                        }`}
                      style={{ backgroundColor: hex }}
                      title={name}
                    />
                  ))}
                </div>
              </div>


              <div className="flex gap-3 pt-3">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black text-[10px] uppercase">Cancel</button>
                <button type="submit" disabled={uploading} className="flex-1 py-4 bg-black text-white rounded-2xl font-black text-[10px] shadow-xl uppercase tracking-widest hover:bg-gray-800 transition-all">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
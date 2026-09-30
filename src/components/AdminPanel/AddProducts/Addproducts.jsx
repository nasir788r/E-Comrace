import React, { useState, useEffect } from "react";
import { db, collection, addDoc, onSnapshot } from "../../../firebase";

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

const AddProducts = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetKey, setResetKey] = useState(Date.now());

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "categories"), (snap) => {
      setCategories(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!title || !price || !categoryName || !imageFile || !selectedColor)
      return alert("Please fill all important fields, including color!");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "unsigned_preset");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dkjz9brjc/image/upload",
        { method: "POST", body: formData }
      );
      const data = await res.json();

      await addDoc(collection(db, "products"), {
        title,
        description,
        price: Number(price),
        oldPrice: oldPrice ? Number(oldPrice) : null,
        stock: Number(stock),
        category: categoryName,
        color: selectedColor, 
        image: data.secure_url,
        createdAt: new Date(),
      });

      alert(`Product Added to ${categoryName}!`);

    
      setTitle("");
      setDescription("");
      setPrice("");
      setOldPrice("");
      setStock("");
      setCategoryName("");
      setImageFile(null);
      setSelectedColor("");
      setResetKey(Date.now());
    } catch (err) {
      console.error(err);
      alert("Error adding product!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 md:p-6 rounded-[2rem] shadow-sm border border-gray-100 w-full max-w-lg mx-auto overflow-hidden max-h-[90vh] flex flex-col justify-center">
      <div className="text-center mb-4">
        <h2 className="text-xl font-black italic tracking-tighter uppercase text-gray-800">
          Add Product
        </h2>
        <p className="text-gray-400 text-[8px] font-bold uppercase tracking-[0.2em]">
          New Inventory Entry
        </p>
      </div>

      <form onSubmit={handleAddProduct} className="space-y-3">
        <input
          className="w-full bg-gray-50 border-none rounded-xl p-2.5 text-xs outline-none focus:ring-1 focus:ring-black font-bold"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full bg-gray-50 border-none rounded-xl p-2.5 text-xs outline-none focus:ring-1 focus:ring-black resize-none"
          placeholder="Product Details"
          rows="2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            className="w-full bg-gray-50 border-none rounded-xl p-2.5 text-xs outline-none focus:ring-1 focus:ring-black font-bold"
            placeholder="Sale Price ($)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            className="w-full bg-gray-50 border-none rounded-xl p-2.5 text-xs outline-none focus:ring-1 focus:ring-black text-red-400"
            placeholder="Old Price ($)"
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            className="w-full bg-gray-50 border-none rounded-xl p-2.5 text-xs outline-none focus:ring-1 focus:ring-black"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <select
            className="w-full bg-gray-50 border-none rounded-xl p-2.5 text-xs outline-none focus:ring-1 focus:ring-black font-bold cursor-pointer"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

      
        <div>
          <p className="text-[9px] font-black uppercase text-gray-400 mb-1">
            Select Color
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(colorMap).map(([hex, name]) => (
              <button
                key={hex}
                type="button"
                onClick={() => setSelectedColor(name)}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                  selectedColor === name ? "ring-2 ring-black ring-offset-2" : ""
                }`}
                style={{ backgroundColor: hex }}
              >
                {selectedColor === name && (
                  <span
                    className={`block w-3 h-3 rounded-full ${
                      hex === "#FFFFFF" ? "bg-black" : "bg-white"
                    }`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <label className="w-full flex items-center justify-center h-9 bg-white border border-gray-100 rounded-lg text-[9px] font-black text-gray-400 cursor-pointer shadow-sm overflow-hidden px-2 hover:border-black transition-all">
            <span className="truncate">
              {imageFile ? imageFile.name : "ADD IMAGE"}
            </span>
            <input
              key={resetKey}
              type="file"
              className="hidden"
              onChange={(e) => setImageFile(e.target.files[0])}
              accept="image/*"
            />
          </label>
        </div>

        <button
          disabled={loading}
          className="w-full bg-black text-white py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-gray-800 transition-all mt-2 active:scale-95 disabled:bg-gray-400"
        >
          {loading ? "UPLOADING TO STORE..." : "CONFIRM PRODUCT"}
        </button>
      </form>
    </div>
  );
};

export default AddProducts;

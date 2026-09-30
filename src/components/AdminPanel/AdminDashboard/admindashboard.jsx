import React, { useState } from "react";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddProducts from "../AddProducts/Addproducts";
import AddCategory from "../AddCategory/addcategory";
import ProductList from "../ProductList/ProductList";
import SiteSettings from "../SiteSettings/sitesettings";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("siteSettings");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const menuItems = [
    { id: "siteSettings", label: "Website Editor", icon: "🌐" },
    { id: "addProduct", label: "Add Product", icon: "➕" },
    { id: "addCategory", label: "Add Category", icon: "📁" },
    { id: "productList", label: "Product List", icon: "📋" },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("persist:root");
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F3F4F6] overflow-hidden font-sans relative">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white flex flex-col h-full border-r border-gray-100 shadow-xl transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:shadow-sm
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="p-8 flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tighter text-gray-900 italic">
            Admin Panel
          </h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-2xl text-gray-400"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full text-left px-5 py-4 rounded-1.5rem font-bold transition-all flex items-center gap-4 ${
                activeTab === item.id
                  ? "bg-black text-white shadow-xl"
                  : "text-gray-400 hover:bg-gray-50"
              }`}
            >
              <span className="text-lg">{item.icon}</span> {item.label}
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="w-full text-left px-5 py-4 rounded-1.5rem font-bold transition-all flex items-center gap-4 text-red-500 hover:bg-red-50 mt-10"
          >
            <span className="text-lg">🚪</span> Logout
          </button>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-20 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 lg:px-10 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 bg-gray-50 rounded-xl text-xl border border-gray-100 shadow-sm"
            >
              ☰
            </button>
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 truncate max-w-150px lg:max-w-none">
              {activeTab}
            </h2>
          </div>

          {user?.role === "admin" && (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-gray-900 leading-none mb-1">
                  {user?.name || "Admin"}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-full border-2 border-white shadow-sm overflow-hidden shrink-0 ring-1 ring-gray-100">
                <img
                  src={
                    user?.photoURL ||
                    user?.profilePic ||
                    `https://ui-avatars.com/api/?name=${
                      user?.name || "Admin"
                    }&background=000&color=fff`
                  }
                  alt="admin"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          )}
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-10 text-gray-900">
          <div className="max-w-6xl mx-auto">
            {activeTab === "addProduct" && <AddProducts />}
            {activeTab === "addCategory" && <AddCategory />}
            {activeTab === "productList" && <ProductList />}
            {activeTab === "siteSettings" && <SiteSettings />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

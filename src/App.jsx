import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import QuickViewModal from "./components/QuickViewModal";
import SearchModal from "./components/SearchModal";
import ToastNotification from "./components/ToastNotification";

import Shop from "./pages/Shop";
import Home from "./pages/Home";
import NewArrivals from "./pages/NewArrivals";
import OnSale from "./pages/OnSale";
import Brands from "./pages/Brands";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Cart/Checkout";
import PaymentModal from "./pages/Cart/PaymentModal";
import DetailPage from "./pages/ProductDetailPage/Productpages/Detailpage";

import AdminDashboard from "./components/AdminPanel/AdminDashboard/admindashboard";
import AddProducts from "./components/AdminPanel/AddProducts/Addproducts";
import AddCategory from "./components/AdminPanel/AddCategory/addcategory";
import Signup from "./Auth/Sign Up/Signup";
import Login from "./Auth/Login/Login";

import About from "./pages/FooterPages/About";
import Features from "./pages/FooterPages/Features";
import Works from "./pages/FooterPages/Works";
import Career from "./pages/FooterPages/Career";
import Support from "./pages/FooterPages/Support";
import Delivery from "./pages/FooterPages/Delivery";
import Terms from "./pages/FooterPages/Terms";
import Privacy from "./pages/FooterPages/Privacy";
import Account from "./pages/FooterPages/Account";
import ManageDeliveries from "./pages/FooterPages/ManageDeliveries";
import Orders from "./pages/FooterPages/Orders";
import Payments from "./pages/FooterPages/Payments";
import Ebook from "./pages/FooterPages/Ebook";
import Tutorial from "./pages/FooterPages/Tutorial";
import Blog from "./pages/FooterPages/Blog";
import PlaylistPage from "./pages/FooterPages/Playlist";
import FaqsPage from "./pages/ProductDetailPage/FAQs";
import ProductReview from "./pages/ProductDetailPage/Rating&Review/ProductReview";
import ReviewCard from "./pages/ProductDetailPage/Rating&Review/ReviewCard";

const AppContent = () => {
  const location = useLocation();
  const hideLayout = [
    "/login",
    "/signup",
    "/dashboard",
    "/add-product",
    "/add-category",
  ].some((path) => location.pathname.startsWith(path));

  return (
    <>
      {/* Global Interactive Overlays & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <SearchModal />
      <ToastNotification />

      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:categoryName" element={<Shop />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/on-sale" element={<OnSale />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/shiping" element={<Checkout />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<PaymentModal />} />

        <Route path="/productpages/:id" element={<DetailPage />} />
        <Route path="/productdetail" element={<DetailPage />} />
        <Route path="/category/:categoryName" element={<Shop />} />
        <Route path="/categorypage" element={<Shop />} />

        {/* Footer & Informational Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/works" element={<Works />} />
        <Route path="/career" element={<Career />} />
        <Route path="/support" element={<Support />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/account" element={<Account />} />
        <Route path="/manage-deliveries" element={<ManageDeliveries />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/ebooks" element={<Ebook />} />
        <Route path="/tutorials" element={<Tutorial />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/playlist" element={<PlaylistPage />} />
        <Route path="/faqspage" element={<FaqsPage />} />
        <Route path="/productreview" element={<ProductReview />} />
        <Route path="/reviewcard" element={<ReviewCard />} />

        {/* Auth & Admin */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/add-product" element={<AddProducts />} />
        <Route path="/add-category" element={<AddCategory />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

const App = () => {
  return <AppContent />;
};

export default App;

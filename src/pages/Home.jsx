import React from "react";
import { useSelector } from "react-redux";
import Hero from "../components/sections/Hero";
import TrustBar from "../components/sections/TrustBar";
import DepartmentShowcase from "../components/sections/DepartmentShowcase";
import ProductSection from "../components/sections/ProductSection";
import CuratedLookbook from "../components/sections/CuratedLookbook";
import BrowseByStyle from "../components/sections/BrowseByStyle";
import EditorialStory from "../components/sections/EditorialStory";
import Reviews from "../components/sections/Reviews";
import NewsletterVIP from "../components/sections/NewsletterVIP";
import { FASHION_PRODUCTS } from "../data/fashionCatalog";

const Home = () => {
  const newArrivals = useSelector((state) => state.home?.newArrivals || []);
  const topSelling = useSelector((state) => state.home?.topSelling || []);

  // Safeguard: Ensure full diverse collection is available for department tab filtering
  const displayArrivals = newArrivals.length > 0 ? newArrivals : FASHION_PRODUCTS;
  const displayTopSelling = topSelling.length > 0 ? topSelling : [...FASHION_PRODUCTS].reverse();

  return (
    <div className="font-sans text-[#111111] bg-[#FAFAF9] min-h-screen">
      <main>
        {/* 1. Hero Section with Interactive Curation Tabs */}
        <Hero />

        {/* 2. Trust & Craftsmanship Pillars */}
        <TrustBar />

        {/* 3. Department Showcase (Men, Ladies, Kids: Boys, Kids: Girls) */}
        <DepartmentShowcase />

        {/* 4. New Arrivals Runway Drop with Category Tabs & Hover-Reveal Cards */}
        <ProductSection
          title="New Runway Arrivals"
          subtitle="Autumn / Winter '26 Collection"
          products={displayArrivals}
        />

        {/* 5. Interactive "Shop The Runway Look" Lookbook Campaign */}
        <CuratedLookbook />

        {/* 6. The Atelier Story / Craftsmanship Section */}
        <EditorialStory />

        {/* 7. Top Selling / Iconic Silhouettes */}
        <ProductSection
          title="Signature Silhouettes"
          subtitle="Timeless & Highly Coveted"
          products={displayTopSelling}
        />

        {/* 8. Browse By Style / Curated Universes */}
        <BrowseByStyle />

        {/* 9. Press & Patron Reviews */}
        <Reviews />

        {/* 10. Newsletter VIP Invitation */}
        <NewsletterVIP />
      </main>
    </div>
  );
};

export default Home;

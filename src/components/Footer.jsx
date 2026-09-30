import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Globe, ShieldCheck } from "lucide-react";
import BrandLogo from "./BrandLogo";

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white pt-16 md:pt-24 pb-12 border-t border-neutral-900">
      <div className="container mx-auto px-4 md:px-10">
        {/* Top Tier: Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 pb-16 border-b border-neutral-800">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo theme="dark" variant="full" />

            <p className="text-neutral-400 text-xs md:text-sm leading-relaxed max-w-sm">
              Architectural clothing sculpted from Super 130s Italian virgin wool, 22-momme Mulberry silk, and Mongolian cashmere. Handcrafted in limited editions across European ateliers.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-white hover:text-black flex items-center justify-center transition text-neutral-400"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-white hover:text-black flex items-center justify-center transition text-neutral-400"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-white hover:text-black flex items-center justify-center transition text-neutral-400"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Nav Column 1: The Collection */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-xs uppercase tracking-widest text-white">
              The Collection
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link to="/shop/tailoring" className="hover:text-white transition">Tailoring & Blazers</Link></li>
              <li><Link to="/shop/outerwear" className="hover:text-white transition">Outerwear & Trenches</Link></li>
              <li><Link to="/shop/evening" className="hover:text-white transition">Mulberry Silk Dresses</Link></li>
              <li><Link to="/shop/casual" className="hover:text-white transition">Mongolian Cashmere</Link></li>
              <li><Link to="/shop/accessories" className="hover:text-white transition">Artisanal Leatherwork</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-white transition text-[#C8A96B]">SS/26 Runway Capsule</Link></li>
            </ul>
          </div>

          {/* Nav Column 2: Client Concierge */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-xs uppercase tracking-widest text-white">
              Client Concierge
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link to="/support" className="hover:text-white transition">VIP Concierge & Appointments</Link></li>
              <li><Link to="/delivery" className="hover:text-white transition">Complimentary Express Transit</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">30-Day White-Glove Returns</Link></li>
              <li><Link to="/manage-deliveries" className="hover:text-white transition">Live Shipment Tracking</Link></li>
              <li><Link to="/account" className="hover:text-white transition">Atelier Patron Profile</Link></li>
            </ul>
          </div>

          {/* Nav Column 3: The House */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-xs uppercase tracking-widest text-white">
              The House
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link to="/about" className="hover:text-white transition">The Atelier Manifesto</Link></li>
              <li><Link to="/brands" className="hover:text-white transition">Partner European Guilds</Link></li>
              <li><Link to="/features" className="hover:text-white transition">Noble Material Provenance</Link></li>
              <li><Link to="/career" className="hover:text-white transition">Artisanal Careers</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition">Privacy & Data Governance</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-400">
          <p>© 2026 L'ÉTOILE ATELIER HAUTE COUTURE. ALL RIGHTS RESERVED.</p>

          <div className="flex flex-wrap items-center gap-2">
            {["VISA", "MASTERCARD", "AMEX", "APPLE PAY", "PAYPAL", "KLARNA"].map((badge) => (
              <span
                key={badge}
                className="bg-neutral-900 border border-neutral-800 text-[10px] font-bold px-2.5 py-1 rounded text-neutral-400 uppercase tracking-wider"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

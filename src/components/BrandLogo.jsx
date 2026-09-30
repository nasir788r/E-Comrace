import React from "react";
import { Link } from "react-router-dom";

export const LogoInsignia = ({ className = "w-8 h-8", fill = "currentColor" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Outer luxury faceted diamond ring */}
    <path
      d="M50 2L98 50L50 98L2 50L50 2Z"
      stroke={fill}
      strokeWidth="2.5"
      strokeMiterlimit="10"
      className="opacity-40"
    />
    {/* Inner 8-pointed Haute Couture Star (L'Étoile) */}
    <path
      d="M50 14L53.8 38.2L75.5 24.5L61.8 46.2L86 50L61.8 53.8L75.5 75.5L53.8 61.8L50 86L46.2 61.8L24.5 75.5L38.2 53.8L14 50L38.2 46.2L24.5 24.5L46.2 38.2L50 14Z"
      fill={fill}
    />
    {/* Center core brilliant diamond */}
    <circle cx="50" cy="50" r="4.5" fill="#C8A96B" />
  </svg>
);

const BrandLogo = ({
  variant = "full", // "full" | "compact" | "icon"
  theme = "light",  // "light" | "dark"
  className = "",
}) => {
  const isDark = theme === "dark";
  const primaryColor = isDark ? "#FFFFFF" : "#111111";
  const accentColor = "#C8A96B"; // Refined champagne gold

  if (variant === "icon") {
    return (
      <Link to="/" className={`inline-flex items-center ${className}`}>
        <LogoInsignia className="w-8 h-8" fill={primaryColor} />
      </Link>
    );
  }

  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-85 select-none ${className}`}
    >
      {/* Insignia Crest */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <LogoInsignia className="w-8 h-8 sm:w-9 sm:h-9" fill={primaryColor} />
      </div>

      {/* Luxury Typography Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className="font-serif text-2xl sm:text-[26px] font-black tracking-[0.22em] uppercase transition-colors"
            style={{ color: primaryColor }}
          >
            L'ÉTOILE
          </span>
          <span
            className="text-[10px] font-sans font-extrabold tracking-widest px-1.5 py-0.5 rounded text-white"
            style={{ backgroundColor: "#141414" }}
          >
            PARIS
          </span>
        </div>

        {variant === "full" && (
          <span
            className="text-[8.5px] font-sans font-bold uppercase tracking-[0.38em] -mt-0.5 transition-colors"
            style={{ color: isDark ? "#A3A3A3" : "#737373" }}
          >
            ATELIER DE HAUTE MODE
          </span>
        )}
      </div>
    </Link>
  );
};

export default BrandLogo;

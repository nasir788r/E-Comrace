import React, { useState } from "react";
import { ChevronRight, Search, ArrowUpRight, Sparkles, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const LUXURY_HOUSES = [
  { name: "CHANEL", origin: "Paris, France", specialty: "Haute Couture & Tweed", est: "1910" },
  { name: "GUCCI", origin: "Firenze, Italy", specialty: "Leather Craft & Silk", est: "1921" },
  { name: "PRADA", origin: "Milano, Italy", specialty: "Modern Tailoring & Gabardine", est: "1913" },
  { name: "SAINT LAURENT", origin: "Paris, France", specialty: "Structured Le smoking & Leather", est: "1961" },
  { name: "BOTTEGA VENETA", origin: "Vicenza, Italy", specialty: "Artisanal Intrecciato Nappa", est: "1966" },
  { name: "BALENCIAGA", origin: "Paris, France", specialty: "Architectural Proportions", est: "1919" },
  { name: "JACQUEMUS", origin: "Marseille, France", specialty: "Sensual Linen & Drape", est: "2009" },
  { name: "LOEWE", origin: "Madrid, Spain", specialty: "Master Cordwaining & Suede", est: "1846" },
  { name: "LORO PIANA", origin: "Quarona, Italy", specialty: "Vicuña & Rare Mongolian Cashmere", est: "1924" },
  { name: "BRUNELLO CUCINELLI", origin: "Solomeo, Italy", specialty: "Ethical Humanistic Knitwear", est: "1978" },
  { name: "ZEGNA ATELIER", origin: "Trivero, Italy", specialty: "Super 130s Virgin Wool Mills", est: "1910" },
  { name: "MAISON MARGIELA", origin: "Paris, France", specialty: "Deconstructive Couture", est: "1988" },
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const Brands = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("ALL");

  const filteredHouses = LUXURY_HOUSES.filter((house) => {
    const matchesSearch =
      house.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      house.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      house.specialty.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLetter =
      selectedLetter === "ALL" ||
      house.name.toUpperCase().startsWith(selectedLetter);

    return matchesSearch && matchesLetter;
  });

  return (
    <div className="bg-[#FAF9F6] text-[#141414] min-h-screen pb-24">
      {/* Header */}
      <div className="border-b border-neutral-200/80 bg-white">
        <div className="container mx-auto px-4 md:px-10 py-10 md:py-14 text-center">
          <nav className="flex justify-center items-center gap-2 text-neutral-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Link to="/" className="hover:text-black">Home</Link>
            <ChevronRight size={13} />
            <span className="text-black font-bold">Partner Ateliers</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#EFECE6] text-neutral-800 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
            <Sparkles size={13} className="text-amber-600" />
            <span>Master Guilds of Europe</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-neutral-900">
            Collaborating Ateliers & Heritage Mills
          </h1>

          <p className="text-neutral-500 mt-3 max-w-lg mx-auto text-xs sm:text-sm leading-relaxed">
            Discover the historic European houses and specialist textile mills responsible for the fabrics, cordwaining, and finishes of L'ÉTOILE.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-10 py-8 md:py-12">
        {/* Search & Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search house, origin, textile..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-neutral-200 rounded-full text-xs outline-none focus:border-black font-medium shadow-xs"
            />
          </div>

          {/* Alphabet Bar */}
          <div className="flex flex-wrap justify-center gap-1">
            <button
              onClick={() => setSelectedLetter("ALL")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedLetter === "ALL" ? "bg-black text-white" : "bg-white border border-neutral-200 hover:bg-neutral-100"
              }`}
            >
              All
            </button>
            {ALPHABET.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                  selectedLetter === letter
                    ? "bg-black text-white"
                    : "bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-600"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Houses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHouses.map((house) => (
            <div
              key={house.name}
              className="bg-white border border-neutral-200/80 rounded-3xl p-8 hover:border-black hover:shadow-xl transition-all duration-300 relative group overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                    Est. {house.est}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-black group-hover:text-white transition flex items-center justify-center">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-bold uppercase tracking-wider text-neutral-900 group-hover:text-black">
                  {house.name}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-2 font-medium">
                  <MapPin size={13} className="text-neutral-400" />
                  <span>{house.origin}</span>
                </div>

                <p className="text-xs text-neutral-600 mt-3 pt-3 border-t border-neutral-100 font-normal">
                  {house.specialty}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <Link
                  to="/shop"
                  className="text-xs font-bold uppercase tracking-widest text-black hover:underline"
                >
                  View Silhouettes →
                </Link>
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Verified Guild
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredHouses.length === 0 && (
          <div className="py-20 text-center text-neutral-400 font-serif italic text-lg">
            No collaborating ateliers matching "{searchTerm}".
          </div>
        )}
      </div>
    </div>
  );
};

export default Brands;

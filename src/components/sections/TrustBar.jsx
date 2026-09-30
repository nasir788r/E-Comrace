import React from "react";
import { Truck, ShieldCheck, RotateCcw, Sparkles } from "lucide-react";

const TRUST_PILLARS = [
  {
    icon: Truck,
    title: "Complimentary Transit",
    desc: "Insured express delivery on all orders over $150",
  },
  {
    icon: ShieldCheck,
    title: "Noble Natural Fibers",
    desc: "Certified Biella wool, Como silk & organic cashmere",
  },
  {
    icon: RotateCcw,
    title: "30-Day White-Glove Returns",
    desc: "Prepaid courier labels & doorstep collection",
  },
  {
    icon: Sparkles,
    title: "Private Stylist Concierge",
    desc: "Bespoke sizing & personal wardrobe guidance",
  },
];

const TrustBar = () => {
  return (
    <div className="bg-[#FFFFFF] border-b border-[#E7E5E4] py-8 sm:py-10">
      <div className="container mx-auto px-4 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 p-3 rounded-2xl transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] flex items-center justify-center text-[#111111] flex-shrink-0">
                  <Icon size={20} className="text-[#C8A96B]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-[#111111]">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[#78716C] mt-0.5 leading-snug">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;

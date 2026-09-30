import React, { useRef } from "react";
import { ArrowLeft, ArrowRight, Check, Star, Quote } from "lucide-react";
import { PRESS_TESTIMONIALS } from "../../data/fashionCatalog";

const Reviews = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth / 1.5
          : scrollLeft + clientWidth / 1.5;

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#FAFAF9] border-b border-[#E7E5E4] overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#78716C] mb-2">
              <Star size={13} className="text-[#C8A96B] fill-[#C8A96B]" />
              <span>Critical Acclaim</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#111111] tracking-tight">
              Verified Voices & Editorial Press
            </h2>
            <p className="text-[#78716C] text-sm mt-2">
              Rated <strong className="text-[#111111] font-sans">4.9/5</strong> across more than 1,200 international bespoke deliveries.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-[#E7E5E4] bg-[#FFFFFF] hover:border-[#111111] hover:bg-[#111111] hover:text-[#FFFFFF] text-[#111111] flex items-center justify-center transition cursor-pointer shadow-xs"
              aria-label="Previous review"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-[#E7E5E4] bg-[#FFFFFF] hover:border-[#111111] hover:bg-[#111111] hover:text-[#FFFFFF] text-[#111111] flex items-center justify-center transition cursor-pointer shadow-xs"
              aria-label="Next review"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x no-scrollbar scroll-smooth"
        >
          {PRESS_TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[28px] p-8 md:p-10 min-w-[320px] sm:min-w-[420px] max-w-[440px] snap-start flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 relative group"
            >
              <div className="space-y-4">
                {/* Top Row: Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#C8A96B] gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={15} className="fill-[#C8A96B] text-[#C8A96B]" />
                    ))}
                  </div>
                  <Quote size={24} className="text-[#E7E5E4] group-hover:text-[#C8A96B] transition" />
                </div>

                {/* Comment */}
                <p className="font-serif text-base md:text-lg text-[#171717] leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Author & Verification */}
              <div className="pt-6 border-t border-[#E7E5E4] flex items-center justify-between mt-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[#171717]">
                      {review.name}
                    </h4>
                    {review.verified && (
                      <span className="w-4 h-4 rounded-full bg-[#111111] text-[#C8A96B] flex items-center justify-center text-[10px]" title="Verified Client">
                        <Check size={10} strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#78716C] font-medium mt-0.5">
                    {review.role}
                  </p>
                </div>

                <span className="text-[11px] text-[#78716C] font-medium">
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;

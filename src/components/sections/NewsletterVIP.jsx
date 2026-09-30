import React, { useState } from "react";
import { Sparkles, Check, ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { showToast } from "../../redux/reducer/uiReducer";

const NewsletterVIP = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      dispatch(showToast("Please enter a valid email address.", "error"));
      return;
    }
    setIsSubscribed(true);
    dispatch(showToast("Privilege Activated: Use code ATELIER20 at checkout for 20% off!"));
  };

  return (
    <section className="py-16 md:py-24 bg-[#FAFAF9]">
      <div className="container mx-auto px-4 md:px-8 lg:px-10">
        <div className="bg-[#111111] text-white rounded-[36px] p-8 sm:p-12 md:p-20 relative overflow-hidden shadow-2xl border border-[#E7E5E4]/15">
          {/* Subtle decorative gold glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A96B]/15 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="max-w-2xl mx-auto text-center relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 text-[#C8A96B] px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.25em] uppercase border border-white/15">
              <Sparkles size={13} />
              <span>Privileged Atelier Circle</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
              Unlock Private Runway Previews & 20% Privilege
            </h2>

            <p className="text-[#78716C] text-sm md:text-base leading-relaxed">
              Subscribers receive early access to limited capsule editions, invitations to private showroom appointments, and 20% off your inaugural order.
            </p>

            {isSubscribed ? (
              <div className="bg-white/10 border border-[#C8A96B]/40 rounded-2xl p-6 text-center animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-[#C8A96B] text-[#111111] flex items-center justify-center mx-auto mb-3">
                  <Check size={24} strokeWidth={3} />
                </div>
                <h4 className="font-serif text-xl font-bold text-white mb-1">
                  Welcome to the Circle
                </h4>
                <p className="text-xs text-neutral-300">
                  Your complimentary invitation has been recorded. Apply code <strong className="text-[#C8A96B] font-mono text-sm underline">ATELIER20</strong> in your shopping bag.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border border-[#E7E5E4]/25 focus:border-[#C8A96B] text-white placeholder:text-[#78716C] px-5 py-4 rounded-full text-xs outline-none flex-1 font-medium transition"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#C8A96B] text-[#111111] hover:bg-white hover:text-[#111111] px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition flex items-center justify-center gap-2 shadow-lg cursor-pointer group flex-shrink-0"
                >
                  <span>Join Atelier</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}

            <p className="text-[11px] text-[#78716C] tracking-wide">
              We respect your privacy. No spam. One-click unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterVIP;

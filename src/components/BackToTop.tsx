"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLenis } from "@/components/SmoothScrollProvider";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { lenis } = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      data-cursor-interactive
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-amber text-charcoal backdrop-blur-md border border-amber/70 flex items-center justify-center shadow-[0_0_30px_rgba(245,166,35,0.4)] hover:shadow-[0_0_45px_rgba(245,166,35,0.6)] hover:scale-110 active:scale-95 transition-all duration-300">
        <ArrowUp className="w-5 h-5 text-charcoal group-hover:-translate-y-0.5 transition-transform duration-300" />
      </div>
    </button>
  );
}

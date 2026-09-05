"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "@/components/SmoothScrollProvider";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Web development", href: "/#chapter-work" },
  { label: "photography", href: "/#chapter-capabilities" },
  { label: "Videography", href: "/#chapter-stack" },
  { label: "The person behind it", href: "/#chapter-about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { lenis } = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        if (lenis) {
          lenis.scrollTo(targetEl, { offset: -30, duration: 1.2 });
        } else {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }
      setMenuOpen(false);
    }
  };

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
          scrolled
            ? "py-3 sm:py-4 bg-[#111215]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "py-6 sm:py-8 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 flex items-center justify-between">
          {/* Top-Left: Circular "RV" Monogram Button */}
          <Link
            href="/#chapter-intro"
            onClick={(e) => handleNavClick(e, "/#chapter-intro")}
            data-cursor-interactive
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/25 bg-white/[0.02] flex items-center justify-center font-bold text-xs tracking-wider text-white hover:border-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all shadow-md select-none font-anton"
            aria-label="Rohit Verma Home"
          >
            RV
          </Link>

          {/* Center-Top: Translucent Rounded Navigation Pill (Matching Reference Exactly) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-6 lg:gap-8 px-7 py-2.5 rounded-full border border-white/15 bg-black/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] select-none"
          >
            {NAV_ITEMS.map((item, idx) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                data-cursor-interactive
                className={`text-xs tracking-wide transition-all duration-200 ${
                  idx === 0
                    ? "text-white font-medium"
                    : "text-white/60 hover:text-white font-normal"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Top-Right: Outlined Rounded Contact Button (all lowercase 'contact') */}
          <div className="hidden md:flex items-center">
            <Link
              href="/#chapter-contact"
              onClick={(e) => handleNavClick(e, "/#chapter-contact")}
              data-cursor-interactive
              className="px-6 py-2.5 rounded-full border border-white/25 bg-white/[0.02] text-xs font-medium text-white tracking-wide hover:border-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all shadow-md select-none lowercase"
            >
              contact
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 rounded-full border border-white/20 bg-white/[0.02] flex items-center justify-center text-white hover:border-white transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#111215]/98 backdrop-blur-3xl md:hidden flex flex-col justify-between px-8 py-24 transition-all duration-500 ease-out ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6 pt-10">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
            ROHIT VERMA // NAVIGATION
          </p>
          {NAV_ITEMS.map((item, idx) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => {
                handleNavClick(e, item.href);
                setMenuOpen(false);
              }}
              className="flex items-baseline justify-between border-b border-white/10 pb-4 group"
            >
              <span className="font-display text-2xl font-bold text-white group-hover:text-amber transition-colors">
                {item.label}
              </span>
              <span className="font-mono text-xs text-white/40">
                0{idx + 1}
              </span>
            </Link>
          ))}
          <Link
            href="/#chapter-contact"
            onClick={(e) => {
              handleNavClick(e, "/#chapter-contact");
              setMenuOpen(false);
            }}
            className="mt-6 flex items-center justify-center py-3.5 px-6 rounded-full border border-white/30 text-white font-mono text-xs tracking-widest uppercase hover:bg-white/10 transition-all lowercase"
          >
            contact
          </Link>
        </div>

        <div className="border-t border-white/10 pt-6 flex justify-between items-center text-white/40 font-mono text-[10px] tracking-wider">
          <span>🇮🇳 Based in India</span>
          <span>© 2026</span>
        </div>
      </div>
    </>
  );
}
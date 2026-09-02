"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "@/components/SmoothScrollProvider";
import { ArrowUpRight, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "HOME", href: "/#chapter-intro" },
  { label: "WORK", href: "/#chapter-work" },
  { label: "ABOUT", href: "/#chapter-about" },
  { label: "RESUME", href: "/Resume.pdf", external: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const { lenis } = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

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
          lenis.scrollTo(targetEl, { offset: -60, duration: 1.4 });
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
          scrollDirection === "down"
            ? "py-3 bg-charcoal/70 backdrop-blur-xl border-b border-white/5 opacity-90 -translate-y-1"
            : scrolled
            ? "py-4 bg-charcoal/85 backdrop-blur-xl border-b border-white/10 opacity-100 translate-y-0"
            : "py-7 bg-transparent border-b border-transparent opacity-100 translate-y-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left: Brand Monogram & Title */}
          <Link
            href="/#chapter-intro"
            onClick={(e) => handleNavClick(e, "/#chapter-intro")}
            className="group flex items-center gap-3.5 select-none"
          >
            <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center font-display font-bold text-xs text-off-white bg-white/[0.03] transition-all duration-300 group-hover:border-amber group-hover:text-amber">
              R
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-off-white group-hover:text-amber transition-colors">
                ROHIT VERMA
              </span>
              <span className="font-mono text-[9px] tracking-[0.25em] text-foreground/45 uppercase">
                FULL-STACK DEVELOPER
              </span>
            </div>
          </Link>

          {/* Right: Desktop Navigation */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={(e) => !item.external && handleNavClick(e, item.href)}
                className="font-mono text-[11px] tracking-[0.25em] text-foreground/70 hover:text-off-white transition-colors relative py-1 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-amber transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            <Link
              href="/#chapter-contact"
              onClick={(e) => handleNavClick(e, "/#chapter-contact")}
              className="group inline-flex items-center gap-2 pl-4 pr-5 py-2 rounded-full border border-amber/30 bg-amber/5 text-amber font-mono text-[11px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-amber hover:text-charcoal hover:border-amber"
            >
              LET&apos;S TALK
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-off-white hover:border-amber transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-charcoal/95 backdrop-blur-2xl md:hidden flex flex-col justify-between px-8 py-24 transition-all duration-500 ease-out ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-8 pt-10">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber">
            NAVIGATION // CHAPTERS
          </p>
          {NAV_ITEMS.map((item, idx) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              onClick={(e) => {
                if (!item.external) handleNavClick(e, item.href);
                setMenuOpen(false);
              }}
              className="flex items-baseline justify-between border-b border-white/5 pb-4 group"
            >
              <span className="font-display text-3xl font-bold text-off-white group-hover:text-amber transition-colors">
                {item.label}
              </span>
              <span className="font-mono text-xs text-foreground/40">
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
            className="mt-4 flex items-center justify-between py-4 px-6 rounded-2xl bg-amber text-charcoal font-mono font-bold text-xs tracking-[0.2em] uppercase"
          >
            LET&apos;S TALK
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="border-t border-white/10 pt-6 flex justify-between items-center text-foreground/50 font-mono text-[10px] tracking-wider">
          <span>ROHIT VERMA</span>
          <span>© 2026</span>
        </div>
      </div>
    </>
  );
}
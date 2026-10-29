"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "@/components/SmoothScrollProvider";
import { Menu, X, Sun, Moon, Search } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import CommandPalette from "@/components/CommandPalette";

const NAV_ITEMS = [
  { label: "Home", href: "/#chapter-intro" },
  { label: "Projects", href: "/#chapter-work" },
  { label: "Skills", href: "/#chapter-stack" },
  { label: "About", href: "/#chapter-about" },
  { label: "Resume", href: "/resume" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { lenis } = useLenis();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  // Global Cmd+K / Ctrl+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Track scroll for navbar background effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("light");
    } else {
      html.classList.remove("light");
    }
    setIsDark(!isDark);
  };

  const [activeSection, setActiveSection] = useState<string>("chapter-intro");

  // Track active section on scroll for spy highlighting
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sectionIds = ["chapter-intro", "chapter-work", "chapter-stack", "chapter-about"];
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleSpyScroll, { passive: true });
    handleSpyScroll();
    return () => window.removeEventListener("scroll", handleSpyScroll);
    function handleSpyScroll() {
      handleScrollSpy();
    }
  }, [pathname]);

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
        className="fixed top-0 left-0 w-full z-50 pt-7 px-8 sm:px-10 select-none pointer-events-none"
      >
        <div className="w-full max-w-[1720px] mx-auto flex items-center justify-between pointer-events-auto">
          {/* Top-Left: Circular outlined logo "RV" */}
          <Magnetic strength={0.35}>
            <Link
              href="/#chapter-intro"
              onClick={(e) => handleNavClick(e, "/#chapter-intro")}
              data-cursor-interactive
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center font-mono font-bold text-xs tracking-wider text-off-white hover:border-amber hover:text-amber hover:bg-amber/10 hover:scale-105 active:scale-95 transition-all shadow-md select-none"
              aria-label="Rohit Verma Home"
            >
              RV
            </Link>
          </Magnetic>

          {/* Top-Center: Horizontally centered glass/translucent pill navigation */}
          <nav
            aria-label="Main Navigation"
            className={`hidden md:flex items-center gap-7 lg:gap-8 h-12 px-7 rounded-full border border-white/15 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.6)] select-none transition-all duration-500 ${
              scrolled ? "bg-black/50" : "bg-black/35"
            }`}
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                (pathname === "/resume" && item.href === "/resume") ||
                (pathname === "/" && item.href === `/#${activeSection}`);

              return (
                <Magnetic key={item.label} strength={0.2}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    data-cursor-interactive
                    className={`text-[13px] tracking-wide transition-all duration-200 relative group ${
                      isActive
                        ? "text-amber font-semibold"
                        : "text-off-white/60 hover:text-amber font-normal"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-[1.5px] bg-amber transition-all duration-300 ease-out ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </Magnetic>
              );
            })}
          </nav>

          {/* Top-Right: Search + Theme toggle + Contact */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Search / Command Palette (Cmd+K) */}
            <Magnetic strength={0.3}>
              <button
                type="button"
                onClick={() => setCmdOpen(true)}
                data-cursor-interactive
                className="h-10 sm:h-11 px-3 sm:px-3.5 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center gap-2 text-off-white hover:border-amber hover:text-amber hover:bg-amber/10 hover:scale-105 active:scale-95 transition-all shadow-md font-mono text-xs"
                aria-label="Open command palette"
                title="Search or jump to (Cmd+K / Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-off-white/70" />
                <kbd className="hidden lg:inline-block text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-off-white/60 font-mono">⌘K</kbd>
              </button>
            </Magnetic>

            {/* Theme Toggle */}
            <Magnetic strength={0.3}>
              <button
                type="button"
                onClick={toggleTheme}
                data-cursor-interactive
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center text-off-white hover:border-amber hover:text-amber hover:bg-amber/10 hover:scale-105 active:scale-95 transition-all shadow-md"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 transition-transform duration-300 hover:rotate-90" />
                ) : (
                  <Moon className="w-4 h-4 transition-transform duration-300 hover:-rotate-12" />
                )}
              </button>
            </Magnetic>

            <Magnetic strength={0.3}>
              <Link
                href="/contact"
                data-cursor-interactive
                className="h-10 sm:h-11 px-6 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center text-[13px] font-medium text-off-white tracking-wide hover:border-amber hover:text-amber hover:bg-amber/10 hover:scale-105 active:scale-95 transition-all shadow-md select-none"
              >
                Contact
              </Link>
            </Magnetic>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 rounded-full border border-white/25 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:border-white transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-[#0d0e11]/98 backdrop-blur-3xl md:hidden flex flex-col justify-between px-8 py-20 transition-all duration-500 ease-out ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-5 pt-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
              ROHIT VERMA - NAVIGATION
            </p>
            <button
              onClick={() => { setMenuOpen(false); setCmdOpen(true); }}
              className="flex items-center gap-1.5 font-mono text-[10px] text-amber border border-amber/30 px-2.5 py-1 rounded-full bg-amber/5"
            >
              <Search className="w-3 h-3" />
              <span>SEARCH</span>
            </button>
          </div>

          {NAV_ITEMS.map((item, idx) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => {
                handleNavClick(e, item.href);
                setMenuOpen(false);
              }}
              className="flex items-baseline justify-between border-b border-white/10 pb-3.5 group"
            >
              <span className="font-display text-2xl font-bold text-white group-hover:text-amber transition-colors">
                {item.label}
              </span>
              <span className="font-mono text-xs text-white/40">
                0{idx + 1}
              </span>
            </Link>
          ))}

          {/* Direct link to Projects archive */}
          <Link
            href="/projects"
            onClick={() => setMenuOpen(false)}
            className="flex items-baseline justify-between border-b border-white/10 pb-3.5 group"
          >
            <span className="font-display text-xl font-medium text-white/80 group-hover:text-amber transition-colors">
              Case Studies Archive
            </span>
            <span className="font-mono text-xs text-amber">
              ↗
            </span>
          </Link>

          {/* Mobile theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center justify-between border-b border-white/10 pb-3.5 group"
          >
            <span className="font-display text-xl font-bold text-white group-hover:text-amber transition-colors">
              {isDark ? "Light Mode" : "Dark Mode"}
            </span>
            <span className="text-white/40">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </span>
          </button>

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-3 flex items-center justify-center py-3.5 px-6 rounded-full bg-amber text-charcoal font-mono text-xs font-bold tracking-widest uppercase hover:bg-off-white transition-all shadow-lg"
          >
            Get In Touch
          </Link>
        </div>

        <div className="border-t border-white/10 pt-4 flex justify-between items-center text-white/40 font-mono text-[10px] tracking-wider">
          <span>Based in India</span>
          <span>© 2026</span>
        </div>
      </div>

      {/* Global Command Palette modal */}
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  );
}
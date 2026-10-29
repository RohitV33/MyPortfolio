"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const commandItems = [
  { label: "Go to Home", href: "/", icon: "⌂" },
  { label: "View Projects", href: "/projects", icon: "◈" },
  { label: "About Me", href: "/about", icon: "◉" },
  { label: "View Resume", href: "/resume", icon: "📄" },
  { label: "Contact Form", href: "/contact", icon: "✉" },
  { label: "Download Resume", href: "/Resume.pdf", icon: "↓" },
  { label: "GitHub", href: "https://github.com/RohitV33", icon: "◎" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rawhit01", icon: "◎" },
  { label: "LeetCode", href: "https://leetcode.com/u/rohit6142/", icon: "◎" },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const filtered = commandItems.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setQuery("");
        setSelectedIndex(0);
        inputRef.current?.focus();
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Navigate to selected item
  const handleSelect = useCallback(
    (item: (typeof commandItems)[0]) => {
      onClose();
      if (item.href.startsWith("http") || item.href.endsWith(".pdf")) {
        window.open(item.href, "_blank", "noopener,noreferrer");
      } else {
        router.push(item.href);
      }
    },
    [onClose, router]
  );

  // Keyboard controls: Arrow navigation, Enter to select, Escape to close, and Tab focus trapping
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (filtered.length ? (prev + 1) % filtered.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          handleSelect(filtered[selectedIndex]);
        }
      } else if (e.key === "Tab") {
        // Simple focus trap: prevent focus from leaking outside dialog
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'input, button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, filtered, selectedIndex, handleSelect]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-[#0e0c0a]/75 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette Navigation"
            initial={{ opacity: 0, scale: 0.94, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -16 }}
            transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-[18%] left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4"
          >
            <div className="rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.15)] bg-[#141210]">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[rgba(255,255,255,0.08)]">
                <svg className="w-4 h-4 text-amber/60 shrink-0" fill="none" viewBox="0 0 20 20">
                  <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M14 14l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or navigate..."
                  className="flex-1 bg-transparent text-[#f0e9dc] text-sm placeholder-[#7a7065] outline-none tracking-wide"
                />
                <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-[#2a231d] text-amber/70 border border-amber/20 font-mono">
                  ESC
                </kbd>
              </div>
              <ul className="py-2 max-h-72 overflow-y-auto" role="listbox">
                {filtered.length === 0 && (
                  <li className="px-5 py-8 text-center text-off-white/40 text-sm">No commands found</li>
                )}
                {filtered.map((item, i) => {
                  const isSelected = i === selectedIndex;
                  return (
                    <li
                      key={item.label}
                      role="option"
                      aria-selected={isSelected}
                      onMouseEnter={() => setSelectedIndex(i)}
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSelect(item);
                        }}
                        className={`flex items-center gap-3.5 px-5 py-3 transition-colors duration-150 group ${
                          isSelected ? "bg-amber/10 border-l-2 border-amber" : "hover:bg-white/[0.04]"
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm border transition-colors ${
                            isSelected
                              ? "bg-amber/20 text-amber border-amber/40"
                              : "bg-[#2a231d] text-[#c4a87a] border-[rgba(255,255,255,0.06)]"
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span
                          className={`text-sm tracking-wide transition-colors ${
                            isSelected ? "text-off-white font-medium" : "text-[#c8bfb4]"
                          }`}
                        >
                          {item.label}
                        </span>
                        <span
                          className={`ml-auto text-[10px] font-mono ${
                            isSelected ? "text-amber" : "text-white/20"
                          }`}
                        >
                          ↵
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="border-t border-[rgba(255,255,255,0.06)] px-5 py-2.5 flex justify-between text-[10px] text-off-white/40 font-mono">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>esc close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

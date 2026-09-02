"use client";

import { useEffect, useState } from "react";
import { CHAPTERS } from "@/data/portfolioData";

export default function ScrollIndicator() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after scrolling past the first 100px
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Intersection observer for chapters
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = CHAPTERS.findIndex((c) => c.id === entry.target.id);
            if (index !== -1) {
              setActiveChapter(index);
            }
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    CHAPTERS.forEach((chapter) => {
      const el = document.getElementById(chapter.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const current = CHAPTERS[activeChapter] || CHAPTERS[0];

  return (
    <aside
      aria-label="Story Chapter Indicator"
      className={`fixed right-6 md:right-10 bottom-8 z-40 flex items-center gap-3 transition-all duration-700 pointer-events-none select-none ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      <div className="flex flex-col items-end">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/40 hidden sm:inline">
          {current.name}
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-accent tracking-widest">
            {current.number}
          </span>
          <span className="font-mono text-[10px] text-foreground/30">/</span>
          <span className="font-mono text-[10px] text-foreground/40 tracking-wider">
            09
          </span>
        </div>
      </div>
      <div className="w-px h-8 bg-white/10 relative overflow-hidden hidden sm:block">
        <div
          className="absolute top-0 left-0 w-full bg-accent transition-all duration-500 ease-out"
          style={{
            height: `${((activeChapter + 1) / CHAPTERS.length) * 100}%`,
          }}
        />
      </div>
    </aside>
  );
}

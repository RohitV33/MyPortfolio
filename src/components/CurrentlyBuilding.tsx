"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CURRENTLY_BUILDING } from "@/data/portfolioData";

export default function CurrentlyBuilding() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      lineRefs.current.forEach((line, i) => {
        if (!line) return;
        const speed = CURRENTLY_BUILDING[i]?.speed || 0.15;
        const direction = i % 2 === 0 ? -1 : 1;

        gsap.to(line, {
          xPercent: direction * 15 * (1 + speed),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-currently"
      ref={containerRef}
      className="relative w-full py-28 md:py-44 overflow-hidden bg-charcoal text-off-white select-none border-t border-white/5 flex flex-col justify-center"
    >
      {/* Chapter Intro */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-16 mb-16 md:mb-20">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-2 h-2 rounded-full bg-amber" />
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-amber">
            CHAPTER 08 // CURRENTLY
          </p>
        </div>
        <h2 className="font-display text-4xl md:text-7xl font-extrabold tracking-tight text-off-white uppercase leading-[0.9]">
          CURRENTLY <br />
          <span className="text-amber">BUILDING.</span>
        </h2>
        <p className="font-body text-base md:text-lg font-light text-foreground/60 max-w-md mt-4 leading-relaxed">
          Areas of active research, system experimentation, and ongoing code commits.
        </p>
      </div>

      {/* Parallax Lines Moving Horizontally at Variable Speeds */}
      <div className="w-full overflow-hidden flex flex-col gap-6 md:gap-10 py-6">
        {CURRENTLY_BUILDING.map((item, index) => (
          <div
            key={item.title}
            ref={(el) => {
              lineRefs.current[index] = el;
            }}
            className="flex items-center gap-6 whitespace-nowrap will-change-transform opacity-80 hover:opacity-100 transition-opacity"
          >
            <span className="font-mono text-xs md:text-sm text-amber tracking-[0.3em] font-semibold">
              0{index + 1}
            </span>
            <span className="font-display text-[clamp(2rem,5.5vw,5rem)] font-extrabold uppercase tracking-tight text-off-white">
              {item.title}
            </span>
            <span className="font-mono text-xs md:text-sm text-foreground/45 hidden sm:inline tracking-wider">
              — {item.detail}
            </span>
            <span className="text-white/10 text-2xl font-mono mx-4">•</span>
            <span className="font-display text-[clamp(2rem,5.5vw,5rem)] font-extrabold uppercase tracking-tight text-white/10">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

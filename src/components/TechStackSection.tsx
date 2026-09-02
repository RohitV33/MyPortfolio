"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FLOWING_TECHS, TECH_STACK_CATEGORIES } from "@/data/portfolioData";

export default function TechStackSection() {
  const containerRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Flowing typography rows moving at distinct speeds during scroll
      gsap.to(row1Ref.current, {
        xPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(row2Ref.current, {
        xPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(row3Ref.current, {
        xPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.9,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-stack"
      ref={containerRef}
      className="relative w-full min-h-screen py-24 md:py-36 overflow-hidden bg-charcoal text-off-white select-none border-t border-white/5 flex flex-col justify-center"
    >
      {/* Chapter Intro */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-16 mb-16 md:mb-20">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-2 h-2 rounded-full bg-amber" />
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-amber">
            CHAPTER 06 // THE STACK
          </p>
        </div>
        <h2 className="font-display text-4xl md:text-7xl font-extrabold tracking-tight text-off-white uppercase leading-[0.9]">
          TOOLS I <br />
          <span className="text-amber">BUILD WITH.</span>
        </h2>
        <p className="font-body text-base md:text-lg font-light text-foreground/60 max-w-lg mt-4 leading-relaxed">
          An ecosystem selected for reliability, computational speed, and expressive developer ergonomics.
        </p>
      </div>

      {/* Flowing Organic Horizontal Typography Ecosystem */}
      <div className="w-full overflow-hidden flex flex-col gap-6 md:gap-8 my-8 opacity-90">
        {/* Row 1 */}
        <div ref={row1Ref} className="flex gap-8 md:gap-14 whitespace-nowrap will-change-transform">
          {[...FLOWING_TECHS[0], ...FLOWING_TECHS[0], ...FLOWING_TECHS[0]].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className={`font-display text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight transition-colors duration-300 ${
                i % 3 === 0
                  ? "text-amber"
                  : i % 2 === 0
                  ? "text-off-white hover:text-amber"
                  : "text-white/20 hover:text-white/50"
              }`}
            >
              {tech}
              <span className="mx-6 md:mx-10 text-white/10 font-mono text-xl">•</span>
            </span>
          ))}
        </div>

        {/* Row 2 (Reversed / Staggered) */}
        <div ref={row2Ref} className="flex gap-8 md:gap-14 whitespace-nowrap will-change-transform -translate-x-1/4">
          {[...FLOWING_TECHS[1], ...FLOWING_TECHS[1], ...FLOWING_TECHS[1]].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className={`font-display text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight transition-colors duration-300 ${
                i % 4 === 0
                  ? "text-amber"
                  : i % 2 === 1
                  ? "text-off-white hover:text-amber"
                  : "text-white/20 hover:text-white/50"
              }`}
            >
              {tech}
              <span className="mx-6 md:mx-10 text-white/10 font-mono text-xl">•</span>
            </span>
          ))}
        </div>

        {/* Row 3 */}
        <div ref={row3Ref} className="flex gap-8 md:gap-14 whitespace-nowrap will-change-transform">
          {[...FLOWING_TECHS[2], ...FLOWING_TECHS[2], ...FLOWING_TECHS[2]].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className={`font-display text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight transition-colors duration-300 ${
                i % 3 === 1
                  ? "text-amber"
                  : i % 2 === 0
                  ? "text-off-white hover:text-amber"
                  : "text-white/20 hover:text-white/50"
              }`}
            >
              {tech}
              <span className="mx-6 md:mx-10 text-white/10 font-mono text-xl">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Categorical Breakdown Footnote */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-16 mt-16 md:mt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-white/10 pt-10">
          {TECH_STACK_CATEGORIES.map((cat) => (
            <div key={cat.category}>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber block mb-3">
                {cat.category}
              </span>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-xs text-foreground/60 py-1"
                  >
                    {item}
                    <span className="text-white/20 ml-2">/</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

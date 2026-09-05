"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { TECH_STACK_CATEGORIES, FLOWING_TECHS } from "@/data/portfolioData";

export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(row1Ref.current, {
        xPercent: -20,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.to(row2Ref.current, {
        xPercent: 15,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.2 },
      });
      gsap.to(row3Ref.current, {
        xPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 0.9 },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-stack"
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0a] text-off-white py-20 md:py-32 overflow-hidden border-t border-white/5 select-none flex flex-col justify-center"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/3 w-[600px] h-[400px] rounded-full opacity-[0.05] blur-[130px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #F5A623 0%, transparent 70%)" }}
      />

      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 md:px-16 mb-12 md:mb-16">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="w-2 h-2 rounded-full bg-amber shadow-[0_0_10px_#F5A623] animate-pulse" />
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-amber font-semibold">
            CHAPTER 05 // THE STACK
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <h2 className="font-akira text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-off-white uppercase leading-[0.9]">
            TOOLS I<br /><span className="text-amber">BUILD WITH.</span>
          </h2>
          <p className="font-body text-sm text-off-white/50 max-w-xs leading-relaxed font-light">
            An ecosystem selected for reliability, speed, and expressive developer ergonomics.
          </p>
        </div>
      </div>

      {/* ── Scrolling Marquee Rows ── */}
      <div className="w-full overflow-hidden flex flex-col gap-4 md:gap-6 my-4">
        <div ref={row1Ref} className="flex gap-8 md:gap-14 whitespace-nowrap will-change-transform">
          {[...FLOWING_TECHS[0], ...FLOWING_TECHS[0], ...FLOWING_TECHS[0]].map((tech, i) => (
            <span
              key={`r1-${tech}-${i}`}
              className={`font-akira text-[clamp(2rem,5vw,4.5rem)] font-black uppercase tracking-tight select-none transition-colors duration-300 ${
                i % 3 === 0 ? "text-amber" : i % 2 === 0 ? "text-off-white/80" : "text-white/10"
              }`}
            >
              {tech}
              <span className="mx-5 md:mx-9 text-white/10 font-mono text-lg">·</span>
            </span>
          ))}
        </div>

        <div ref={row2Ref} className="flex gap-8 md:gap-14 whitespace-nowrap will-change-transform -translate-x-1/4">
          {[...FLOWING_TECHS[1], ...FLOWING_TECHS[1], ...FLOWING_TECHS[1]].map((tech, i) => (
            <span
              key={`r2-${tech}-${i}`}
              className={`font-akira text-[clamp(2rem,5vw,4.5rem)] font-black uppercase tracking-tight select-none transition-colors duration-300 ${
                i % 4 === 0 ? "text-amber" : i % 3 === 1 ? "text-off-white/80" : "text-white/10"
              }`}
            >
              {tech}
              <span className="mx-5 md:mx-9 text-white/10 font-mono text-lg">·</span>
            </span>
          ))}
        </div>

        <div ref={row3Ref} className="flex gap-8 md:gap-14 whitespace-nowrap will-change-transform">
          {[...FLOWING_TECHS[2], ...FLOWING_TECHS[2], ...FLOWING_TECHS[2]].map((tech, i) => (
            <span
              key={`r3-${tech}-${i}`}
              className={`font-akira text-[clamp(2rem,5vw,4.5rem)] font-black uppercase tracking-tight select-none transition-colors duration-300 ${
                i % 3 === 1 ? "text-amber" : i % 2 === 0 ? "text-off-white/80" : "text-white/10"
              }`}
            >
              {tech}
              <span className="mx-5 md:mx-9 text-white/10 font-mono text-lg">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Category Pills ── */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 md:px-16 mt-14 md:mt-20">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-white/8" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-off-white/30">FULL STACK ECOSYSTEM</span>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TECH_STACK_CATEGORIES.map((cat) => (
            <div key={cat.category} className="flex flex-col gap-3 p-5 rounded-2xl border border-white/8 bg-white/[0.02]">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-amber">{cat.category}</span>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-[11px] text-off-white/60 px-2.5 py-1 rounded-lg border border-white/8 bg-white/[0.02] hover:border-amber/30 hover:text-off-white transition-all duration-200"
                  >
                    {item}
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

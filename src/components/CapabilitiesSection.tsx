"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CAPABILITIES } from "@/data/portfolioData";
import { ArrowUpRight } from "lucide-react";

export default function CapabilitiesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = itemsRef.current.filter(Boolean);
      if (!items.length) return;

      // Set initial positions
      items.forEach((item, index) => {
        if (!item) return;
        gsap.set(item, {
          opacity: index === 0 ? 1 : 0,
          scale: index === 0 ? 1 : 0.9,
          y: index === 0 ? 0 : 80,
          filter: index === 0 ? "blur(0px)" : "blur(8px)",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${items.length * 110}%`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      items.forEach((item, i) => {
        if (i < items.length - 1) {
          const nextItem = items[i + 1];

          tl.to(
            item,
            {
              opacity: 0,
              scale: 0.85,
              y: -90,
              filter: "blur(12px)",
              duration: 1,
              ease: "power2.inOut",
            },
            `cap-${i}`
          ).to(
            nextItem,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1,
              ease: "power2.inOut",
            },
            `cap-${i}+=0.15`
          );
        }
      });

      tl.to({}, { duration: 0.4 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-capabilities"
      ref={containerRef}
      className="relative w-full min-h-screen h-screen flex flex-col justify-between overflow-hidden bg-charcoal text-off-white select-none py-14 md:py-20 px-6 md:px-16"
    >
      {/* Background Subtle Gradient */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-10 -translate-y-1/2 w-[45vw] h-[45vw] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(245, 166, 35, 0.22) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Top Header: From Idea to Interface */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-start border-b border-white/5 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-2 h-2 rounded-full bg-amber" />
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-amber">
            CHAPTER 03 // WHAT I DO
          </p>
        </div>
        <h2 className="font-display text-2xl md:text-4xl font-extrabold tracking-tight text-off-white">
          FROM IDEA <span className="text-amber">TO INTERFACE.</span>
        </h2>
      </div>

      {/* Main Capabilities Stage (Large Viewport Occupancy) */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex-1 flex items-center justify-center my-auto">
        <div className="relative w-full min-h-[380px] md:min-h-[440px] flex items-center justify-center">
          {CAPABILITIES.map((cap, idx) => (
            <div
              key={cap.number}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className="absolute inset-0 flex flex-col justify-center px-4 md:px-8 will-change-transform"
            >
              <div className="flex items-baseline gap-4 md:gap-6 mb-4">
                <span className="font-mono text-xs md:text-sm text-amber font-bold tracking-[0.3em]">
                  {cap.number} —
                </span>
                <h3 className="font-display text-[clamp(2.8rem,7.5vw,6.5rem)] font-extrabold tracking-tight text-off-white uppercase leading-none">
                  {cap.title}
                </h3>
              </div>

              <p className="font-body text-xl md:text-3xl font-light text-off-white/90 max-w-3xl leading-snug tracking-tight mb-8">
                {cap.tagline}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-3xl border-t border-white/10 pt-6">
                {cap.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2.5 text-foreground/60 font-mono text-xs tracking-wide">
                    <ArrowUpRight className="w-3.5 h-3.5 text-amber shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer Info */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between pt-6 border-t border-white/5 text-foreground/40 font-mono text-[10px] tracking-widest">
        <span>CRAFT & ARCHITECTURE</span>
        <span>SCROLL TO ADVANCE</span>
      </div>
    </section>
  );
}

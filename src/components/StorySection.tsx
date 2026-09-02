"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { STORY_STATEMENTS } from "@/data/portfolioData";

export default function StorySection() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ambientLightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const statements = statementsRef.current.filter(Boolean);
      if (!statements.length) return;

      // Initial states: hide all except initial transition
      statements.forEach((el, index) => {
        if (!el) return;
        gsap.set(el, {
          opacity: index === 0 ? 1 : 0,
          y: index === 0 ? 0 : 70,
          scale: index === 0 ? 1 : 0.94,
          filter: index === 0 ? "blur(0px)" : "blur(8px)",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${statements.length * 100}%`,
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
        },
      });

      // Ambient light color/position shift
      tl.to(
        ambientLightRef.current,
        {
          x: "30%",
          y: "20%",
          opacity: 0.35,
          duration: statements.length,
          ease: "none",
        },
        0
      );

      // Sequence statements: as current fades & moves away up, next fades in from down
      statements.forEach((el, i) => {
        if (i < statements.length - 1) {
          const nextEl = statements[i + 1];

          tl.to(
            el,
            {
              opacity: 0,
              y: -80,
              scale: 0.92,
              filter: "blur(10px)",
              duration: 1,
              ease: "power2.inOut",
            },
            `step-${i}`
          ).to(
            nextEl,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 1,
              ease: "power2.inOut",
            },
            `step-${i}+=0.1`
          );
        }
      });

      // Final lingering pause before leaving chapter
      tl.to({}, { duration: 0.5 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-story"
      ref={containerRef}
      className="relative w-full min-h-screen h-screen flex flex-col justify-between overflow-hidden bg-charcoal text-off-white select-none py-16 md:py-24 px-6 md:px-16"
    >
      {/* Dynamic ambient background evolution */}
      <div
        ref={ambientLightRef}
        aria-hidden="true"
        className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full pointer-events-none will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(245, 166, 35, 0.18) 0%, rgba(217, 119, 6, 0.06) 50%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Top Editorial Eyebrow & Chapter Header */}
      <div ref={titleRef} className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-start">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-2 h-2 rounded-full bg-amber" />
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-amber">
            CHAPTER 02 // THE STORY
          </p>
        </div>
        <h2 className="font-display text-2xl md:text-4xl font-extrabold tracking-tight text-off-white/70">
          IT STARTED WITH <span className="text-amber">CURIOSITY.</span>
        </h2>
      </div>

      {/* Center Story Statements Showcase */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex-1 flex items-center justify-center my-auto">
        <div className="relative w-full min-h-[320px] md:min-h-[380px] flex items-center justify-center text-center">
          {STORY_STATEMENTS.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                statementsRef.current[index] = el;
              }}
              className="absolute inset-0 flex flex-col items-center justify-center px-4 will-change-transform"
            >
              <span className="font-mono text-[11px] md:text-xs text-amber/80 tracking-[0.4em] uppercase mb-4 md:mb-6">
                PHASE 0{index + 1}
              </span>
              <p className="font-display text-[clamp(2rem,6vw,4.8rem)] font-bold tracking-tight text-off-white leading-[1.08] max-w-4xl">
                &ldquo;{item.statement}&rdquo;
              </p>
              {item.subtext && (
                <p className="font-body text-base md:text-xl font-light text-foreground/55 max-w-2xl mt-6 tracking-wide">
                  {item.subtext}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Timeline Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/5 pt-6 text-foreground/40 font-mono text-[10px] tracking-widest">
        <span>CURIOSITY TO EXPERTISE</span>
        <span>SCROLL TO UNPACK</span>
      </div>
    </section>
  );
}

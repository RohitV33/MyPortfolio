"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { STORY_STATEMENTS } from "@/data/portfolioData";

export default function StorySection() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ambientLightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax ambient light drift
      gsap.to(ambientLightRef.current, {
        y: "40%",
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Highlight each story statement as it enters the viewport center
      cardRefs.current.forEach((card) => {
        if (!card) return;

        const text = card.querySelector(".story-text");
        const badge = card.querySelector(".story-badge");
        const sub = card.querySelector(".story-subtext");

        gsap.fromTo(
          [badge, text, sub],
          { opacity: 0.2, y: 30, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              end: "bottom 35%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-story"
      ref={containerRef}
      className="relative w-full min-h-screen py-28 md:py-40 bg-charcoal text-off-white select-none border-t border-white/5 px-6 md:px-16"
    >
      {/* Dynamic ambient background evolution */}
      <div
        ref={ambientLightRef}
        aria-hidden="true"
        className="absolute top-1/4 left-1/4 w-[55vw] h-[55vw] rounded-full pointer-events-none will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(245, 166, 35, 0.2) 0%, rgba(217, 119, 6, 0.08) 50%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Sticky Editorial Header */}
        <div ref={titleRef} className="max-w-3xl mb-20 md:mb-32">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber" />
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-amber">
              CHAPTER 02 // THE STORY
            </p>
          </div>
          <h2 className="font-display text-4xl md:text-7xl font-extrabold tracking-tight text-off-white uppercase leading-[0.9]">
            IT STARTED WITH <br />
            <span className="text-amber">CURIOSITY.</span>
          </h2>
          <p className="font-body text-base md:text-lg font-light text-foreground/60 mt-4 leading-relaxed max-w-lg">
            A continuous progression of deconstructing systems, compiling experiments, and mastering the craftsmanship of modern software.
          </p>
        </div>

        {/* Narrative Statements Flow */}
        <div className="flex flex-col gap-28 md:gap-44 max-w-5xl mx-auto">
          {STORY_STATEMENTS.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="flex flex-col items-start border-l border-white/10 pl-6 md:pl-12 will-change-transform"
            >
              <div className="story-badge flex items-center gap-3 mb-4 md:mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-amber shadow-[0_0_12px_var(--amber)]" />
                <span className="font-mono text-xs md:text-sm text-amber font-semibold tracking-[0.3em] uppercase">
                  PHASE 0{index + 1}
                </span>
              </div>

              <p className="story-text font-display text-[clamp(2.2rem,6vw,5rem)] font-extrabold tracking-tight text-off-white leading-[1.05] mb-4 md:mb-6">
                &ldquo;{item.statement}&rdquo;
              </p>

              {item.subtext && (
                <p className="story-subtext font-body text-base md:text-2xl font-light text-foreground/65 max-w-2xl leading-relaxed">
                  {item.subtext}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Stage Footnote */}
        <div className="mt-28 md:mt-40 border-t border-white/10 pt-8 flex items-center justify-between font-mono text-[10px] tracking-widest text-foreground/40 uppercase">
          <span>02 / 09 — THE STORY</span>
          <span>SCROLL FOR CAPABILITIES ↓</span>
        </div>
      </div>
    </section>
  );
}

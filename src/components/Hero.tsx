"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLenis } from "@/components/SmoothScrollProvider";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const rohitRef = useRef<HTMLHeadingElement>(null);
  const vermaRef = useRef<HTMLHeadingElement>(null);
  const nameGroupRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const { lenis } = useLenis();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ── Elegant Entrance Animation ──
      const entryTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      entryTl
        .fromTo(
          glowRef.current,
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 0.35, duration: 1.8 }
        )
        .fromTo(
          eyebrowRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=1.4"
        )
        .fromTo(
          [rohitRef.current, vermaRef.current],
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, stagger: 0.12 },
          "-=0.9"
        )
        .fromTo(
          detailsRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.7"
        )
        .fromTo(
          ctaGroupRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.4"
        );

      // ── Smooth Scroll Scrub (No dead gaps) ──
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      scrubTl
        .to(rohitRef.current, { x: -50, ease: "none" }, 0)
        .to(vermaRef.current, { x: 50, ease: "none" }, 0)
        .to(glowRef.current, { scale: 1.5, opacity: 0.5, ease: "none" }, 0)
        .to(contentWrapperRef.current, { y: 100, opacity: 0.25, ease: "none" }, 0)
        .to(scrollIndicatorRef.current, { opacity: 0, ease: "none" }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const workEl = document.getElementById("chapter-work");
    if (workEl) {
      if (lenis) {
        lenis.scrollTo(workEl, { duration: 1.4 });
      } else {
        workEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const scrollToStory = (e: React.MouseEvent) => {
    e.preventDefault();
    const storyEl = document.getElementById("chapter-story");
    if (storyEl) {
      if (lenis) {
        lenis.scrollTo(storyEl, { duration: 1.2 });
      } else {
        storyEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="chapter-intro"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-charcoal select-none py-28 md:py-36 px-6 md:px-12"
    >
      {/* ── Warm Amber Glow Expansion Background ── */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="absolute w-[60vw] h-[60vw] max-w-[850px] max-h-[850px] rounded-full pointer-events-none z-0 will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(245, 166, 35, 0.3) 0%, rgba(217, 119, 6, 0.12) 45%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Subtle fine grid lines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 45%, transparent 80%)",
        }}
      />

      {/* ── Main Content Container ── */}
      <div
        ref={contentWrapperRef}
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center justify-center will-change-transform"
      >
        {/* Eyebrow & Status Pill */}
        <div ref={eyebrowRef} className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 mb-5 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 font-mono text-[10px] sm:text-[11px] text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-wider uppercase font-semibold">AVAILABLE FOR SDE ROLES</span>
          </div>
          <span className="hidden sm:inline text-foreground/30 font-mono text-xs">•</span>
          <p className="font-mono text-[9px] sm:text-[11px] md:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-amber font-semibold">
            FULL-STACK ARCHITECT &amp; AI INTEGRATOR
          </p>
        </div>

        {/* Name Typography (Original Display Font) */}
        <div
          ref={nameGroupRef}
          className="flex flex-col items-center justify-center leading-[0.88] tracking-tighter will-change-transform mb-5 sm:mb-8"
        >
          <h1
            ref={rohitRef}
            className="font-display text-[clamp(3.2rem,8.5vw,6.5rem)] font-extrabold text-off-white uppercase will-change-transform"
          >
            ROHIT
          </h1>
          <h1
            ref={vermaRef}
            className="font-display text-[clamp(3.2rem,8.5vw,6.5rem)] font-extrabold text-amber uppercase will-change-transform"
          >
            VERMA
          </h1>
        </div>

        {/* Introduction Statements (Editorial Serif Quote + System Pills) */}
        <div ref={detailsRef} className="max-w-2xl mx-auto space-y-3 sm:space-y-4 mb-6 sm:mb-10 px-2">
          <p className="font-serif italic font-normal text-base sm:text-xl md:text-2xl text-off-white/90 leading-relaxed tracking-tight">
            &ldquo;Engineering high-performance web architectures, computer vision pipelines, and resilient distributed systems.&rdquo;
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-1 font-mono text-[11px] sm:text-xs text-foreground/60">
            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white/[0.03] border border-white/10 text-off-white/80">React.js &amp; Next.js</span>
            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white/[0.03] border border-white/10 text-off-white/80">Node.js &amp; FastAPI</span>
            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white/[0.03] border border-white/10 text-off-white/80">YOLOv8 AI</span>
            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white/[0.03] border border-white/10 text-off-white/80">AWS Certified</span>
          </div>
        </div>

        {/* Interactive CTAs */}
        <div
          ref={ctaGroupRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 w-full sm:w-auto will-change-transform px-4"
        >
          <a
            href="#chapter-work"
            onClick={scrollToWork}
            data-cursor-interactive
            className="group relative inline-flex items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-off-white text-charcoal font-mono font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-amber hover:text-charcoal hover:scale-105 shadow-md"
          >
            <span>EXPLORE MY WORK</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="#chapter-story"
            onClick={scrollToStory}
            data-cursor-interactive
            className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border border-white/15 text-off-white/70 font-mono text-xs tracking-[0.2em] uppercase hover:text-off-white hover:border-white/30 transition-all duration-300"
          >
            <span>INSPECT MY JOURNEY</span>
          </a>
        </div>
      </div>

      {/* ── Scroll Prompt Indicator at Bottom ── */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none select-none"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-foreground/40">
          SCROLL TO BEGIN
        </span>
        <ArrowDown className="w-3.5 h-3.5 text-amber animate-bounce" />
      </div>
    </section>
  );
}

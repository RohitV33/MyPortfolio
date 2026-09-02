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
      // ── Initial Opening State ──
      gsap.set(nameGroupRef.current, {
        scale: 1,
        y: 0,
        opacity: 1,
      });
      gsap.set([rohitRef.current, vermaRef.current], {
        x: 0,
      });
      gsap.set(glowRef.current, {
        scale: 0.8,
        opacity: 0.25,
      });
      gsap.set([eyebrowRef.current, detailsRef.current, ctaGroupRef.current], {
        opacity: 0,
        y: 40,
      });
      gsap.set(scrollIndicatorRef.current, {
        opacity: 1,
        y: 0,
      });

      // ── Cinematic Scroll-Driven Timeline ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      tl
        // Fade out initial scroll prompt immediately
        .to(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.2,
            ease: "power2.out",
          },
          0
        )
        // ROHIT moves slightly left, VERMA moves slightly right
        .to(
          rohitRef.current,
          {
            x: -45,
            duration: 1,
            ease: "power2.out",
          },
          0
        )
        .to(
          vermaRef.current,
          {
            x: 45,
            duration: 1,
            ease: "power2.out",
          },
          0
        )
        // Typography slowly scales down
        .to(
          nameGroupRef.current,
          {
            scale: 0.78,
            y: -25,
            duration: 1,
            ease: "power2.out",
          },
          0
        )
        // Background amber glow expands
        .to(
          glowRef.current,
          {
            scale: 1.7,
            opacity: 0.55,
            duration: 1,
            ease: "power2.out",
          },
          0
        )
        // Eyebrow appears
        .to(
          eyebrowRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power3.out",
          },
          0.15
        )
        // Introduction text & institution appear
        .to(
          detailsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          0.3
        )
        // CTAs move upward into view
        .to(
          ctaGroupRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          0.45
        )
        // Slight hold before transitioning to Chapter 02
        .to({}, { duration: 0.4 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const workEl = document.getElementById("chapter-work");
    if (workEl) {
      if (lenis) {
        lenis.scrollTo(workEl, { duration: 1.5 });
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
        lenis.scrollTo(storyEl, { duration: 1.3 });
      } else {
        storyEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="chapter-intro"
      ref={containerRef}
      className="relative w-full min-h-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-charcoal select-none"
    >
      {/* ── Warm Amber Glow Expansion Background ── */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full pointer-events-none z-0 will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(245, 166, 35, 0.28) 0%, rgba(217, 119, 6, 0.12) 45%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Subtle fine grid lines behind the scene */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      {/* ── Main Content Container ── */}
      <div
        ref={contentWrapperRef}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center text-center justify-center"
      >
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="mb-4 md:mb-6">
          <p className="font-mono text-[10px] md:text-xs tracking-[0.35em] uppercase text-amber">
            FULL-STACK DEVELOPER • AI ENTHUSIAST
          </p>
        </div>

        {/* Huge Name Typography */}
        <div
          ref={nameGroupRef}
          className="flex flex-col items-center justify-center leading-[0.85] tracking-tighter will-change-transform mb-6 md:mb-8"
        >
          <h1
            ref={rohitRef}
            className="font-display text-[clamp(4.5rem,14vw,11.5rem)] font-extrabold text-off-white uppercase will-change-transform"
          >
            ROHIT
          </h1>
          <h1
            ref={vermaRef}
            className="font-display text-[clamp(4.5rem,14vw,11.5rem)] font-extrabold text-amber uppercase will-change-transform"
          >
            VERMA
          </h1>
        </div>

        {/* Introduction Statements */}
        <div ref={detailsRef} className="max-w-2xl mx-auto space-y-3 md:space-y-4 mb-8 md:mb-10">
          <p className="font-body text-lg md:text-2xl font-light text-off-white/90 leading-relaxed tracking-tight">
            &ldquo;Engineering high-performance web systems
            <br className="hidden sm:inline" /> and dynamic digital experiences.&rdquo;
          </p>
          <p className="font-mono text-xs md:text-sm text-foreground/50 tracking-wider">
            B.Tech Computer Science & Engineering student at{" "}
            <span className="text-off-white/80 font-medium">KIET Group of Institutions</span>.
          </p>
        </div>

        {/* Interactive CTAs */}
        <div
          ref={ctaGroupRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 will-change-transform"
        >
          <a
            href="#chapter-work"
            onClick={scrollToWork}
            data-cursor-interactive
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-off-white text-charcoal font-mono font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-amber hover:text-charcoal hover:scale-105"
          >
            <span>EXPLORE MY WORK</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="#chapter-story"
            onClick={scrollToStory}
            data-cursor-interactive
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/10 text-off-white/70 font-mono text-xs tracking-[0.2em] uppercase hover:text-off-white hover:border-white/30 transition-all duration-300"
          >
            <span>GET TO KNOW ME</span>
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

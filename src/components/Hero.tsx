"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
const heading = ["ROHIT", "VERMA"];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  // Parallax elements
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const shape3Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // ─── Entry Animations ───────────────────

      // Grid reveal
      tl.fromTo(
        gridRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 0.15, scale: 1, duration: 2.5, ease: "expo.out" },
        0
      );

      // Shape reveals
      [shape1Ref, shape2Ref, shape3Ref].forEach((ref, i) => {
        tl.fromTo(
          ref.current,
          { opacity: 0, scale: 0.8, filter: "blur(40px)" },
          { opacity: 0.5, scale: 1, filter: "blur(60px)", duration: 2, ease: "power2.out" },
          0.2 + i * 0.2
        );
      });

      // Heading split-text-like reveal
      wordsRef.current.forEach((word, i) => {
        if (!word) return;
        tl.fromTo(
          word,
          {
            opacity: 0,
            y: 80,
            rotateX: -45,
            filter: "blur(12px)",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power4.out",
          },
          0.6 + i * 0.15
        );
      });

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20, filter: "blur(8px)" },
        { opacity: 0.6, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out" },
        1.2
      );

      // CTA
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        1.5
      );

      // ─── Scroll Parallax ───────────────────

      // Heading parallax
      gsap.to(".hero-heading", {
        y: 100,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Scroll Hint fade out
      gsap.to(scrollHintRef.current, {
        opacity: 0,
        y: 30,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "20% top",
          scrub: true,
        }
      });

      // Shape parallax
      gsap.to(shape1Ref.current, {
        y: -150,
        x: 50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });
      gsap.to(shape2Ref.current, {
        y: 100,
        x: -80,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        }
      });
      gsap.to(shape3Ref.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        }
      });

      // Grid parallax
      gsap.to(gridRef.current, {
        y: 50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-36"
    >
      {/* ── Background Elements ── */}

      {/* Mesh Grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-0"
        style={{
          backgroundImage: `linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(circle at 50% 50%, black, transparent 80%)",
        }}
      />

      {/* Ambient Blobs */}
      <div
        ref={shape1Ref}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full z-0 opacity-0"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />
      <div
        ref={shape2Ref}
        className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full z-0 opacity-0"
        style={{
          background: "radial-gradient(circle, var(--accent-muted) 0%, transparent 70%)",
        }}
      />
      <div
        ref={shape3Ref}
        className="absolute top-[20%] right-[10%] w-[25vw] h-[25vw] rounded-full z-0 opacity-0"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />

      {/* Cinematic Scanline */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />

      {/* ── Main Content ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-8 text-center perspective-1000">

        {/* Eyebrow */}
        <div className="overflow-hidden mb-6">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent animate-pulse">
            System Online // Creative Developer
          </p>
        </div>

        {/* Heading */}
        {/* Heading */}
        <h1 className="hero-heading font-akira text-[clamp(3.5rem,10vw,10rem)] font-bold leading-[0.9] tracking-tighter mb-12 flex justify-center items-center gap-4">
          {heading.map((word, i) => (
            <span
              key={word}
              ref={(el) => { wordsRef.current[i] = el; }}
              className="inline-block opacity-0 will-change-transform mx-8"
              style={{
                color: i === 1 ? "var(--accent)" : "var(--foreground)",
                textShadow: i === 1 ? "0 0 40px var(--accent-muted)" : "none",
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-lg md:text-2xl font-light text-foreground max-w-2xl mx-auto leading-relaxed opacity-0 mb-16"
          style={{ letterSpacing: "-0.01em" }}
        >
          Engineering digital experiences where <span className="text-foreground font-medium">precision</span> meets <span className="italic font-display">poetry</span>. Specializing in high-performance web systems and cinematic motion design.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-8 opacity-0">
          <Link
            href="/projects"
            className="group relative px-10 py-5 rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
          >
            <div className="absolute inset-0 bg-accent transition-transform duration-500 group-hover:scale-110" />
            <span className="relative z-10 font-mono font-bold text-[11px] tracking-[0.2em] uppercase text-[#0D0D0D] flex items-center gap-3">
              Explore Projects
              <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" viewBox="0 0 14 14">
                <path d="M1 7h12M9 3l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>

          <Link
            href="/about"
            className="group font-mono text-[11px] tracking-[0.2em] uppercase text-foreground/60 hover:text-foreground transition-colors py-4"
          >
            Read the story
            <div className="h-px w-0 group-hover:w-full bg-accent transition-all duration-500 mt-1" />
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollHintRef}
        className="scroll-hint absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
      >
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase opacity-40">
          Scroll to explore
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-accent to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-accent animate-scrollLine" />
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @media (max-height: 720px) {
          .scroll-hint {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
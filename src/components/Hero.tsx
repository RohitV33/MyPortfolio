"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLenis } from "@/components/SmoothScrollProvider";
import { HERO_DATA } from "@/data/portfolioData";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const textStackRef = useRef<HTMLDivElement>(null);
  const photoContainerRef = useRef<HTMLDivElement>(null);
  const bottomUIRef = useRef<HTMLDivElement>(null);
  const { lenis } = useLenis();

  // Mouse parallax coordinates (smooth normalized -1 to 1)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 1. Interactive Mouse Parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 2. Mouse Scroll Scrub Animations (GSAP ScrollTrigger)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Smoothly float up and fade out the text stack on mouse scroll
      if (textStackRef.current) {
        gsap.to(textStackRef.current, {
          y: -120,
          opacity: 0,
          scale: 0.94,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom 35%",
            scrub: 0.8,
          },
        });
      }

      // Cinematic depth parallax on the photograph on mouse scroll
      if (photoContainerRef.current) {
        gsap.to(photoContainerRef.current, {
          y: 70,
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Fade out bottom controls on initial scroll
      if (bottomUIRef.current) {
        gsap.to(bottomUIRef.current, {
          opacity: 0,
          y: 20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "25% top",
            scrub: 0.5,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToCapabilities = (e: React.MouseEvent) => {
    e.preventDefault();
    const capEl = document.getElementById("chapter-capabilities");
    if (capEl) {
      if (lenis) {
        lenis.scrollTo(capEl, { duration: 1.2 });
      } else {
        capEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="chapter-intro"
      ref={containerRef}
      className="relative w-full h-screen min-h-[640px] overflow-hidden bg-[#0d0d0d] select-none"
    >
      {/* ── 1. The Photographic Hero Environment (Full-Bleed Canvas) ── */}
      {/* Responds to both mousemove parallax and mouse scroll depth */}
      <div
        ref={photoContainerRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 will-change-transform"
        style={{
          transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 4}px) rotate(${mousePos.x * 0.25}deg)`,
          transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
        <div
          className="relative w-full h-full scale-[1.03]"
          style={{
            animation: "photographicBreathing 8s ease-in-out infinite alternate",
          }}
        >
          <Image
            src="/images/rohit_hero_clean.jpg"
            alt="Rohit Verma — Cinematic Portrait Environment"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[51%_35%] select-none"
          />

          {/* ── 2. Atmospheric Double-Exposure Drift Layer ── */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-25"
            style={{
              transform: `translate(${mousePos.x * -4 - 3}px, ${mousePos.y * -2 - 2}px)`,
              animation: "ghostAtmosphericDrift 9.5s ease-in-out infinite alternate",
            }}
          >
            <Image
              src="/images/rohit_ghost_overlay.png"
              alt="Rohit Verma Double Exposure Atmosphere"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[51%_35%] select-none filter blur-[1px]"
            />
          </div>

          {/* ── 3. Subtle Living Facial Lighting Shift ── */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
            style={{
              background: `radial-gradient(ellipse at ${52 + mousePos.x * 2}% ${35 + mousePos.y * 2}%, rgba(255, 245, 230, 0.4) 0%, transparent 48%)`,
              animation: "facialLightShift 8.5s ease-in-out infinite alternate",
            }}
          />
        </div>
      </div>

      {/* ── Seamless Edge Vignette ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse at 51% 40%, transparent 58%, rgba(13, 13, 13, 0.4) 80%, rgba(13, 13, 13, 0.95) 100%), linear-gradient(to bottom, rgba(13, 13, 13, 0.25) 0%, transparent 18%, transparent 85%, rgba(13, 13, 13, 0.8) 100%)",
        }}
      />

      {/* ── Central Typographic Stack Layer (Matches Website Fonts & Amber Colors) ── */}
      {/* Positioned over chest/torso, with mouse parallax and GSAP mouse-scroll animation */}
      <div
        ref={textStackRef}
        className="absolute inset-x-0 bottom-[6%] sm:bottom-[7%] md:bottom-[7.5%] z-20 flex flex-col items-center text-center pointer-events-none px-4 will-change-transform"
        style={{
          transform: `translate(${mousePos.x * 3.5}px, ${mousePos.y * 2}px)`,
          transition: "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
        {/* 1. Identity Layer: ROHIT VERMA (Matches Chapter 02 font-display Syne/Akira, off-white, wide tracking) */}
        <h1 className="font-display font-extrabold text-base sm:text-lg md:text-xl lg:text-[23px] tracking-[0.24em] text-off-white uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] mb-1.5 pointer-events-auto select-none">
          {HERO_DATA.name}
        </h1>

        {/* 2. Supporting Layer: Web Developer • Competitive Programmer • Problem Solver (Matches font-mono & amber accents) */}
        <p className="font-mono text-[11px] sm:text-xs md:text-[13px] text-off-white/70 tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] max-w-xl pointer-events-auto mb-1.5 sm:mb-2 font-normal flex items-center justify-center gap-2 flex-wrap select-none">
          {HERO_DATA.subtitleParts.map((part, idx) => (
            <span key={part} className="inline-flex items-center gap-2">
              <span>{part}</span>
              {idx < HERO_DATA.subtitleParts.length - 1 && (
                <span className="text-amber font-bold select-none text-[10px]">•</span>
              )}
            </span>
          ))}
        </p>

        {/* 3. Editorial Layer: code. with signature amber period dot matching Chapter 02 accent */}
        <div className="relative pointer-events-none select-none">
          <span className="font-anton text-[clamp(100px,14.5vw,215px)] font-black tracking-[-0.04em] leading-[0.76] text-off-white drop-shadow-[0_25px_50px_rgba(0,0,0,0.98)] block">
            {HERO_DATA.keyword}
            <span className="text-amber drop-shadow-[0_0_30px_rgba(245,166,35,0.7)]">.</span>
          </span>
        </div>
      </div>

      {/* ── Bottom UI: Anchored to Viewport Bottom Edge ── */}
      <div
        ref={bottomUIRef}
        className="absolute inset-x-0 bottom-6 sm:bottom-7 md:bottom-8 z-30 px-8 sm:px-10 max-w-[1720px] mx-auto flex items-center justify-between select-none pointer-events-none will-change-transform"
      >
        {/* Bottom-Left: Location information with signature amber line */}
        <div className="flex items-center gap-3 text-off-white/60 font-mono text-xs tracking-wider pointer-events-auto">
          <span className="w-5 sm:w-6 h-px bg-amber/80" />
          <span>{HERO_DATA.location}</span>
        </div>

        {/* Bottom-Right: BUILD / LEARN / EXPLORE + Circular Arrow Button */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <span className="hidden sm:inline-block text-off-white/60 font-mono text-[11px] tracking-[0.25em] uppercase">
            {HERO_DATA.taglineParts.map((part, idx) => (
              <span key={part}>
                {part}
                {idx < HERO_DATA.taglineParts.length - 1 && (
                  <span className="text-amber mx-2.5 font-bold">/</span>
                )}
              </span>
            ))}
          </span>

          <button
            type="button"
            onClick={scrollToCapabilities}
            data-cursor-interactive
            className="group w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 bg-black/25 backdrop-blur-md flex items-center justify-center text-off-white hover:border-amber hover:bg-amber/10 hover:text-amber hover:scale-105 active:scale-95 transition-all shadow-md"
            aria-label="Scroll to explore"
            title="Scroll to explore"
          >
            <ArrowDown className="w-4 h-4 text-off-white group-hover:text-amber transition-colors duration-300 group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* ── Organic Living Animations ── */}
      <style jsx global>{`
        @keyframes photographicBreathing {
          0% {
            transform: scale(1) translateY(0px);
          }
          50% {
            transform: scale(1.008) translateY(-2.5px);
          }
          100% {
            transform: scale(1.003) translateY(-0.8px);
          }
        }

        @keyframes ghostAtmosphericDrift {
          0% {
            transform: translate(0px, 0px) scale(1);
            opacity: 0.22;
          }
          50% {
            transform: translate(-6px, -3px) scale(1.015);
            opacity: 0.32;
          }
          100% {
            transform: translate(-3px, 1px) scale(1.008);
            opacity: 0.26;
          }
        }

        @keyframes facialLightShift {
          0% {
            transform: translate(-2%, -2%) scale(1);
            opacity: 0.22;
          }
          50% {
            transform: translate(2%, 1.5%) scale(1.03);
            opacity: 0.35;
          }
          100% {
            transform: translate(-1%, 0.5%) scale(1.01);
            opacity: 0.25;
          }
        }
      `}</style>
    </section>
  );
}

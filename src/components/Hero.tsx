"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { useLenis } from "@/components/SmoothScrollProvider";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { lenis } = useLenis();

  // Mouse parallax state for organic interactive depth
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
      className="relative w-full h-screen min-h-[700px] flex flex-col justify-between overflow-hidden bg-[#111215] select-none pt-24 pb-8 sm:pb-12 px-6 sm:px-12 md:px-16"
    >
      {/* ── Studio Vignette & Radial Spotlight (Matches Reference Lighting) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(255, 255, 255, 0.08) 0%, rgba(180, 160, 140, 0.03) 35%, transparent 70%), radial-gradient(circle at 50% 50%, transparent 45%, rgba(10, 11, 14, 0.95) 100%)",
        }}
      />

      {/* Subtle Atmospheric Studio Grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] z-0"
      />

      {/* ── Centerpiece: Living Double-Exposure Portrait ── */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center my-auto pointer-events-none">
        <div className="relative w-full max-w-[1020px] aspect-[16/9.2] sm:aspect-[16/9] flex items-center justify-center [mask-image:radial-gradient(ellipse_75%_75%_at_50%_48%,black_58%,transparent_96%)]">
          {/* 1. Ghosted Profile Duplicate (Offset to left with independent drifting) */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out will-change-transform opacity-45 mix-blend-screen"
            style={{
              transform: `translate(${mousePos.x * -10 - 16}px, ${mousePos.y * -6}px) scale(1.02)`,
              animation: "ghostDrift 11s ease-in-out infinite alternate",
            }}
          >
            <div className="relative w-full h-full filter grayscale contrast-125 brightness-90">
              <Image
                src="/images/rohit_hero_clean.jpg"
                alt="Rohit Verma Double-Exposure Profile"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1020px"
                className="object-contain object-center scale-[1.03]"
              />
            </div>
          </div>

          {/* 2. Main High-Contrast Cinematic Front Portrait */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out will-change-transform"
            style={{
              transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 4}px)`,
              animation: "livingBreathingPortrait 8s ease-in-out infinite alternate",
            }}
          >
            <div className="relative w-full h-full filter grayscale contrast-[1.18] brightness-[0.96]">
              <Image
                src="/images/rohit_hero_clean.jpg"
                alt="Rohit Verma Cinematic Portrait"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1020px"
                className="object-contain object-center"
              />

              {/* 3. Subtle Studio Lighting Sweep across Facial Features */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-25"
                style={{
                  background:
                    "radial-gradient(ellipse at 49% 42%, rgba(255, 235, 200, 0.45) 0%, transparent 58%)",
                  animation: "studioLightSweep 9.5s ease-in-out infinite alternate",
                }}
              />
            </div>
          </div>
        </div>

        {/* ── Overlay Text Hierarchy: Centered Over Lower Portrait & Composition ── */}
        <div className="absolute inset-x-0 bottom-6 sm:bottom-8 md:bottom-10 z-20 flex flex-col items-center text-center pointer-events-none">
          {/* Upper Title: ROHIT VERMA */}
          <h1
            className="font-mono text-xs sm:text-sm md:text-[15px] font-bold tracking-[0.38em] text-white/95 uppercase drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)] mb-1 sm:mb-1.5 transition-transform duration-300 ease-out pointer-events-auto"
            style={{
              transform: `translate(${mousePos.x * 2.5}px, ${mousePos.y * 1.5}px)`,
            }}
          >
            ROHIT VERMA
          </h1>

          {/* Subtitle: Web Developer, Competitive Programmer and Problem Solver */}
          <p
            className="font-mono text-[11px] sm:text-xs md:text-[13px] text-white/70 tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] font-light max-w-xl px-4 transition-transform duration-300 ease-out pointer-events-auto mb-2 sm:mb-3"
            style={{
              transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 1.2}px)`,
            }}
          >
            Web Developer, Competitive Programmer and Problem Solver
          </p>

          {/* ── Enormous Bold Condensed Typography: "code." ── */}
          <div
            className="relative pointer-events-none select-none transition-transform duration-300 ease-out"
            style={{
              transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 0.8}px)`,
            }}
          >
            <span className="font-black text-[clamp(5.2rem,17vw,15.5rem)] tracking-tighter leading-[0.76] text-white drop-shadow-[0_25px_60px_rgba(0,0,0,0.98)] block">
              code.
            </span>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar: Based in India & BUILD / LEARN / EXPLORE + Arrow ── */}
      <div className="relative z-30 w-full max-w-7xl mx-auto flex items-center justify-between mt-auto select-none">
        {/* Bottom-Left: Subtle Line + Based in India */}
        <div className="flex items-center gap-3 text-white/60 font-mono text-[11px] sm:text-xs tracking-wider">
          <span className="w-5 sm:w-6 h-px bg-white/40" />
          <span>Based in India</span>
        </div>

        {/* Bottom-Right: BUILD / LEARN / EXPLORE + Circular Downward-Arrow Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden sm:inline-block text-white/60 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] uppercase">
            BUILD &nbsp;/&nbsp; LEARN &nbsp;/&nbsp; EXPLORE
          </span>

          <button
            type="button"
            onClick={scrollToCapabilities}
            data-cursor-interactive
            className="group w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 bg-white/[0.02] flex items-center justify-center text-white hover:border-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all shadow-md"
            aria-label="Scroll down to explore"
            title="Scroll to explore"
          >
            <ArrowDown className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* ── Keyframe Animations for Living Organic Motion ── */}
      <style jsx global>{`
        @keyframes livingBreathingPortrait {
          0% {
            transform: scale(1) translateY(0px);
          }
          50% {
            transform: scale(1.007) translateY(-3px);
          }
          100% {
            transform: scale(1.014) translateY(-1px);
          }
        }

        @keyframes ghostDrift {
          0% {
            transform: translate(-14px, 0px) scale(1.01);
            opacity: 0.4;
          }
          50% {
            transform: translate(-22px, -3.5px) scale(1.028);
            opacity: 0.55;
          }
          100% {
            transform: translate(-16px, 1.5px) scale(1.018);
            opacity: 0.44;
          }
        }

        @keyframes studioLightSweep {
          0% {
            transform: translate(-6%, -4%) scale(1);
            opacity: 0.16;
          }
          50% {
            transform: translate(5%, 3%) scale(1.05);
            opacity: 0.28;
          }
          100% {
            transform: translate(-3%, 2%) scale(1.02);
            opacity: 0.18;
          }
        }
      `}</style>
    </section>
  );
}

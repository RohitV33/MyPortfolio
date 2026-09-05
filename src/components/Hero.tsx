"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLenis } from "@/components/SmoothScrollProvider";

const DISCIPLINES = [
  {
    word: "code.",
    title: "ROHIT VERMA",
    subtitle: "Web developer, competitive programmer and problem solver from India",
  },
  {
    word: "build.",
    title: "ROHIT VERMA",
    subtitle: "Full-stack architect, AI systems and distributed web platform builder",
  },
  {
    word: "solve.",
    title: "ROHIT VERMA",
    subtitle: "Competitive programmer, low-latency algorithms and data structures",
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { lenis } = useLenis();
  const [activeSlide, setActiveSlide] = useState(0);

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

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : DISCIPLINES.length - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev < DISCIPLINES.length - 1 ? prev + 1 : 0));
  };

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

  const currentDiscipline = DISCIPLINES[activeSlide];

  return (
    <section
      id="chapter-intro"
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] flex flex-col justify-between overflow-hidden bg-[#131417] select-none pt-24 pb-8 sm:pb-12 px-6 sm:px-10 md:px-16"
    >
      {/* ── Studio Vignette & Circular Halo Spotlight (Exact Reference Lighting) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(255, 255, 255, 0.09) 0%, rgba(180, 160, 140, 0.035) 36%, transparent 70%), radial-gradient(circle at 50% 50%, transparent 45%, rgba(13, 14, 17, 0.96) 100%)",
        }}
      />

      {/* Subtle Atmospheric Studio Grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] z-0"
      />

      {/* ── Centerpiece: Living Double-Exposure Portrait (Exact Cutout & Profile) ── */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center my-auto pointer-events-none">
        <div className="relative w-full max-w-[960px] aspect-[16/9.5] sm:aspect-[16/9] flex items-center justify-center [mask-image:radial-gradient(ellipse_75%_75%_at_50%_48%,black_60%,transparent_96%)]">
          {/* 1. Ghosted Profile Duplicate (Offset to left with independent organic floating drift) */}
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
                sizes="(max-width: 1024px) 100vw, 960px"
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
                sizes="(max-width: 1024px) 100vw, 960px"
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

        {/* ── Overlay Text Hierarchy: Matching Christoph Nagel Reference Composition ── */}
        <div className="absolute inset-x-0 bottom-4 sm:bottom-6 md:bottom-8 z-20 flex flex-col items-center text-center pointer-events-none">
          {/* Top Title: ROHIT VERMA in Anton font */}
          <h1
            className="font-anton text-xl sm:text-2xl md:text-3xl tracking-[0.16em] text-white uppercase drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)] mb-1 transition-transform duration-300 ease-out pointer-events-auto"
            style={{
              transform: `translate(${mousePos.x * 2.5}px, ${mousePos.y * 1.5}px)`,
            }}
          >
            {currentDiscipline.title}
          </h1>

          {/* Subtitle in Anton font */}
          <p
            className="font-anton text-xs sm:text-sm md:text-base tracking-wide text-white/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] max-w-2xl px-4 transition-transform duration-300 ease-out pointer-events-auto mb-2 sm:mb-2.5 font-normal"
            style={{
              transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 1.2}px)`,
            }}
          >
            {currentDiscipline.subtitle}
          </p>

          {/* ── Massive Condensed Typography: "code." in Anton ── */}
          <div
            className="relative pointer-events-none select-none transition-transform duration-300 ease-out"
            style={{
              transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 0.8}px)`,
            }}
          >
            <span className="font-anton text-[clamp(6.5rem,24vw,19.5rem)] font-normal tracking-[-0.03em] leading-[0.76] text-white drop-shadow-[0_25px_60px_rgba(0,0,0,0.98)] block">
              {currentDiscipline.word}
            </span>
          </div>
        </div>

        {/* ── Floating "( SCROLL )" Button (Matches Right-Side Floating Pill) ── */}
        <button
          type="button"
          onClick={scrollToCapabilities}
          data-cursor-interactive
          className="hidden md:flex absolute right-[5%] lg:right-[9%] xl:right-[12%] top-[54%] -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-md items-center justify-center text-white/80 hover:text-white hover:border-white/50 hover:scale-110 active:scale-95 transition-all shadow-2xl z-30 group pointer-events-auto"
          aria-label="Scroll down"
          title="Scroll down"
        >
          <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.25em] group-hover:tracking-[0.3em] transition-all">
            SCROLL
          </span>
        </button>
      </div>

      {/* ── Bottom Bar: Flag & Imprint (Left) / Carousel Controls (Right) ── */}
      <div className="relative z-30 w-full max-w-7xl mx-auto flex items-center justify-between mt-auto select-none pt-2">
        {/* Bottom-Left: Flag + Imprint / Data protection */}
        <div className="flex items-center gap-2 sm:gap-2.5 text-white/60 font-mono text-[11px] sm:text-xs tracking-wider">
          <span className="text-base sm:text-lg">🇮🇳</span>
          <span className="hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline">
            Imprint
          </span>
          <span className="text-white/30">·</span>
          <span className="hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline">
            Data protection
          </span>
        </div>

        {/* Bottom-Right: Carousel Controls (< ──────── >) */}
        <div className="flex items-center gap-3 sm:gap-4 select-none">
          <button
            type="button"
            onClick={handlePrevSlide}
            data-cursor-interactive
            className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.02] flex items-center justify-center text-white/60 hover:text-white hover:border-white hover:scale-105 active:scale-95 transition-all"
            aria-label="Previous discipline"
            title="Previous discipline"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Horizontal Track Line with Indicator */}
          <div className="w-16 sm:w-24 h-0.5 bg-white/20 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-white transition-all duration-500 ease-out"
              style={{
                width: "33.33%",
                transform: `translateX(${activeSlide * 100}%)`,
              }}
            />
          </div>

          <button
            type="button"
            onClick={handleNextSlide}
            data-cursor-interactive
            className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.02] flex items-center justify-center text-white/60 hover:text-white hover:border-white hover:scale-105 active:scale-95 transition-all"
            aria-label="Next discipline"
            title="Next discipline"
          >
            <ChevronRight className="w-4 h-4" />
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

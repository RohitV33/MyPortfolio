"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { useLenis } from "@/components/SmoothScrollProvider";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { lenis } = useLenis();

  // Mouse parallax coordinates (smooth normalized -1 to 1)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#0e0f12] select-none"
    >
      {/* ── Studio Vignette & Radial Lighting Behind Portrait ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 53% 38%, rgba(255, 255, 255, 0.08) 0%, rgba(190, 170, 150, 0.025) 34%, transparent 68%), radial-gradient(circle at 50% 50%, transparent 45%, rgba(10, 11, 14, 0.98) 100%)",
        }}
      />

      {/* Subtle Atmospheric Studio Grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.028] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] z-0"
      />

      {/* ── Centerpiece: Living Cinematic Portrait Layer ── */}
      {/* Horizontally centered at 52-55% viewport, starting ~8-10% from top */}
      <div className="absolute inset-x-0 top-[6%] sm:top-[8%] bottom-0 flex items-center justify-center pointer-events-none z-10 overflow-visible">
        <div className="relative w-full max-w-[780px] md:max-w-[880px] lg:max-w-[960px] h-[85vh] sm:h-[88vh] flex items-center justify-center [mask-image:linear-gradient(to_bottom,black_65%,transparent_98%)]">
          {/* 1. Ghost Portrait: Left offset ~60px, grayscale, opacity ~20%, slight blur, slower independent drift */}
          <div
            className="absolute inset-0 flex items-center justify-center will-change-transform opacity-20 filter grayscale contrast-125 blur-[1.5px]"
            style={{
              transform: `translate(${mousePos.x * -10 - 55}px, ${mousePos.y * -6 - 8}px)`,
              animation: "ghostLivingDrift 10s ease-in-out infinite alternate",
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/rohit_portrait_seamless.png"
                alt="Rohit Verma Ghost Profile"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 960px"
                className="object-contain object-bottom scale-[1.03]"
              />
            </div>
          </div>

          {/* 2. Main Portrait: Monochrome with strong cinematic contrast, slow breathing & micro-tilt */}
          <div
            className="absolute inset-0 flex items-center justify-center will-change-transform filter grayscale contrast-[1.2] brightness-[0.97]"
            style={{
              transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 5}px) rotate(${mousePos.x * 0.8}deg)`,
              animation: "mainPortraitBreathing 7.5s ease-in-out infinite alternate",
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/rohit_portrait_seamless.png"
                alt="Rohit Verma Portrait"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 960px"
                className="object-contain object-bottom"
              />

              {/* 3. Subtle Lighting Shift across facial planes */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-25"
                style={{
                  background:
                    "radial-gradient(ellipse at 51% 38%, rgba(255, 240, 210, 0.45) 0%, transparent 55%)",
                  animation: "facialLightShift 9s ease-in-out infinite alternate",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Central Typography Stack (All Centered, Exact Hierarchy) ── */}
      {/* Stack sits in the lower portion overlapping chest without colliding with face */}
      <div className="absolute inset-x-0 bottom-[6%] sm:bottom-[7%] md:bottom-[8%] z-20 flex flex-col items-center text-center pointer-events-none px-4">
        {/* 1. Name: ROHIT VERMA (Uppercase, Anton condensed, letter spacing ~0.12em, white, centered) */}
        <h1
          className="font-anton text-lg sm:text-xl md:text-2xl tracking-[0.14em] text-white uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] mb-1 sm:mb-1.5 transition-transform duration-300 ease-out pointer-events-auto"
          style={{
            transform: `translate(${mousePos.x * 3}px, ${mousePos.y * 2}px)`,
          }}
        >
          ROHIT VERMA
        </h1>

        {/* 2. Subtitle: Web developer, competitive programmer and problem solver from India */}
        <p
          className="font-mono text-xs sm:text-[13px] md:text-sm text-white/75 tracking-[0.03em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-xl transition-transform duration-300 ease-out pointer-events-auto mb-2 sm:mb-3 font-normal"
          style={{
            transform: `translate(${mousePos.x * 2.5}px, ${mousePos.y * 1.5}px)`,
          }}
        >
          Web developer, competitive programmer and problem solver from India
        </p>

        {/* 3. Word: "code." (Target size ~170–220px desktop, bold condensed Anton font, period visible) */}
        <div
          className="relative pointer-events-none select-none transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${mousePos.x * 1.8}px, ${mousePos.y * 1.2}px)`,
          }}
        >
          <span className="font-anton text-[clamp(90px,13vw,210px)] font-black tracking-[-0.04em] leading-[0.75] text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.98)] block">
            code.
          </span>
        </div>
      </div>

      {/* ── Bottom UI: Anchored to Bottom Edge ── */}
      <div className="absolute inset-x-0 bottom-6 sm:bottom-7 md:bottom-8 z-30 px-8 sm:px-10 max-w-[1720px] mx-auto flex items-center justify-between select-none pointer-events-none">
        {/* Bottom-Left: Small horizontal line + Based in India */}
        <div className="flex items-center gap-3 text-white/50 font-mono text-xs tracking-wider pointer-events-auto">
          <span className="w-5 sm:w-6 h-px bg-white/35" />
          <span>Based in India</span>
        </div>

        {/* Bottom-Right: BUILD / LEARN / EXPLORE + Circular Outlined Arrow Button */}
        <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto">
          <span className="hidden sm:inline-block text-white/50 font-mono text-[11px] tracking-[0.25em] uppercase">
            BUILD &nbsp;/&nbsp; LEARN &nbsp;/&nbsp; EXPLORE
          </span>

          <button
            type="button"
            onClick={scrollToCapabilities}
            data-cursor-interactive
            className="group w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/25 bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:border-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all shadow-md"
            aria-label="Scroll to explore"
            title="Scroll to explore"
          >
            <ArrowDown className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* ── Organic Living Portrait Keyframes ── */}
      <style jsx global>{`
        @keyframes mainPortraitBreathing {
          0% {
            transform: scale(1) translateY(0px);
          }
          50% {
            transform: scale(1.006) translateY(-3px);
          }
          100% {
            transform: scale(1.012) translateY(-1px);
          }
        }

        @keyframes ghostLivingDrift {
          0% {
            transform: translate(-55px, -8px) scale(1.01);
            opacity: 0.18;
          }
          50% {
            transform: translate(-65px, -12px) scale(1.025);
            opacity: 0.25;
          }
          100% {
            transform: translate(-58px, -6px) scale(1.015);
            opacity: 0.2;
          }
        }

        @keyframes facialLightShift {
          0% {
            transform: translate(-4%, -3%) scale(1);
            opacity: 0.18;
          }
          50% {
            transform: translate(4%, 3%) scale(1.04);
            opacity: 0.28;
          }
          100% {
            transform: translate(-2%, 1%) scale(1.01);
            opacity: 0.2;
          }
        }
      `}</style>
    </section>
  );
}

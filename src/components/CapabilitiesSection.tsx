"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CAPABILITIES } from "@/data/portfolioData";
import { ArrowUpRight } from "lucide-react";
import SplitTextReveal from "@/components/SplitTextReveal";

export default function CapabilitiesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card) => {
        if (!card) return;

        const title = card.querySelector(".cap-title");
        const num = card.querySelector(".cap-num");
        const tag = card.querySelector(".cap-tag");
        const details = card.querySelectorAll(".cap-detail");

        gsap.fromTo(
          [num, title, tag, ...Array.from(details)],
          { opacity: 0.15, y: 30, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 30%",
              toggleActions: "play reverse play reverse",
            },
          }
        );

        // 3D tilt effect on hover
        card.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, {
            rotateY: x * 5,
            rotateX: -y * 5,
            duration: 0.3,
            ease: "power2.out",
            transformPerspective: 800,
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-capabilities"
      ref={containerRef}
      className="relative w-full min-h-screen py-28 md:py-40 bg-charcoal text-off-white select-none border-t border-white/5 px-6 md:px-16"
    >
      {/* Background Subtle Gradient */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 right-10 w-[50vw] h-[50vw] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(245, 166, 35, 0.22) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header: From Idea to Interface */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber" />
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-amber">
              Ch. 02 — What I Do
            </p>
          </div>
          <SplitTextReveal
            as="h2"
            className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-off-white uppercase leading-[0.95]"
          >
            FROM IDEA TO INTERFACE.
          </SplitTextReveal>
          <p className="font-body text-sm md:text-base font-light text-foreground/70 mt-4 leading-relaxed max-w-lg">
            Engineering capabilities covering the full lifecycle of modern digital products, from low-latency databases to fluid user interfaces.
          </p>
        </div>

        {/* Capabilities Stream */}
        <div className="flex flex-col gap-8 md:gap-12">
          {CAPABILITIES.map((cap, idx) => (
            <div
              key={cap.number}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="tilt-card p-6 md:p-10 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md transition-all duration-500 hover:border-amber/40 shadow-xl will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Tilt gloss overlay */}
              <div className="tilt-gloss" />

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6 relative z-20">
                <div>
                  <span className="cap-num font-mono text-xs text-amber font-bold tracking-[0.25em] block mb-2">
                    {cap.number} - CAPABILITY
                  </span>
                  <h3 className="cap-title font-grotesk text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-off-white uppercase leading-tight">
                    {cap.title}
                  </h3>
                </div>
                <p className="cap-tag font-body text-base md:text-xl font-light text-off-white/85 max-w-xl leading-relaxed">
                  {cap.tagline}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 border-t border-white/10 pt-6 relative z-20">
                {cap.details.map((detail, dIdx) => (
                  <div
                    key={dIdx}
                    className="cap-detail flex items-center gap-3 text-foreground/70 font-mono text-xs md:text-sm tracking-wide p-2 rounded-lg bg-white/[0.015] border border-white/5 hover:border-amber/20 hover:bg-white/[0.04] transition-all duration-300 group"
                  >
                    <ArrowUpRight className="w-4 h-4 text-amber shrink-0 group-hover:rotate-45 transition-transform duration-300" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Indicator */}
        <div className="mt-24 md:mt-36 border-t border-white/10 pt-8 flex items-center justify-between font-mono text-xs tracking-wider text-foreground/40">
          <span>02 / 08 — Capabilities</span>
          <span>Scroll for selected work ↓</span>
        </div>
      </div>
    </section>
  );
}

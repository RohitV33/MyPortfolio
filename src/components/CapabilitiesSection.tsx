"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CAPABILITIES } from "@/data/portfolioData";
import { ArrowUpRight } from "lucide-react";

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
          { opacity: 0.25, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 30%",
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
              CHAPTER 03 // WHAT I DO
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-off-white uppercase leading-[0.95]">
            FROM IDEA <br />
            <span className="text-amber">TO INTERFACE.</span>
          </h2>
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
              className="p-6 md:p-10 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md transition-all duration-500 hover:border-amber/40 shadow-xl will-change-transform"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
                <div>
                  <span className="cap-num font-mono text-xs text-amber font-bold tracking-[0.25em] block mb-2">
                    {cap.number} // CAPABILITY
                  </span>
                  <h3 className="cap-title font-grotesk text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-off-white uppercase leading-tight">
                    {cap.title}
                  </h3>
                </div>
                <p className="cap-tag font-body text-base md:text-xl font-light text-off-white/85 max-w-xl leading-relaxed">
                  {cap.tagline}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 border-t border-white/10 pt-6">
                {cap.details.map((detail, dIdx) => (
                  <div
                    key={dIdx}
                    className="cap-detail flex items-center gap-3 text-foreground/70 font-mono text-xs md:text-sm tracking-wide p-2 rounded-lg bg-white/[0.015] border border-white/5 hover:border-amber/20 transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4 text-amber shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Indicator */}
        <div className="mt-24 md:mt-36 border-t border-white/10 pt-8 flex items-center justify-between font-mono text-[10px] tracking-widest text-foreground/40 uppercase">
          <span>03 / 09 — CAPABILITIES</span>
          <span>SCROLL FOR SELECTED WORK ↓</span>
        </div>
      </div>
    </section>
  );
}

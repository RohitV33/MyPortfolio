"use client";

import { useEffect, useRef, useState } from "react";
import { FEATURED_CASE_STUDY } from "@/data/portfolioData";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function CaseStudySection() {
  const containerRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);

  const study = FEATURED_CASE_STUDY;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-step-index"));
            if (!isNaN(index)) {
              setActiveSection(index);
            }
          }
        });
      },
      {
        rootMargin: "-30% 0px -40% 0px",
        threshold: 0.2,
      }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const currentSection = study.sections[activeSection] || study.sections[0];

  return (
    <section
      id="chapter-case-study"
      ref={containerRef}
      className="relative w-full min-h-screen bg-charcoal text-off-white select-none py-20 md:py-32 px-6 md:px-16 border-t border-white/5"
    >
      {/* Chapter Intro Eyebrow & Title */}
      <div className="max-w-7xl mx-auto w-full mb-16 md:mb-24">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-2 h-2 rounded-full bg-amber" />
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-amber">
            CHAPTER 05 // CASE STUDY MOMENT
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs md:text-sm text-foreground/50 tracking-widest block mb-2">
              PROJECT {study.projectNumber}
            </span>
            <h2 className="font-display text-4xl md:text-7xl font-extrabold tracking-tight text-off-white uppercase">
              {study.title}
            </h2>
          </div>
          <p className="font-body text-base md:text-xl font-light text-foreground/75 max-w-lg leading-relaxed">
            {study.tagline}
          </p>
        </div>
      </div>

      {/* Sticky Split Grid: Left = Pinned Interactive Visual, Right = Narrative */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* LEFT: Pinned Visual Column */}
        <div className="lg:col-span-6 lg:sticky lg:top-28 rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8 backdrop-blur-md overflow-hidden flex flex-col justify-between shadow-2xl">
          {/* Top telemetry status */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber animate-ping" />
              <span className="font-mono text-xs font-semibold text-amber uppercase tracking-widest">
                STAGE 0{activeSection + 1} {"//"} {currentSection.title}
              </span>
            </div>
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-interactive
              className="font-mono text-[10px] text-foreground/60 hover:text-off-white flex items-center gap-1 uppercase tracking-wider"
            >
              <span>LIVE DEMO</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          {/* Large Video Visual */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/60 border border-white/5 mb-6">
            {study.visualVideo ? (
              <video
                src={study.visualVideo}
                poster={study.visualPoster}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-mono text-xs text-foreground/40">
                ARCHITECTURE VISUAL
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Dynamic Metric Readout */}
          {currentSection.metric && (
            <div className="border border-white/10 rounded-2xl p-4 md:p-6 bg-white/[0.02] flex items-center gap-6">
              <span className="font-display text-4xl md:text-5xl font-extrabold text-amber">
                {currentSection.metric}
              </span>
              <p className="font-mono text-[10px] md:text-xs text-foreground/65 leading-relaxed tracking-wide">
                {currentSection.metricLabel}
              </p>
            </div>
          )}
        </div>

        {/* RIGHT: Narrative Chapters */}
        <div className="lg:col-span-6 flex flex-col gap-24 md:gap-36 pt-4 lg:pt-0">
          {study.sections.map((sec, idx) => (
            <div
              key={sec.title}
              data-step-index={idx}
              ref={(el) => {
                sectionRefs.current[idx] = el;
              }}
              className="scroll-mt-36"
            >
              <span className="font-mono text-xs text-amber tracking-[0.3em] uppercase block mb-3">
                0{idx + 1} {"//"} {sec.title}
              </span>
              <h3 className="font-display text-2xl md:text-4xl font-bold text-off-white tracking-tight leading-snug mb-6">
                {sec.headline}
              </h3>
              <p className="font-body text-base md:text-lg font-light text-foreground/75 leading-relaxed mb-6">
                {sec.description}
              </p>
              <div className="space-y-3 border-t border-white/10 pt-6">
                {sec.bulletPoints.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber shrink-0 mt-1" />
                    <span className="font-body text-xs md:text-sm text-foreground/65 leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { STORY_STATEMENTS, StoryStatement } from "@/data/portfolioData";
import { 
  Activity, 
  Cpu, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Sparkles, 
  Play, 
  Zap, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function StorySection() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const narrativeColRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ambientLightRef = useRef<HTMLDivElement>(null);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax ambient light drift
      gsap.to(ambientLightRef.current, {
        y: "35%",
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Kinetic word reveal and phase tracking for each statement
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;

        const words = card.querySelectorAll(".story-word");
        const badge = card.querySelector(".story-badge");
        const sub = card.querySelector(".story-subtext");
        const tags = card.querySelectorAll(".story-tag");
        const metric = card.querySelector(".story-metric");

        // Initial setup for kinetic text
        gsap.set(words, { y: 24, opacity: 0 });
        gsap.set([badge, sub, metric, ...Array.from(tags)], { y: 15, opacity: 0 });

        ScrollTrigger.create({
          trigger: card,
          start: "top 65%",
          end: "bottom 40%",
          onEnter: () => {
            setActivePhaseIndex(idx);
            gsap.to(words, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.03,
              ease: "power3.out",
              overwrite: "auto",
            });
            gsap.to([badge, sub, metric, ...Array.from(tags)], {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.05,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
          onEnterBack: () => {
            setActivePhaseIndex(idx);
            gsap.to(words, {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.02,
              ease: "power3.out",
              overwrite: "auto",
            });
            gsap.to([badge, sub, metric, ...Array.from(tags)], {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.04,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
          onLeave: () => {
            gsap.to(card, { opacity: 0.4, duration: 0.4, overwrite: "auto" });
          },
          onLeaveBack: () => {
            gsap.to(card, { opacity: 0.4, duration: 0.4, overwrite: "auto" });
          },
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to(card, { opacity: 1, duration: 0.4, overwrite: "auto" });
            }
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToPhase = (index: number) => {
    setActivePhaseIndex(index);
    const target = cardRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const activeStatement = STORY_STATEMENTS[activePhaseIndex] || STORY_STATEMENTS[0];

  return (
    <section
      id="chapter-story"
      ref={containerRef}
      className="relative w-full min-h-screen py-24 md:py-36 bg-charcoal text-off-white select-none border-t border-white/5 px-6 md:px-16"
    >
      {/* Dynamic ambient background evolution */}
      <div
        ref={ambientLightRef}
        aria-hidden="true"
        className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full pointer-events-none will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(245, 166, 35, 0.22) 0%, rgba(217, 119, 6, 0.08) 50%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Editorial Header */}
        <div ref={titleRef} className="max-w-3xl mb-10 md:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber" />
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-amber">
              CHAPTER 02 // THE STORY
            </p>
          </div>
          <h2 className="font-grotesk text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-off-white uppercase leading-[0.98]">
            A JOURNEY IN <br />
            <span className="text-amber">CODE &amp; CRAFT.</span>
          </h2>
          <p className="font-body text-sm sm:text-base font-light text-foreground/70 mt-3 sm:mt-4 leading-relaxed max-w-xl">
            A progression from curious tinkerer to disciplined full-stack engineer. Scroll through the milestones or select a phase below to inspect real systems, videos, and architecture telemetry.
          </p>

          {/* Quick Jump Phase Navigator (Responsive Horizontal Scroll for Mobile/Tablet) */}
          <div className="flex items-center gap-2 mt-5 sm:mt-6 pt-4 border-t border-white/10 overflow-x-auto no-scrollbar py-1 w-full touch-pan-x">
            {STORY_STATEMENTS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToPhase(idx)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-full font-mono text-[10px] sm:text-[11px] uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  activePhaseIndex === idx
                    ? "bg-amber text-charcoal font-bold shadow-lg scale-105"
                    : "bg-white/[0.04] text-foreground/60 hover:text-off-white hover:bg-white/10"
                }`}
              >
                <span className="text-[9px] opacity-75">0{idx + 1}</span>
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Split Stage: Left Narrative Track, Right Sticky Media & Video Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 relative">
          
          {/* LEFT: Narrative Statements Track */}
          <div ref={narrativeColRef} className="lg:col-span-6 flex flex-col gap-16 sm:gap-24 md:gap-36 pb-12 sm:pb-20">
            {STORY_STATEMENTS.map((item, index) => {
              const words = item.statement.split(" ");
              const isCurrent = activePhaseIndex === index;

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className={`flex flex-col items-start border-l-2 pl-4 sm:pl-6 md:pl-8 transition-all duration-500 will-change-transform ${
                    isCurrent ? "border-amber opacity-100" : "border-white/10 opacity-40 hover:opacity-75"
                  }`}
                >
                  {/* Phase Badge & Step */}
                  <div className="story-badge flex items-center gap-2.5 mb-2.5 sm:mb-4">
                    <span className={`w-2 h-2 rounded-full ${isCurrent ? "bg-amber shadow-[0_0_10px_var(--amber)] animate-pulse" : "bg-white/30"}`} />
                    <span className="font-mono text-[11px] sm:text-xs text-amber font-semibold tracking-[0.25em] uppercase">
                      {item.phase} // {item.title}
                    </span>
                  </div>

                  {/* Human Thought Statement (Contextual Editorial Literary Serif with Amber Accents) */}
                  <h3 className="font-serif italic font-normal text-2xl sm:text-3xl md:text-4xl text-off-white leading-[1.25] mb-3 sm:mb-4 flex flex-wrap">
                    &ldquo;
                    {words.map((word, wIdx) => {
                      const isHighlighted = item.highlightWords?.some((hw) => 
                        word.toLowerCase().includes(hw.toLowerCase().replace(/[^\w\s]/gi, ''))
                      );

                      return (
                        <span key={wIdx} className="inline-block overflow-hidden mr-1.5 py-0.5">
                          <span
                            className={`story-word inline-block transition-colors duration-300 ${
                              isHighlighted ? "text-amber font-medium not-italic" : "text-off-white"
                            }`}
                          >
                            {word}
                          </span>
                        </span>
                      );
                    })}
                    &rdquo;
                  </h3>

                  {/* Narrative Subtext (Readable Clean Sans) */}
                  {item.subtext && (
                    <p className="story-subtext font-body text-xs sm:text-sm md:text-base font-light text-foreground/75 max-w-lg leading-relaxed mb-4 sm:mb-6">
                      {item.subtext}
                    </p>
                  )}

                  {/* Technical Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.techTags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="story-tag px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.03] font-mono text-[10px] text-foreground/70 uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Metric / Takeaway Pill */}
                  {item.metricBadge && (
                    <div className="story-metric inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber/25 bg-amber/5 font-mono text-xs text-off-white">
                      <Zap className="w-3.5 h-3.5 text-amber shrink-0" />
                      <span className="text-foreground/55 text-[11px]">{item.metricBadge.label}:</span>
                      <span className="text-amber font-bold">{item.metricBadge.value}</span>
                    </div>
                  )}

                  {/* Mobile Embedded Visual Indicator */}
                  <div className="mt-6 lg:hidden w-full">
                    <PhaseVisualRenderer statement={item} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Sticky Media & Video Console (Desktop) */}
          <div className="hidden lg:block lg:col-span-6 relative h-full">
            <div className="sticky top-28">
              <div className="rounded-3xl border border-white/15 bg-white/[0.02] backdrop-blur-xl p-6 shadow-2xl overflow-hidden relative group">
                {/* Subtle ambient amber inner glow */}
                <div
                  aria-hidden="true"
                  className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-amber/10 blur-3xl pointer-events-none"
                />

                {/* Console Window Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5 font-mono text-xs text-foreground/50">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-foreground/40 text-[11px] ml-2">system://journey/{activeStatement.id}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-semibold">
                      {activeStatement.phase} ACTIVE
                    </span>
                  </div>
                </div>

                {/* Dynamic Visual Stage */}
                <div className="min-h-[420px] flex flex-col justify-center">
                  <PhaseVisualRenderer statement={activeStatement} />
                </div>

                {/* Console Footer Telemetry Bar */}
                <div className="border-t border-white/10 pt-4 mt-5 flex items-center justify-between font-mono text-[10px] text-foreground/45 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-amber" />
                    <span>STORY STAGE • 0{activePhaseIndex + 1} / 05</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-off-white/80 font-semibold">{activeStatement.title}</span>
                    <span className="text-amber">● LIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Stage Navigation Footnote */}
        <div className="mt-16 md:mt-28 border-t border-white/10 pt-8 flex items-center justify-between font-mono text-[10px] tracking-widest text-foreground/40 uppercase">
          <span>02 / 09 — THE STORY COMPLETED</span>
          <a
            href="#chapter-capabilities"
            className="flex items-center gap-1.5 text-amber hover:text-off-white transition-colors"
          >
            <span>NEXT: CAPABILITIES</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}

function PhaseVisualRenderer({ statement }: { statement: StoryStatement }) {
  const [fixedIssue, setFixedIssue] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);

  switch (statement.mediaType) {
    case "network":
      return (
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5 font-mono text-xs flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-off-white font-semibold">
              <Activity className="w-4 h-4 text-amber" />
              <span>DevTools • Network &amp; V8 Runtime Loop</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              HTTP/3 QUIC
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-[11px] p-2 rounded bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">GET</span>
                <span className="text-off-white/80">/api/v1/telemetry/nodes</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-foreground/40 text-[10px]">18ms</span>
                <span className="text-emerald-400 font-semibold">200 OK</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] p-2 rounded bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-2">
                <span className="text-blue-400 font-bold">WS</span>
                <span className="text-off-white/80">wss://stream.dev/events</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-foreground/40 text-[10px]">4ms</span>
                <span className="text-blue-400 font-semibold">101 SWAP</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] p-2 rounded bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-2">
                <span className="text-amber font-bold">POST</span>
                <span className="text-off-white/80">/auth/jwt/handshake</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-foreground/40 text-[10px]">24ms</span>
                <span className="text-emerald-400 font-semibold">201 CREATED</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="text-[10px] text-foreground/45 block mb-1">EVENT LOOP DELAY</span>
              <span className="text-amber font-bold text-sm">0.82 ms</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="text-[10px] text-foreground/45 block mb-1">TCP HANDSHAKE</span>
              <span className="text-emerald-400 font-bold text-sm">Sub-15 ms</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-foreground/50 pt-1">
            <span className="w-2 h-2 rounded-full bg-amber animate-ping" />
            <span>Sniffing packet streams &amp; dissecting browser execution frames...</span>
          </div>
        </div>
      );

    case "video":
      return (
        <div className="flex flex-col gap-3">
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-black/60 border border-white/10 shadow-lg">
            {statement.videoUrl ? (
              <video
                src={statement.videoUrl}
                poster={statement.posterUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : statement.posterUrl ? (
              <Image
                src={statement.posterUrl}
                alt="Story Milestone Preview"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover"
              />
            ) : null}

            <div className="absolute top-3 left-3 bg-charcoal/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 flex items-center gap-2 font-mono text-[10px] text-off-white">
              <Play className="w-3 h-3 text-amber fill-amber" />
              <span>LIVE RECORDING • REACT + NODE.JS</span>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/40 p-3 font-mono text-[11px] text-foreground/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              <span>compiled client &amp; server in <span className="text-off-white font-semibold">280ms</span></span>
            </div>
            <span className="text-[10px] text-amber uppercase tracking-wider bg-amber/10 px-2 py-0.5 rounded border border-amber/20">
              0 ERRORS
            </span>
          </div>
        </div>
      );

    case "debugger":
      return (
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5 font-mono text-xs flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-off-white font-semibold">
              <Cpu className="w-4 h-4 text-amber" />
              <span>Memory Profiler &amp; Race Condition Detector</span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded border ${
              fixedIssue 
                ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
                : "text-amber bg-amber/10 border-amber/30 animate-pulse"
            }`}>
              {fixedIssue ? "RESOLVED" : "PROFILING STRESS"}
            </span>
          </div>

          <div className={`p-3.5 rounded-xl border transition-colors duration-300 ${
            fixedIssue 
              ? "bg-emerald-500/[0.04] border-emerald-500/30" 
              : "bg-red-500/[0.06] border-red-500/30"
          }`}>
            <div className="flex items-start gap-2.5 mb-2">
              {fixedIssue ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="text-off-white font-semibold text-xs">
                  {fixedIssue ? "Race condition eliminated with atomic locks" : "Async race condition detected on state mutation"}
                </p>
                <p className="text-foreground/50 text-[11px] mt-0.5">
                  {fixedIssue ? "Heap stabilized at 32MB. P99 latency dropped 65%." : "Stale closures causing redundant re-renders under concurrent load."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setFixedIssue(!fixedIssue)}
              className="mt-2 text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-off-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Zap className="w-3 h-3 text-amber" />
              <span>{fixedIssue ? "SIMULATE RACE CONDITION" : "APPLY MUTEX & RE-INDEX"}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="text-[10px] text-foreground/45 block mb-1">HEAP ALLOCATION</span>
              <span className={`font-bold text-sm ${fixedIssue ? "text-emerald-400" : "text-amber"}`}>
                {fixedIssue ? "32.4 MB (Stable)" : "88.6 MB (Leak)"}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="text-[10px] text-foreground/45 block mb-1">CONCURRENT TPS</span>
              <span className="text-off-white font-bold text-sm">
                {fixedIssue ? "14,500 req/s" : "4,200 req/s"}
              </span>
            </div>
          </div>
        </div>
      );

    case "architecture":
      return (
        <div className="flex flex-col gap-3">
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-black/60 border border-white/10 shadow-lg">
            {statement.videoUrl ? (
              <video
                src={statement.videoUrl}
                poster={statement.posterUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : statement.posterUrl ? (
              <Image
                src={statement.posterUrl}
                alt="CivicLens AI Architecture"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover"
              />
            ) : null}

            <div className="absolute top-3 left-3 bg-charcoal/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 flex items-center gap-2 font-mono text-[10px] text-off-white">
              <Layers className="w-3 h-3 text-amber" />
              <span>CIVICLENS-AI • FASTAPI + YOLOV8 + NODE.JS</span>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/40 p-3 font-mono text-[10px] text-foreground/75 flex flex-wrap items-center justify-between gap-2">
            <span className="text-off-white">Client UI</span>
            <span className="text-amber">➔</span>
            <span className="text-off-white">Express Gateway</span>
            <span className="text-amber">➔</span>
            <span className="text-emerald-400 font-bold">FastAPI YOLOv8</span>
            <span className="text-amber">➔</span>
            <span className="text-off-white">MongoDB Atlas</span>
          </div>
        </div>
      );

    case "showcase":
      return (
        <div className="flex flex-col gap-3">
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-black/60 border border-white/10 shadow-lg">
            {selectedPoster ? (
              <Image
                src={selectedPoster}
                alt="Project Showcase Poster"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover"
              />
            ) : statement.videoUrl ? (
              <video
                src={statement.videoUrl}
                poster={statement.posterUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : null}

            <div className="absolute top-3 left-3 bg-charcoal/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 flex items-center gap-2 font-mono text-[10px] text-off-white">
              <Sparkles className="w-3 h-3 text-amber" />
              <span>HIGH-PERFORMANCE PRODUCTION SOFTWARE</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 p-3 rounded-xl border border-white/10 bg-black/40 font-mono text-xs">
            <div className="flex items-center gap-2 text-off-white">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px]">Lighthouse: <strong className="text-emerald-400">100/100</strong></span>
              <span className="text-foreground/30">•</span>
              <span className="text-[11px] text-amber font-semibold">60 FPS Motion</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedPoster(null)}
                className={`text-[9px] uppercase px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                  !selectedPoster ? "bg-amber text-charcoal font-bold border-amber" : "border-white/10 text-foreground/50"
                }`}
              >
                Video
              </button>
              <button
                type="button"
                onClick={() => setSelectedPoster("/images/civiclens_poster.png")}
                className={`text-[9px] uppercase px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                  selectedPoster === "/images/civiclens_poster.png" ? "bg-amber text-charcoal font-bold border-amber" : "border-white/10 text-foreground/50"
                }`}
              >
                AI
              </button>
              <button
                type="button"
                onClick={() => setSelectedPoster("/images/bartr_poster.png")}
                className={`text-[9px] uppercase px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                  selectedPoster === "/images/bartr_poster.png" ? "bg-amber text-charcoal font-bold border-amber" : "border-white/10 text-foreground/50"
                }`}
              >
                Bartr
              </button>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { PROJECTS, Project } from "@/data/portfolioData";
import { useLenis } from "@/components/SmoothScrollProvider";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  Sparkles,
  ExternalLink,
} from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function ProjectGallery() {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [playingStates, setPlayingStates] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
  });
  const [isMuted, setIsMuted] = useState(true);
  const [cinemaProject, setCinemaProject] = useState<Project | null>(null);
  const [videoProgressMap, setVideoProgressMap] = useState<Record<number, number>>({});

  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const { lenis } = useLenis();

  // ── GSAP Stacking Cards Parallax Animation ──
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;

        // Scale down earlier cards as later cards stack over them
        if (idx < PROJECTS.length - 1) {
          gsap.to(card, {
            scale: 0.94,
            opacity: 0.65,
            ease: "none",
            scrollTrigger: {
              trigger: cardRefs.current[idx + 1] || card,
              start: "top 75%",
              end: "top 25%",
              scrub: 1,
            },
          });
        }

        // Highlight active card in viewport
        ScrollTrigger.create({
          trigger: card,
          start: "top 45%",
          end: "bottom 45%",
          onEnter: () => setActiveProjectIdx(idx),
          onEnterBack: () => setActiveProjectIdx(idx),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Video time update for progress bar
  const handleTimeUpdate = (idx: number, e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.duration) {
      const progress = (video.currentTime / video.duration) * 100;
      setVideoProgressMap((prev) => ({ ...prev, [idx]: progress }));
    }
  };

  // Toggle individual video playback
  const togglePlay = (idx: number) => {
    const vid = videoRefs.current[idx];
    if (!vid) return;

    if (playingStates[idx]) {
      vid.pause();
      setPlayingStates((prev) => ({ ...prev, [idx]: false }));
    } else {
      vid.play();
      setPlayingStates((prev) => ({ ...prev, [idx]: true }));
    }
  };

  // Toggle global mute
  const toggleMute = () => {
    const nextMuted = !isMuted;
    videoRefs.current.forEach((vid) => {
      if (vid) vid.muted = nextMuted;
    });
    setIsMuted(nextMuted);
  };

  // Scroll directly to a project card
  const scrollToCard = (idx: number) => {
    const cardEl = cardRefs.current[idx];
    if (!cardEl) return;

    if (lenis) {
      lenis.scrollTo(cardEl, { offset: -90, duration: 1.2 });
    } else {
      cardEl.scrollIntoView({ behavior: "smooth" });
    }
    setActiveProjectIdx(idx);
  };

  // Scroll to Chapter 04 Case Study
  const scrollToCaseStudy = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("chapter-case-study");
    if (el) {
      if (lenis) {
        lenis.scrollTo(el, { duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Close Cinema on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (cinemaProject && e.key === "Escape") {
        setCinemaProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cinemaProject]);

  return (
    <section
      id="chapter-work"
      ref={containerRef}
      className="relative w-full py-24 sm:py-32 md:py-40 bg-[#0d0d0d] text-off-white select-none border-t border-white/5 overflow-hidden"
    >
      {/* ── Ambient Glow based on active project's color ── */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[85vw] max-w-[1400px] h-[60vw] max-h-[700px] rounded-full pointer-events-none opacity-20 blur-[150px] transition-all duration-1000 ease-out z-0"
        style={{
          background: `radial-gradient(circle, ${PROJECTS[activeProjectIdx]?.color || "#F5A623"} 0%, transparent 70%)`,
        }}
      />

      {/* Subtle Studio Grid Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none z-0"
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 w-full">
        {/* ── Section Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 sm:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber shadow-[0_0_12px_#F5A623] animate-pulse" />
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-amber">
                CHAPTER 03 // THE WORK
              </p>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full border border-amber/30 bg-amber/10 font-mono text-[9px] uppercase tracking-widest text-amber">
                03 PRODUCTION REELS
              </span>
            </div>

            <h2 className="font-akira text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-off-white uppercase leading-[0.92]">
              SELECTED <br />
              <span className="text-amber">SYSTEMS.</span>
            </h2>

            <p className="font-body text-sm sm:text-base md:text-lg font-light text-off-white/70 max-w-xl mt-3 sm:mt-4 leading-relaxed">
              High-throughput architectures, computer vision pipelines, and distributed real-time platforms engineered end-to-end.
            </p>
          </div>

          {/* Quick Segmented Nav Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl">
            {PROJECTS.map((proj, idx) => {
              const isActive = activeProjectIdx === idx;
              return (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => scrollToCard(idx)}
                  data-cursor-interactive
                  className={`px-4 sm:px-5 py-2 rounded-full font-mono text-[10px] sm:text-xs tracking-wider uppercase whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? "bg-amber text-charcoal font-bold shadow-[0_0_20px_rgba(245,166,35,0.4)]"
                      : "text-off-white/60 hover:text-off-white hover:bg-white/5"
                  }`}
                >
                  <span>{proj.number}</span>
                  <span className="font-semibold">{proj.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Stacking Cards Showcase (Apple / Linear Style) ── */}
        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
          {PROJECTS.map((project, idx) => {
            const isPlaying = playingStates[idx] ?? true;
            const progress = videoProgressMap[idx] || 0;

            return (
              <div
                key={project.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="sticky top-24 sm:top-28 w-full rounded-3xl border border-white/12 bg-[#121316]/95 backdrop-blur-2xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.9)] p-6 sm:p-8 lg:p-12 transition-all duration-500 will-change-transform"
              >
                {/* Watermark Ghost Number */}
                <div
                  aria-hidden="true"
                  className="font-akira text-[14vw] font-black text-white/[0.03] pointer-events-none select-none absolute top-2 right-8 leading-none z-0"
                >
                  {project.number}
                </div>

                {/* Card Top Strip */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 sm:mb-8 font-mono text-xs relative z-10">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-amber tracking-[0.25em]">
                      SYS.{project.number}
                    </span>
                    <span className="text-white/20">|</span>
                    <span className="text-off-white/60 uppercase tracking-wider truncate">
                      {project.role}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-off-white/50">
                    <span className="hidden sm:inline-flex items-center gap-1.5 text-amber">
                      <Sparkles className="w-3 h-3" />
                      <span>PRODUCTION READY</span>
                    </span>
                    <span className="text-white/20 hidden sm:inline">|</span>
                    <span className="tracking-wider">{project.year}</span>
                  </div>
                </div>

                {/* Main Grid: Left = Video Stage, Right = Tech Specs & CTAs */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
                  {/* ── LEFT COLUMN: Cinematic Video Frame (Cols 1-7) ── */}
                  <div className="lg:col-span-7 flex flex-col gap-4">
                    <div className="group relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-black/90 border border-white/15 shadow-2xl">
                      {project.videoUrl ? (
                        <video
                          ref={(el) => {
                            videoRefs.current[idx] = el;
                          }}
                          src={project.videoUrl}
                          poster={project.posterUrl}
                          autoPlay
                          loop
                          muted={isMuted}
                          playsInline
                          onTimeUpdate={(e) => handleTimeUpdate(idx, e)}
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.015]"
                        />
                      ) : (
                        <Image
                          src={project.posterUrl}
                          alt={project.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-cover object-center"
                        />
                      )}

                      {/* Subtle Vignette Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                      {/* Top Overlay Badge */}
                      <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-off-white font-medium tracking-wider">
                          LIVE PRODUCTION REEL
                        </span>
                      </div>

                      {/* Top Right: Fullscreen Cinema Button */}
                      <button
                        type="button"
                        onClick={() => setCinemaProject(project)}
                        aria-label="Expand to Cinema Theatre"
                        data-cursor-interactive
                        className="absolute top-3.5 right-3.5 z-20 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-off-white/80 hover:text-amber hover:border-amber transition-all shadow-lg"
                        title="Expand Fullscreen Reel"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Floating HUD Controls */}
                      {project.videoUrl && (
                        <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => togglePlay(idx)}
                              data-cursor-interactive
                              className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-off-white hover:border-amber hover:text-amber transition-all flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider"
                            >
                              {isPlaying ? (
                                <>
                                  <Pause className="w-3 h-3 text-amber" />
                                  <span>PAUSE</span>
                                </>
                              ) : (
                                <>
                                  <Play className="w-3 h-3 text-amber" />
                                  <span>PLAY</span>
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={toggleMute}
                              data-cursor-interactive
                              className="w-8 h-8 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-off-white hover:border-amber hover:text-amber transition-all flex items-center justify-center"
                              title={isMuted ? "Unmute Audio" : "Mute Audio"}
                            >
                              {isMuted ? (
                                <VolumeX className="w-3.5 h-3.5 text-off-white/60" />
                              ) : (
                                <Volume2 className="w-3.5 h-3.5 text-amber" />
                              )}
                            </button>
                          </div>

                          <span className="font-mono text-[10px] text-off-white/50 tracking-wider bg-black/60 px-2.5 py-1 rounded-md border border-white/10 hidden sm:inline">
                            1080P // LOOPING
                          </span>
                        </div>
                      )}

                      {/* Looping Progress Line Indicator */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
                        <div
                          className="h-full bg-gradient-to-r from-amber to-amber-lighter transition-all duration-150"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* 3 High-Impact Stat Metrics */}
                    <div className="grid grid-cols-3 gap-3 pt-1 font-mono">
                      {project.metrics?.map((metric) => (
                        <div
                          key={metric.label}
                          className="p-3.5 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col justify-between"
                        >
                          <span className="font-akira text-lg sm:text-2xl text-amber font-black tracking-tight">
                            {metric.value}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider text-off-white/80 font-bold mt-1.5 truncate">
                            {metric.label}
                          </span>
                          {metric.sub && (
                            <span className="text-[9px] text-off-white/45 truncate mt-0.5">
                              {metric.sub}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ── RIGHT COLUMN: Technical Dossier & Execution (Cols 8-12) ── */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                    <div>
                      {/* Title & Tagline */}
                      <span className="font-mono text-amber font-bold text-xs tracking-[0.3em] block mb-1">
                        PROJECT {project.number}
                      </span>
                      <h3 className="font-akira text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-off-white uppercase leading-tight">
                        {project.title}
                      </h3>
                      <p className="font-serif italic text-base sm:text-lg text-amber/90 mt-1 font-normal">
                        {project.subtitle}
                      </p>

                      {/* Problem & Architecture Breakdown */}
                      <div className="mt-5 space-y-3">
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                          <span className="font-mono text-[10px] text-amber uppercase tracking-wider block mb-1">
                            THE CHALLENGE:
                          </span>
                          <p className="font-body text-xs sm:text-sm text-off-white/75 leading-relaxed font-light">
                            {project.problem}
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                          <span className="font-mono text-[10px] text-amber uppercase tracking-wider block mb-1">
                            ENGINEERING ARCHITECTURE:
                          </span>
                          <p className="font-body text-xs sm:text-sm text-off-white/85 leading-relaxed font-light">
                            {project.built}
                          </p>
                        </div>
                      </div>

                      {/* Technology Stack Tags */}
                      <div className="mt-5">
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-off-white/45 block mb-2">
                          STACK & PROTOCOLS
                        </span>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.03] font-mono text-[10px] sm:text-[11px] text-off-white/80 tracking-wide hover:border-amber/40 hover:text-off-white transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-white/10">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-interactive
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-off-white text-charcoal font-mono font-bold text-xs tracking-[0.2em] uppercase hover:bg-amber hover:text-charcoal transition-all duration-300 shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>LAUNCH DEMO</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor-interactive
                          className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-white/20 bg-white/[0.02] font-mono text-xs tracking-[0.15em] text-off-white/80 hover:text-off-white hover:border-amber/60 hover:bg-white/[0.05] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <GithubIcon className="w-4 h-4" />
                          <span>REPOSITORY</span>
                        </a>
                      )}

                      {project.number === "01" && (
                        <a
                          href="#chapter-case-study"
                          onClick={scrollToCaseStudy}
                          data-cursor-interactive
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-full border border-amber/30 bg-amber/10 font-mono text-xs tracking-wider text-amber hover:bg-amber/20 transition-all"
                          title="Read the deep architectural case study in Chapter 04"
                        >
                          <span>CASE STUDY ↓</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom Section Footer Prompt ── */}
        <div className="mt-16 sm:mt-24 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] tracking-widest text-off-white/45 uppercase border-t border-white/10 pt-6">
          <span>03 / 08 — SELECTED WORK</span>
          <a
            href="#chapter-case-study"
            onClick={scrollToCaseStudy}
            data-cursor-interactive
            className="hover:text-amber transition-colors flex items-center gap-2"
          >
            <span>PROCEED TO CHAPTER 04 CASE STUDY</span>
            <span>↓</span>
          </a>
        </div>
      </div>

      {/* ── LIGHTBOX / CINEMA FULLSCREEN MODAL ── */}
      {cinemaProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn"
        >
          {/* Top Bar with Close Button */}
          <div className="w-full max-w-6xl flex items-center justify-between pb-4 border-b border-white/10 mb-4 sm:mb-6 font-mono">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber animate-pulse" />
              <span className="text-xs sm:text-sm text-off-white font-bold tracking-widest uppercase">
                {cinemaProject.number} // {cinemaProject.title} CINEMA THEATRE
              </span>
            </div>

            <button
              type="button"
              onClick={() => setCinemaProject(null)}
              data-cursor-interactive
              className="p-2 rounded-full border border-white/20 hover:border-amber hover:text-amber text-off-white transition-all"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Large Video Frame in Cinema */}
          <div className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden bg-black border border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.95)]">
            {cinemaProject.videoUrl ? (
              <video
                src={cinemaProject.videoUrl}
                poster={cinemaProject.posterUrl}
                autoPlay
                loop
                controls
                className="w-full h-full object-contain bg-black"
              />
            ) : (
              <Image
                src={cinemaProject.posterUrl}
                alt={cinemaProject.title}
                fill
                className="object-contain"
              />
            )}
          </div>

          {/* Modal Footer with Links */}
          <div className="w-full max-w-6xl mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs sm:text-sm text-off-white/75 max-w-xl text-center sm:text-left">
              {cinemaProject.description}
            </p>
            <div className="flex items-center gap-3 font-mono text-xs">
              <a
                href={cinemaProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-interactive
                className="px-5 py-2.5 rounded-full bg-amber text-charcoal font-bold tracking-wider uppercase hover:bg-off-white transition-all shadow-md flex items-center gap-1.5"
              >
                <span>OPEN PROJECT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              {cinemaProject.githubUrl && (
                <a
                  href={cinemaProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-interactive
                  className="px-4 py-2.5 rounded-full border border-white/20 text-off-white tracking-wider uppercase hover:border-white/50 transition-all flex items-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>CODE</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

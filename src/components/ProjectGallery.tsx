"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { PROJECTS } from "@/data/portfolioData";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  Layers,
  Cpu,
  Activity,
  Sparkles,
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "metrics">("overview");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isCinemaOpen, setIsCinemaOpen] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const cinemaVideoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const currentProject = PROJECTS[activeIndex] || PROJECTS[0];

  // Sync play/pause when activeIndex changes
  useEffect(() => {
    setIsPlaying(true);
    setActiveTab("overview");
    setVideoProgress(0);

    if (mainVideoRef.current) {
      mainVideoRef.current.currentTime = 0;
      mainVideoRef.current.play().catch(() => {
        // Autoplay may be restricted in some browsers until user interaction
      });
    }
  }, [activeIndex]);

  // Video time update for progress bar
  const handleTimeUpdate = () => {
    if (mainVideoRef.current && mainVideoRef.current.duration) {
      const progress = (mainVideoRef.current.currentTime / mainVideoRef.current.duration) * 100;
      setVideoProgress(progress);
    }
  };

  // Play / Pause Toggle
  const togglePlay = () => {
    if (!mainVideoRef.current) return;
    if (isPlaying) {
      mainVideoRef.current.pause();
      setIsPlaying(false);
    } else {
      mainVideoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Mute / Unmute Toggle
  const toggleMute = () => {
    if (!mainVideoRef.current) return;
    const nextMuted = !isMuted;
    mainVideoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Previous & Next navigation
  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : PROJECTS.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < PROJECTS.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation & escape listener for Cinema Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCinemaOpen && e.key === "Escape") {
        setIsCinemaOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCinemaOpen]);

  // Scroll to Case Study Section smoothly
  const scrollToCaseStudy = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("chapter-case-study");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="chapter-work"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 md:py-36 bg-charcoal text-off-white select-none border-t border-white/5 overflow-hidden transition-colors duration-1000"
    >
      {/* ── Dynamic Ambient Glow based on active project's color ── */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[85vw] max-w-[1200px] h-[55vw] max-h-[600px] rounded-full pointer-events-none opacity-25 blur-[120px] transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle, ${currentProject.color || "#E58A13"} 0%, transparent 70%)`,
        }}
      />

      {/* Subtle Technical Grid Pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 relative z-10">
        {/* ── Header: Eyebrow + Title + Segmented Project Switcher ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 sm:mb-14 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber animate-pulse shadow-[0_0_12px_#F5A623]" />
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-amber">
                CHAPTER 03 // THE WORK
              </p>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full border border-amber/30 bg-amber/10 font-mono text-[9px] uppercase tracking-widest text-amber">
                {PROJECTS.length} PRODUCTION REELS
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-off-white uppercase leading-[0.92]">
              SELECTED <br />
              <span className="text-amber">SYSTEMS.</span>
            </h2>
            <p className="font-body text-sm sm:text-base md:text-lg font-light text-foreground/70 max-w-xl mt-3 sm:mt-4 leading-relaxed">
              High-throughput architectures, computer vision pipelines, and distributed real-time platforms engineered end-to-end.
            </p>
          </div>

          {/* Quick Segmented Switcher & Prev/Next Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            {/* Project Tabs (Mobile Scrollable) */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-2xl sm:rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl max-w-full overflow-x-auto no-scrollbar">
              {PROJECTS.map((proj, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    data-cursor-interactive
                    className={`px-3.5 sm:px-4 py-2 rounded-xl sm:rounded-full font-mono text-[10px] sm:text-xs tracking-wider uppercase whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? "bg-amber text-charcoal font-bold shadow-[0_0_20px_rgba(245,166,35,0.4)] scale-100"
                        : "text-foreground/60 hover:text-off-white hover:bg-white/5"
                    }`}
                  >
                    <span>{proj.number}</span>
                    <span className="font-semibold">{proj.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Prev / Next Circular Arrows */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                type="button"
                aria-label="Previous project"
                onClick={handlePrev}
                data-cursor-interactive
                className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.02] flex items-center justify-center text-off-white hover:border-amber hover:text-amber hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="font-mono text-xs text-foreground/50 tracking-widest px-1">
                {currentProject.number} / 0{PROJECTS.length}
              </span>

              <button
                type="button"
                aria-label="Next project"
                onClick={handleNext}
                data-cursor-interactive
                className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.02] flex items-center justify-center text-off-white hover:border-amber hover:text-amber hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Centerpiece: Interactive Showcase Card ── */}
        <div className="relative rounded-3xl border border-white/15 bg-white/[0.025] backdrop-blur-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] transition-all duration-700">
          {/* Top Status Strip */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-3.5 sm:py-4 border-b border-white/10 bg-white/[0.015] font-mono text-[10px] sm:text-xs">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="font-bold text-amber tracking-[0.25em]">
                SYS.0{activeIndex + 1}
              </span>
              <span className="hidden sm:inline-block text-white/20">|</span>
              <span className="text-foreground/60 uppercase tracking-wider truncate max-w-[200px] sm:max-w-none">
                {currentProject.role}
              </span>
            </div>

            <div className="flex items-center gap-3 text-foreground/50">
              <span className="hidden md:inline-flex items-center gap-1.5 text-amber">
                <Sparkles className="w-3 h-3" />
                <span>INTERACTIVE REEL</span>
              </span>
              <span className="text-white/20 hidden md:inline">|</span>
              <span className="tracking-wider">{currentProject.year}</span>
            </div>
          </div>

          {/* Main Grid: Left = Cinematic Video Showcase, Right = Spec Dossier */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 p-5 sm:p-8 lg:p-10 items-start">
            {/* ── LEFT COLUMN: Cinematic Video Player (Col 1-7) ── */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="group relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-2xl overflow-hidden bg-black/80 border border-white/15 shadow-2xl">
                {/* Video Element */}
                {currentProject.videoUrl ? (
                  <video
                    ref={mainVideoRef}
                    key={currentProject.videoUrl}
                    src={currentProject.videoUrl}
                    poster={currentProject.posterUrl}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    onTimeUpdate={handleTimeUpdate}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                ) : (
                  <Image
                    src={currentProject.posterUrl}
                    alt={`${currentProject.title} Poster`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center"
                  />
                )}

                {/* Subtle vignette & scanline overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-black/30 pointer-events-none" />

                {/* Top Overlay Badge: Status indicator */}
                <div className="absolute top-3.5 sm:top-4 left-3.5 sm:left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-off-white font-medium tracking-wider">
                    {currentProject.videoUrl ? "LIVE DEMO REEL" : "SYSTEM PREVIEW"}
                  </span>
                </div>

                {/* Top Overlay Right: Fullscreen / Cinema Popout Button */}
                <button
                  type="button"
                  onClick={() => setIsCinemaOpen(true)}
                  aria-label="Open Fullscreen Cinema"
                  data-cursor-interactive
                  className="absolute top-3.5 sm:top-4 right-3.5 sm:right-4 z-20 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-off-white/80 hover:text-amber hover:border-amber transition-all duration-300 shadow-lg"
                  title="Expand to Cinema Mode"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Bottom Video Floating HUD: Play/Pause, Mute/Unmute */}
                {currentProject.videoUrl && (
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={togglePlay}
                        data-cursor-interactive
                        className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-off-white hover:border-amber hover:text-amber transition-all duration-200 flex items-center gap-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-wider"
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
                        className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-off-white hover:border-amber hover:text-amber transition-all duration-200 flex items-center justify-center"
                        title={isMuted ? "Unmute Audio" : "Mute Audio"}
                      >
                        {isMuted ? (
                          <VolumeX className="w-3.5 h-3.5 text-foreground/60" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5 text-amber" />
                        )}
                      </button>
                    </div>

                    <span className="font-mono text-[10px] text-foreground/50 tracking-wider bg-black/50 px-2.5 py-1 rounded-md border border-white/10 hidden sm:inline">
                      1080P // LOOPING
                    </span>
                  </div>
                )}

                {/* Looping Progress Line Indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
                  <div
                    className="h-full bg-gradient-to-r from-amber to-amber-lighter transition-all duration-150"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>
              </div>

              {/* Sub-strip: Quick Stats Pills below video */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 font-mono">
                <div className="p-3 rounded-xl border border-white/10 bg-white/[0.015] flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-foreground/50 mb-1">
                    EXECUTION ROLE
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-off-white truncate">
                    {currentProject.role.split("&")[0]}
                  </span>
                </div>

                <div className="p-3 rounded-xl border border-white/10 bg-white/[0.015] flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-foreground/50 mb-1">
                    PRIMARY STACK
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-amber truncate">
                    {currentProject.tags.slice(0, 2).join(" + ")}
                  </span>
                </div>

                <div className="p-3 rounded-xl border border-white/10 bg-white/[0.015] col-span-2 sm:col-span-1 flex flex-col justify-center">
                  <span className="text-[9px] uppercase tracking-wider text-foreground/50 mb-1">
                    DEPLOYMENT
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    PRODUCTION READY
                  </span>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Technical Dossier & Interactive Spec Tabs (Col 8-12) ── */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                {/* Project Title & Subtitle */}
                <div className="mb-6">
                  <span className="font-mono text-amber font-bold text-xs tracking-[0.3em] block mb-1">
                    PROJECT {currentProject.number}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-off-white uppercase leading-tight">
                    {currentProject.title}
                  </h3>
                  <p className="font-serif italic text-base sm:text-lg text-amber-lighter/80 mt-1 font-normal">
                    {currentProject.subtitle}
                  </p>
                </div>

                {/* Interactive Technical Spec Tabs */}
                <div className="mb-6 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveTab("overview")}
                      data-cursor-interactive
                      className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 tracking-wider uppercase ${
                        activeTab === "overview"
                          ? "bg-amber/15 text-amber border border-amber/40 font-bold"
                          : "text-foreground/60 hover:text-off-white hover:bg-white/5"
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>OVERVIEW</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab("architecture")}
                      data-cursor-interactive
                      className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 tracking-wider uppercase ${
                        activeTab === "architecture"
                          ? "bg-amber/15 text-amber border border-amber/40 font-bold"
                          : "text-foreground/60 hover:text-off-white hover:bg-white/5"
                      }`}
                    >
                      <Cpu className="w-3.5 h-3.5" />
                      <span>ARCHITECTURE</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab("metrics")}
                      data-cursor-interactive
                      className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 tracking-wider uppercase ${
                        activeTab === "metrics"
                          ? "bg-amber/15 text-amber border border-amber/40 font-bold"
                          : "text-foreground/60 hover:text-off-white hover:bg-white/5"
                      }`}
                    >
                      <Activity className="w-3.5 h-3.5" />
                      <span>IMPACT</span>
                    </button>
                  </div>
                </div>

                {/* Tab Dynamic Content */}
                <div className="min-h-[140px] mb-6">
                  {activeTab === "overview" && (
                    <div className="space-y-3 animate-fadeIn">
                      <p className="font-body text-sm sm:text-base text-off-white/85 leading-relaxed font-light">
                        {currentProject.description}
                      </p>
                      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                        <span className="font-mono text-[10px] text-amber uppercase tracking-wider block mb-1">
                          THE CORE PROBLEM SOLVED:
                        </span>
                        <p className="font-body text-xs sm:text-sm text-foreground/70 leading-relaxed font-light">
                          {currentProject.problem}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "architecture" && (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                        <span className="font-mono text-[10px] text-amber uppercase tracking-wider block mb-1">
                          SYSTEM DESIGN & ENGINEERING:
                        </span>
                        <p className="font-body text-xs sm:text-sm text-off-white/85 leading-relaxed font-light">
                          {currentProject.built}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "metrics" && (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="p-3.5 rounded-xl bg-amber/[0.05] border border-amber/25">
                        <span className="font-mono text-[10px] text-amber uppercase tracking-wider block mb-1">
                          PROVABLE BENCHMARK RESULTS:
                        </span>
                        <p className="font-body text-xs sm:text-sm text-off-white/90 leading-relaxed font-light">
                          {currentProject.result}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tech Tags */}
                <div className="mb-8">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/45 block mb-2.5">
                    TECHNOLOGIES USED
                  </span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {currentProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.03] font-mono text-[10px] sm:text-[11px] text-foreground/80 tracking-wide hover:border-amber/40 hover:text-off-white transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-white/10">
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-interactive
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-off-white text-charcoal font-mono font-bold text-xs tracking-[0.2em] uppercase hover:bg-amber hover:text-charcoal transition-all duration-300 shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>LAUNCH DEMO</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                {currentProject.githubUrl && (
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-interactive
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-white/20 bg-white/[0.02] font-mono text-xs tracking-[0.15em] text-off-white/80 hover:text-off-white hover:border-white/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>REPOSITORY</span>
                  </a>
                )}

                {/* Link to Chapter 04 Case Study Deep Dive if Project 01 */}
                {currentProject.number === "01" && (
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

          {/* ── Bottom Deck: All 3 Projects Quick Switcher Rail ── */}
          <div className="border-t border-white/10 bg-black/40 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="font-mono text-[10px] text-foreground/50 tracking-widest uppercase">
                ALL REELS ({PROJECTS.length}) — CLICK TO SWITCH STAGE
              </span>
              <span className="font-mono text-[10px] text-amber tracking-wider">
                ACTIVE: {currentProject.title}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {PROJECTS.map((project, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <div
                    key={project.id}
                    onClick={() => setActiveIndex(idx)}
                    data-cursor-interactive
                    className={`cursor-pointer rounded-2xl p-3 sm:p-4 border transition-all duration-300 flex items-center gap-3.5 group/card ${
                      isActive
                        ? "border-amber bg-amber/[0.08] shadow-[0_0_20px_rgba(245,166,35,0.2)]"
                        : "border-white/10 bg-white/[0.015] hover:border-white/30 hover:bg-white/[0.04]"
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden bg-black/80 shrink-0 border border-white/10">
                      <Image
                        src={project.posterUrl}
                        alt={project.title}
                        fill
                        sizes="80px"
                        className="object-cover group-hover/card:scale-105 transition-transform duration-300"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-amber/20 flex items-center justify-center">
                          <Play className="w-4 h-4 text-amber fill-amber" />
                        </div>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-amber font-bold">
                          {project.number}
                        </span>
                        <span className="font-display text-xs sm:text-sm font-bold text-off-white truncate group-hover/card:text-amber transition-colors">
                          {project.title}
                        </span>
                      </div>
                      <p className="font-body text-[11px] text-foreground/55 truncate mt-0.5">
                        {project.subtitle}
                      </p>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive ? "text-amber translate-x-0.5" : "text-foreground/30 group-hover/card:text-off-white"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Section Footer Prompt ── */}
        <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] tracking-widest text-foreground/45 uppercase border-t border-white/10 pt-6">
          <span>03 / 08 — SELECTED WORK</span>
          <a
            href="#chapter-case-study"
            onClick={scrollToCaseStudy}
            data-cursor-interactive
            className="hover:text-amber transition-colors flex items-center gap-1.5"
          >
            <span>PROCEED TO CHAPTER 04 CASE STUDY</span>
            <span>↓</span>
          </a>
        </div>
      </div>

      {/* ── LIGHTBOX / CINEMA FULLSCREEN MODAL ── */}
      {isCinemaOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn"
        >
          {/* Top Bar with Close Button */}
          <div className="w-full max-w-6xl flex items-center justify-between pb-4 border-b border-white/10 mb-4 sm:mb-6 font-mono">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber animate-pulse" />
              <span className="text-xs sm:text-sm text-off-white font-bold tracking-widest uppercase">
                {currentProject.number} // {currentProject.title} CINEMA THEATRE
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsCinemaOpen(false)}
              data-cursor-interactive
              className="p-2 rounded-full border border-white/20 hover:border-amber hover:text-amber text-off-white transition-all duration-200"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Large Video Frame in Cinema */}
          <div className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden bg-black border border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.9)]">
            {currentProject.videoUrl ? (
              <video
                ref={cinemaVideoRef}
                src={currentProject.videoUrl}
                poster={currentProject.posterUrl}
                autoPlay
                loop
                controls
                className="w-full h-full object-contain bg-black"
              />
            ) : (
              <Image
                src={currentProject.posterUrl}
                alt={currentProject.title}
                fill
                className="object-contain"
              />
            )}
          </div>

          {/* Modal Footer with Links */}
          <div className="w-full max-w-6xl mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs sm:text-sm text-foreground/70 max-w-xl text-center sm:text-left">
              {currentProject.description}
            </p>
            <div className="flex items-center gap-3 font-mono text-xs">
              <a
                href={currentProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-interactive
                className="px-5 py-2.5 rounded-full bg-amber text-charcoal font-bold tracking-wider uppercase hover:bg-off-white transition-all shadow-md flex items-center gap-1.5"
              >
                <span>OPEN PROJECT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              {currentProject.githubUrl && (
                <a
                  href={currentProject.githubUrl}
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

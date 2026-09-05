"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { PROJECTS, Project } from "@/data/portfolioData";
import { useLenis } from "@/components/SmoothScrollProvider";
import {
  ArrowUpRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
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
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [cinemaProject, setCinemaProject] = useState<Project | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const { lenis } = useLenis();

  const activeProject = PROJECTS[activeIdx] || PROJECTS[0];

  // Switch project with smooth transition
  const switchProject = useCallback(
    (nextIdx: number) => {
      if (nextIdx === activeIdx) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIdx(nextIdx);
        setVideoProgress(0);
        setIsPlaying(true);
        setIsTransitioning(false);
      }, 200);
    },
    [activeIdx]
  );

  const handlePrev = useCallback(() => {
    const prevIdx = (activeIdx - 1 + PROJECTS.length) % PROJECTS.length;
    switchProject(prevIdx);
  }, [activeIdx, switchProject]);

  const handleNext = useCallback(() => {
    const nextIdx = (activeIdx + 1) % PROJECTS.length;
    switchProject(nextIdx);
  }, [activeIdx, switchProject]);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (cinemaProject) {
        if (e.key === "Escape") setCinemaProject(null);
        return;
      }

      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, cinemaProject]);

  // Video playback sync when project changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [activeIdx]);

  // Update progress bar
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const vid = e.currentTarget;
    if (vid.duration) {
      setVideoProgress((vid.currentTime / vid.duration) * 100);
    }
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Toggle sound
  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
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

  return (
    <section
      id="chapter-work"
      className="relative w-full py-20 sm:py-28 md:py-32 bg-[#0d0d0d] text-off-white select-none border-t border-white/5 overflow-hidden"
    >
      {/* ── Dynamic Ambient Glow Tinted by Current Project ── */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70vw] max-w-[1100px] h-[40vw] max-h-[500px] rounded-full pointer-events-none opacity-15 blur-[140px] transition-all duration-700 ease-out z-0"
        style={{
          background: `radial-gradient(circle, ${activeProject.color || "#F5A623"} 0%, transparent 70%)`,
        }}
      />

      {/* Subtle Grid Background Pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0"
      />

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-14 w-full">
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-2 h-2 rounded-full bg-amber shadow-[0_0_10px_#F5A623] animate-pulse" />
              <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-amber">
                CHAPTER 03 // THE WORK
              </p>
            </div>

            <h2 className="font-akira text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-off-white uppercase leading-[0.95]">
              SELECTED <span className="text-amber">PROJECTS.</span>
            </h2>
          </div>

          {/* ── Dynamic Project Switcher Tabs & Arrows ── */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Segmented Pill Selector */}
            <div className="flex items-center gap-1.5 p-1 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl">
              {PROJECTS.map((project, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => switchProject(idx)}
                    className={`px-3.5 sm:px-4 py-1.5 rounded-full font-mono text-[10px] sm:text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? "bg-amber text-charcoal font-bold shadow-[0_0_16px_rgba(245,166,35,0.35)] scale-[1.02]"
                        : "text-off-white/60 hover:text-off-white hover:bg-white/5"
                    }`}
                  >
                    <span>{project.number}</span>
                    <span className="hidden sm:inline font-semibold">{project.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous project"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/10 bg-black/40 text-off-white/70 hover:text-amber hover:border-amber/50 hover:bg-white/5 transition-all flex items-center justify-center"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-xs text-off-white/40 px-1">
                {activeProject.number} / 0{PROJECTS.length}
              </span>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next project"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/10 bg-black/40 text-off-white/70 hover:text-amber hover:border-amber/50 hover:bg-white/5 transition-all flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Main Showcase Stage (Clean, No Clutter, Fits Screen) ── */}
        <div
          className={`w-full rounded-3xl border border-white/10 bg-[#121316]/90 backdrop-blur-xl p-6 sm:p-8 lg:p-10 transition-all duration-300 shadow-[0_20px_70px_rgba(0,0,0,0.7)] ${
            isTransitioning ? "opacity-60 scale-[0.995]" : "opacity-100 scale-100"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* ── LEFT: Cinematic Video (Cols 1-7) ── */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-black/90 border border-white/15 shadow-2xl group">
                {activeProject.videoUrl ? (
                  <video
                    ref={videoRef}
                    key={activeProject.videoUrl}
                    src={activeProject.videoUrl}
                    poster={activeProject.posterUrl}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    onTimeUpdate={handleTimeUpdate}
                    className="w-full h-full object-cover object-center transition-transform duration-700"
                  />
                ) : (
                  <Image
                    src={activeProject.posterUrl}
                    alt={activeProject.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center"
                  />
                )}

                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Top Overlay Badge */}
                <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-off-white font-medium tracking-wider">
                    PRODUCTION DEMO
                  </span>
                </div>

                {/* Top Right: Fullscreen Cinema Button */}
                <button
                  type="button"
                  onClick={() => setCinemaProject(activeProject)}
                  aria-label="Expand to Cinema Theatre"
                  className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-black/75 backdrop-blur-md border border-white/15 flex items-center justify-center text-off-white/80 hover:text-amber hover:border-amber transition-all shadow-lg"
                  title="Expand Fullscreen Reel"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>

                {/* Floating Bottom HUD Controls */}
                {activeProject.videoUrl && (
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={togglePlay}
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
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* ── RIGHT: Project Details (Cols 8-12) ── */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <div>
                {/* Number & Role Header */}
                <div className="flex items-center gap-3 mb-2 font-mono text-xs">
                  <span className="text-amber font-bold tracking-[0.25em]">
                    PROJECT {activeProject.number}
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-off-white/50 tracking-wider uppercase">
                    {activeProject.year}
                  </span>
                </div>

                {/* Akira Title */}
                <h3 className="font-akira text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-off-white uppercase leading-tight">
                  {activeProject.title}
                </h3>

                {/* Subtitle */}
                <p className="font-serif italic text-sm sm:text-base text-amber/90 mt-1.5 font-normal">
                  {activeProject.subtitle}
                </p>
              </div>

              {/* Clean Project Description (No extra clutter) */}
              <div className="space-y-3">
                <p className="font-body text-sm sm:text-base text-off-white/85 leading-relaxed font-light">
                  {activeProject.description}
                </p>
                <p className="font-body text-xs sm:text-sm text-off-white/60 leading-relaxed font-light">
                  {activeProject.built}
                </p>
              </div>

              {/* Necessary Tech Stack Tags */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-off-white/40 block mb-2">
                  TECH STACK
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {activeProject.tags.slice(0, 5).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.03] font-mono text-[10px] sm:text-[11px] text-off-white/80 tracking-wide hover:border-amber/40 hover:text-off-white transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-amber text-charcoal font-mono font-bold text-xs tracking-[0.2em] uppercase hover:bg-off-white transition-all duration-300 shadow-[0_0_20px_rgba(245,166,35,0.25)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>LAUNCH DEMO</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/20 bg-white/[0.02] font-mono text-xs tracking-[0.15em] text-off-white/80 hover:text-off-white hover:border-amber/60 hover:bg-white/[0.05] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>REPOSITORY</span>
                  </a>
                )}

                {activeProject.number === "01" && (
                  <a
                    href="#chapter-case-study"
                    onClick={scrollToCaseStudy}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full border border-white/10 bg-white/[0.02] font-mono text-xs tracking-wider text-off-white/60 hover:text-amber hover:border-amber/40 transition-all"
                  >
                    <span>CASE STUDY ↓</span>
                  </a>
                )}
              </div>
            </div>
          </div>
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

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { PROJECTS, Project } from "@/data/portfolioData";
import { useLenis } from "@/components/SmoothScrollProvider";
import gsap from "gsap";
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
} from "lucide-react";

// Each project "chapter" consumes this many pixels of scroll space
const SCROLL_PER_PROJECT = 700;

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

  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const projectLayersRef = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeIdxRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const { lenis } = useLenis();
  const activeProject = PROJECTS[activeIdx] || PROJECTS[0];

  // ── Smooth project transition via GSAP ────────────────────────────────────
  const goToProject = useCallback((targetIdx: number, dir?: 1 | -1) => {
    if (targetIdx === activeIdxRef.current || isAnimatingRef.current) return;
    if (targetIdx < 0 || targetIdx >= PROJECTS.length) return;

    isAnimatingRef.current = true;
    const currentIdx = activeIdxRef.current;
    const direction = dir ?? (targetIdx > currentIdx ? 1 : -1);

    const currentLayer = projectLayersRef.current[currentIdx];
    const incomingLayer = projectLayersRef.current[targetIdx];

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Animate counter
    if (counterRef.current && !prefersReduced) {
      gsap.to(counterRef.current, {
        y: direction > 0 ? -14 : 14,
        opacity: 0,
        duration: 0.18,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(counterRef.current, { y: direction > 0 ? 14 : -14, opacity: 0 });
          gsap.to(counterRef.current, { y: 0, opacity: 1, duration: 0.28, ease: "power3.out" });
        },
      });
    }

    if (prefersReduced || !currentLayer || !incomingLayer) {
      setActiveIdx(targetIdx);
      activeIdxRef.current = targetIdx;
      setVideoProgress(0);
      setTimeout(() => { isAnimatingRef.current = false; }, 80);
      return;
    }

    const outPreview = currentLayer.querySelector<HTMLElement>(".proj-preview");
    const outInfo = currentLayer.querySelectorAll<HTMLElement>(".proj-info");
    const inPreview = incomingLayer.querySelector<HTMLElement>(".proj-preview");
    const inInfo = incomingLayer.querySelectorAll<HTMLElement>(".proj-info");

    // Stage incoming layer
    gsap.set(incomingLayer, { opacity: 1, zIndex: 20 });
    if (inPreview) gsap.set(inPreview, { scale: 0.96, y: direction > 0 ? 28 : -28, opacity: 0, filter: "blur(8px)" });
    if (inInfo.length) gsap.set(inInfo, { y: direction > 0 ? 20 : -20, opacity: 0, filter: "blur(4px)" });

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIdx(targetIdx);
        activeIdxRef.current = targetIdx;
        setVideoProgress(0);

        // Cleanup
        [inPreview, outPreview].forEach(el => el && gsap.set(el, { clearProps: "all" }));
        inInfo.forEach(el => gsap.set(el, { clearProps: "all" }));
        outInfo.forEach(el => gsap.set(el, { clearProps: "all" }));

        gsap.set(currentLayer, { opacity: 0, zIndex: 0 });
        gsap.set(incomingLayer, { clearProps: "zIndex" });

        // Video management
        videoRefs.current.forEach((vid, i) => {
          if (!vid) return;
          if (i === targetIdx) { vid.currentTime = 0; vid.play().catch(() => {}); }
          else vid.pause();
        });

        isAnimatingRef.current = false;
      },
    });

    // Out
    if (outPreview) tl.to(outPreview, { scale: 0.97, y: direction > 0 ? -24 : 24, opacity: 0, filter: "blur(6px)", duration: 0.32, ease: "power2.inOut" }, 0);
    if (outInfo.length) tl.to(outInfo, { y: direction > 0 ? -16 : 16, opacity: 0, filter: "blur(3px)", stagger: 0.02, duration: 0.28, ease: "power2.inOut" }, 0);

    // In
    if (inPreview) tl.to(inPreview, { scale: 1, y: 0, opacity: 1, filter: "blur(0px)", duration: 0.48, ease: "power3.out" }, 0.1);
    if (inInfo.length) tl.to(inInfo, { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.03, duration: 0.44, ease: "power3.out" }, 0.16);
  }, []);

  // ── Discrete Mouse Wheel Step Interception ──
  useEffect(() => {
    let cooldown = false;
    const onWheel = (e: WheelEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      // Only intercept when section is overlapping the viewport
      if (rect.top > 10 || rect.bottom < window.innerHeight - 10) return;
      const cur = activeIdxRef.current;

      if (e.deltaY > 12 && cur < PROJECTS.length - 1) {
        // Intercept: go to next project
        e.preventDefault();
        if (cooldown || isAnimatingRef.current) return;
        cooldown = true;
        const next = cur + 1;
        goToProject(next, 1);
        if (lenis) lenis.scrollTo(section.offsetTop + next * SCROLL_PER_PROJECT, { duration: 0.6, force: true });
        setTimeout(() => { cooldown = false; }, 600);
      } else if (e.deltaY < -12 && cur > 0) {
        // Intercept: go to prev project
        e.preventDefault();
        if (cooldown || isAnimatingRef.current) return;
        cooldown = true;
        const prev = cur - 1;
        goToProject(prev, -1);
        if (lenis) lenis.scrollTo(section.offsetTop + prev * SCROLL_PER_PROJECT, { duration: 0.6, force: true });
        setTimeout(() => { cooldown = false; }, 600);
      }
      // On last/first project boundary: don't preventDefault → page scrolls naturally
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [goToProject, lenis]);

  // ── Touch Swipe Support (Mobile) ──
  useEffect(() => {
    let startY = 0;
    let cooldown = false;

    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top > 10 || rect.bottom < window.innerHeight - 10) return;
      const delta = startY - e.touches[0].clientY;
      const cur = activeIdxRef.current;

      if (delta > 45 && cur < PROJECTS.length - 1) {
        e.preventDefault();
        if (cooldown || isAnimatingRef.current) return;
        cooldown = true;
        const next = cur + 1;
        goToProject(next, 1);
        if (lenis) lenis.scrollTo(section.offsetTop + next * SCROLL_PER_PROJECT, { duration: 0.6, force: true });
        setTimeout(() => { cooldown = false; }, 600);
      } else if (delta < -45 && cur > 0) {
        e.preventDefault();
        if (cooldown || isAnimatingRef.current) return;
        cooldown = true;
        const prev = cur - 1;
        goToProject(prev, -1);
        if (lenis) lenis.scrollTo(section.offsetTop + prev * SCROLL_PER_PROJECT, { duration: 0.6, force: true });
        setTimeout(() => { cooldown = false; }, 600);
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [goToProject, lenis]);

  // ── Keyboard Navigation (Arrow Keys) ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (cinemaProject) { if (e.key === "Escape") setCinemaProject(null); return; }
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top > 10 || rect.bottom < window.innerHeight - 10) return;
      const cur = activeIdxRef.current;
      if ((e.key === "ArrowDown" || e.key === "ArrowRight") && cur < PROJECTS.length - 1) {
        e.preventDefault(); jumpToProject(cur + 1);
      } else if ((e.key === "ArrowUp" || e.key === "ArrowLeft") && cur > 0) {
        e.preventDefault(); jumpToProject(cur - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cinemaProject]);

  // Tab / button click — jump directly to project
  const jumpToProject = (idx: number) => {
    if (idx === activeIdxRef.current || isAnimatingRef.current) return;
    goToProject(idx);
    if (lenis && sectionRef.current) {
      lenis.scrollTo(sectionRef.current.offsetTop + idx * SCROLL_PER_PROJECT, { duration: 0.7, force: true });
    }
  };

  // Video Time Update for Looping Progress Bar
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const vid = e.currentTarget;
    if (vid.duration) {
      setVideoProgress((vid.currentTime / vid.duration) * 100);
    }
  };

  // Video Play/Pause Toggle
  const togglePlay = () => {
    const vid = videoRefs.current[activeIdx];
    if (!vid) return;
    if (isPlaying) {
      vid.pause();
      setIsPlaying(false);
    } else {
      vid.play();
      setIsPlaying(true);
    }
  };

  // Video Mute/Unmute Toggle
  const toggleMute = () => {
    const nextMuted = !isMuted;
    videoRefs.current.forEach((vid) => {
      if (vid) vid.muted = nextMuted;
    });
    setIsMuted(nextMuted);
  };

  // Scroll smoothly to Chapter 04 Case Study
  const scrollToGitHub = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("chapter-github");
    if (el) {
      if (lenis) lenis.scrollTo(el, { duration: 1.2 });
      else el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Total section height = 100vh (visible frame) + scroll budget for project transitions
  const sectionHeight = `calc(100vh + ${(PROJECTS.length - 1) * SCROLL_PER_PROJECT}px)`;

  return (
    <section
      id="chapter-work"
      ref={sectionRef}
      className="relative w-full bg-[#0d0d0d] text-off-white select-none border-t border-white/5"
      style={{ height: sectionHeight }}
    >
      {/* ── STICKY VIEWPORT (CSS sticky — no GSAP pin needed) ── */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen flex flex-col justify-center overflow-hidden px-6 sm:px-10 lg:px-14 pt-24 sm:pt-28 pb-6 z-10"
      >
        {/* Dynamic Ambient Background Glow Tinted by Current Project */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[1100px] h-[40vw] max-h-[500px] rounded-full pointer-events-none opacity-15 blur-[140px] transition-colors duration-1000 ease-out z-0"
          style={{
            background: `radial-gradient(circle, ${activeProject.color || "#F5A623"} 0%, transparent 70%)`,
          }}
        />

        {/* Subtle Studio Grid Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0"
        />

        <div className="relative z-10 max-w-[1500px] mx-auto w-full flex flex-col h-full max-h-[820px]">
          {/* ── SECTION HEADER & DYNAMIC NAVIGATION ── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-4 sm:mb-5 flex-shrink-0">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-amber shadow-[0_0_10px_#F5A623] animate-pulse" />
                <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-amber font-semibold">
                  CHAPTER 03 // THE WORK
                </p>
              </div>

              <h2 className="font-akira text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-off-white uppercase leading-[0.95]">
                SELECTED <span className="text-amber">PROJECTS.</span>
              </h2>
            </div>

            {/* Dynamic Controls: Segmented Tabs & Counter Arrows */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Project Navigation Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl">
                {PROJECTS.map((project, idx) => {
                  const isActive = activeIdx === idx;
                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => jumpToProject(idx)}
                      className={`px-3 sm:px-4 py-1.5 rounded-full font-mono text-[10px] sm:text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 sm:gap-2 ${
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

              {/* Prev / Next Buttons & Animated Counter */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    if (activeIdx > 0) jumpToProject(activeIdx - 1);
                  }}
                  disabled={activeIdx === 0}
                  aria-label="Previous project"
                  className={`w-8 h-8 rounded-full border border-white/10 bg-black/40 text-off-white/70 transition-all flex items-center justify-center ${
                    activeIdx === 0
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:text-amber hover:border-amber/50 hover:bg-white/5"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Counter with Animated Number */}
                <div className="font-mono text-xs text-off-white/50 px-1.5 flex items-center overflow-hidden h-6">
                  <span
                    ref={counterRef}
                    className="inline-block text-amber font-bold will-change-transform"
                  >
                    {activeProject.number}
                  </span>
                  <span className="text-off-white/40 ml-1">/ 0{PROJECTS.length}</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (activeIdx < PROJECTS.length - 1) jumpToProject(activeIdx + 1);
                  }}
                  disabled={activeIdx === PROJECTS.length - 1}
                  aria-label="Next project"
                  className={`w-8 h-8 rounded-full border border-white/10 bg-black/40 text-off-white/70 transition-all flex items-center justify-center ${
                    activeIdx === PROJECTS.length - 1
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:text-amber hover:border-amber/50 hover:bg-white/5"
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ── PROJECT STACK ── */}
          <div className="relative flex-1 rounded-3xl border border-white/10 bg-[#121316]/95 backdrop-blur-xl p-5 sm:p-7 lg:p-9 shadow-[0_20px_70px_rgba(0,0,0,0.7)] overflow-hidden">
            {PROJECTS.map((project, idx) => {
              const isCurrent = idx === activeIdx;

              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    projectLayersRef.current[idx] = el;
                  }}
                  className={`w-full ${
                    isCurrent
                      ? "relative opacity-100 pointer-events-auto z-10"
                      : "absolute inset-0 p-5 sm:p-7 lg:p-9 opacity-0 pointer-events-none z-0"
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                    {/* ── LEFT: Video Preview ── */}
                    <div className="proj-preview lg:col-span-7 flex flex-col gap-2 will-change-transform">
                      <div className="relative w-full aspect-[16/10] max-h-[380px] sm:max-h-[420px] rounded-2xl overflow-hidden bg-black/95 border border-white/15 shadow-2xl group">
                        {project.videoUrl ? (
                          <video
                            ref={(el) => {
                              videoRefs.current[idx] = el;
                            }}
                            src={project.videoUrl}
                            poster={project.posterUrl}
                            autoPlay={isCurrent}
                            loop
                            muted={isMuted}
                            playsInline
                            onTimeUpdate={isCurrent ? handleTimeUpdate : undefined}
                            className="w-full h-full object-cover object-center"
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

                        {/* Subtle Cinematic Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none z-20" />

                        {/* Top Overlay Badge */}
                        <div className="absolute top-3 left-3 z-30 flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-off-white font-medium tracking-wider">
                            PRODUCTION DEMO
                          </span>
                        </div>

                        {/* Top Right: Fullscreen Cinema Button */}
                        <button
                          type="button"
                          onClick={() => setCinemaProject(project)}
                          aria-label="Expand to Cinema Theatre"
                          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/75 backdrop-blur-md border border-white/15 flex items-center justify-center text-off-white/80 hover:text-amber hover:border-amber transition-all shadow-lg pointer-events-auto"
                          title="Expand Fullscreen Reel"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Floating Bottom HUD Controls */}
                        {project.videoUrl && (
                          <div className="absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 pointer-events-auto">
                              <button
                                type="button"
                                onClick={togglePlay}
                                className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-off-white hover:border-amber hover:text-amber transition-all flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider"
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
                                className="w-7 h-7 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-off-white hover:border-amber hover:text-amber transition-all flex items-center justify-center"
                                title={isMuted ? "Unmute Audio" : "Mute Audio"}
                              >
                                {isMuted ? (
                                  <VolumeX className="w-3.5 h-3.5 text-off-white/60" />
                                ) : (
                                  <Volume2 className="w-3.5 h-3.5 text-amber" />
                                )}
                              </button>
                            </div>

                            <span className="font-mono text-[9px] text-off-white/50 tracking-wider bg-black/60 px-2.5 py-0.5 rounded-md border border-white/10 hidden sm:inline">
                              1080P // LOOPING
                            </span>
                          </div>
                        )}

                        {/* Looping Progress Line Indicator */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
                          <div
                            className="h-full bg-gradient-to-r from-amber to-amber-lighter transition-all duration-150"
                            style={{ width: `${isCurrent ? videoProgress : 0}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* ── RIGHT: Project Details (Cols 8-12) ── */}
                    <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                      {/* Number & Year */}
                      <div className="proj-info flex items-center gap-3 mb-1 font-mono text-xs will-change-transform">
                        <span className="text-amber font-bold tracking-[0.25em]">
                          PROJECT {project.number}
                        </span>
                        <span className="text-white/20">•</span>
                        <span className="text-off-white/50 tracking-wider uppercase">
                          {project.year}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="proj-info font-akira text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-off-white uppercase leading-tight will-change-transform">
                        {project.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="proj-info font-serif italic text-sm sm:text-base text-amber/90 mt-1 font-normal will-change-transform">
                        {project.subtitle}
                      </p>

                      {/* Description */}
                      <div className="proj-info space-y-2 will-change-transform">
                        <p className="font-body text-xs sm:text-sm text-off-white/85 leading-relaxed font-light">
                          {project.description}
                        </p>
                        <p className="font-body text-[11px] sm:text-xs text-off-white/60 leading-relaxed font-light">
                          {project.built}
                        </p>
                      </div>

                      {/* Tech Stack */}
                      <div className="proj-info will-change-transform">
                        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-off-white/40 block mb-1.5">
                          TECH STACK
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 5).map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-mono text-[10px] sm:text-[11px] text-off-white/80 tracking-wide hover:border-amber/40 hover:text-off-white transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="proj-info flex flex-wrap items-center gap-3 pt-3 border-t border-white/10 will-change-transform">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-amber text-charcoal font-mono font-bold text-xs tracking-[0.2em] uppercase hover:bg-off-white transition-all duration-300 shadow-[0_0_20px_rgba(245,166,35,0.25)] hover:scale-[1.02] active:scale-[0.98] pointer-events-auto"
                        >
                          <span>LAUNCH DEMO</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-white/20 bg-white/[0.02] font-mono text-xs tracking-[0.15em] text-off-white/80 hover:text-off-white hover:border-amber/60 hover:bg-white/[0.05] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] pointer-events-auto"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                            <span>REPOSITORY</span>
                          </a>
                        )}

                        {project.number === "01" && (
                          <a
                            href="#chapter-github"
                            onClick={scrollToGitHub}
                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-full border border-white/10 bg-white/[0.02] font-mono text-xs tracking-wider text-off-white/60 hover:text-amber hover:border-amber/40 transition-all pointer-events-auto"
                          >
                            <span>GITHUB ↓</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── BOTTOM HINT ── */}
          <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-off-white/35 uppercase mt-3 flex-shrink-0">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber animate-ping" />
              <span>
                {activeIdx < PROJECTS.length - 1
                  ? "SCROLL TO EXPLORE NEXT PROJECT ↓"
                  : "ALL PROJECTS EXPLORED — SCROLL DOWN ↓"}
              </span>
            </span>
            <span className="hidden sm:inline-block">
              NAVIGATE VIA WHEEL, TABS OR ARROWS
            </span>
          </div>
        </div>
      </div>

      {/* ── CINEMA FULLSCREEN THEATRE MODAL ── */}
      {cinemaProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn"
        >
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

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
  ChevronLeft,
  ChevronRight,
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

  // Section & Pinning targets
  const sectionRef = useRef<HTMLElement>(null);
  const stickyViewportRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  // Stack of independent project layer elements
  const projectLayersRef = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Interaction & transition flags
  const activeIdxRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const cooldownRef = useRef(false);

  const { lenis } = useLenis();
  const activeProject = PROJECTS[activeIdx] || PROJECTS[0];

  // ── Controlled Project Transition ──
  const goToProject = useCallback((targetIdx: number, customDir?: number) => {
    if (targetIdx === activeIdxRef.current || isAnimatingRef.current) return;
    if (targetIdx < 0 || targetIdx >= PROJECTS.length) return;

    isAnimatingRef.current = true;
    const currentIdx = activeIdxRef.current;
    const dir = customDir ?? (targetIdx > currentIdx ? 1 : -1);

    const currentLayer = projectLayersRef.current[currentIdx];
    const incomingLayer = projectLayersRef.current[targetIdx];

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Counter animation
    if (counterRef.current && !prefersReducedMotion) {
      gsap.to(counterRef.current, {
        y: dir > 0 ? -16 : 16,
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(counterRef.current, { y: dir > 0 ? 16 : -16, opacity: 0 });
          gsap.to(counterRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.35,
            ease: "power3.out",
          });
        },
      });
    }

    if (prefersReducedMotion || !currentLayer || !incomingLayer) {
      setActiveIdx(targetIdx);
      activeIdxRef.current = targetIdx;
      setVideoProgress(0);
      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 100);
      return;
    }

    const currentPreview = currentLayer.querySelector<HTMLElement>(".project-preview");
    const currentInfo = currentLayer.querySelectorAll<HTMLElement>(".project-info-item");

    const incomingPreview = incomingLayer.querySelector<HTMLElement>(".project-preview");
    const incomingInfo = incomingLayer.querySelectorAll<HTMLElement>(".project-info-item");

    // Make incoming layer active in DOM immediately (positioned on top)
    gsap.set(incomingLayer, {
      display: "block",
      opacity: 1,
      visibility: "visible",
      zIndex: 20,
    });

    // Set initial incoming transforms
    if (incomingPreview) {
      gsap.set(incomingPreview, {
        scale: 0.97,
        y: dir > 0 ? 35 : -35,
        opacity: 0,
        filter: "blur(6px)",
      });
    }

    if (incomingInfo.length > 0) {
      gsap.set(incomingInfo, {
        y: dir > 0 ? 25 : -25,
        opacity: 0,
        filter: "blur(4px)",
      });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIdx(targetIdx);
        activeIdxRef.current = targetIdx;
        setVideoProgress(0);

        // Explicitly clear all inline transforms and filters to prevent blur leakage
        if (incomingPreview) {
          gsap.set(incomingPreview, { clearProps: "all" });
        }
        if (incomingInfo) {
          incomingInfo.forEach((el) => gsap.set(el, { clearProps: "all" }));
        }
        if (currentPreview) {
          gsap.set(currentPreview, { clearProps: "all" });
        }
        if (currentInfo) {
          currentInfo.forEach((el) => gsap.set(el, { clearProps: "all" }));
        }

        // Hide outgoing layer
        gsap.set(currentLayer, {
          display: "none",
          opacity: 0,
          visibility: "hidden",
          zIndex: 0,
        });

        // Ensure incoming layer is clean
        gsap.set(incomingLayer, { clearProps: "zIndex" });

        // Play active video, pause others
        videoRefs.current.forEach((vid, i) => {
          if (vid) {
            if (i === targetIdx) {
              vid.currentTime = 0;
              vid.play().catch(() => {});
            } else {
              vid.pause();
            }
          }
        });

        isAnimatingRef.current = false;
      },
    });

    // ── Phase 1: Animate Outgoing Elements ──
    if (currentPreview) {
      tl.to(
        currentPreview,
        {
          scale: 0.97,
          y: dir > 0 ? -30 : 30,
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.38,
          ease: "power2.inOut",
        },
        0
      );
    }

    if (currentInfo.length > 0) {
      tl.to(
        currentInfo,
        {
          y: dir > 0 ? -20 : 20,
          opacity: 0,
          filter: "blur(4px)",
          stagger: 0.02,
          duration: 0.32,
          ease: "power2.inOut",
        },
        0
      );
    }

    // ── Phase 2: Animate Incoming Elements with Stagger ──
    if (incomingPreview) {
      tl.to(
        incomingPreview,
        {
          scale: 1,
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.52,
          ease: "power3.out",
        },
        0.12
      );
    }

    if (incomingInfo.length > 0) {
      tl.to(
        incomingInfo,
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.04,
          duration: 0.48,
          ease: "power3.out",
        },
        0.18
      );
    }
  }, []);

  // ── Sync with ScrollTrigger for Continuous Scrollbar Dragging ──
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (isAnimatingRef.current || cooldownRef.current) return;
          const p = self.progress;
          const targetStep = p < 0.33 ? 0 : p < 0.66 ? 1 : 2;
          if (targetStep !== activeIdxRef.current) {
            goToProject(targetStep);
          }
        },
      });
    });

    return () => ctx.revert();
  }, [goToProject]);

  // ── Discrete Mouse Wheel Step Interception ──
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      // Section is active in viewport when it has reached top (or near top) and hasn't completely scrolled away
      const isPinnedInView = rect.top <= 90 && rect.bottom >= window.innerHeight * 0.5;

      if (!isPinnedInView) return;

      const current = activeIdxRef.current;

      // ── Scroll DOWN (01 → 02 → 03) ──
      if (e.deltaY > 15) {
        if (current < PROJECTS.length - 1) {
          // Intercept scroll inside projects showcase
          e.preventDefault();
          (e as unknown as { lenisStopPropagation: boolean }).lenisStopPropagation = true;

          if (!isAnimatingRef.current && !cooldownRef.current) {
            cooldownRef.current = true;
            const nextIdx = current + 1;
            goToProject(nextIdx, 1);

            // Synchronize page scroll to the matching third of the section
            if (lenis) {
              const sectionTop = window.scrollY + rect.top;
              const scrollRange = rect.height - window.innerHeight;
              const targetY = sectionTop + (nextIdx / (PROJECTS.length - 1)) * scrollRange;
              lenis.scrollTo(targetY, { duration: 0.8 });
            }

            setTimeout(() => {
              cooldownRef.current = false;
            }, 600);
          }
        }
        // When on Project 03 (last project), do NOT preventDefault!
        // The wheel event continues naturally to Chapter 04!
      }
      // ── Scroll UP (03 → 02 → 01) ──
      else if (e.deltaY < -15) {
        if (current > 0) {
          // Intercept scroll inside projects showcase
          e.preventDefault();
          (e as unknown as { lenisStopPropagation: boolean }).lenisStopPropagation = true;

          if (!isAnimatingRef.current && !cooldownRef.current) {
            cooldownRef.current = true;
            const prevIdx = current - 1;
            goToProject(prevIdx, -1);

            // Synchronize page scroll
            if (lenis) {
              const sectionTop = window.scrollY + rect.top;
              const scrollRange = rect.height - window.innerHeight;
              const targetY = sectionTop + (prevIdx / (PROJECTS.length - 1)) * scrollRange;
              lenis.scrollTo(targetY, { duration: 0.8 });
            }

            setTimeout(() => {
              cooldownRef.current = false;
            }, 600);
          }
        }
        // When on Project 01 (first project), do NOT preventDefault!
        // The wheel event continues naturally to Chapter 02!
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [goToProject, lenis]);

  // ── Touch Swipe Support (Mobile) ──
  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const isPinnedInView = rect.top <= 90 && rect.bottom >= window.innerHeight * 0.5;
      if (!isPinnedInView) return;

      const deltaY = touchStartY - e.touches[0].clientY;
      const current = activeIdxRef.current;

      if (deltaY > 50) {
        // Swipe UP = Next Project
        if (current < PROJECTS.length - 1 && !isAnimatingRef.current && !cooldownRef.current) {
          e.preventDefault();
          cooldownRef.current = true;
          const nextIdx = current + 1;
          goToProject(nextIdx, 1);

          if (lenis) {
            const sectionTop = window.scrollY + rect.top;
            const scrollRange = rect.height - window.innerHeight;
            const targetY = sectionTop + (nextIdx / (PROJECTS.length - 1)) * scrollRange;
            lenis.scrollTo(targetY, { duration: 0.8 });
          }

          setTimeout(() => {
            cooldownRef.current = false;
          }, 600);
        }
      } else if (deltaY < -50) {
        // Swipe DOWN = Prev Project
        if (current > 0 && !isAnimatingRef.current && !cooldownRef.current) {
          e.preventDefault();
          cooldownRef.current = true;
          const prevIdx = current - 1;
          goToProject(prevIdx, -1);

          if (lenis) {
            const sectionTop = window.scrollY + rect.top;
            const scrollRange = rect.height - window.innerHeight;
            const targetY = sectionTop + (prevIdx / (PROJECTS.length - 1)) * scrollRange;
            lenis.scrollTo(targetY, { duration: 0.8 });
          }

          setTimeout(() => {
            cooldownRef.current = false;
          }, 600);
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [goToProject, lenis]);

  // ── Keyboard Navigation (Arrow Keys) ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (cinemaProject) {
        if (e.key === "Escape") setCinemaProject(null);
        return;
      }

      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top <= 100 && rect.bottom >= window.innerHeight * 0.4;
      if (!inView) return;

      const current = activeIdxRef.current;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        if (current < PROJECTS.length - 1) {
          e.preventDefault();
          handleTabClick(current + 1);
        }
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        if (current > 0) {
          e.preventDefault();
          handleTabClick(current - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cinemaProject]);

  // Direct Tab Click Handler
  const handleTabClick = (idx: number) => {
    if (idx === activeIdxRef.current || isAnimatingRef.current) return;
    goToProject(idx);
    const section = sectionRef.current;
    if (section && lenis) {
      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const scrollRange = rect.height - window.innerHeight;
      const targetY = sectionTop + (idx / (PROJECTS.length - 1)) * scrollRange;
      lenis.scrollTo(targetY, { duration: 0.8 });
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
      ref={sectionRef}
      className="relative w-full bg-[#0d0d0d] text-off-white select-none border-t border-white/5"
      style={{ height: `${PROJECTS.length * 100}vh` }}
    >
      {/* ── STICKY PROJECTS VIEWPORT (Pinned inside the scroll distance) ── */}
      <div
        ref={stickyViewportRef}
        className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-6 sm:px-10 lg:px-14 pt-28 sm:pt-32 pb-8 z-10"
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

        <div className="relative z-10 max-w-[1500px] mx-auto w-full flex flex-col justify-between h-full max-h-[800px]">
          {/* ── SECTION HEADER & DYNAMIC NAVIGATION (Accounts for Fixed Navbar) ── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 sm:mb-6">
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
                      onClick={() => handleTabClick(idx)}
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
                    if (activeIdx > 0) handleTabClick(activeIdx - 1);
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
                    if (activeIdx < PROJECTS.length - 1) handleTabClick(activeIdx + 1);
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

          {/* ── PROJECT STACK: Independent Layer per Project (Never Disappears) ── */}
          <div className="relative w-full rounded-3xl border border-white/10 bg-[#121316]/95 backdrop-blur-xl p-5 sm:p-7 lg:p-9 shadow-[0_20px_70px_rgba(0,0,0,0.7)] min-h-[460px] sm:min-h-[500px] flex items-center">
            {PROJECTS.map((project, idx) => {
              const isCurrent = idx === activeIdx;

              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    projectLayersRef.current[idx] = el;
                  }}
                  className={`w-full transition-none ${
                    isCurrent
                      ? "relative z-10 block opacity-100"
                      : "absolute inset-0 p-5 sm:p-7 lg:p-9 pointer-events-none hidden opacity-0"
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                    {/* ── LEFT: Cinematic Video Preview (Cols 1-7) ── */}
                    <div className="project-preview lg:col-span-7 flex flex-col gap-2 will-change-transform">
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
                      {/* Number & Date */}
                      <div className="project-info-item flex items-center gap-3 mb-1 font-mono text-xs will-change-transform">
                        <span className="text-amber font-bold tracking-[0.25em]">
                          PROJECT {project.number}
                        </span>
                        <span className="text-white/20">•</span>
                        <span className="text-off-white/50 tracking-wider uppercase">
                          {project.year}
                        </span>
                      </div>

                      {/* Project Akira Title */}
                      <h3 className="project-info-item font-akira text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-off-white uppercase leading-tight will-change-transform">
                        {project.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="project-info-item font-serif italic text-sm sm:text-base text-amber/90 mt-1 font-normal will-change-transform">
                        {project.subtitle}
                      </p>

                      {/* Clean Project Description */}
                      <div className="project-info-item space-y-2 will-change-transform">
                        <p className="font-body text-xs sm:text-sm text-off-white/85 leading-relaxed font-light">
                          {project.description}
                        </p>
                        <p className="font-body text-[11px] sm:text-xs text-off-white/60 leading-relaxed font-light">
                          {project.built}
                        </p>
                      </div>

                      {/* Tech Stack Tags */}
                      <div className="project-info-item will-change-transform">
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
                      <div className="project-info-item flex flex-wrap items-center gap-3 pt-3 border-t border-white/10 will-change-transform">
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
                            href="#chapter-case-study"
                            onClick={scrollToCaseStudy}
                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-full border border-white/10 bg-white/[0.02] font-mono text-xs tracking-wider text-off-white/60 hover:text-amber hover:border-amber/40 transition-all pointer-events-auto"
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

          {/* ── BOTTOM INTERACTION HINT ── */}
          <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-off-white/40 uppercase mt-4">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber animate-ping" />
              <span>
                {activeIdx < PROJECTS.length - 1
                  ? "SCROLL MOUSE WHEEL TO EXPLORE NEXT PROJECT ↓"
                  : "ALL PROJECTS EXPLORED — SCROLL DOWN TO CHAPTER 04 ↓"}
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

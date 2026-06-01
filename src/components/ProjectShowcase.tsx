"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { projects, Project } from "@/lib/projects";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";

// ─── Utility: split text into char spans ───────────────────────────────────
function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char inline-block will-change-transform"
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

// ─── Scroll Mouse Indicator ────────────────────────────────────────────────
function ScrollMouse() {
  return (
    <div className="flex flex-col items-center gap-2 opacity-40 group">
      <div
        className="w-5 h-8 rounded-full border border-current flex items-start justify-center pt-1.5 transition-colors group-hover:border-accent"
        style={{ color: "var(--ink-light)" }}
      >
        <div
          className="w-0.5 h-1.5 rounded-full bg-current transition-colors group-hover:bg-accent"
          style={{ animation: "scrollDot 1.8s ease-in-out infinite" }}
        />
      </div>
      <span
        className="font-mono text-[8px] tracking-[0.4em] uppercase"
        style={{ color: "var(--ink-light)" }}
      >
        scroll
      </span>
    </div>
  );
}

// ─── Main Showcase ─────────────────────────────────────────────────────────
export default function ProjectShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Magnetic cursor follower
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  // Header text animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!headerRef.current) return;

    const chars = headerRef.current.querySelectorAll(".header-char");
    gsap.fromTo(
      chars,
      { y: "110%", opacity: 0, rotateX: -30 },
      {
        y: "0%",
        opacity: 1,
        rotateX: 0,
        duration: 1.5,
        stagger: 0.03,
        ease: "expo.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );

    // Eyebrow line
    gsap.fromTo(
      ".showcase-eyebrow",
      { width: 0, opacity: 0 },
      {
        width: "4rem",
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );

    // Project sections — track active
    const sections = gsap.utils.toArray<HTMLElement>(".project-section");
    const ctx = gsap.context(() => {
      sections.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Custom Cursor ── */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference hidden md:block"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div
          className="w-4 h-4 rounded-full bg-white transition-transform duration-300"
          style={{
            transform: cursorVisible ? "scale(12)" : "scale(1)",
            opacity: cursorVisible ? 0.15 : 1,
          }}
        />
        {cursorVisible && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[1px] text-white tracking-widest uppercase">View</span>
          </div>
        )}
      </div>

      <section
        ref={containerRef}
        className="relative py-48 px-6 md:px-24 overflow-hidden"
      >
        {/* ── Background atmosphere ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden bg-background">
          {/* Grid lines */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
              backgroundSize: "100px 100px",
            }}
          />
          
          {/* Soft ambient blobs */}
          <div
            className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
              filter: "blur(120px)",
              animation: "blobFloat1 25s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
              filter: "blur(140px)",
              animation: "blobFloat2 30s ease-in-out infinite",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">

          {/* ── Section Header ── */}
          <div
            ref={headerRef}
            className="flex flex-col md:flex-row md:items-end justify-between mb-48 gap-12"
          >
            <div className="perspective-1000">
              {/* Eyebrow */}
              <div className="flex items-center gap-6 mb-10">
                <div
                  className="showcase-eyebrow h-px bg-accent opacity-0"
                  style={{ width: 0 }}
                />
                <p className="font-mono text-[11px] tracking-[0.5em] uppercase text-accent">
                  Selected Works // 01—03
                </p>
              </div>

              {/* Big heading */}
              <div className="overflow-hidden">
                <h2
                  className="font-display font-bold leading-[0.85] tracking-tighter"
                  style={{
                    fontSize: "clamp(4rem, 12vw, 10rem)",
                    color: "var(--foreground)",
                  }}
                >
                  {"Creative".split("").map((c, i) => (
                    <span key={i} className="header-char inline-block opacity-0">{c}</span>
                  ))}
                  <br />
                  <span className="text-accent italic font-light">
                    {"Archive.".split("").map((c, i) => (
                      <span key={i} className="header-char inline-block opacity-0">{c}</span>
                    ))}
                  </span>
                </h2>
              </div>
            </div>

            {/* CTA + scroll hint */}
            <div className="flex flex-col items-start md:items-end gap-10">
              <Link
                href="/projects"
                onMouseEnter={() => setCursorVisible(true)}
                onMouseLeave={() => setCursorVisible(false)}
                className="group relative flex items-center gap-6 font-mono text-[11px] tracking-[0.3em] uppercase py-6 px-10 rounded-full overflow-hidden transition-all duration-500 border border-white/5"
                style={{
                  color: "var(--foreground)",
                  background: "var(--glass-bg)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="absolute inset-0 bg-accent translate-y-[101%] transition-transform duration-500 group-hover:translate-y-0" />
                <span className="relative z-10 transition-colors duration-500 group-hover:text-[#0D0D0D]">All Projects</span>
                <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center bg-foreground text-background transition-all duration-500 group-hover:bg-[#0D0D0D] group-hover:text-[#F2F0EB]">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M9 3l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
              <ScrollMouse />
            </div>
          </div>

          {/* ── Progress bar (left spine) ── */}
          <div
            className="absolute left-0 hidden lg:block"
            style={{ top: "500px", bottom: "100px", width: "1px", background: "var(--border-subtle)" }}
          >
            <div
              className="w-full origin-top"
              style={{
                height: `${((activeIndex + 1) / projects.length) * 100}%`,
                background: "var(--accent)",
                transition: "height 1s cubic-bezier(0.2, 1, 0.3, 1)",
                boxShadow: "0 0 20px var(--accent)",
              }}
            />
            {projects.map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 -translate-x-1/2 rounded-full transition-all duration-700"
                style={{
                  top: `${(i / (projects.length - 1)) * 100}%`,
                  width: activeIndex === i ? "8px" : "4px",
                  height: activeIndex === i ? "8px" : "4px",
                  background: activeIndex === i ? "var(--accent)" : "var(--border-subtle)",
                  transform: "translateX(-50%) translateY(-50%)",
                }}
              />
            ))}
          </div>

          {/* ── Project Items ── */}
          <div className="space-y-[40vh] lg:pl-24">
            {projects.map((project, i) => (
              <ProjectItem
                key={project.slug}
                project={project}
                index={i}
                isActive={activeIndex === i}
                onHover={setCursorVisible}
              />
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes blobFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(5%, 10%) scale(1.1); }
          66% { transform: translate(-3%, 5%) scale(0.9); }
        }
        @keyframes blobFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-8%, -5%) scale(1.15); }
          66% { transform: translate(4%, -10%) scale(0.85); }
        }
        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 1; }
          80% { transform: translateY(12px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }
      `}</style>
    </>
  );
}

// ─── Project Item ──────────────────────────────────────────────────────────
function ProjectItem({
  project,
  index,
  isActive,
  onHover,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  onHover: (v: boolean) => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().catch(() => { });
    } else {
      videoRef.current?.pause();
    }
  }, [isActive]);

  useEffect(() => {
    if (!itemRef.current) return;

    const ctx = gsap.context(() => {
      // Content reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top 75%",
          once: true,
        }
      });

      tl.fromTo(
        titleRef.current?.querySelectorAll(".char") || [],
        { y: "110%", rotateX: -40, opacity: 0 },
        { y: "0%", rotateX: 0, opacity: 1, duration: 1.2, stagger: 0.02, ease: "power4.out" }
      )
      .fromTo(
        descRef.current,
        { y: 30, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 0.6, filter: "blur(0px)", duration: 1, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(
        tagsRef.current?.querySelectorAll(".tag-pill") || [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=1"
      );

      // Visual reveal
      gsap.fromTo(
        visualRef.current,
        { scale: 0.9, opacity: 0, filter: "blur(20px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: visualRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Parallax
      gsap.to(visualRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, itemRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={itemRef}
      className="project-section grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-24 items-center min-h-[90vh]"
    >
      {/* ── Content column ── */}
      <div className="relative z-10 flex flex-col gap-10 perspective-1000">
        
        {/* Index & Year */}
        <div className="flex items-center gap-6 font-mono text-[10px] tracking-[0.4em] uppercase opacity-40">
          <span>{String(index + 1).padStart(2, "0")} / 03</span>
          <div className="w-12 h-px bg-current" />
          <span>{project.year}</span>
        </div>

        {/* Title */}
        <div className="overflow-hidden">
          <h3
            ref={titleRef}
            className="font-display font-bold leading-[0.85] tracking-tighter"
            style={{
              fontSize: "clamp(3rem, 7vw, 6rem)",
              color: "var(--foreground)",
            }}
          >
            <SplitText text={project.title} />
          </h3>
        </div>

        {/* Description */}
        <p
          ref={descRef}
          className="font-body text-lg md:text-xl leading-relaxed font-light max-w-lg opacity-0"
          style={{ color: "var(--foreground)" }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div ref={tagsRef} className="flex flex-wrap gap-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="tag-pill font-mono text-[9px] tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-white/10 opacity-0"
              style={{ background: "var(--glass-bg)", backdropFilter: "blur(10px)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex items-center gap-8 pt-4">
          <Link
            href={`/projects/${project.slug}`}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            className="group flex items-center gap-4 font-mono text-[11px] tracking-[0.3em] uppercase text-accent"
          >
            <span className="relative">
              Case Study
              <div className="absolute bottom-[-4px] left-0 w-0 h-px bg-accent transition-all duration-500 group-hover:w-full" />
            </span>
            <div className="w-10 h-10 rounded-full border border-accent flex items-center justify-center transition-all duration-500 group-hover:bg-accent group-hover:text-[#0D0D0D] group-hover:rotate-45">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M9 3l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-40 hover:opacity-100 transition-opacity"
          >
            Live Site // →
          </a>
        </div>
      </div>

      {/* ── Visual column ── */}
      <div
        ref={visualRef}
        className="relative group opacity-0"
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        {/* Glow */}
        <div
          className="absolute -inset-10 rounded-full opacity-20 pointer-events-none blur-[80px] transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${project.color} 0%, transparent 70%)`,
            transform: isActive ? "scale(1.2)" : "scale(0.8)",
          }}
        />

        {/* Main visual frame */}
        <div
          className="relative rounded-[32px] overflow-hidden border border-white/10"
          style={{
            aspectRatio: "16/10",
            boxShadow: isActive ? "0 60px 120px -20px rgba(0,0,0,0.5)" : "0 30px 60px -10px rgba(0,0,0,0.3)",
            transition: "box-shadow 1s cubic-bezier(0.2, 1, 0.3, 1)",
          }}
        >
          {/* Scanline overlay */}
          <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />

          {/* Video */}
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] cubic-bezier(0.2, 1, 0.3, 1)"
            style={{ transform: isActive ? "scale(1.05)" : "scale(1.15)" }}
          >
            <source src={project.videoUrl} type="video/mp4" />
          </video>

          {/* Overlay info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
          
          <div className="absolute top-8 left-8 z-20">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/10">
              <span className={`w-2 h-2 rounded-full animate-pulse`} style={{ background: project.color }} />
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white">System Active</span>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 z-20">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">{project.slug} {"// protocol"}</span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-accent/30 rounded-tr-3xl pointer-events-none" />
        <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-accent/30 rounded-bl-3xl pointer-events-none" />
      </div>
    </div>
  );
}
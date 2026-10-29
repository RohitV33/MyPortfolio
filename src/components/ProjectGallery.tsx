"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/data/portfolioData";
import { ArrowUpRight, ExternalLink } from "lucide-react";

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
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection-based slide-in for rows
  useEffect(() => {
    const cards = document.querySelectorAll(".proj-card-row");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0px)";
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const handleCardEnter = useCallback((idx: number) => {
    setHoveredIdx(idx);
  }, []);

  const handleCardLeave = useCallback(() => {
    setHoveredIdx(null);
  }, []);

  return (
    <section
      id="chapter-work"
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0a] overflow-hidden pb-20"
    >
      {/* ── SECTION HEADER ── */}
      <div className="relative px-6 sm:px-12 lg:px-20 pt-24 pb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-amber animate-pulse shadow-[0_0_12px_#F5A623]" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-amber font-semibold">
            Chapter 03 — The Work
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <h2 className="font-akira text-[2.8rem] sm:text-[4rem] lg:text-[5.5rem] font-black tracking-tight leading-[0.88] uppercase text-off-white">
            SELECTED
            <br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "2px #F5A623" }}
            >
              WORK.
            </span>
          </h2>

          <div className="flex flex-col gap-2 sm:items-end pb-1">
            <p className="font-mono text-xs text-off-white/45 tracking-widest uppercase max-w-[260px] sm:text-right leading-relaxed">
              {PROJECTS.length} projects shipped
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-amber font-mono text-xs tracking-wider uppercase hover:gap-3 transition-all duration-300 group"
            >
              <span>View All Archives</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="mt-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      {/* ── PROJECT LIST ── */}
      <div className="relative px-6 sm:px-12 lg:px-20">
        {PROJECTS.map((project, idx) => {
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={project.id}
              className="proj-card-row group relative cursor-pointer"
              style={{
                opacity: 0,
                transform: "translateY(32px)",
                transition: `opacity 0.7s ease ${idx * 0.12}s, transform 0.7s ease ${idx * 0.12}s`,
              }}
              onMouseEnter={() => handleCardEnter(idx)}
              onMouseLeave={handleCardLeave}
              onClick={() => {
                setHoveredIdx((prev) => (prev === idx ? null : idx));
              }}
              tabIndex={0}
              role="button"
              aria-expanded={isHovered}
              aria-label={`${project.title} - tap to toggle preview and actions`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setHoveredIdx((prev) => (prev === idx ? null : idx));
                }
              }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-white/[0.08]" />

              <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-0 py-8 lg:py-10">
                {/* Number + Year */}
                <div className="flex items-center gap-5 lg:w-[18%] flex-shrink-0">
                  <span
                    className="font-akira text-[3.5rem] lg:text-[4rem] font-black leading-none transition-colors duration-500"
                    style={{ color: isHovered ? project.color : "rgba(255,255,255,0.06)" }}
                  >
                    {project.number}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-off-white/35">
                      {project.year}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-off-white/25">
                      {project.role.split(" ")[0]}
                    </span>
                  </div>
                </div>

                {/* Title + Subtitle + Tags */}
                <div className="flex-1 lg:px-8">
                  <h3
                    className="font-akira text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-tight mb-2 transition-colors duration-300"
                    style={{ color: isHovered ? "#FAFAF8" : "rgba(250,250,248,0.6)" }}
                  >
                    {project.title}
                  </h3>
                  <p className="font-body text-sm text-off-white/40 leading-relaxed max-w-xl line-clamp-2 transition-colors duration-300 group-hover:text-off-white/60">
                    {project.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded font-mono text-[9px] tracking-wider uppercase transition-all duration-300"
                        style={{
                          color: isHovered ? "rgba(250,250,248,0.65)" : "rgba(250,250,248,0.25)",
                          border: `1px solid ${isHovered ? project.color + "45" : "rgba(255,255,255,0.08)"}`,
                          background: isHovered ? project.color + "0A" : "transparent",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Preview + Actions */}
                <div className="flex items-center gap-5 lg:w-[38%] flex-shrink-0 justify-between lg:justify-end">
                  {/* Image card */}
                  <div
                    className="relative w-[160px] sm:w-[200px] lg:w-[240px] aspect-[16/10] rounded-xl overflow-hidden border border-white/10 flex-shrink-0 transition-all duration-500"
                    style={{
                      transform: isHovered ? "scale(1.04)" : "scale(0.95)",
                      opacity: isHovered ? 1 : 0.3,
                      boxShadow: isHovered ? `0 20px 60px ${project.color}35` : "none",
                    }}
                  >
                    <Image
                      src={project.posterUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 240px"
                      quality={80}
                      loading="lazy"
                      className="object-cover object-center transition-transform duration-700"
                      style={{ transform: isHovered ? "scale(1.06)" : "scale(1.0)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/15">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-mono text-[8px] text-white/70 tracking-wider">LIVE</span>
                    </div>
                  </div>

                  {/* Action buttons - slide in on hover */}
                  <div
                    className="flex flex-col gap-2 transition-all duration-300"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? "translateX(0)" : "translateX(12px)",
                      pointerEvents: isHovered ? "auto" : "none",
                    }}
                  >
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[10px] tracking-widest uppercase text-charcoal font-bold transition-all duration-200 hover:scale-105 whitespace-nowrap"
                      style={{ background: project.color }}
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>DEMO</span>
                    </a>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 font-mono text-[10px] tracking-widest uppercase text-off-white/70 hover:text-off-white hover:border-white/40 transition-all duration-200 hover:scale-105 bg-white/[0.03] whitespace-nowrap"
                      >
                        <GithubIcon className="w-3 h-3" />
                        <span>CODE</span>
                      </a>
                    )}
                    <Link
                      href={`/projects/${project.id}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border font-mono text-[10px] tracking-widest uppercase transition-all duration-200 hover:scale-105 whitespace-nowrap"
                      style={{
                        borderColor: project.color + "55",
                        color: project.color,
                        background: project.color + "0A",
                      }}
                    >
                      <span>CASE STUDY</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* Default arrow (fades out on hover) */}
                  <div
                    className="flex items-center justify-center w-9 h-9 rounded-full border border-white/15 transition-all duration-300 flex-shrink-0"
                    style={{
                      opacity: isHovered ? 0 : 0.45,
                      transform: isHovered ? "rotate(45deg) scale(0.8)" : "rotate(0deg) scale(1)",
                    }}
                  >
                    <ArrowUpRight className="w-4 h-4 text-off-white/40" />
                  </div>
                </div>
              </div>

              {/* Animated bottom glow line */}
              <div
                className="absolute bottom-0 left-0 h-px transition-all duration-500 ease-out"
                style={{
                  background: `linear-gradient(to right, transparent, ${project.color}, transparent)`,
                  width: isHovered ? "100%" : "0%",
                  opacity: isHovered ? 1 : 0,
                }}
              />
            </div>
          );
        })}

        <div className="h-px bg-white/[0.08]" />
      </div>
    </section>
  );
}

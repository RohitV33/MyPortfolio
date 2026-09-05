"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { PROJECTS } from "@/data/portfolioData";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectGallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Update active index on scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.querySelector("article")?.clientWidth || 800;
      const newIndex = Math.round(scrollLeft / (cardWidth + 32));
      setActiveIndex(Math.min(Math.max(0, newIndex), PROJECTS.length - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToProject = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll("article");
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setActiveIndex(index);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollToProject(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < PROJECTS.length - 1) {
      scrollToProject(activeIndex + 1);
    }
  };

  return (
    <section
      id="chapter-work"
      className="relative w-full py-24 md:py-36 bg-charcoal text-off-white select-none border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 mb-12 md:mb-16">
        {/* Header Eyebrow & Title */}
        <div className="flex items-center gap-3 mb-3">
          <span className="w-2 h-2 rounded-full bg-amber" />
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-amber">
            CHAPTER 03 // THE WORK
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <h2 className="font-display text-4xl md:text-7xl font-extrabold tracking-tight text-off-white uppercase leading-[0.9]">
              SELECTED <br />
              <span className="text-amber">WORK.</span>
            </h2>
            <p className="font-body text-base md:text-lg font-light text-foreground/60 max-w-lg mt-4 leading-relaxed">
              Production case studies engineered end-to-end. Explore real systems, architectures, and live deployments.
            </p>
          </div>

          {/* Interactive Navigation Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6">
            {/* Quick Jump Tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md">
              {PROJECTS.map((proj, idx) => (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => scrollToProject(idx)}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-[11px] tracking-wider uppercase transition-all duration-300 ${
                    activeIndex === idx
                      ? "bg-amber text-charcoal font-bold shadow-md"
                      : "text-foreground/55 hover:text-off-white"
                  }`}
                >
                  {proj.number} {proj.title}
                </button>
              ))}
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous project"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-off-white hover:border-amber hover:text-amber transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Next project"
                onClick={handleNext}
                disabled={activeIndex === PROJECTS.length - 1}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-off-white hover:border-amber hover:text-amber transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth Horizontal Carousel Track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 md:gap-10 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 md:px-16 pb-8 no-scrollbar"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            data-cursor-project
            className="w-[88vw] md:w-[76vw] lg:w-[68vw] max-w-[1050px] shrink-0 snap-center rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 md:p-10 flex flex-col justify-between overflow-hidden relative group hover:border-amber/40 transition-colors duration-500 shadow-2xl"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 relative z-10">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-amber font-bold text-sm md:text-base tracking-[0.3em]">
                  {project.number}
                </span>
                <span className="font-mono text-[10px] md:text-xs text-foreground/50 uppercase tracking-widest">
                  {project.role}
                </span>
              </div>
              <span className="font-mono text-[10px] md:text-xs text-foreground/50 tracking-wider">
                {project.year}
              </span>
            </div>

            {/* Media Showcase */}
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-black/40 border border-white/5 mb-6">
              {project.videoUrl ? (
                <video
                  src={project.videoUrl}
                  poster={project.posterUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <Image
                  src={project.posterUrl}
                  alt={`${project.title} Preview`}
                  fill
                  sizes="(max-width: 1200px) 90vw, 1050px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Bottom Meta & Actions */}
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 items-end relative z-10">
              <div>
                <h3 className="font-display text-2xl md:text-4xl font-extrabold tracking-tight text-off-white group-hover:text-amber transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="font-body text-xs md:text-sm text-foreground/70 line-clamp-2 leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md border border-white/10 bg-white/5 font-mono text-[10px] text-foreground/75 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-start md:justify-end gap-3 pt-2 md:pt-0">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-interactive
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-off-white text-charcoal font-mono font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-amber hover:text-charcoal transition-all duration-300 shadow-md"
                >
                  <span>VIEW PROJECT</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-interactive
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/15 font-mono text-[10px] tracking-widest text-foreground/60 hover:text-off-white hover:border-white/40 transition-colors"
                  >
                    CODE
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Footer info banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mt-12 flex items-center justify-between font-mono text-[10px] tracking-widest text-foreground/40 uppercase border-t border-white/10 pt-6">
        <span>PROJECT {activeIndex + 1} OF {PROJECTS.length}</span>
        <span>SCROLL DOWN FOR CASE STUDY DEEP DIVE ↓</span>
      </div>
    </section>
  );
}

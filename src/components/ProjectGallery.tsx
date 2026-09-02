"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { PROJECTS } from "@/data/portfolioData";
import { ArrowUpRight } from "lucide-react";

export default function ProjectGallery() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        const container = containerRef.current;
        if (!track || !container) return;

        const totalWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        const distance = totalWidth - viewportWidth;

        if (distance > 0) {
          gsap.to(track, {
            x: -distance,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: () => `+=${distance * 1.1}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-work"
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-charcoal text-off-white select-none"
    >
      {/* Responsive Track: natural flow on mobile, pinned horizontal on desktop */}
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row min-h-screen md:h-screen md:items-center will-change-transform px-6 md:px-20 py-16 md:py-0 gap-10 md:gap-24 md:w-max"
      >
        {/* Intro Billboard to the Gallery */}
        <div className="w-full md:w-[85vw] max-w-[480px] shrink-0 flex flex-col justify-center pr-0 md:pr-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber" />
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-amber">
              CHAPTER 04 // THE WORK
            </p>
          </div>
          <h2 className="font-display text-[clamp(2.8rem,8vw,6.5rem)] font-extrabold tracking-tight text-off-white uppercase leading-[0.9] mb-6 md:mb-8">
            SELECTED <br />
            <span className="text-amber">WORK.</span>
          </h2>
          <p className="font-body text-base md:text-lg font-light text-foreground/60 leading-relaxed max-w-sm mb-6">
            Curated production case studies engineered end-to-end. Scroll through real architectures and live deployments.
          </p>
          <div className="font-mono text-[11px] text-amber tracking-[0.3em] uppercase flex items-center gap-2">
            <span className="hidden md:inline">DRAG OR SCROLL HORIZONTALLY →</span>
            <span className="md:hidden">EXPLORE CASE STUDIES ↓</span>
          </div>
        </div>

        {/* Project Cards */}
        {PROJECTS.map((project, index) => (
          <article
            key={project.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            data-cursor-project
            className="w-full md:w-[78vw] lg:w-[72vw] max-w-[1100px] min-h-[580px] md:h-[82vh] max-h-[750px] shrink-0 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 md:p-12 flex flex-col justify-between overflow-hidden relative group hover:border-amber/40 transition-colors duration-500 shadow-2xl"
          >
            {/* Top Bar: Number & Role */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 md:pb-6 relative z-10">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-amber font-bold text-sm md:text-base tracking-[0.3em]">
                  {project.number}
                </span>
                <span className="font-mono text-[10px] md:text-xs text-foreground/45 uppercase tracking-widest">
                  {project.role}
                </span>
              </div>
              <span className="font-mono text-[10px] md:text-xs text-foreground/50 tracking-wider">
                {project.year}
              </span>
            </div>

            {/* Middle: Media Mockup / Video */}
            <div className="relative w-full flex-1 my-4 md:my-6 rounded-2xl overflow-hidden bg-black/40 border border-white/5">
              {project.videoUrl ? (
                <video
                  src={project.videoUrl}
                  poster={project.posterUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="project-media w-full h-full object-cover object-center transition-transform duration-700 will-change-transform group-hover:scale-105"
                />
              ) : (
                <Image
                  src={project.posterUrl}
                  alt={`${project.title} Preview`}
                  fill
                  sizes="(max-width: 1200px) 90vw, 1100px"
                  className="project-media object-cover object-center transition-transform duration-700 will-change-transform group-hover:scale-105"
                />
              )}
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Bottom Bar: Title, Tags, Description, CTA */}
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-4 md:gap-8 items-end relative z-10">
              <div>
                <h3 className="font-display text-2xl md:text-4xl font-extrabold tracking-tight text-off-white group-hover:text-amber transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="font-body text-xs md:text-sm text-foreground/70 line-clamp-2 leading-relaxed mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md border border-white/10 bg-white/5 font-mono text-[10px] text-foreground/75 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-start md:justify-end gap-4 pt-2 md:pt-0">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-interactive
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-off-white text-charcoal font-mono font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-amber hover:text-charcoal transition-all duration-300"
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

        {/* Gallery Outro Callout */}
        <div className="w-[60vw] max-w-[380px] shrink-0 flex flex-col justify-center pl-4 pr-12">
          <span className="font-mono text-xs text-amber tracking-widest uppercase mb-2">
            NEXT STAGE
          </span>
          <h4 className="font-display text-3xl md:text-4xl font-bold text-off-white mb-4">
            DEEP ARCHITECTURAL DIVE
          </h4>
          <p className="font-body text-sm text-foreground/60 leading-relaxed mb-6">
            Continue scrolling to examine the technical problem, approach, build, and results of Nazara.
          </p>
          <div className="font-mono text-xs text-amber tracking-widest uppercase">
            ↓ SCROLL DOWN INTO CASE STUDY
          </div>
        </div>
      </div>
    </section>
  );
}

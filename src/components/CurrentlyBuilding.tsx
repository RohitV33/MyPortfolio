"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const ITEMS = [
  {
    n: "01",
    title: "CivicLens-AI",
    what: "Extending the computer vision pipeline — region heatmaps, multi-class issue clustering, and a FastAPI async queue for real-time civic telemetry.",
    tags: ["YOLOv8", "FastAPI", "Python"],
    live: true,
  },
  {
    n: "02",
    title: "Web Fuzzing Tool",
    what: "Hardening the concurrent scanner — fixing race conditions under high parallelism, adding structured JSON telemetry output for team-wide auditing.",
    tags: ["Node.js", "Security", "Socket.IO"],
    live: true,
  },
  {
    n: "03",
    title: "Bartr",
    what: "Final stretch — polishing the matchmaking UX, squashing edge cases in the real-time bid logic, and wiring up the production deploy pipeline.",
    tags: ["React", "Socket.IO", "MongoDB"],
    live: false,
  },
  {
    n: "04",
    title: "DSA & Systems",
    what: "Working through trees, graphs, and dynamic programming on LeetCode daily. Parallel reading on OS scheduling and DBMS concurrency internals.",
    tags: ["Java", "Python", "Algorithms"],
    live: true,
  },
];

export default function CurrentlyBuilding() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.fromTo(
        ".workshop-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".workshop-header",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate each row and its text scrub
      const rows = gsap.utils.toArray<HTMLElement>(".workshop-row");
      rows.forEach((row) => {
        const title = row.querySelector<HTMLElement>(".workshop-title");
        const tags = row.querySelector<HTMLElement>(".workshop-tags");
        const words = row.querySelectorAll<HTMLSpanElement>(".scrub-word");

        // Row title entrance
        if (title) {
          gsap.fromTo(
            title,
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: row,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Row tags entrance
        if (tags) {
          gsap.fromTo(
            tags,
            { y: 12, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: row,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Exact scroll-scrubbed text blur cascade:
        // 1. START (out of view): opacity 0.1, blur(5px)
        // 2. SCROLLING INTO VIEW: cascade in left-to-right to opacity 1, blur(0px)
        // 3. READING ZONE: holds sharp and readable
        // 4. SCROLLING PAST: cascade back out left-to-right to opacity 0.08, blur(4px)
        if (words.length > 0) {
          gsap.set(words, {
            opacity: 0.1,
            filter: "blur(5px)",
            willChange: "opacity, filter, transform",
          });

          const scrubTl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              end: "bottom 18%",
              scrub: 0.8,
            },
          });

          // Cascade in one-by-one, left to right
          scrubTl.to(words, {
            opacity: 1,
            filter: "blur(0px)",
            stagger: {
              each: 0.035,
              from: "start",
            },
            duration: 0.45,
            ease: "none",
          });

          // Sweet spot — stay sharp and readable while row is centered in view
          scrubTl.to({}, { duration: 0.35 });

          // Cascade back out one-by-one, left to right as row scrolls past
          scrubTl.to(words, {
            opacity: 0.08,
            filter: "blur(4px)",
            stagger: {
              each: 0.03,
              from: "start",
            },
            duration: 0.45,
            ease: "none",
          });
        }
      });
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="chapter-currently"
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0a] text-off-white py-20 md:py-32 px-6 sm:px-10 md:px-16 border-t border-white/5 overflow-hidden select-none"
    >
      {/* ── Header ── */}
      <div className="workshop-header max-w-7xl mx-auto w-full mb-14 md:mb-20">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="w-2 h-2 rounded-full bg-amber shadow-[0_0_10px_#F5A623] animate-pulse" />
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-amber font-semibold">
            CHAPTER 07 // CURRENTLY BUILDING
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <h2 className="font-akira text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-off-white uppercase leading-[0.9]">
            IN THE<br />
            <span className="text-amber">WORKSHOP.</span>
          </h2>
          <p className="font-body text-sm text-off-white/40 max-w-sm leading-relaxed font-light md:text-right">
            What&apos;s open in my editor right now — the messy, real, ongoing work.
          </p>
        </div>
      </div>

      {/* ── Editorial List ── */}
      <div className="max-w-7xl mx-auto w-full">
        {ITEMS.map((item) => (
          <div
            key={item.n}
            className="workshop-row group relative border-t border-white/[0.07] py-8 md:py-10 grid grid-cols-[auto_1fr] md:grid-cols-[80px_1fr_auto] gap-x-6 md:gap-x-10 gap-y-4 items-start hover:border-amber/20 transition-colors duration-300 cursor-default"
          >
            {/* Faded giant number watermark */}
            <span className="workshop-num font-akira text-5xl md:text-6xl font-black text-white/[0.05] group-hover:text-white/[0.12] transition-colors duration-500 leading-none pt-1 select-none row-span-2 md:row-span-1">
              {item.n}
            </span>

            {/* Title + scrubbed paragraph */}
            <div className="flex flex-col gap-3">
              <div className="workshop-title flex items-center gap-3">
                <h3 className="font-akira text-xl sm:text-2xl md:text-3xl font-black uppercase text-off-white group-hover:text-amber transition-colors duration-300 tracking-tight">
                  {item.title}
                </h3>
                {item.live && (
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                )}
              </div>

              {/* Scroll-scrubbed blur text */}
              <p
                className="font-body text-sm sm:text-base text-off-white/90 leading-relaxed font-light max-w-lg"
                style={{ wordSpacing: "0.05em" }}
              >
                {item.what.split(" ").map((word, wi) => (
                  <span
                    key={wi}
                    className="scrub-word inline-block mr-[0.28em]"
                    style={{
                      opacity: 0.1,
                      filter: "blur(5px)",
                      willChange: "opacity, filter, transform",
                      transform: "translateZ(0)",
                    }}
                  >
                    {word}
                  </span>
                ))}
              </p>
            </div>

            {/* Tags */}
            <div className="workshop-tags flex flex-wrap gap-x-2 gap-y-1 md:justify-end items-start col-start-2 md:col-start-3 pt-1">
              {item.tags.map((tag, ti) => (
                <span key={tag} className="flex items-center gap-2">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-off-white/25 group-hover:text-off-white/45 transition-colors duration-300">
                    {tag}
                  </span>
                  {ti < item.tags.length - 1 && (
                    <span className="font-mono text-[10px] text-white/10">/</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Bottom rule */}
        <div className="border-t border-white/[0.07]" />

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-off-white/15">
          ● Updated regularly — this is a live section.
        </p>
      </div>
    </section>
  );
}

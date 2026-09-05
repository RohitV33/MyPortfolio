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

// Split text into word spans for scrubbed blur animation
function ScrubText({ text, rowRef }: { text: string; rowRef: React.RefObject<HTMLDivElement | null> }) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const trigger = rowRef.current;
    if (!container || !trigger) return;

    gsap.registerPlugin(ScrollTrigger);

    const spans = container.querySelectorAll<HTMLSpanElement>(".scrub-word");

    // Set initial state
    gsap.set(spans, { opacity: 0.1, filter: "blur(5px)" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: "top 75%",
        end: "bottom 35%",
        scrub: 1.2,
      },
    });

    // Stagger words in
    tl.to(spans, {
      opacity: 1,
      filter: "blur(0px)",
      stagger: {
        each: 0.04,
        from: "start",
      },
      ease: "none",
    });

    // Then blur back out as section scrolls past
    tl.to(spans, {
      opacity: 0.08,
      filter: "blur(4px)",
      stagger: {
        each: 0.03,
        from: "start",
      },
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === trigger) st.kill();
      });
    };
  }, [rowRef]);

  const words = text.split(" ");

  return (
    <p
      ref={containerRef}
      className="font-body text-sm text-off-white/80 leading-relaxed font-light max-w-lg"
      style={{ wordSpacing: "0.05em" }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="scrub-word inline-block mr-[0.28em]"
        >
          {word}
        </span>
      ))}
    </p>
  );
}

export default function CurrentlyBuilding() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Entrance animation for each row's header (title + number)
      titleRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            delay: i * 0.07,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-currently"
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0a] text-off-white py-20 md:py-32 px-6 sm:px-10 md:px-16 border-t border-white/5 overflow-hidden select-none"
    >
      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto w-full mb-14 md:mb-20">
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
        {ITEMS.map((item, i) => {
          // create a stable ref for each row
          const rowRef = { current: rowRefs.current[i] } as React.RefObject<HTMLDivElement | null>;

          return (
            <div
              key={item.n}
              ref={(el) => {
                rowRefs.current[i] = el;
                (rowRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
              }}
              className="group relative border-t border-white/[0.07] py-8 md:py-10 grid grid-cols-[auto_1fr] md:grid-cols-[80px_1fr_auto] gap-x-6 md:gap-x-10 gap-y-4 items-start hover:border-amber/20 transition-colors duration-300 cursor-default"
            >
              {/* Faded giant number */}
              <span className="font-akira text-5xl md:text-6xl font-black text-white/[0.05] group-hover:text-white/[0.10] transition-colors duration-500 leading-none pt-1 select-none row-span-2 md:row-span-1">
                {item.n}
              </span>

              {/* Title + scrubbed paragraph */}
              <div
                ref={(el) => { titleRefs.current[i] = el; }}
                className="flex flex-col gap-3"
                style={{ opacity: 0 }}
              >
                <div className="flex items-center gap-3">
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
                <ScrubText
                  text={item.what}
                  rowRef={{ current: rowRefs.current[i] } as React.RefObject<HTMLDivElement | null>}
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-x-2 gap-y-1 md:justify-end items-start col-start-2 md:col-start-3 pt-1">
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
          );
        })}

        {/* Bottom rule */}
        <div className="border-t border-white/[0.07]" />

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-off-white/15">
          ● Updated regularly — this is a live section.
        </p>
      </div>
    </section>
  );
}

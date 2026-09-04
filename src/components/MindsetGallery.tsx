"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Sparkles, Eye, X, Quote, ArrowUpRight } from "lucide-react";

interface MindsetItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  tag: string;
  quote?: string;
  aspect?: string;
}

const MINDSET_ITEMS_ROW_1: MindsetItem[] = [
  {
    id: "mindset-1",
    image: "/images/mindset/workspace_desk.jpg",
    title: "DISCIPLINE CREATES FREEDOM",
    subtitle: "Late-night problem solving & focused engineering sessions.",
    tag: "ENVIRONMENT",
    quote: "Build ideas into reality through daily relentless consistency.",
  },
  {
    id: "mindset-2",
    image: "/images/mindset/coffee_code_mug.jpg",
    title: "GOOD IDEAS, BETTER CODE",
    subtitle: "Fueling continuous iteration and algorithmic craftsmanship.",
    tag: "RITUAL",
    quote: "A clear mind turns friction into elegant software architecture.",
  },
  {
    id: "mindset-3",
    image: "/images/mindset/developer_mountain.jpg",
    title: "BIGGER IDEAS, BRIGHTER TOMORROWS",
    subtitle: "Gaining perspective above the complexity of distributed systems.",
    tag: "VISION",
    quote: "Always keep sight of the human impact behind every system we engineer.",
  },
];

const MINDSET_ITEMS_ROW_2: MindsetItem[] = [
  {
    id: "mindset-4",
    image: "/images/mindset/neon_code_screen.jpg",
    title: "CONTINUOUS LEARNING LOOP",
    subtitle: "while (learning) { improve(); grow(); stayConsistent(); }",
    tag: "SYNTAX",
    quote: "Code refinement is a never-ending journey of deconstruction & mastery.",
  },
  {
    id: "mindset-5",
    image: "/images/mindset/notebook_goals.jpg",
    title: "SAME DREAMS, BIGGER PLANS",
    subtitle: "[✓] Learn • [✓] Build • [✓] Be Better • [✓] Keep Going",
    tag: "DISCIPLINE",
    quote: "Great software starts with deliberate handwritten intentions.",
  },
  {
    id: "mindset-6",
    image: "/images/mindset/books_philosophy.jpg",
    title: "A FOCUSED MIND",
    subtitle: "Better Code • Clear Design • Bigger Goals",
    tag: "PHILOSOPHY",
    quote: "Simplicity in design, robustness in code, resilience in mind.",
  },
];

export default function MindsetGallery() {
  const containerRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<MindsetItem | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Row 1: Drift left on scroll
      gsap.to(row1Ref.current, {
        x: "-18%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Row 2: Drift right on scroll
      gsap.to(row2Ref.current, {
        x: "18%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 md:py-36 bg-charcoal text-off-white select-none border-t border-white/5 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(245, 166, 35, 0.25) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 mb-8 sm:mb-12 md:mb-16 relative z-10">
        <div className="flex items-center gap-3 mb-2.5 sm:mb-3">
          <span className="w-2 h-2 rounded-full bg-amber" />
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-amber font-semibold">
            ATMOSPHERE // MINDSET &amp; CRAFT
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div>
            <h2 className="font-grotesk text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-off-white uppercase leading-[0.98]">
              BUILDING WITH <br />
              <span className="text-amber">INTENTION.</span>
            </h2>
            <p className="font-body text-xs sm:text-sm md:text-base font-light text-foreground/70 max-w-xl mt-2 sm:mt-4 leading-relaxed">
              A visual glimpse into the daily rituals, late-night debugging marathons, and principles that shape every line of software I write.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] md:text-xs text-foreground/45 uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-amber" />
            <span>SCROLL TO EXPLORE PARALLAX GALLERY</span>
          </div>
        </div>
      </div>

      {/* ── Scroll Parallax Track 1 (Drifts Left) ── */}
      <div className="relative w-full overflow-hidden mb-4 sm:mb-6 md:mb-8">
        <div
          ref={row1Ref}
          className="flex gap-4 sm:gap-6 md:gap-8 w-max will-change-transform pl-4 sm:pl-8 md:pl-16"
        >
          {MINDSET_ITEMS_ROW_1.map((item) => (
            <MindsetCard
              key={item.id}
              item={item}
              onSelect={() => setSelectedImage(item)}
            />
          ))}
          {/* Duplicate set for endless horizontal immersion */}
          {MINDSET_ITEMS_ROW_1.map((item) => (
            <MindsetCard
              key={`${item.id}-dup`}
              item={item}
              onSelect={() => setSelectedImage(item)}
            />
          ))}
        </div>
      </div>

      {/* ── Scroll Parallax Track 2 (Drifts Right) ── */}
      <div className="relative w-full overflow-hidden">
        <div
          ref={row2Ref}
          className="flex gap-4 sm:gap-6 md:gap-8 w-max will-change-transform -translate-x-[20%] pl-4 sm:pl-8 md:pl-16"
        >
          {MINDSET_ITEMS_ROW_2.map((item) => (
            <MindsetCard
              key={item.id}
              item={item}
              onSelect={() => setSelectedImage(item)}
            />
          ))}
          {/* Duplicate set for endless horizontal immersion */}
          {MINDSET_ITEMS_ROW_2.map((item) => (
            <MindsetCard
              key={`${item.id}-dup`}
              item={item}
              onSelect={() => setSelectedImage(item)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox / Full View Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 backdrop-blur-xl p-3 sm:p-6 md:p-8 transition-opacity duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-2xl lg:max-w-3xl w-full rounded-2xl md:rounded-3xl border border-white/20 bg-charcoal overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[4/3] max-h-[50vh] sm:max-h-[55vh] bg-black shrink-0">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                className="object-cover object-center"
              />
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-charcoal/80 border border-white/20 text-off-white flex items-center justify-center hover:bg-amber hover:text-charcoal transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 md:p-8 overflow-y-auto">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="font-mono text-[11px] sm:text-xs text-amber font-semibold tracking-widest uppercase">
                  {selectedImage.tag}
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] text-foreground/40">ROHIT VERMA // PORTFOLIO</span>
              </div>
              <h3 className="font-grotesk text-xl sm:text-2xl md:text-3xl font-extrabold text-off-white uppercase mb-2">
                {selectedImage.title}
              </h3>
              <p className="font-body text-xs sm:text-sm md:text-base text-foreground/70 leading-relaxed mb-4">
                {selectedImage.subtitle}
              </p>
              {selectedImage.quote && (
                <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 text-amber">
                  <Quote className="w-4 h-4 shrink-0 mt-0.5" />
                  {selectedImage.id === "mindset-5" ? (
                    <span className="font-handwriting text-xl sm:text-2xl text-amber font-bold leading-snug">
                      &ldquo;{selectedImage.quote}&rdquo;
                    </span>
                  ) : selectedImage.id === "mindset-4" ? (
                    <span className="font-mono text-xs sm:text-sm text-cyan-300 leading-relaxed">
                      {selectedImage.quote}
                    </span>
                  ) : (
                    <span className="font-serif italic text-sm sm:text-base text-off-white/90 leading-relaxed">
                      &ldquo;{selectedImage.quote}&rdquo;
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function MindsetCard({
  item,
  onSelect,
}: {
  item: MindsetItem;
  onSelect: () => void;
}) {
  return (
    <article
      onClick={onSelect}
      className="group relative w-[260px] sm:w-[340px] md:w-[420px] aspect-[4/3] rounded-2xl md:rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:border-amber/50 hover:shadow-2xl hover:-translate-y-1.5 shrink-0"
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width: 640px) 260px, (max-width: 1024px) 340px, 420px"
        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />

      {/* Cinematic dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/45 to-transparent pointer-events-none opacity-85 group-hover:opacity-95 transition-opacity" />

      {/* Top Floating Badge */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
        <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-white/15 bg-charcoal/70 backdrop-blur-md font-mono text-[9px] sm:text-[10px] text-amber uppercase tracking-wider font-semibold">
          {item.tag}
        </span>
      </div>

      {/* Top Right Quick Inspect Icon */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/15 bg-charcoal/70 backdrop-blur-md text-off-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Eye className="w-3.5 h-3.5 text-amber" />
      </div>

      {/* Bottom Content Metadata with Contextual Typography */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 z-10 flex flex-col justify-end">
        <h4 className="font-grotesk text-base sm:text-lg md:text-xl font-extrabold text-off-white tracking-tight uppercase group-hover:text-amber transition-colors mb-1 leading-snug">
          {item.title}
        </h4>

        {/* Context-aware Subtitle */}
        {item.id === "mindset-5" ? (
          <p className="font-handwriting text-lg sm:text-xl text-amber font-bold leading-tight">
            {item.subtitle}
          </p>
        ) : item.id === "mindset-4" ? (
          <p className="font-mono text-[10px] sm:text-[11px] text-cyan-300/90 leading-tight">
            {item.subtitle}
          </p>
        ) : item.id === "mindset-3" ? (
          <p className="font-serif italic text-xs sm:text-sm text-foreground/80 leading-snug">
            {item.subtitle}
          </p>
        ) : (
          <p className="font-body text-xs sm:text-sm text-foreground/75 line-clamp-2 leading-relaxed">
            {item.subtitle}
          </p>
        )}

        <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-foreground/50 uppercase tracking-wider">
          <span>CLICK TO EXPAND</span>
          <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </article>
  );
}

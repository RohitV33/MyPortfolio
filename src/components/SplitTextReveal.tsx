"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface SplitTextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export default function SplitTextReveal({
  children,
  className = "",
  as: Tag = "h2",
  delay = 0,
  stagger = 0.03,
  once = true,
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll(".split-char");
    if (!chars.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 40,
          rotateX: -90,
          transformOrigin: "bottom center",
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger,
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: once ? "play none none none" : "play reverse play reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, stagger, once]);

  // Split text into words, then chars
  const words = children.split(" ");

  return (
    <Tag
      ref={containerRef as unknown as React.RefObject<HTMLHeadingElement>}
      className={`${className} overflow-hidden`}
      style={{ perspective: "600px" }}
      aria-label={children}
    >
      <span aria-hidden="true" className="contents">
        {words.map((word, wi) => (
          <span key={wi} className="inline-block mr-[0.22em] last:mr-0">
            {word.split("").map((char, ci) => (
              <span
                key={`${wi}-${ci}`}
                className="split-char inline-block"
                style={{ opacity: 0 }}
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </span>
    </Tag>
  );
}

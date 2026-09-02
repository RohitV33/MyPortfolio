"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    // Only run on non-touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Smooth lerp loop
    const ticker = () => {
      currentX += (mouseX - currentX) * 0.18;
      currentY += (mouseY - currentY) * 0.18;
      gsap.set(cursor, {
        x: currentX,
        y: currentY,
      });
    };

    gsap.ticker.add(ticker);

    // Event delegation for project hover or links
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectCard = target.closest("[data-cursor-project]");
      const interactive = target.closest("a, button, [role='button'], [data-cursor-interactive]");

      if (projectCard) {
        setIsHovered(true);
        setCursorText("VIEW");
      } else if (interactive) {
        setIsHovered(true);
        setCursorText("");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mouseover", handleElementHover);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleElementHover);
      gsap.ticker.remove(ticker);
    };
  }, [isVisible]);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999] rounded-full flex items-center justify-center transition-[width,height,background-color,border-color,opacity] duration-300 ease-out will-change-transform ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${
        cursorText === "VIEW"
          ? "w-20 h-20 bg-amber/90 text-charcoal backdrop-blur-md border border-amber"
          : isHovered
          ? "w-10 h-10 bg-off-white/20 border border-off-white/40 backdrop-blur-xs"
          : "w-3 h-3 bg-amber"
      }`}
    >
      <span
        ref={textRef}
        className={`font-mono font-bold text-[10px] tracking-[0.2em] transition-opacity duration-200 ${
          cursorText ? "opacity-100" : "opacity-0 scale-75"
        }`}
      >
        {cursorText}
      </span>
    </div>
  );
}

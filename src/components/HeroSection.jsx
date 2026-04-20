// components/HeroSection.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(".hero-tag", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
      .fromTo(".hero-word", { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.1, duration: 0.9, ease: "power4.out" }, "-=0.3")
      .fromTo(subRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
      .fromTo(lineRef.current, { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 1.2, ease: "expo.out" }, "-=0.6")
      .fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.5");
  }, []);

  const words = ["Full", "Stack", "Developer"];

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-8 md:px-20 pt-24"
      style={{ borderBottom: "1px solid var(--border)" }}>

      <span className="hero-tag font-mono text-sm tracking-widest mb-6" style={{ color: "var(--accent)" }}>
        — Available for work
      </span>

      <h1 className="font-display font-extrabold leading-none mb-6 overflow-hidden"
        style={{ fontSize: "clamp(3rem, 10vw, 9rem)", lineHeight: 1.0 }}>
        {words.map(word => (
          <span key={word} className="inline-block overflow-hidden mr-[0.2em]">
            <span className="hero-word inline-block">{word}</span>
          </span>
        ))}
      </h1>

      <div ref={lineRef} className="h-px mb-8" style={{ background: "var(--border)", width: "60%" }} />

      <p ref={subRef} className="text-lg mb-12 max-w-xl" style={{ color: "var(--muted)", lineHeight: 1.7 }}>
        I craft performant, scalable web applications — from database to deployment.
        Currently open to full-time roles and freelance projects.
      </p>

      <div ref={ctaRef} className="flex gap-4">
        <a href="#projects"
          className="px-7 py-3.5 font-display font-bold text-sm tracking-wider uppercase transition-all hover:opacity-80"
          style={{ background: "var(--accent)", color: "#0a0a0a", borderRadius: "2px" }}>
          View Projects
        </a>
        <a href="#contact"
          className="px-7 py-3.5 font-display font-bold text-sm tracking-wider uppercase transition-all hover:opacity-80"
          style={{ border: "1px solid var(--border)", borderRadius: "2px" }}>
          Get in Touch
        </a>
      </div>

      {/* Floating scroll indicator */}
      <div className="absolute bottom-10 right-10 font-mono text-xs tracking-widest"
        style={{ color: "var(--muted)", writingMode: "vertical-rl" }}>
        scroll down ↓
      </div>
    </section>
  );
}
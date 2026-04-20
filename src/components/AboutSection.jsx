// components/AboutSection.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const elements = containerRef.current.querySelectorAll(".about-reveal");
    gsap.fromTo(elements,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
      }
    );
  }, []);

  return (
    <section id="about" ref={containerRef}
      className="py-32 px-8 md:px-20 grid md:grid-cols-2 gap-20 items-center"
      style={{ borderTop: "1px solid var(--border)" }}>

      <div>
        <div className="flex items-center gap-4 mb-4 about-reveal">
          <span className="h-px w-12" style={{ background: "var(--accent)" }} />
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent)" }}>About me</span>
        </div>
        <h2 className="font-display font-extrabold mb-6 about-reveal"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}>
          Building the web, end to end.
        </h2>
        <p className="text-base leading-relaxed about-reveal" style={{ color: "var(--muted)", maxWidth: "480px" }}>
          I'm a full-stack developer with 4+ years of experience building production-grade applications.
          I specialize in React, Node.js, and cloud infrastructure. I care deeply about performance,
          clean architecture, and user experience.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Projects Shipped", value: "30+" },
          { label: "Years Experience", value: "4+" },
          { label: "Technologies", value: "20+" },
          { label: "Happy Clients", value: "15+" },
        ].map(stat => (
          <div key={stat.label} className="about-reveal p-6"
            style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "4px" }}>
            <span className="font-display font-extrabold text-4xl" style={{ color: "var(--accent)" }}>
              {stat.value}
            </span>
            <p className="font-mono text-xs mt-2 tracking-wide" style={{ color: "var(--muted)" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
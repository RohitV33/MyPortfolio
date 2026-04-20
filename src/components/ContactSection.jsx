// components/ContactSection.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const ref = useRef(null);

  useEffect(() => {
    const els = ref.current.querySelectorAll(".contact-reveal");
    gsap.fromTo(els,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" }
      }
    );
  }, []);

  return (
    <section id="contact" ref={ref}
      className="py-32 px-8 md:px-20 text-center"
      style={{ borderTop: "1px solid var(--border)" }}>

      <span className="font-mono text-xs tracking-widest uppercase contact-reveal"
        style={{ color: "var(--accent)" }}>
        Let's work together
      </span>

      <h2 className="font-display font-extrabold my-6 contact-reveal"
        style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)", lineHeight: 1.0 }}>
        Got a project?
      </h2>

      <p className="text-base max-w-lg mx-auto mb-10 contact-reveal" style={{ color: "var(--muted)" }}>
        I'm currently open to new opportunities. Whether it's a freelance project or a full-time role, let's talk.
      </p>

      <a href="mailto:you@email.com"
        className="contact-reveal inline-block px-10 py-4 font-display font-bold text-sm tracking-wider uppercase transition-all hover:opacity-80"
        style={{ background: "var(--accent)", color: "#0a0a0a", borderRadius: "2px" }}>
        Say Hello →
      </a>
    </section>
  );
}
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Hero from "@/components/Hero";
import ProjectShowcase from "@/components/ProjectShowcase";
import Link from "next/link";

export default function HomePage() {
  const introRef = useRef<HTMLDivElement>(null);
  const credoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // ─── Intro Section Animations ───
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 70%",
        }
      });

      introTl.fromTo(
        introRef.current?.querySelectorAll(".reveal-text") || [],
        { y: 100, rotateX: -30, opacity: 0 },
        { y: 0, rotateX: 0, opacity: 1, duration: 1.5, stagger: 0.1, ease: "expo.out" }
      ).fromTo(
        introRef.current?.querySelector(".decorative-line") as HTMLElement | null,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 2, ease: "power4.out" },
        "-=1"
      );

      // ─── Credo Section Animations ───
      gsap.fromTo(
        credoRef.current?.querySelectorAll(".credo-line") || [],
        { y: 50, opacity: 0, filter: "blur(20px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: credoRef.current,
            start: "top 75%",
          }
        }
      );

      // Parallax on credo background
      gsap.to(".credo-bg-text", {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: credoRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      // ─── CTA Section Animations ───
      gsap.fromTo(
        ctaRef.current,
        { scale: 0.95, opacity: 0, filter: "blur(10px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-background">
      <Hero />

      {/* ─── Intro Section ─── */}
      <section 
        ref={introRef}
        className="relative py-48 px-8 md:px-24 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="perspective-1000">
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent mb-8">
              Protocol // Philosophy
            </p>
            <h2 className="reveal-text font-display text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.9] tracking-tighter text-foreground mb-12">
              Motion is the <br />
              <span className="text-accent italic font-light">Medium.</span>
            </h2>
            <div className="decorative-line h-px w-full bg-accent/20 origin-left" />
          </div>
          
          <div className="pt-12 lg:pt-32">
            <p className="reveal-text font-body text-xl md:text-2xl font-light text-foreground/60 leading-relaxed mb-10">
              I work at the intersection of narrative and code — building interfaces that move with the unhurried cadence of breath. Inspired by cinematic atmospheric light, I believe every scroll and hover can carry emotional weight.
            </p>
            <Link 
              href="/about"
              className="group inline-flex items-center gap-4 font-mono text-[11px] tracking-[0.3em] uppercase text-foreground"
            >
              Explore the story
              <div className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-[#0D0D0D]">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M9 3l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <ProjectShowcase />

      {/* ─── Credo Section ─── */}
      <section 
        ref={credoRef}
        className="relative py-64 px-8 overflow-hidden bg-background text-foreground"
      >
        {/* Background Large Text */}
        <div className="credo-bg-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[25vw] font-bold leading-none pointer-events-none opacity-[0.03] whitespace-nowrap uppercase">
          Precision Poetry
        </div>

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="mb-12">
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-foreground/40">
              Core Beliefs // 001
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="credo-line font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[1.1] tracking-tight italic">
              {"\"The space between moments"}
            </h3>
            <h3 className="credo-line font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[1.1] tracking-tight italic text-foreground/30">
              {"is where experience lives.\""}
            </h3>
          </div>

          <div className="mt-24 flex flex-col items-center gap-8">
            <div className="w-px h-24 bg-gradient-to-b from-foreground/20 to-transparent" />
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-foreground/40 max-w-xs">
              Every detail is a deliberate choice. Every motion is a conversation.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-48 px-8 md:px-24">
        <div 
          ref={ctaRef}
          className="max-w-7xl mx-auto rounded-[48px] overflow-hidden relative group p-12 md:p-24"
          style={{ background: "var(--charcoal)" }}
        >
          {/* Animated background decoration */}
          <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[100%] rounded-full bg-accent blur-[120px] transition-transform duration-1000 group-hover:scale-125" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[80%] rounded-full bg-accent-muted blur-[100px] transition-transform duration-1000 group-hover:scale-110" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-center">
            <div>
              <p className="font-mono text-[11px] tracking-[0.4em] uppercase text-accent mb-8">
                Transmission // Open for collaboration
              </p>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.9] tracking-tighter text-off-white">
                Ready to build something <br />
                <span className="text-accent italic font-light">Quietly Powerful?</span>
              </h2>
            </div>
            
            <div className="flex flex-col items-start gap-8">
              <Link 
                href="/contact"
                className="group relative inline-flex items-center gap-6 px-12 py-6 rounded-full bg-off-white text-charcoal font-mono font-bold text-[12px] tracking-[0.2em] uppercase transition-all duration-500 hover:bg-accent hover:text-[#0D0D0D]"
              >
                Send a Message
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-500 group-hover:translate-x-2">
                  <path d="M1 7h12M9 3l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <div className="flex items-center gap-4 pl-4 font-mono text-[10px] tracking-[0.2em] uppercase text-off-white/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Q3 2024
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-24 px-8 md:px-24 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="h-px w-full bg-border-subtle mb-16" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/30">
            <div className="flex items-center gap-12">
              <span>© 2024 Rohit Verma</span>
              <span>Built with Precision & Poetry</span>
            </div>
            <div className="flex items-center gap-8">
              <a href="#" className="hover:text-accent transition-colors">GitHub</a>
              <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-accent transition-colors">X / Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

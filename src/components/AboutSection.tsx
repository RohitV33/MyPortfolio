"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { EDUCATION_DATA, MILESTONES_DATA, EXPERIENCES_DATA } from "@/data/portfolioData";
import { GraduationCap, Award, Compass } from "lucide-react";
import SplitTextReveal from "@/components/SplitTextReveal";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Profile card entrance
      if (profileRef.current) {
        gsap.fromTo(
          profileRef.current,
          { y: 60, opacity: 0, rotateY: -8 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: profileRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Timeline items staggered entrance
      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll(".timeline-item");
        gsap.fromTo(
          items,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Milestone cards
      const milestoneCards = gsap.utils.toArray<HTMLElement>(".milestone-card");
      milestoneCards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-about"
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 md:py-36 bg-charcoal text-off-white select-none border-t border-white/5 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Chapter Header */}
        <div className="flex items-center gap-3 mb-3">
          <span className="w-2 h-2 rounded-full bg-amber" />
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-amber">
            CHAPTER 06 - ABOUT
          </p>
        </div>

        {/* Large Editorial Statement */}
        <div className="mb-10 sm:mb-12 md:mb-16">
          <SplitTextReveal
            as="h2"
            className="font-grotesk text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-off-white uppercase leading-[0.98] mb-4 sm:mb-6"
          >
            BEHIND THE CODE.
          </SplitTextReveal>
          <p className="font-serif italic font-normal text-lg sm:text-2xl md:text-3xl text-off-white/90 max-w-2xl leading-relaxed tracking-tight">
            &ldquo;I&apos;m Rohit Verma — a Computer Science &amp; Engineering student who enjoys turning ideas into useful digital experiences.&rdquo;
          </p>
        </div>

        {/* Grid: Left Editorial Portrait / Profile Showcase, Right Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* LEFT: Editorial Profile / Portrait Representation with Holographic Effect */}
          <div
            ref={profileRef}
            className="lg:col-span-5 holo-card rounded-2xl sm:rounded-3xl bg-white/[0.02] p-6 sm:p-8 md:p-10 backdrop-blur-md flex flex-col justify-between shadow-2xl"
            style={{ perspective: "800px" }}
          >
            {/* Ambient amber backdrop glow */}
            <div
              aria-hidden="true"
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-amber/20 blur-3xl pointer-events-none z-0"
            />

            <div className="relative z-10">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-white/15 bg-white/[0.04] flex items-center justify-center font-grotesk font-extrabold text-3xl sm:text-4xl text-amber mb-6 sm:mb-8 shadow-inner relative overflow-hidden">
                RV
                {/* Breathing glow pulse */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, rgba(245,166,35,0.2) 0%, transparent 70%)",
                    animation: "breathingGlow 3s ease-in-out infinite",
                  }}
                />
              </div>
              <h3 className="font-grotesk text-2xl sm:text-3xl font-bold text-off-white mb-2">
                Rohit Verma
              </h3>
              <p className="font-mono text-[11px] sm:text-xs text-amber uppercase tracking-widest mb-4 sm:mb-6">
                Full-Stack Engineer • KIET &apos;27
              </p>
              <p className="font-body text-sm text-foreground/70 leading-relaxed mb-6">
                Based in Ghaziabad, Uttar Pradesh, India, I engineer web architectures from interface to database. Driven by computational curiosity, minimal design aesthetics, and a deep appreciation for software that solves tangible human friction.
              </p>
            </div>

            <div className="border-t border-white/10 pt-6 space-y-3 font-mono text-xs text-foreground/50 relative z-10">
              <div className="flex justify-between">
                <span>LOCATION</span>
                <span className="text-off-white">Ghaziabad, Uttar Pradesh, India</span>
              </div>
              <div className="flex justify-between">
                <span>DEGREE</span>
                <span className="text-off-white">B.Tech in CSE</span>
              </div>
              <div className="flex justify-between">
                <span>AVAILABILITY</span>
                <span className="text-emerald-400 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  Open for Collaborations
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Education & Milestones Timeline */}
          <div ref={timelineRef} className="lg:col-span-7 flex flex-col gap-14">
            {/* Education Track */}
            <div>
              <div className="flex items-center gap-2.5 mb-8">
                <GraduationCap className="w-4 h-4 text-amber" />
                <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-off-white font-semibold">
                  EDUCATION TIMELINE
                </h4>
              </div>

              <div className="space-y-8 border-l border-white/10 pl-6 ml-2">
                {EDUCATION_DATA.map((edu, idx) => (
                  <div key={idx} className="timeline-item relative group">
                    <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-amber/40 border border-charcoal group-hover:bg-amber group-hover:scale-125 transition-all duration-300" />
                    <span className="font-mono text-[10px] text-amber tracking-widest block mb-1">
                      {edu.year}
                    </span>
                    <h5 className="font-display text-lg md:text-xl font-bold text-off-white">
                      {edu.degree}
                    </h5>
                    <p className="font-body text-sm text-foreground/60 mt-0.5">
                      {edu.institution}
                    </p>
                    {edu.score && (
                      <span className="inline-block mt-2 font-mono text-[11px] text-foreground/50 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-md">
                        {edu.score}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Milestones */}
            <div>
              <div className="flex items-center gap-2.5 mb-8">
                <Award className="w-4 h-4 text-amber" />
                <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-off-white font-semibold">
                  ACCREDITATION &amp; MILESTONES
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MILESTONES_DATA.map((item, idx) => (
                  <div
                    key={idx}
                    className="milestone-card p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-amber/30 hover:bg-white/[0.04] transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-amber">
                        {item.category}
                      </span>
                      <span className="font-mono text-[10px] text-foreground/40">
                        {item.year}
                      </span>
                    </div>
                    <h5 className="font-display text-sm md:text-base font-bold text-off-white mb-1 group-hover:text-amber transition-colors duration-300">
                      {item.title}
                    </h5>
                    <p className="font-mono text-xs text-foreground/45 mb-2">
                      {item.issuer}
                    </p>
                    <p className="font-body text-xs text-foreground/60 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience & Hackathons Track */}
            {EXPERIENCES_DATA.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full border border-amber/30 bg-amber/10 flex items-center justify-center text-amber">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/50">Track 03</h3>
                    <p className="font-heading font-black text-lg text-off-white uppercase">Experience &amp; Hackathons</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {EXPERIENCES_DATA.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:border-amber/30 hover:bg-white/[0.04] transition-all duration-300 relative group"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="font-heading font-bold text-sm text-off-white group-hover:text-amber transition-colors">
                          {item.role}
                        </span>
                        <div className="flex items-center gap-2">
                          {item.badge && (
                            <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber/10 border border-amber/30 text-amber">
                              {item.badge}
                            </span>
                          )}
                          <span className="font-mono text-[10px] text-foreground/40">{item.year}</span>
                        </div>
                      </div>
                      <p className="font-mono text-xs text-amber/80 mb-1">
                        {item.organization}
                      </p>
                      <p className="font-body text-xs text-foreground/60 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Action Links */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/[0.03] hover:border-amber hover:text-amber text-xs font-mono uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] shadow-sm"
              >
                <span>Read Full Story</span>
                <span className="text-amber">↗</span>
              </Link>
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber text-charcoal font-mono font-bold text-xs uppercase tracking-wider hover:bg-off-white transition-all duration-300 hover:scale-[1.02] shadow-[0_0_20px_rgba(245,166,35,0.2)]"
              >
                <span>View Complete CV</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes breathingGlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
}

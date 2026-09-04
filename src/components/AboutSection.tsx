"use client";

import { EDUCATION_DATA, MILESTONES_DATA } from "@/data/portfolioData";
import { GraduationCap, Award, Compass } from "lucide-react";

export default function AboutSection() {
  return (
    <section
      id="chapter-about"
      className="relative w-full min-h-screen py-24 md:py-36 bg-charcoal text-off-white select-none border-t border-white/5 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Chapter Header */}
        <div className="flex items-center gap-3 mb-3">
          <span className="w-2 h-2 rounded-full bg-amber" />
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-amber">
            CHAPTER 07 // ABOUT
          </p>
        </div>

        {/* Large Editorial Statement */}
        <div className="mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-off-white uppercase leading-[0.95] mb-6">
            BEHIND THE <br />
            <span className="text-amber">CODE.</span>
          </h2>
          <p className="font-body text-base md:text-xl font-light text-foreground/80 max-w-2xl leading-relaxed tracking-tight">
            &ldquo;I&apos;m Rohit Verma — a Computer Science &amp; Engineering student who enjoys turning ideas into useful digital experiences.&rdquo;
          </p>
        </div>

        {/* Grid: Left Editorial Portrait / Profile Showcase, Right Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Editorial Profile / Portrait Representation */}
          <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10 backdrop-blur-md flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Ambient amber backdrop glow */}
            <div
              aria-hidden="true"
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-amber/20 blur-3xl pointer-events-none"
            />

            <div>
              <div className="w-24 h-24 rounded-2xl border border-white/15 bg-white/[0.04] flex items-center justify-center font-display font-extrabold text-4xl text-amber mb-8 shadow-inner">
                RV
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-off-white mb-2">
                Rohit Verma
              </h3>
              <p className="font-mono text-xs text-amber uppercase tracking-widest mb-6">
                Full-Stack Engineer • KIET &apos;27
              </p>
              <p className="font-body text-sm text-foreground/70 leading-relaxed mb-6">
                Based in India, I engineer web architectures from interface to database. Driven by computational curiosity, minimal design aesthetics, and a deep appreciation for software that solves tangible human friction.
              </p>
            </div>

            <div className="border-t border-white/10 pt-6 space-y-3 font-mono text-xs text-foreground/50">
              <div className="flex justify-between">
                <span>LOCATION</span>
                <span className="text-off-white">Delhi-NCR, India</span>
              </div>
              <div className="flex justify-between">
                <span>DEGREE</span>
                <span className="text-off-white">B.Tech in CSE</span>
              </div>
              <div className="flex justify-between">
                <span>AVAILABILITY</span>
                <span className="text-emerald-400">Open for Collaborations</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Education & Milestones Timeline */}
          <div className="lg:col-span-7 flex flex-col gap-14">
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
                  <div key={idx} className="relative group">
                    <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-amber/40 border border-charcoal group-hover:bg-amber transition-colors" />
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
                    className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-amber/30 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-amber">
                        {item.category}
                      </span>
                      <span className="font-mono text-[10px] text-foreground/40">
                        {item.year}
                      </span>
                    </div>
                    <h6 className="font-display text-sm md:text-base font-bold text-off-white mb-1">
                      {item.title}
                    </h6>
                    <p className="font-mono text-[10px] text-foreground/45 mb-2">
                      {item.issuer}
                    </p>
                    <p className="font-body text-xs text-foreground/60 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Placeholder for Upcoming Experiences / Hackathons */}
            <div className="p-5 rounded-2xl border border-dashed border-white/10 text-foreground/40 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber/60" />
                <span>EXPERIENCE &amp; HACKATHONS</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-amber/70">
                ACTIVE / IN PURSUIT
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

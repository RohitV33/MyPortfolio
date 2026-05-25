"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

export default function ResumePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );

      // Section reveal animation
      const sections = sectionsRef.current?.querySelectorAll(".resume-section");
      if (sections) {
        gsap.fromTo(
          sections,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: sectionsRef.current,
              start: "top 80%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const experiences = [
    {
      company: "Creative Studio",
      role: "Senior Creative Developer",
      period: "2022 — Present",
      description: "Leading the development of high-end immersive web experiences for global brands. Focusing on performance, motion design, and cutting-edge frontend technologies.",
      skills: ["Next.js", "GSAP", "Three.js", "Framer Motion"],
    },
    {
      company: "Digital Agency X",
      role: "Frontend Developer",
      period: "2020 — 2022",
      description: "Developed responsive and interactive web applications. Collaborated closely with designers to implement pixel-perfect interfaces.",
      skills: ["React", "TypeScript", "Tailwind CSS", "Redux"],
    },
    {
      company: "Tech Start-up Y",
      role: "Junior Web Developer",
      period: "2018 — 2020",
      description: "Built and maintained various client websites and internal tools. Gained experience in full-stack development and agile methodologies.",
      skills: ["JavaScript", "HTML/CSS", "Node.js", "MongoDB"],
    },
  ];

  const education = [
    {
      institution: "University of Design & Tech",
      degree: "B.Sc. in Computer Science",
      period: "2014 — 2018",
    },
  ];

  const skillGroups = [
    { category: "Design", items: ["UI/UX Design", "Motion Design", "Visual Storytelling", "Prototyping"] },
    { category: "Development", items: ["React / Next.js", "TypeScript", "GSAP / Framer Motion", "WebGL / Three.js"] },
    { category: "Tools", items: ["Figma", "Adobe Creative Cloud", "VS Code", "Git / GitHub"] },
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-background relative overflow-hidden" ref={containerRef}>
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-30">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full blur-[120px] bg-sky-dusk/20" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[50%] rounded-full blur-[100px] bg-warm-stone/20" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header ref={headerRef} className="mb-20 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-3 py-1 rounded-full bg-ink-deep text-warm-cream text-[10px] font-mono tracking-[0.2em] uppercase mb-6"
          >
            Curriculum Vitae
          </motion.div>
          <h1 className="font-display text-5xl md:text-7xl font-light text-ink-deep mb-4 leading-tight">
            Rohit <span className="italic text-ink-light">Verma</span>
          </h1>
          <p className="font-body text-xl text-ink-mid font-light max-w-2xl mb-8">
            Creative Developer & Designer specializing in building cinematic digital experiences where motion meets narrative.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-mono tracking-wide text-ink-light">
            <a href="mailto:rohitverma@example.com" className="hover:text-ink-deep transition-colors">rohitverma@example.com</a>
            <span className="opacity-30">|</span>
            <span>India, IN</span>
            <span className="opacity-30">|</span>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-ink-deep transition-colors">GitHub</a>
          </div>
        </header>

        <div ref={sectionsRef} className="space-y-24">
          {/* Experience Section */}
          <section className="resume-section">
            <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-ink-light mb-12 flex items-center gap-4">
              <span>01. Experience</span>
              <div className="h-px flex-1 bg-gradient-to-r from-warm-stone/30 to-transparent" />
            </h2>
            <div className="space-y-16">
              {experiences.map((exp, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-12 group">
                  <div className="font-mono text-xs text-ink-light pt-1">
                    {exp.period}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-medium text-ink-deep mb-2 group-hover:text-ink-mid transition-colors">
                      {exp.role}
                    </h3>
                    <p className="font-body text-sm font-semibold text-warm-stone tracking-widest uppercase mb-4">
                      {exp.company}
                    </p>
                    <p className="font-body text-base text-ink-light leading-relaxed mb-6">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 rounded-full bg-warm-sand/20 border border-warm-sand/30 text-[10px] font-mono text-ink-mid">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section className="resume-section">
            <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-ink-light mb-12 flex items-center gap-4">
              <span>02. Expertise</span>
              <div className="h-px flex-1 bg-gradient-to-r from-warm-stone/30 to-transparent" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {skillGroups.map((group, i) => (
                <div key={i}>
                  <h3 className="font-display text-lg font-medium text-ink-deep mb-6 italic">
                    {group.category}
                  </h3>
                  <ul className="space-y-3">
                    {group.items.map((skill) => (
                      <li key={skill} className="flex items-center gap-3 font-body text-sm text-ink-light">
                        <span className="w-1 h-1 rounded-full bg-warm-stone" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section className="resume-section">
            <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-ink-light mb-12 flex items-center gap-4">
              <span>03. Education</span>
              <div className="h-px flex-1 bg-gradient-to-r from-warm-stone/30 to-transparent" />
            </h2>
            <div className="space-y-12">
              {education.map((edu, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-12">
                  <div className="font-mono text-xs text-ink-light pt-1">
                    {edu.period}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-medium text-ink-deep mb-2">
                      {edu.degree}
                    </h3>
                    <p className="font-body text-base text-ink-light">
                      {edu.institution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Download CTA */}
          <section className="resume-section pt-12 pb-24 text-center">
            <div className="inline-block p-[1px] rounded-2xl bg-gradient-to-br from-warm-stone/40 via-ink-deep/5 to-warm-stone/40">
              <div className="bg-background rounded-2xl px-12 py-10">
                <h3 className="font-display text-2xl font-light text-ink-deep mb-6">
                  Need a offline version?
                </h3>
                <a
                  href="/cv.pdf"
                  download
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-ink-deep text-warm-cream font-mono text-xs tracking-widest uppercase transition-all duration-500 hover:scale-105 hover:shadow-xl"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a2 2 0 002 2h12 a2 2 0 002-2v-1M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Download PDF
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer link back */}
      <footer className="max-w-4xl mx-auto border-t border-warm-stone/20 pt-12 flex justify-between items-center text-[10px] font-mono tracking-widest uppercase text-ink-light">
        <span>© 2024 Rohit Verma</span>
        <a href="/" className="hover:text-ink-deep transition-colors">Back to Home</a>
      </footer>
    </main>
  );
}

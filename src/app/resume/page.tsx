"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";

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
      company: "Freelance",
      role: "Freelance Video Editor",
      period: "2024 — Present",
      description: "Delivering high-quality client video projects using DaVinci Resolve and After Effects. Creating engaging digital narratives, visual effects, and post-production assets.",
      skills: ["DaVinci Resolve", "After Effects", "Motion Design", "Video Editing"],
    },
    {
      company: "Innotech 2024",
      role: "Social Content Creator",
      period: "2024",
      description: "Managed social media content creation and audience engagement strategies. Promoted technological innovations and campus tech activities through digital content creation.",
      skills: ["Content Creation", "Public Relations", "Digital Media", "Audience Engagement"],
    },
  ];

  const education = [
    {
      institution: "KIET Group of Institutions, Ghaziabad",
      degree: "Bachelor of Technology (B.Tech) in Computer Science and Engineering",
      period: "2023 — 2027",
      details: "CGPA: 7.5 / 10",
    },
    {
      institution: "Scottish International School",
      degree: "Senior Secondary (Class XII)",
      period: "2022",
      details: "Score: 86.2%",
    },
    {
      institution: "Silver Bells Public School",
      degree: "Secondary (Class X)",
      period: "2020",
      details: "Score: 85.6%",
    },
  ];

  const skillGroups = [
    { category: "Languages", items: ["Java", "JavaScript", "Python", "SQL", "C"] },
    { category: "Web & Backend", items: ["HTML", "CSS", "React.js", "Tailwind CSS", "Node.js", "Express.js"] },
    { category: "Databases & Tools", items: ["MongoDB", "MySQL", "Git & GitHub", "VS Code", "IntelliJ IDEA", "Postman"] },
    { category: "Core CS", items: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems"] },
  ];

  const certifications = [
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services (AWS)",
      date: "Feb 2026",
    },
    {
      title: "SQL (Intermediate)",
      issuer: "HackerRank",
      date: "Nov 2025",
    },
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
            className="inline-block px-3 py-1 rounded-full bg-accent-muted text-accent text-[10px] font-mono tracking-[0.2em] uppercase mb-6"
          >
            Curriculum Vitae
          </motion.div>
          <h1 className="font-display text-4xl sm:text-6xl md:text-8xl font-bold text-foreground mb-4 leading-tight">
            Rohit <span className="italic text-accent font-light">Verma</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-foreground/60 font-light max-w-2xl mb-8">
            Full Stack Developer & B.Tech Computer Science student specializing in building high-performance digital systems and clean visual interfaces.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-6 text-xs sm:text-sm font-mono tracking-wide text-foreground/50">
            <a href="mailto:verma61421st@gmail.com" className="hover:text-accent transition-colors">verma61421st@gmail.com</a>
            <span className="opacity-30">|</span>
            <span>Shamli, UP, IN</span>
            <span className="opacity-30">|</span>
            <a href="https://github.com/RohitV33" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">GitHub</a>
            <span className="opacity-30">|</span>
            <a href="https://linkedin.com/in/rawhit01" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>
            <span className="opacity-30">|</span>
            <a href="https://leetcode.com/u/rohit6142/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LeetCode</a>
          </div>
        </header>

        <div ref={sectionsRef} className="space-y-24">
          {/* Education Section */}
          <section className="resume-section">
            <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-12 flex items-center gap-4">
              <span>01. Education</span>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent" />
            </h2>
            <div className="space-y-12">
              {education.map((edu, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-12">
                  <div className="font-mono text-xs text-foreground/45 pt-1">
                    {edu.period}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                      {edu.degree}
                    </h3>
                    <p className="font-body text-base text-foreground/60 mb-1">
                      {edu.institution}
                    </p>
                    <p className="font-mono text-[11px] text-accent">
                      {edu.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience & Activities Section */}
          <section className="resume-section">
            <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-12 flex items-center gap-4">
              <span>02. Activities & Projects</span>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent" />
            </h2>
            <div className="space-y-16">
              {experiences.map((exp, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-12 group">
                  <div className="font-mono text-xs text-foreground/45 pt-1">
                    {exp.period}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {exp.role}
                    </h3>
                    <p className="font-body text-xs font-semibold text-accent/80 tracking-widest uppercase mb-4">
                      {exp.company}
                    </p>
                    <p className="font-body text-base text-foreground/60 leading-relaxed mb-6">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span key={skill} className="px-3.5 py-1.5 rounded-full border border-white/10 bg-glass-bg text-[10px] font-mono text-foreground/70">
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
            <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-12 flex items-center gap-4">
              <span>03. Expertise</span>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {skillGroups.map((group, i) => (
                <div key={i} className="p-6 rounded-2xl border border-white/5 bg-glass-bg">
                  <h3 className="font-display text-lg font-bold text-foreground mb-6 italic">
                    {group.category}
                  </h3>
                  <ul className="space-y-3">
                    {group.items.map((skill) => (
                      <li key={skill} className="flex items-center gap-3 font-body text-sm text-foreground/60">
                        <span className="w-1 h-1 rounded-full bg-accent" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications Section */}
          <section className="resume-section">
            <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-12 flex items-center gap-4">
              <span>04. Certifications</span>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {certifications.map((cert, i) => (
                <div key={i} className="p-6 rounded-2xl border border-white/5 bg-glass-bg flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {cert.title}
                    </h3>
                    <p className="font-body text-sm text-foreground/50">
                      {cert.issuer}
                    </p>
                  </div>
                  <div className="mt-6 font-mono text-[10px] text-accent uppercase tracking-widest">
                    {cert.date}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Download CTA */}
          <section className="resume-section pt-12 pb-24 text-center">
            <div className="inline-block p-[1px] rounded-3xl bg-gradient-to-br from-accent/30 via-white/5 to-accent/30">
              <div className="bg-background rounded-[23px] px-12 py-10">
                <h3 className="font-display text-2xl font-light text-foreground mb-6">
                  Need an offline version?
                </h3>
                <a
                  href="/Resume.pdf"
                  download
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent text-[#0D0D0D] font-mono text-xs tracking-widest uppercase transition-all duration-500 hover:scale-105 hover:shadow-xl"
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
      <footer className="max-w-4xl mx-auto border-t border-white/10 pt-12 flex justify-between items-center text-[10px] font-mono tracking-widest uppercase text-foreground/30">
        <span>© 2026 Rohit Verma</span>
        <Link href="/" className="hover:text-accent transition-colors">Back to Home</Link>
      </footer>
    </main>
  );
}

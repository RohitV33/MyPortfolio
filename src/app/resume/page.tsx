"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight, Download, CheckCircle2, Award } from "lucide-react";

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
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

      // Section reveal animation
      const sections = sectionsRef.current?.querySelectorAll(".resume-section");
      if (sections) {
        gsap.fromTo(
          sections,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionsRef.current,
              start: "top 85%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const education = [
    {
      institution: "KIET Group of Institutions, Ghaziabad",
      degree: "Bachelor of Technology in Computer Science",
      period: "2023 — 2027",
      details: "CGPA: 7.7 / 10",
    },
    {
      institution: "Scottish International School, CBSE Board",
      degree: "Senior Secondary (Class XII)",
      period: "2022",
      details: "Score: 86.2%",
    },
    {
      institution: "Silver Bells Public School, CBSE Board",
      degree: "Secondary (Class X)",
      period: "2020",
      details: "Score: 85.6%",
    },
  ];

  const projects = [
    {
      title: "CivicLens-AI",
      subtitle: "Civic Issue Reporting Platform",
      period: "Aug 2026",
      role: "Lead Full-Stack & AI Developer",
      points: [
        "Built a full-stack platform for reporting civic issues through image uploads and user-provided details.",
        "Integrated a YOLOv8-based waste classification model using a Python FastAPI service to analyze uploaded images.",
        "Created REST APIs for report submission, image processing, user data, and issue management.",
        "Connected the Python AI service with the Node.js backend to send image results to the React frontend.",
      ],
      technologies: ["React.js", "Node.js", "Express.js", "Python", "FastAPI", "YOLOv8", "MongoDB", "Tailwind CSS"],
      liveUrl: "https://github.com/RohitV33",
      githubUrl: "https://github.com/RohitV33",
    },
    {
      title: "Web Fuzzing Tool",
      subtitle: "Team Project — Web Security Testing Platform",
      period: "Sep 2025 — Jul 2026",
      role: "Backend Developer",
      points: [
        "Worked on the backend of a team-based web security testing platform for automated vulnerability scanning.",
        "Developed REST APIs for starting scans, handling requests, and returning scan results.",
        "Added server-side logic to connect the scanning process with the frontend and display results.",
        "Worked with team members to connect backend services with the scanning engine and result interface.",
      ],
      technologies: ["Node.js", "Express.js", "REST APIs", "React.js", "Tailwind CSS"],
      githubUrl: "https://github.com/RohitV33/Web-Fuzzing-Tool",
    },
    {
      title: "Bartr",
      subtitle: "Skill Exchange Platform",
      period: "Feb 2026 — Jun 2026",
      role: "Full-Stack Developer",
      points: [
        "Built a full-stack platform where students can exchange skills without using money.",
        "Added JWT authentication and real-time messaging using Socket.IO.",
        "Developed REST APIs for user profiles, skills, and matchmaking.",
        "Designed MongoDB models for users, skills, and platform interactions.",
      ],
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.IO", "JWT"],
      liveUrl: "https://bartr-blond.vercel.app/",
      githubUrl: "https://github.com/RohitV33",
    },
  ];

  const skillGroups = [
    { category: "Languages", items: ["Java", "JavaScript", "Python", "SQL", "C"] },
    { category: "Frontend", items: ["HTML", "CSS", "React.js", "Tailwind CSS"] },
    { category: "Backend", items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "Socket.IO"] },
    { category: "Databases", items: ["MongoDB", "MySQL"] },
    { category: "Tools", items: ["Git", "GitHub", "Postman", "VS Code", "IntelliJ IDEA", "Vite"] },
    { category: "Core CS", items: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks"] },
  ];

  const certifications = [
    {
      title: "AWS Certified Cloud Practitioner (CLF-C02)",
      issuer: "Amazon Web Services (AWS)",
      date: "Feb 2026",
    },
    {
      title: "SQL (Intermediate)",
      issuer: "HackerRank",
      date: "Nov 2025",
    },
    {
      title: "SQL (Basic)",
      issuer: "HackerRank",
      date: "Nov 2025",
    },
  ];

  const achievements = [
    "Solved 300+ Data Structures and Algorithms problems on LeetCode.",
    "Built and deployed 4 full-stack web applications using React.js, Node.js, Express.js, and MongoDB.",
  ];

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 md:px-12 bg-charcoal text-off-white select-none relative overflow-hidden" ref={containerRef}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header ref={headerRef} className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber font-medium">
              CURRICULUM VITAE
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-off-white mb-2 leading-tight">
            Rohit <span className="text-amber">Verma</span>
          </h1>

          <p className="font-body text-sm md:text-base text-foreground/75 font-normal max-w-xl mb-5 leading-relaxed">
            Full-Stack Developer &amp; B.Tech Computer Science student specializing in building high-performance web systems and AI-integrated applications.
          </p>

          {/* Contact Details from Resume */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs font-mono text-foreground/60 border-t border-white/[0.08] pt-4">
            <a href="mailto:verma61421st@gmail.com" className="hover:text-amber transition-colors">
              verma61421st@gmail.com
            </a>
            <span className="opacity-30">|</span>
            <a href="tel:+917668053852" className="hover:text-amber transition-colors">
              +91 7668053852
            </a>
            <span className="opacity-30">|</span>
            <a href="https://linkedin.com/in/rawhit01" target="_blank" rel="noopener noreferrer" className="hover:text-amber transition-colors">
              LinkedIn
            </a>
            <span className="opacity-30">|</span>
            <a href="https://github.com/RohitV33" target="_blank" rel="noopener noreferrer" className="hover:text-amber transition-colors">
              GitHub
            </a>
            <span className="opacity-30">|</span>
            <a href="https://leetcode.com/u/rohit6142/" target="_blank" rel="noopener noreferrer" className="hover:text-amber transition-colors">
              LeetCode
            </a>
          </div>
        </header>

        <div ref={sectionsRef} className="space-y-16">
          {/* 01. Education Section */}
          <section className="resume-section">
            <h2 className="font-mono text-xs tracking-[0.25em] uppercase text-amber mb-6 flex items-center gap-3">
              <span>01. EDUCATION</span>
              <div className="h-px flex-1 bg-white/10" />
            </h2>
            <div className="space-y-6 border-l border-white/10 pl-5 ml-2">
              {education.map((edu, i) => (
                <div key={i} className="relative group">
                  <span className="absolute -left-[25px] top-1.5 w-2 h-2 rounded-full bg-amber/50 border border-charcoal group-hover:bg-amber transition-colors" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <h3 className="font-display text-base font-semibold text-off-white">
                      {edu.degree}
                    </h3>
                    <span className="font-mono text-xs text-foreground/45">
                      {edu.period}
                    </span>
                  </div>
                  <p className="font-body text-xs text-foreground/60">
                    {edu.institution}
                  </p>
                  <p className="font-mono text-[11px] text-amber mt-1 font-medium">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 02. Technical Skills Section */}
          <section className="resume-section">
            <h2 className="font-mono text-xs tracking-[0.25em] uppercase text-amber mb-6 flex items-center gap-3">
              <span>02. TECHNICAL SKILLS</span>
              <div className="h-px flex-1 bg-white/10" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {skillGroups.map((group, i) => (
                <div key={i} className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                  <h3 className="font-mono text-[11px] uppercase tracking-wider text-amber font-semibold mb-2.5">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((skill) => (
                      <span key={skill} className="px-2 py-0.5 rounded border border-white/[0.08] bg-white/[0.03] font-mono text-[10px] text-foreground/70">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 03. Projects Section */}
          <section className="resume-section">
            <h2 className="font-mono text-xs tracking-[0.25em] uppercase text-amber mb-6 flex items-center gap-3">
              <span>03. PROJECTS</span>
              <div className="h-px flex-1 bg-white/10" />
            </h2>
            <div className="space-y-8">
              {projects.map((proj, i) => (
                <div key={i} className="p-5 md:p-6 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-amber/25 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                    <div>
                      <h3 className="font-display text-lg font-bold text-off-white">
                        {proj.title}
                      </h3>
                      <p className="font-mono text-xs text-amber font-medium">
                        {proj.subtitle} — <span className="text-foreground/50">{proj.role}</span>
                      </p>
                    </div>
                    <span className="font-mono text-xs text-foreground/45">
                      {proj.period}
                    </span>
                  </div>

                  <ul className="space-y-1.5 my-3.5">
                    {proj.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 font-body text-xs text-foreground/75 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber/70 shrink-0 mt-1.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.06]">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.technologies.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded border border-white/[0.06] bg-white/[0.02] font-mono text-[9px] text-foreground/60">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-amber hover:underline flex items-center gap-1 uppercase tracking-wider">
                          <span>Live Demo</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-foreground/60 hover:text-off-white flex items-center gap-1 uppercase tracking-wider">
                          <span>GitHub</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 04. Certifications & Achievements */}
          <section className="resume-section">
            <h2 className="font-mono text-xs tracking-[0.25em] uppercase text-amber mb-6 flex items-center gap-3">
              <span>04. CERTIFICATIONS &amp; ACHIEVEMENTS</span>
              <div className="h-px flex-1 bg-white/10" />
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {certifications.map((cert, i) => (
                <div key={i} className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-sm font-semibold text-off-white mb-1">
                      {cert.title}
                    </h3>
                    <p className="font-mono text-[11px] text-foreground/50">
                      {cert.issuer}
                    </p>
                  </div>
                  <span className="mt-3 font-mono text-[10px] text-amber uppercase tracking-wider font-medium">
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>

            {/* Achievements Card */}
            <div className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.02]">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-amber" />
                <h3 className="font-mono text-xs uppercase tracking-wider text-off-white font-semibold">
                  KEY ACHIEVEMENTS
                </h3>
              </div>
              <ul className="space-y-2">
                {achievements.map((ach, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-2.5 font-body text-xs text-foreground/75 leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Download CTA */}
          <section className="resume-section text-center pt-4">
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] max-w-md mx-auto">
              <h3 className="font-display text-lg font-semibold text-off-white mb-2">
                Download Resume PDF
              </h3>
              <p className="font-body text-xs text-foreground/60 mb-5">
                Updated with latest project contributions, CGPA 7.7/10, and AWS certification.
              </p>
              <a
                href="/Resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber text-charcoal font-mono font-medium text-xs tracking-wider uppercase hover:bg-off-white transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD OFFLINE PDF</span>
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Footer link back */}
      <footer className="max-w-4xl mx-auto border-t border-white/10 pt-8 mt-16 flex justify-between items-center text-[10px] font-mono tracking-wider uppercase text-foreground/35">
        <span>© 2026 Rohit Verma</span>
        <Link href="/" className="hover:text-amber transition-colors">← Back to Portfolio</Link>
      </footer>
    </main>
  );
}

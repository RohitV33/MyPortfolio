// components/ProjectsSection.jsx
import { useEffect, useRef } from "react";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import { staggerCards } from "../utils/gsapAnimations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    // Heading animation
    gsap.fromTo(headingRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" }
      }
    );

    // Stagger cards
    const cards = gridRef.current?.querySelectorAll(".project-card");
    if (cards?.length) {
      gsap.fromTo([...cards],
        { y: 120, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-32 px-8 md:px-20">

      {/* Section label */}
      <div className="flex items-center gap-4 mb-4">
        <span className="h-px flex-1 max-w-[60px]" style={{ background: "var(--accent)" }} />
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent)" }}>
          Selected Work
        </span>
      </div>

      <h2 ref={headingRef}
        className="font-display font-extrabold mb-16"
        style={{ fontSize: "clamp(2rem, 5vw, 5rem)", lineHeight: 1.1 }}>
        Projects
      </h2>

      <div ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
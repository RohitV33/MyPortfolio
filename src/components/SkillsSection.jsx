// components/SkillsSection.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = {
  Frontend: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind", "GSAP"],
  Backend: ["Node.js", "Express", "FastAPI", "GraphQL", "REST APIs"],
  Database: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Prisma"],
  DevOps: ["Docker", "AWS", "Vercel", "CI/CD", "Linux", "Nginx"],
};

export default function SkillsSection() {
  const ref = useRef(null);

  useEffect(() => {
    const items = ref.current.querySelectorAll(".skill-chip");
    gsap.fromTo(items,
      { y: 30, opacity: 0, scale: 0.9 },
      {
        y: 0, opacity: 1, scale: 1,
        stagger: 0.05, duration: 0.6, ease: "back.out(1.5)",
        scrollTrigger: { trigger: ref.current, start: "top 80%" }
      }
    );
  }, []);

  return (
    <section id="skills" ref={ref}
      className="py-32 px-8 md:px-20"
      style={{ borderTop: "1px solid var(--border)" }}>

      <div className="flex items-center gap-4 mb-4">
        <span className="h-px w-12" style={{ background: "var(--accent)" }} />
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent)" }}>Tech Stack</span>
      </div>

      <h2 className="font-display font-extrabold mb-16"
        style={{ fontSize: "clamp(2rem, 5vw, 5rem)", lineHeight: 1.1 }}>
        Skills
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category}>
            <h3 className="font-mono text-xs tracking-widest uppercase mb-5"
              style={{ color: "var(--accent)" }}>{category}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map(skill => (
                <span key={skill} className="skill-chip px-3 py-1.5 font-mono text-xs"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                    borderRadius: "2px",
                  }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
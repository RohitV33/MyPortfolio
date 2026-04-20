// components/ProjectCard.jsx
import { useRef, useState } from "react";

export default function ProjectCard({ project, index }) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current?.play();
  };
  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="project-card group relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "4px",
        cursor: "none",
      }}>

      {/* Video Thumbnail */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{ background: "rgba(10,10,10,0.5)", opacity: hovered ? 0 : 1 }}>
          <span className="font-mono text-xs tracking-widest" style={{ color: "var(--muted)" }}>
            hover to preview
          </span>
        </div>

        {/* Accent number */}
        <span className="absolute top-4 left-4 font-mono text-xs"
          style={{ color: project.color, opacity: 0.8 }}>
          0{index + 1}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display font-bold text-xl mb-2" style={{ color: "var(--text)" }}>
          {project.title}
        </h3>
        <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--muted)" }}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map(t => (
            <span key={t} className="px-2.5 py-1 font-mono text-xs"
              style={{ background: "rgba(255,255,255,0.05)", color: project.color, borderRadius: "2px" }}>
              {t}
            </span>
          ))}
        </div>

        <a href={project.link} target="_blank" rel="noreferrer"
          className="font-mono text-xs tracking-widest uppercase transition-colors hover:opacity-60"
          style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: "4px" }}>
          View on GitHub →
        </a>
      </div>
    </div>
  );
}
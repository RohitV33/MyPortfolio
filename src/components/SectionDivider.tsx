import type { ReactNode } from "react";

interface SectionDividerProps {
  variant?: "wave" | "curve" | "diagonal" | "peaks";
  topColor?: string;
  bottomColor?: string;
  flip?: boolean;
}

export default function SectionDivider({
  variant = "wave",
  topColor = "#0D0D0D",
  bottomColor = "#0a0a0a",
  flip = false,
}: SectionDividerProps) {
  const transforms = flip ? "rotate(180deg)" : undefined;

  const paths: Record<string, ReactNode> = {
    wave: (
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(245,166,35,0.08)" />
            <stop offset="50%" stopColor="rgba(139,92,246,0.06)" />
            <stop offset="100%" stopColor="rgba(49,120,198,0.08)" />
          </linearGradient>
        </defs>
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill={bottomColor}
        />
        <path
          d="M0,44 C240,80 480,8 720,44 C960,80 1200,8 1440,44 L1440,80 L0,80 Z"
          fill="url(#waveGrad)"
          opacity="0.5"
        />
      </svg>
    ),
    curve: (
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,80 Q720,0 1440,80 L1440,80 L0,80 Z"
          fill={bottomColor}
        />
        <path
          d="M0,80 Q720,5 1440,80 L1440,80 L0,80 Z"
          fill="rgba(245,166,35,0.04)"
        />
      </svg>
    ),
    diagonal: (
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <polygon
          points="0,80 1440,20 1440,80"
          fill={bottomColor}
        />
        <polygon
          points="0,80 1440,25 1440,80"
          fill="rgba(245,166,35,0.03)"
        />
      </svg>
    ),
    peaks: (
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,80 L180,30 L360,60 L540,20 L720,50 L900,15 L1080,55 L1260,25 L1440,65 L1440,80 L0,80 Z"
          fill={bottomColor}
        />
        <path
          d="M0,80 L180,35 L360,62 L540,25 L720,52 L900,20 L1080,57 L1260,30 L1440,67 L1440,80 L0,80 Z"
          fill="rgba(245,166,35,0.04)"
        />
      </svg>
    ),
  };

  return (
    <div
      className="section-divider"
      style={{
        transform: transforms,
        marginTop: "-1px",
        marginBottom: "-1px",
        background: topColor,
      }}
    >
      {paths[variant]}
    </div>
  );
}

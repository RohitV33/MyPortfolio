"use client";

export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <div className="aurora-orb aurora-orb-1" style={{ top: "10%", left: "15%" }} />
      <div className="aurora-orb aurora-orb-2" style={{ top: "50%", right: "10%" }} />
      <div className="aurora-orb aurora-orb-3" style={{ bottom: "20%", left: "40%" }} />
    </div>
  );
}

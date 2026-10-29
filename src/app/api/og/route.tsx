import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0d0d0d",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245, 166, 35, 0.25) 0%, transparent 70%)",
          }}
        />

        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#F5A623",
              }}
            />
            <span
              style={{
                color: "#F5A623",
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              PORTFOLIO // 2026
            </span>
          </div>
          <span
            style={{
              color: "rgba(255, 255, 255, 0.4)",
              fontSize: "16px",
              fontFamily: "monospace",
            }}
          >
            Ghaziabad, Uttar Pradesh, India
          </span>
        </div>

        {/* Main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 900,
              color: "#F3F3F3",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            ROHIT VERMA
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: 800,
              color: "#F5A623",
              letterSpacing: "-0.01em",
            }}
          >
            Full Stack Developer & Systems Engineer
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "rgba(255, 255, 255, 0.6)",
              marginTop: "16px",
              maxWidth: "850px",
              lineHeight: 1.5,
            }}
          >
            Building high-performance digital products, computer vision pipelines, and real-time architectures with React, Next.js, Node.js, and TypeScript.
          </div>
        </div>

        {/* Bottom tags */}
        <div style={{ display: "flex", gap: "16px" }}>
          {["React.js", "Next.js", "Node.js", "TypeScript", "FastAPI", "MongoDB"].map((tech) => (
            <div
              key={tech}
              style={{
                padding: "8px 20px",
                borderRadius: "9999px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "14px",
                fontFamily: "monospace",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

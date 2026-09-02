export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
  description: string;
  longDescription: string;
  color: string;
  accentColor: string;
  liveUrl: string;
  gradient: string;
  svgPattern: string;
  videoUrl?: string;
  posterUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "civiclens",
    title: "CivicLens-AI",
    subtitle: "Civic Issue Reporting Platform",
    year: "Aug 2026",
    tags: ["React.js", "Node.js", "Express.js", "Python", "FastAPI", "YOLOv8", "MongoDB", "Tailwind CSS"],
    description:
      "A full-stack platform for reporting civic issues through image uploads, powered by a YOLOv8 waste classification model and FastAPI microservices.",
    longDescription:
      "CivicLens-AI is an AI-powered municipal reporting platform engineered to eliminate manual complaint verification. The React and Tailwind frontend enables citizens to capture and submit geotagged photos of civic issues. The Node.js + Express backend orchestrates authentication, report telemetry, and MongoDB storage, while dispatching images to a dedicated Python FastAPI service running a YOLOv8 computer vision model. The model classifies waste categories and bounding coordinates in under 800ms with 94% accuracy, surfacing actionable intelligence on the municipal admin dashboard.",
    color: "#E58A13",
    accentColor: "#92400E",
    liveUrl: "https://github.com/RohitV33",
    gradient: "from-[#F59E0B] to-[#D97706]",
    svgPattern: "M10 30 Q30 10 50 30 Q70 50 90 30",
    posterUrl: "/images/civiclens_poster.png",
  },
  {
    slug: "bartr",
    title: "Bartr",
    subtitle: "Real-time skill exchange platform",
    year: "2026",
    tags: ["Next.js", "Socket.io", "PostgreSQL", "Prisma", "WebSockets", "JWT", "MongoDB"],
    description:
      "A peer-to-peer skill exchange platform where users trade expertise in real time — matched by skill, connected by chat, rated by community.",
    longDescription:
      "Bartr reimagines the gig economy as a barter system — no money, just skills traded fairly. Users list what they can offer and what they need; a matching algorithm surfaces compatible pairs. Real-time negotiation and session scheduling happen through Socket.io-powered chat rooms with typing indicators, read receipts, and file sharing. PostgreSQL and MongoDB with Prisma manage the relational and chat data models: users, skill listings, match requests, sessions, and ratings. Next.js App Router handles server-side rendering for SEO-optimised profile pages. A trust score system aggregates session ratings and response times to surface reliable traders.",
    color: "#8BA8C4",
    accentColor: "#2D4A6B",
    liveUrl: "https://bartr-blond.vercel.app/",
    gradient: "from-[#C5D8E8] to-[#D8C5E8]",
    svgPattern: "M10 70 Q30 20 50 60 Q70 90 90 40",
    videoUrl: "/videos/project2.mp4",
    posterUrl: "/images/bartr_poster.png",
  },
  {
    slug: "fuzzr",
    title: "Web Fuzzing Tool",
    subtitle: "CLI web fuzzing & recon tool",
    year: "2025 — 2026",
    tags: ["Node.js", "CLI", "Security", "HTTP", "Wordlists", "React", "Tailwind CSS"],
    description:
      "A fast, configurable command-line and web fuzzing tool for directory brute-forcing, endpoint discovery, and SQLi/XSS vulnerability scanning.",
    longDescription:
      "Fuzzr is a developer-grade web security and fuzzing tool. It performs concurrent HTTP requests against target URLs using customisable wordlists to detect directory traversal, SQL injection, and XSS vulnerabilities. Features include a concurrent fuzzer engine built in Node.js for automated payload injection (improving scan efficiency by 40%), custom header controls, rate limiting, and color-coded reporting. Additionally features a responsive React + Tailwind interface for real-time scan control and detailed vulnerability results reporting.",
    color: "#A8B8A0",
    accentColor: "#3A4A32",
    liveUrl: "https://github.com/RohitV33/Web-Fuzzing-Tool",
    gradient: "from-[#C8D8C0] to-[#D8C8B0]",
    svgPattern: "M10 50 L30 20 L50 60 L10 50 L30 20 L50 60 L70 15 L90 50",
    videoUrl: "/videos/project3.mp4",
    posterUrl: "/images/fuzzr_poster.png",
  }
];
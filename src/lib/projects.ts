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
}

export const projects: Project[] = [
  {
    slug: "nazara",
    title: "Nazara",
    subtitle: "Full-stack e-commerce platform",
    year: "2024",
    tags: ["React", "Node.js", "MongoDB", "Express", "JWT", "Stripe"],
    description:
      "A production-ready e-commerce platform with cart management, secure auth, payment integration, and an admin dashboard — built end-to-end from scratch.",
    longDescription:
      "Nazara is a complete e-commerce solution built without shortcuts. The frontend is a React SPA with context-driven cart state, optimistic UI updates, and a fully responsive product catalog. The Node.js + Express backend handles JWT-based authentication, role-based access control for the admin panel, and Stripe-powered checkout with webhook order confirmation. MongoDB stores product inventory, user profiles, and order history with indexed queries for fast filtering. The admin dashboard provides real-time sales analytics, inventory management, and order fulfillment tracking.",
    color: "#C4A882",
    accentColor: "#7A5C3E",
    liveUrl: "https://nazara-shop.vercel.app/",
    gradient: "from-[#E8D5B8] to-[#C8D8C0]",
    svgPattern: "M10 30 Q30 10 50 30 Q70 50 90 30",
    videoUrl: "videos/project1.mp4",
  },
  {
    slug: "bartr",
    title: "Bartr",
    subtitle: "Real-time skill exchange platform",
    year: "2024",
    tags: ["Next.js", "Socket.io", "PostgreSQL", "Prisma", "WebSockets"],
    description:
      "A peer-to-peer skill exchange platform where users trade expertise in real time — matched by skill, connected by chat, rated by community.",
    longDescription:
      "Bartr reimagines the gig economy as a barter system — no money, just skills traded fairly. Users list what they can offer and what they need; a matching algorithm surfaces compatible pairs. Real-time negotiation and session scheduling happen through Socket.io-powered chat rooms with typing indicators, read receipts, and file sharing. PostgreSQL with Prisma manages the relational data model: users, skill listings, match requests, sessions, and ratings. Next.js App Router handles server-side rendering for SEO-optimised profile pages. A trust score system aggregates session ratings and response times to surface reliable traders.",
    color: "#8BA8C4",
    accentColor: "#2D4A6B",
    liveUrl: "https://bartr-blond.vercel.app/",
    gradient: "from-[#C5D8E8] to-[#D8C5E8]",
    svgPattern: "M10 70 Q30 20 50 60 Q70 90 90 40",
    videoUrl: "videos/project2.mp4",
  },
  {
    slug: "fuzzr",
    title: "Fuzzr",
    subtitle: "CLI web fuzzing & recon tool",
    year: "2023",
    tags: ["Node.js", "CLI", "Security", "HTTP", "Wordlists"],
    description:
      "A fast, configurable command-line tool for web directory fuzzing, endpoint discovery, and HTTP response analysis — built for security researchers.",
    longDescription:
      "Fuzzr is a developer-grade web fuzzing tool built entirely in Node.js for the CLI. It performs concurrent HTTP requests against target URLs using customisable wordlists, filtering responses by status code, content length, or response time. Features include rate limiting to avoid detection, custom header injection for authenticated scans, recursive directory discovery, and colour-coded terminal output for instant triage. Results export to JSON or CSV for integration with other recon pipelines. Designed with async concurrency controls to maximise throughput without overwhelming targets. Used for CTF challenges, bug bounty recon, and internal security audits.",
    color: "#A8B8A0",
    accentColor: "#3A4A32",
    liveUrl: "https://github.com/RohitV33/Web-Fuzzing-Tool",
    gradient: "from-[#C8D8C0] to-[#D8C8B0]",
    svgPattern: "M10 50 L30 20 L50 60 L10 50 L30 20 L50 60 L70 15 L90 50",
    videoUrl: "videos/project3.mp4",
  }
];
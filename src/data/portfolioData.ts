export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  tags: string[];
  description: string;
  liveUrl: string;
  githubUrl?: string;
  videoUrl?: string;
  posterUrl: string;
  color: string;
}

export interface CaseStudySection {
  title: string;
  headline: string;
  description: string;
  bulletPoints: string[];
  metric?: string;
  metricLabel?: string;
}

export interface CaseStudy {
  projectNumber: string;
  title: string;
  tagline: string;
  summary: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  visualPoster: string;
  visualVideo?: string;
  sections: CaseStudySection[];
}

export interface StoryStatement {
  id: string;
  statement: string;
  subtext?: string;
}

export interface Capability {
  number: string;
  title: string;
  tagline: string;
  details: string[];
}

export interface EducationItem {
  year: string;
  degree: string;
  institution: string;
  score?: string;
}

export interface MilestoneItem {
  year: string;
  category: string;
  title: string;
  issuer: string;
  description: string;
}

export const CHAPTERS = [
  { number: "01", name: "Intro", label: "01 / 09", id: "chapter-intro" },
  { number: "02", name: "Story", label: "02 / 09", id: "chapter-story" },
  { number: "03", name: "Capabilities", label: "03 / 09", id: "chapter-capabilities" },
  { number: "04", name: "Work", label: "04 / 09", id: "chapter-work" },
  { number: "05", name: "Case Study", label: "05 / 09", id: "chapter-case-study" },
  { number: "06", name: "Stack", label: "06 / 09", id: "chapter-stack" },
  { number: "07", name: "About", label: "07 / 09", id: "chapter-about" },
  { number: "08", name: "Currently", label: "08 / 09", id: "chapter-currently" },
  { number: "09", name: "Contact", label: "09 / 09", id: "chapter-contact" },
];

export const STORY_STATEMENTS: StoryStatement[] = [
  {
    id: "story-1",
    statement: "I wanted to understand how things work.",
    subtext: "Peeling back interfaces, tracing requests, asking what happens behind the screen.",
  },
  {
    id: "story-2",
    statement: "Then I started building.",
    subtext: "Writing my first lines of JavaScript, crafting layouts, compiling code into real software.",
  },
  {
    id: "story-3",
    statement: "Then I started breaking things.",
    subtext: "Uncaught exceptions, database deadlocks, bottlenecked network payloads.",
  },
  {
    id: "story-4",
    statement: "Then I started building them better.",
    subtext: "Architecting resilient data models, caching layers, and micro-optimized UI runtimes.",
  },
  {
    id: "story-5",
    statement: "Now I build digital experiences.",
    subtext: "End-to-end web applications engineered with precision, restraint, and purpose.",
  },
];

export const CAPABILITIES: Capability[] = [
  {
    number: "01",
    title: "FRONTEND",
    tagline: "Building responsive, fast and polished interfaces.",
    details: [
      "Modern React & Next.js App Router architectures",
      "Tailwind CSS design systems with clean token hierarchies",
      "60fps scroll-driven motion with GSAP and Lenis",
      "Zero-layout-shift and strict Lighthouse performance optimization",
    ],
  },
  {
    number: "02",
    title: "BACKEND",
    tagline: "Designing scalable APIs and web systems.",
    details: [
      "Node.js, Express, and Next.js serverless route handlers",
      "RESTful API design and WebSocket event conduits",
      "Database schema modeling with MongoDB and PostgreSQL",
      "Secure authentication with JWT, OAuth, and RBAC",
    ],
  },
  {
    number: "03",
    title: "FULL-STACK",
    tagline: "Connecting product, interface and infrastructure.",
    details: [
      "End-to-end feature lifecycles from wireframe to deployment",
      "Payment processing with Stripe webhooks and reconciliation",
      "State synchronization and optimistic UI updates",
      "Containerization, Vercel deployments, and CI/CD pipelines",
    ],
  },
  {
    number: "04",
    title: "AI & EXPLORATION",
    tagline: "Experimenting with intelligent digital experiences.",
    details: [
      "LLM integration via structured prompt engineering & function calling",
      "Retrieval Augmented Generation (RAG) concepts and vector search",
      "Automated fuzzing and vulnerability recon tooling",
      "Human-in-the-loop AI interactive workflows",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "nazara",
    number: "01",
    title: "NAZARA",
    subtitle: "Full-Stack Commerce Engine",
    year: "2025 — 2026",
    role: "Full-Stack Engineer & Architect",
    tags: ["React", "Node.js", "Express", "MongoDB", "Stripe", "JWT"],
    description:
      "A production-ready e-commerce platform with cart state synchronization, secure role-based auth, Stripe payments, and an administrative telemetry dashboard.",
    liveUrl: "https://nazara-shop.vercel.app/",
    githubUrl: "https://github.com/RohitV33",
    videoUrl: "/videos/project1.mp4",
    posterUrl: "/images/nazara_poster.png",
    color: "#E58A13",
  },
  {
    id: "bartr",
    number: "02",
    title: "BARTR",
    subtitle: "Real-Time Skill Exchange Platform",
    year: "2026",
    role: "Lead Developer",
    tags: ["Next.js", "Socket.io", "PostgreSQL", "Prisma", "WebSockets"],
    description:
      "A peer-to-peer barter platform where individuals trade technical and creative skills in real-time, matched by algorithms and connected through live chat rooms.",
    liveUrl: "https://bartr-blond.vercel.app/",
    githubUrl: "https://github.com/RohitV33",
    videoUrl: "/videos/project2.mp4",
    posterUrl: "/images/bartr_poster.png",
    color: "#D97706",
  },
  {
    id: "fuzzr",
    number: "03",
    title: "WEB FUZZER",
    subtitle: "Concurrent CLI Recon & Security Scanner",
    year: "2025 — 2026",
    role: "Systems & Security Developer",
    tags: ["Node.js", "Security", "Concurrency", "HTTP", "React", "CLI"],
    description:
      "High-throughput developer tool for directory brute-forcing, endpoint discovery, and SQLi/XSS vulnerability scanning with 40% higher scan efficiency.",
    liveUrl: "https://github.com/RohitV33/Web-Fuzzing-Tool",
    githubUrl: "https://github.com/RohitV33/Web-Fuzzing-Tool",
    videoUrl: "/videos/project3.mp4",
    posterUrl: "/images/fuzzr_poster.png",
    color: "#B45309",
  },
];

export const FEATURED_CASE_STUDY: CaseStudy = {
  projectNumber: "01",
  title: "NAZARA",
  tagline: "Engineering an end-to-end commerce engine with zero shortcuts.",
  summary:
    "Nazara was built from the ground up to solve the latency and state-drift issues typical of traditional client-rendered shops. It combines context-driven client state, optimistic UI mutations, and server-validated transactional integrity.",
  tags: ["React", "Node.js", "Express", "MongoDB", "Stripe API", "JWT"],
  liveUrl: "https://nazara-shop.vercel.app/",
  githubUrl: "https://github.com/RohitV33",
  visualPoster: "/images/nazara_poster.png",
  visualVideo: "/videos/project1.mp4",
  sections: [
    {
      title: "THE PROBLEM",
      headline: "Cart desync, slow checkouts, and opaque administrative tooling.",
      description:
        "Modern shoppers abandon carts when interfaces feel sluggish or state falls out of sync during concurrent tab operations. Furthermore, standard off-the-shelf templates frequently couple cart calculations on the client side, introducing security and pricing vulnerabilities.",
      bulletPoints: [
        "Clients faced inconsistent cart counts across multiple open browser tabs",
        "Checkout latency increased drop-offs during third-party gateway handshakes",
        "Admins lacked unified inventory controls and real-time order telemetry",
      ],
      metric: "68%",
      metricLabel: "Cart abandonment rate in unoptimized e-commerce sites addressed by snappy local optimistic UI",
    },
    {
      title: "THE APPROACH",
      headline: "Optimistic local state backed by server-validated inventory locks.",
      description:
        "I decoupled the frontend cart presentation from the transactional backend. The client utilizes a custom context with reducer pattern for immediate UI feedback, while the Node.js API acts as the authoritative source of truth, validating stock and recalculating cart items before generating checkout sessions.",
      bulletPoints: [
        "Implemented custom React context with localStorage reconciliation and optimistic updates",
        "Architected role-based middleware to strictly isolate customer routes from admin operations",
        "Adopted compound MongoDB indexes on product categories to minimize lookup overhead",
      ],
      metric: "120ms",
      metricLabel: "Average catalog query latency on large inventory sets",
    },
    {
      title: "THE BUILD",
      headline: "Robust REST architecture and atomic Stripe webhook reconciliation.",
      description:
        "The backend implements secure JWT authentication in httpOnly cookies, password hashing with bcrypt, and transactional webhooks for payment processing. When a customer completes checkout, Stripe signals the fulfillment endpoint which atomically decrements stock counts and generates order manifests.",
      bulletPoints: [
        "Stripe webhook listener verifying cryptographic signatures before order persistence",
        "Defensive error handling with centralized Express error middleware",
        "Clean, responsive UI with Tailwind CSS designed for mobile and desktop viewports",
      ],
      metric: "100%",
      metricLabel: "Automated payment webhook processing and receipt issuance",
    },
    {
      title: "THE RESULT",
      headline: "A battle-tested production application ready for scale.",
      description:
        "Nazara achieves instantaneous item additions, seamless checkout transitions, and a fully functional management dashboard. It serves as concrete proof of full-stack engineering competency—from database design to interaction design.",
      bulletPoints: [
        "Sub-second catalog browsing and instant cart interactions",
        "Complete administrative dashboard for real-time sales and inventory management",
        "Deployed to production on Vercel and cloud compute services",
      ],
      metric: "0",
      metricLabel: "Discrepancies in inventory counts during concurrent checkout simulations",
    },
  ],
};

export const TECH_STACK_CATEGORIES = [
  {
    category: "LANGUAGES",
    items: ["JavaScript (ESNext)", "TypeScript", "Java", "SQL", "Python", "C"],
  },
  {
    category: "FRONTEND",
    items: ["React.js", "Next.js (App Router)", "Tailwind CSS", "GSAP & ScrollTrigger", "Lenis", "Framer Motion"],
  },
  {
    category: "BACKEND & DATA",
    items: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "MySQL", "REST APIs", "WebSockets"],
  },
  {
    category: "TOOLS & PRACTICES",
    items: ["Git & GitHub", "Postman", "AWS (Cloud Practitioner)", "Linux / Bash", "OOP & System Design", "DSA"],
  },
];

export const FLOWING_TECHS = [
  ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express"],
  ["MongoDB", "PostgreSQL", "Tailwind CSS", "GSAP", "WebSockets", "Java"],
  ["AWS Cloud", "Git & GitHub", "REST APIs", "System Design", "SQL", "AI / LLM"],
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    year: "2023 — 2027",
    degree: "Bachelor of Technology (B.Tech) — Computer Science & Engineering",
    institution: "KIET Group of Institutions, Ghaziabad",
    score: "CGPA: 7.5 / 10",
  },
  {
    year: "2022",
    degree: "Senior Secondary (Class XII) — Science & Mathematics",
    institution: "Scottish International School",
    score: "86.2%",
  },
  {
    year: "2020",
    degree: "Secondary (Class X)",
    institution: "Silver Bells Public School",
    score: "85.6%",
  },
];

export const MILESTONES_DATA: MilestoneItem[] = [
  {
    year: "Feb 2026",
    category: "CERTIFICATION",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    description: "Validates foundational cloud concepts, security, architecture principles, and billing services.",
  },
  {
    year: "Nov 2025",
    category: "CERTIFICATION",
    title: "SQL (Intermediate) Certificate",
    issuer: "HackerRank",
    description: "Demonstrates query optimization, multi-table joins, subqueries, and data manipulation expertise.",
  },
  {
    year: "2024 — Present",
    category: "EXPERIENCE",
    title: "Freelance Video Editor & Motion Designer",
    issuer: "Client Projects",
    description: "Crafting visual narratives, pacing, and motion graphics using DaVinci Resolve and After Effects.",
  },
  {
    year: "2024",
    category: "CAMPUS",
    title: "Social Content Creator",
    issuer: "Innotech 2024 — KIET",
    description: "Produced high-engagement media and community content for regional collegiate technology festivals.",
  },
];

export const CURRENTLY_BUILDING = [
  {
    title: "HIGH-PERFORMANCE WEB APPLICATIONS",
    detail: "Exploring edge runtimes, server components, and streaming data architectures.",
    speed: 0.15,
  },
  {
    title: "INTELLIGENT AI EXPERIENCES",
    detail: "Integrating generative LLM APIs with real-time browser contexts.",
    speed: 0.25,
  },
  {
    title: "SCALABLE SYSTEM DESIGN",
    detail: "Studying distributed caching, message queues, and resilient database replication.",
    speed: 0.1,
  },
  {
    title: "OPEN SOURCE & DEVELOPER TOOLS",
    detail: "Writing CLI utilities and security scanning engines for the developer workflow.",
    speed: 0.2,
  },
];

export const SOCIAL_LINKS = [
  { label: "GITHUB", url: "https://github.com/RohitV33" },
  { label: "LINKEDIN", url: "https://www.linkedin.com/in/rohit-verma33/" },
  { label: "RESUME", url: "/Resume.pdf" },
  { label: "EMAIL", url: "mailto:rohitverma.dev@gmail.com" },
];

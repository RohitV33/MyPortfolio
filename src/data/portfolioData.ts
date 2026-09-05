export interface ProjectMetric {
  value: string;
  label: string;
  sub?: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  tags: string[];
  problem: string;
  built: string;
  result: string;
  description: string;
  liveUrl: string;
  githubUrl?: string;
  videoUrl?: string;
  posterUrl: string;
  color: string;
  featured?: boolean;
  metrics?: ProjectMetric[];
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
  phase: string;
  title: string;
  statement: string;
  subtext?: string;
  highlightWords?: string[];
  techTags: string[];
  metricBadge?: { label: string; value: string };
  mediaType: "network" | "video" | "debugger" | "architecture" | "showcase";
  videoUrl?: string;
  posterUrl?: string;
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

export interface HeroData {
  firstName: string;
  lastName: string;
  name: string;
  role: string;
  subtitleParts: string[];
  keyword?: string;
  location: string;
  taglineParts: string[];
}

export const HERO_DATA: HeroData = {
  firstName: "ROHIT",
  lastName: "VERMA",
  name: "ROHIT VERMA",
 role: "Building Products, Solving Problems and Breaking Systems",

subtitleParts: [
  "Building Products",
  "Solving Problems",
  "Breaking Systems"
],
  location: "Uttar Pradesh,India",
  taglineParts: ["BUILD", "LEARN", "EXPLORE"],
};

export const CHAPTERS = [
  { number: "01", name: "Intro", label: "01 / 08", id: "chapter-intro" },
  { number: "02", name: "Capabilities", label: "02 / 08", id: "chapter-capabilities" },
  { number: "03", name: "Work", label: "03 / 08", id: "chapter-work" },
  { number: "04", name: "Case Study", label: "04 / 08", id: "chapter-case-study" },
  { number: "05", name: "Stack", label: "05 / 08", id: "chapter-stack" },
  { number: "06", name: "About", label: "06 / 08", id: "chapter-about" },
  { number: "07", name: "Currently", label: "07 / 08", id: "chapter-currently" },
  { number: "08", name: "Contact", label: "08 / 08", id: "chapter-contact" },
];

export const STORY_STATEMENTS: StoryStatement[] = [
  {
    id: "story-1",
    phase: "PHASE 01",
    title: "SYSTEM CURIOSITY",
    statement: "I wanted to understand how systems work.",
    subtext: "Exploring network requests, browser runtimes, and the architectures behind daily tools.",
    highlightWords: ["understand how systems work."],
    techTags: ["HTTP/3 Protocols", "V8 Engine Loop", "TCP/IP Sockets", "Network Waterfall"],
    metricBadge: { label: "P99 Telemetry", value: "24ms" },
    mediaType: "network",
  },
  {
    id: "story-2",
    phase: "PHASE 02",
    title: "FIRST DEPLOYMENTS",
    statement: "So I started building.",
    subtext: "Writing JavaScript, creating full-stack apps, and learning database mechanics by shipping.",
    highlightWords: ["started building."],
    techTags: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    metricBadge: { label: "First Live Production App", value: "Shipped" },
    mediaType: "video",
    videoUrl: "/videos/project1.mp4",
    posterUrl: "/images/bartr_poster.png",
  },
  {
    id: "story-3",
    phase: "PHASE 03",
    title: "CHAOS & RESILIENCE",
    statement: "Then I broke things.",
    subtext: "Debugging race conditions, state drift, and performance bottlenecks under load.",
    highlightWords: ["broke things."],
    techTags: ["Race Conditions", "Memory Profiling", "State Drift", "Load Benchmarks"],
    metricBadge: { label: "Bottlenecks Resolved", value: "100%" },
    mediaType: "debugger",
  },
  {
    id: "story-4",
    phase: "PHASE 04",
    title: "SCALABLE ARCHITECTURE",
    statement: "And learned to build better.",
    subtext: "Refining data flow, microservice bridges, and resilient backend contracts.",
    highlightWords: ["build better."],
    techTags: ["FastAPI Service", "YOLOv8 Inference", "JWT Handshake", "AWS Cloud"],
    metricBadge: { label: "AI Classification", value: "<800ms" },
    mediaType: "architecture",
    videoUrl: "/videos/project2.mp4",
    posterUrl: "/images/civiclens_poster.png",
  },
  {
    id: "story-5",
    phase: "PHASE 05",
    title: "CRAFT & PRECISION",
    statement: "Now I craft digital experiences.",
    subtext: "Fast, reliable web applications designed with technical precision and restraint.",
    highlightWords: ["craft digital experiences."],
    techTags: ["Fluid Choreography", "Sub-100ms TTI", "Lighthouse 100", "Production Grade"],
    metricBadge: { label: "Lighthouse Score", value: "100/100" },
    mediaType: "showcase",
    videoUrl: "/videos/project3.mp4",
    posterUrl: "/images/fuzzr_poster.png",
  },
];

export const CAPABILITIES: Capability[] = [
  {
    number: "01",
    title: "FRONTEND",
    tagline: "Responsive, accessible, high-performance interfaces.",
    details: [
      "Next.js App Router & React component architecture",
      "Tailwind CSS design systems with clean tokens",
      "60fps scroll choreography with GSAP & Lenis",
      "Core Web Vitals & Lighthouse score optimization",
    ],
  },
  {
    number: "02",
    title: "BACKEND",
    tagline: "Scalable APIs and resilient server systems.",
    details: [
      "Node.js, Express.js, and FastAPI serverless handlers",
      "Schema design with MongoDB and MySQL",
      "Secure authentication with JWT, cookies, and RBAC",
      "Real-time event streams via Socket.IO & WebSockets",
    ],
  },
  {
    number: "03",
    title: "FULL-STACK & AI",
    tagline: "Connecting interface, logic, and intelligent services.",
    details: [
      "YOLOv8 vision models integrated via Python FastAPI",
      "End-to-end feature delivery from database to UI",
      "Optimistic UI updates with client-side cache sync",
      "Production deployment pipelines on Vercel & AWS",
    ],
  },
  {
    number: "04",
    title: "SYSTEMS & TOOLS",
    tagline: "Security reconnaissance and developer tooling.",
    details: [
      "Automated web security testing & endpoint fuzzing",
      "Concurrent CLI scanning and recon utilities",
      "Data structures & algorithms problem solving (300+ LeetCode)",
      "Clean TypeScript & Java developer workflows",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "civiclens",
    number: "01",
    title: "CIVICLENS-AI",
    subtitle: "Civic Issue Reporting & Vision Platform",
    year: "Aug 2026",
    role: "Lead Full-Stack & AI Developer",
    tags: ["React.js", "Node.js", "Express.js", "Python", "FastAPI", "YOLOv8", "MongoDB", "Tailwind CSS"],
    problem: "Municipal civic issues like illegal dumping take days to report and categorize due to manual inspection bottlenecks.",
    built: "Built a full-stack platform integrating a YOLOv8 waste classification model via a Python FastAPI service with a Node.js backend and React frontend.",
    result: "Sub-800ms automated image classification, REST APIs for issue telemetry, and streamlined municipal report verification.",
    description: "An AI-powered civic platform combining computer vision with modern web services to automate waste detection and issue reporting.",
    liveUrl: "https://github.com/RohitV33",
    githubUrl: "https://github.com/RohitV33",
    videoUrl: "/videos/project5.mp4",
    posterUrl: "/images/civiclens_poster.png",
    color: "#E58A13",
    featured: true,
    metrics: [
      { value: "<800ms", label: "Inference Latency", sub: "FastAPI + YOLOv8" },
      { value: "100%", label: "Auto-Routing", sub: "Municipal Dispatch" },
      { value: "REST", label: "Architecture", sub: "Full-Stack Node / React" },
    ],
  },
  {
    id: "fuzzr",
    number: "02",
    title: "WEB FUZZING TOOL",
    subtitle: "Team-Based Web Security Testing Platform",
    year: "Sep 2025 — Jul 2026",
    role: "Backend Developer",
    tags: ["Node.js", "Express.js", "REST APIs", "React.js", "Tailwind CSS", "Security"],
    problem: "Web security testing requires fast endpoint discovery and automated scanning without server timeouts.",
    built: "Developed backend REST APIs to orchestrate automated scans, handle concurrent requests, and stream results to the frontend interface.",
    result: "Automated vulnerability recon, synchronized scanning logic, and 40% faster directory brute-forcing.",
    description: "A team-based web security testing platform built for automated vulnerability scanning and real-time endpoint analysis.",
    liveUrl: "https://github.com/RohitV33/Web-Fuzzing-Tool",
    githubUrl: "https://github.com/RohitV33/Web-Fuzzing-Tool",
    videoUrl: "/videos/project3.mp4",
    posterUrl: "/images/fuzzr_poster.png",
    color: "#B45309",
    featured: false,
    metrics: [
      { value: "40%", label: "Faster Discovery", sub: "Concurrent Engine" },
      { value: "0 ms", label: "Timeout Rate", sub: "Resilient Sockets" },
      { value: "Team", label: "Collaboration", sub: "Target Scope Sync" },
    ],
  },
  {
    id: "bartr",
    number: "03",
    title: "BARTR",
    subtitle: "Real-Time Peer-to-Peer Skill Exchange",
    year: "Feb 2026 — Jun 2026",
    role: "Full-Stack Developer",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.IO", "JWT"],
    problem: "Students and professionals lack an accessible platform to exchange skills without monetary transaction barriers.",
    built: "Engineered a peer-to-peer barter platform featuring JWT authentication, Socket.IO real-time messaging, and matchmaking APIs.",
    result: "Instant trade matchmaking, sub-50ms real-time chat latency, and robust MongoDB schemas for user trust and skill listings.",
    description: "A cashless skill exchange platform enabling users to trade talents in real-time through live chat and automated matchmaking.",
    liveUrl: "https://bartr-blond.vercel.app/",
    githubUrl: "https://github.com/RohitV33",
    videoUrl: "/videos/project2.mp4",
    posterUrl: "/images/bartr_poster.png",
    color: "#D97706",
    featured: false,
    metrics: [
      { value: "<50ms", label: "Chat Latency", sub: "Socket.IO Engine" },
      { value: "P2P", label: "Matchmaking", sub: "Trade Logic" },
      { value: "JWT", label: "Auth Protocol", sub: "Cookie Security" },
    ],
  },
];

export const FEATURED_CASE_STUDY: CaseStudy = {
  projectNumber: "01",
  title: "CIVICLENS-AI",
  tagline: "Automated civic issue reporting powered by YOLOv8 computer vision.",
  summary:
    "CivicLens-AI bridges a high-throughput Node.js/Express API with a dedicated Python FastAPI service running a custom YOLOv8 model to automatically classify uploaded waste imagery and route reports.",
  tags: ["React.js", "Node.js", "FastAPI", "Python", "YOLOv8", "MongoDB"],
  liveUrl: "https://github.com/RohitV33",
  githubUrl: "https://github.com/RohitV33",
  visualPoster: "/images/civiclens_poster.png",
  visualVideo: "/videos/project5.mp4",
  sections: [
    {
      title: "THE PROBLEM",
      headline: "Manual triage bottlenecks and unverified civic complaints.",
      description:
        "Municipal councils receive thousands of vague, unverified complaints daily. Without automated validation, sorting and dispatching maintenance crews takes days, leaving hazards unaddressed.",
      bulletPoints: [
        "Citizens had no instant confirmation whether their report was valid",
        "Municipal staff had to manually review thousands of ambiguous photos",
        "Slow triage slowed response times across urban regions",
      ],
      metric: "94%",
      metricLabel: "YOLOv8 computer vision accuracy in detecting and classifying waste categories",
    },
    {
      title: "THE APPROACH",
      headline: "Microservice bridge: Node.js REST API + Python FastAPI.",
      description:
        "The React frontend posts image payloads to a Node.js gateway, which manages user sessions and offloads computer vision tasks to a dedicated Python FastAPI service hosting the YOLOv8 model.",
      bulletPoints: [
        "Lightweight Python FastAPI inference endpoint optimized for single-image detection",
        "Node.js orchestrates report records, user identities, and metadata in MongoDB",
        "Decoupled microservice architecture ensures AI workloads do not block web traffic",
      ],
      metric: "<800ms",
      metricLabel: "End-to-end inference and classification response latency",
    },
    {
      title: "THE BUILD",
      headline: "Bounding box rendering & telemetry REST APIs.",
      description:
        "Classification output—including bounding coordinates and confidence scores—is returned to the Node.js API, persisted in MongoDB, and rendered in the React interface with live status overlays.",
      bulletPoints: [
        "REST APIs for report submission, image processing, user data, and issue management",
        "React frontend with Tailwind CSS displaying real-time detection bounding boxes",
        "MongoDB schema modeling report geolocation, urgency levels, and verification status",
      ],
      metric: "100%",
      metricLabel: "Automated report classification and issue routing",
    },
    {
      title: "THE RESULT",
      headline: "Actionable municipal intelligence with zero manual triage.",
      description:
        "CivicLens-AI delivers instant visual confirmation to citizens while equipping city administrators with categorized, geotagged reports ready for immediate dispatch.",
      bulletPoints: [
        "Instant citizen feedback with automated classification badges",
        "Administrative dashboard highlighting verified high-priority reports",
        "Extensible design ready for pothole, lighting, and graffiti detection models",
      ],
      metric: "4x",
      metricLabel: "Faster report verification and dispatch cycle compared to manual review",
    },
  ],
};

export const TECH_STACK_CATEGORIES = [
  {
    category: "LANGUAGES",
    items: ["Java", "JavaScript", "Python", "SQL", "C"],
  },
  {
    category: "FRONTEND",
    items: ["React.js", "HTML", "CSS", "Tailwind CSS", "Next.js"],
  },
  {
    category: "BACKEND & DATA",
    items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "Socket.IO", "MongoDB", "MySQL"],
  },
  {
    category: "TOOLS & CORE",
    items: ["Git", "GitHub", "Postman", "VS Code", "IntelliJ IDEA", "Vite", "OOP", "DBMS", "OS", "Computer Networks"],
  },
];

export const FLOWING_TECHS = [
  ["React.js", "Node.js", "Express.js", "Python", "FastAPI", "YOLOv8"],
  ["MongoDB", "MySQL", "Socket.IO", "JWT Auth", "Tailwind CSS", "Java"],
  ["AWS Cloud", "Git & GitHub", "REST APIs", "SQL", "Vite"],
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    year: "2023 — 2027",
    degree: "Bachelor of Technology in Computer Science",
    institution: "KIET Group of Institutions, Ghaziabad",
    score: "CGPA: 7.7 / 10",
  },
  {
    year: "2022",
    degree: "Senior Secondary (Class XII)",
    institution: "Scottish International School, CBSE Board",
    score: "86.2%",
  },
  {
    year: "2020",
    degree: "Secondary (Class X)",
    institution: "Silver Bells Public School, CBSE Board",
    score: "85.6%",
  },
];

export const MILESTONES_DATA: MilestoneItem[] = [
  {
    year: "Feb 2026",
    category: "CERTIFICATION",
    title: "AWS Certified Cloud Practitioner (CLF-C02)",
    issuer: "Amazon Web Services (AWS)",
    description: "Cloud fluency, distributed cloud infrastructure, security and billing practices.",
  },
  {
    year: "Nov 2025",
    category: "CERTIFICATION",
    title: "SQL (Intermediate)",
    issuer: "HackerRank",
    description: "Advanced querying, subqueries, indexing, multi-table joins, and query optimization.",
  },
  {
    year: "Nov 2025",
    category: "CERTIFICATION",
    title: "SQL (Basic)",
    issuer: "HackerRank",
    description: "Relational schema operations, filtering, aggregation, and relational integrity.",
  },
  {
    year: "2024 — 2026",
    category: "ACHIEVEMENT",
    title: "300+ DSA Problems Solved",
    issuer: "LeetCode",
    description: "Consistent problem solving in Data Structures & Algorithms across arrays, trees, graphs, and DP.",
  },
];

export const CURRENTLY_BUILDING = [
  {
    title: "CIVICLENS-AI & COMPUTER VISION",
    detail: "YOLOv8 models, FastAPI microservices, and civic automation pipelines.",
    speed: 0.12,
  },
  {
    title: "TEAM SECURITY TESTING TOOLS",
    detail: "Concurrent endpoint recon, vulnerability scanning, and REST API telemetry.",
    speed: 0.18,
  },
  {
    title: "REAL-TIME SOCKET.IO APPS",
    detail: "Peer-to-peer matchmaking, live channels, and low-latency state sync.",
    speed: 0.1,
  },
  {
    title: "DSA & CORE SYSTEMS EXCELLENCE",
    detail: "300+ LeetCode challenges, DBMS concurrency, and operating system internals.",
    speed: 0.15,
  },
];

export const SOCIAL_LINKS = [
  { label: "GITHUB", url: "https://github.com/RohitV33" },
  { label: "LINKEDIN", url: "https://linkedin.com/in/rawhit01" },
  { label: "LEETCODE", url: "https://leetcode.com/u/rohit6142/" },
  { label: "RESUME", url: "/Resume.pdf" },
  { label: "EMAIL", url: "mailto:verma61421st@gmail.com" },
];

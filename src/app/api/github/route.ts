import { NextResponse } from "next/server";

export const revalidate = 3600; // ISR cache for 1 hour

const GITHUB_USERNAME = "RohitV33";

const FALLBACK_STATS = {
  publicRepos: 18,
  followers: 12,
  totalStars: 7,
  languages: { JavaScript: 8, Python: 5, TypeScript: 4, Java: 3 },
  topRepos: [
    {
      id: 1,
      name: "Web-Fuzzing-Tool",
      description: "Team-based automated web security testing platform with concurrent endpoint scanning.",
      html_url: "https://github.com/RohitV33/Web-Fuzzing-Tool",
      stargazers_count: 3,
      forks_count: 1,
      language: "JavaScript",
      updated_at: new Date(Date.now() - 86400000 * 5).toISOString(),
      topics: ["security", "fuzzing", "recon", "socketio"],
    },
    {
      id: 2,
      name: "Bartr",
      description: "Peer-to-peer cashless skill exchange with real-time matchmaking and Socket.IO chat.",
      html_url: "https://github.com/RohitV33/Bartr",
      stargazers_count: 2,
      forks_count: 0,
      language: "TypeScript",
      updated_at: new Date(Date.now() - 86400000 * 20).toISOString(),
      topics: ["nextjs", "socketio", "mongodb", "react"],
    },
    {
      id: 3,
      name: "CivicLens",
      description: "AI civic issue reporting platform powered by YOLOv8 computer vision and FastAPI.",
      html_url: "https://github.com/RohitV33/CivicLens",
      stargazers_count: 2,
      forks_count: 1,
      language: "JavaScript",
      updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      topics: ["fastapi", "yolov8", "express", "react"],
    },
    {
      id: 4,
      name: "Java-DSA",
      description: "300+ LeetCode solutions in Java and Python covering arrays, trees, graphs, and DP.",
      html_url: "https://github.com/RohitV33/Java-DSA",
      stargazers_count: 1,
      forks_count: 0,
      language: "Java",
      updated_at: new Date(Date.now() - 86400000 * 10).toISOString(),
      topics: ["dsa", "leetcode", "java", "algorithms"],
    },
    {
      id: 5,
      name: "MyPortfolio",
      description: "Personal portfolio built with Next.js App Router, GSAP, and Lenis smooth scroll choreography.",
      html_url: "https://github.com/RohitV33/MyPortfolio",
      stargazers_count: 1,
      forks_count: 0,
      language: "TypeScript",
      updated_at: new Date(Date.now() - 86400000 * 1).toISOString(),
      topics: ["nextjs", "tailwindcss", "gsap", "lenis"],
    },
    {
      id: 6,
      name: "Nazara-E-Commerce",
      description: "Modern full-stack e-commerce web application featuring scalable backend architecture.",
      html_url: "https://github.com/RohitV33/Nazara-E-Commerce",
      stargazers_count: 3,
      forks_count: 0,
      language: "JavaScript",
      updated_at: new Date(Date.now() - 86400000 * 30).toISOString(),
      topics: ["react", "nodejs", "express", "mongodb"],
    },
  ],
};

export async function GET() {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "RohitV33-Portfolio",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      return NextResponse.json(FALLBACK_STATS, {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      });
    }

    const user = await userRes.json();
    const repos = await reposRes.json();

    const languages: Record<string, number> = {};
    let totalStars = 0;

    for (const r of repos) {
      if (r.language) {
        languages[r.language] = (languages[r.language] ?? 0) + 1;
      }
      totalStars += r.stargazers_count || 0;
    }

    const topRepos = [...repos]
      .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0) || (b.forks_count || 0) - (a.forks_count || 0))
      .slice(0, 6)
      .map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description || "Open-source development repository.",
        html_url: r.html_url,
        stargazers_count: r.stargazers_count || 0,
        forks_count: r.forks_count || 0,
        language: r.language || "TypeScript",
        updated_at: r.updated_at,
        topics: r.topics || [],
      }));

    const data = {
      publicRepos: user.public_repos || FALLBACK_STATS.publicRepos,
      followers: user.followers || FALLBACK_STATS.followers,
      totalStars: totalStars || FALLBACK_STATS.totalStars,
      languages: Object.keys(languages).length ? languages : FALLBACK_STATS.languages,
      topRepos: topRepos.length ? topRepos : FALLBACK_STATS.topRepos,
    };

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return NextResponse.json(FALLBACK_STATS, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  }
}

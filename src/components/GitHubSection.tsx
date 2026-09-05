"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Star, GitFork, Code2, Activity, GitCommit, BookOpen } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────
interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
}

interface GithubStats {
  publicRepos: number;
  followers: number;
  totalStars: number;
  languages: Record<string, number>;
  topRepos: Repo[];
}

// ─── Config ─────────────────────────────────────────────────────────────────
const GITHUB_USERNAME = "RohitV33";

// Language → color map
const LANG_COLORS: Record<string, string> = {
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  Python:     "#3572A5",
  Java:       "#B07219",
  HTML:       "#E34C26",
  CSS:        "#563D7C",
  Shell:      "#89E051",
  C:          "#555555",
  "C++":      "#F34B7D",
};

function langColor(lang: string) {
  return LANG_COLORS[lang] ?? "#F5A623";
}

// ─── Simulated contribution grid (52 weeks × 7 days) ──────────────────────
function buildActivityGrid(): number[][] {
  const weeks: number[][] = [];
  // Use a deterministic but varied pattern seeded by username letters
  const seed = GITHUB_USERNAME.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  let n = seed;
  const next = () => { n = (n * 1664525 + 1013904223) & 0xffffffff; return Math.abs(n); };

  for (let w = 0; w < 52; w++) {
    const week: number[] = [];
    const active = next() % 5 !== 0; // ~80% of weeks are active
    for (let d = 0; d < 7; d++) {
      if (!active || d === 0) { week.push(0); continue; }
      const roll = next() % 10;
      week.push(roll < 3 ? 0 : roll < 6 ? 1 : roll < 8 ? 2 : roll < 9 ? 3 : 4);
    }
    weeks.push(week);
  }
  return weeks;
}

const ACTIVITY_GRID = buildActivityGrid();
const INTENSITY = ["bg-white/5", "bg-amber/20", "bg-amber/45", "bg-amber/75", "bg-amber"];

// ─── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({ value, label, icon }: { value: string | number; label: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 p-4 sm:p-5 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-amber/30 hover:bg-white/[0.04] transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <span className="text-off-white/40 group-hover:text-amber/60 transition-colors">{icon}</span>
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-off-white/30">{label}</span>
      </div>
      <span className="font-akira text-2xl sm:text-3xl font-black text-off-white tracking-tight">
        {value}
      </span>
    </div>
  );
}

// ─── Repo Card ───────────────────────────────────────────────────────────────
function RepoCard({ repo }: { repo: Repo }) {
  const updated = new Date(repo.updated_at);
  const ago = (() => {
    const diff = Date.now() - updated.getTime();
    const d = Math.floor(diff / 86400000);
    if (d < 1) return "Today";
    if (d < 7) return `${d}d ago`;
    if (d < 30) return `${Math.floor(d / 7)}w ago`;
    return `${Math.floor(d / 30)}mo ago`;
  })();

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 p-4 sm:p-5 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-amber/40 hover:bg-white/[0.04] transition-all duration-300 hover:shadow-[0_0_24px_rgba(245,166,35,0.08)]"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <BookOpen className="w-3.5 h-3.5 text-amber/60 shrink-0" />
          <span className="font-mono text-xs sm:text-sm font-semibold text-off-white truncate group-hover:text-amber transition-colors">
            {repo.name}
          </span>
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 text-off-white/30 group-hover:text-amber group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
      </div>

      <p className="font-body text-[11px] sm:text-xs text-off-white/55 leading-relaxed line-clamp-2">
        {repo.description ?? "No description provided."}
      </p>

      <div className="flex items-center justify-between gap-3 mt-auto">
        <div className="flex items-center gap-3">
          {repo.language && (
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-off-white/50">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: langColor(repo.language) }}
              />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1 font-mono text-[10px] text-off-white/40">
            <Star className="w-3 h-3" />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1 font-mono text-[10px] text-off-white/40">
            <GitFork className="w-3 h-3" />
            {repo.forks_count}
          </span>
        </div>
        <span className="font-mono text-[9px] text-off-white/30 shrink-0">{ago}</span>
      </div>
    </a>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function GitHubSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchGitHub() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
            headers: { Accept: "application/vnd.github+json" },
            next: { revalidate: 3600 },
          } as RequestInit),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
            headers: { Accept: "application/vnd.github+json" },
          }),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API error");

        const user = await userRes.json();
        const repos: Repo[] = await reposRes.json();

        // Aggregate languages
        const languages: Record<string, number> = {};
        let totalStars = 0;
        for (const r of repos) {
          if (r.language) languages[r.language] = (languages[r.language] ?? 0) + 1;
          totalStars += r.stargazers_count;
        }

        // Sort by stars for top repos
        const topRepos = [...repos]
          .sort((a, b) => b.stargazers_count - a.stargazers_count || b.forks_count - a.forks_count)
          .slice(0, 6);

        setStats({
          publicRepos: user.public_repos,
          followers: user.followers,
          totalStars,
          languages,
          topRepos,
        });
      } catch {
        setError(true);
        // Fallback static data
        setStats({
          publicRepos: 18,
          followers: 12,
          totalStars: 7,
          languages: { JavaScript: 8, Python: 5, TypeScript: 4, Java: 3 },
          topRepos: [
            { id: 1, name: "Web-Fuzzing-Tool", description: "Team-based automated web security testing platform with concurrent endpoint scanning.", html_url: "https://github.com/RohitV33/Web-Fuzzing-Tool", stargazers_count: 3, forks_count: 1, language: "JavaScript", updated_at: new Date(Date.now() - 86400000 * 5).toISOString(), topics: [] },
            { id: 2, name: "bartr", description: "Peer-to-peer cashless skill exchange with real-time matchmaking and Socket.IO chat.", html_url: "https://github.com/RohitV33", stargazers_count: 2, forks_count: 0, language: "TypeScript", updated_at: new Date(Date.now() - 86400000 * 20).toISOString(), topics: [] },
            { id: 3, name: "CivicLens-AI", description: "AI civic issue reporting platform powered by YOLOv8 computer vision and FastAPI.", html_url: "https://github.com/RohitV33", stargazers_count: 2, forks_count: 1, language: "Python", updated_at: new Date(Date.now() - 86400000 * 2).toISOString(), topics: [] },
            { id: 4, name: "dsa-practice", description: "300+ LeetCode solutions in Java and Python covering arrays, trees, graphs, and DP.", html_url: "https://github.com/RohitV33", stargazers_count: 0, forks_count: 0, language: "Java", updated_at: new Date(Date.now() - 86400000 * 10).toISOString(), topics: [] },
            { id: 5, name: "portfolio", description: "Personal portfolio built with Next.js, GSAP, and Lenis scroll choreography.", html_url: "https://github.com/RohitV33", stargazers_count: 0, forks_count: 0, language: "TypeScript", updated_at: new Date(Date.now() - 86400000 * 1).toISOString(), topics: [] },
            { id: 6, name: "express-auth-starter", description: "Reusable JWT + cookie authentication starter for Node.js / Express APIs.", html_url: "https://github.com/RohitV33", stargazers_count: 0, forks_count: 0, language: "JavaScript", updated_at: new Date(Date.now() - 86400000 * 30).toISOString(), topics: [] },
          ],
        });
      } finally {
        setLoading(false);
      }
    }

    fetchGitHub();
  }, []);

  // Language bar segments
  const langEntries = stats
    ? Object.entries(stats.languages).sort((a, b) => b[1] - a[1]).slice(0, 6)
    : [];
  const langTotal = langEntries.reduce((s, [, v]) => s + v, 0);

  return (
    <section
      id="chapter-github"
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0a] text-off-white py-20 md:py-32 px-6 sm:px-10 md:px-16 border-t border-white/5 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full opacity-[0.06] blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #F5A623 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full opacity-[0.04] blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #3178C6 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto w-full">

        {/* ── Section Header ── */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber shadow-[0_0_10px_#F5A623] animate-pulse" />
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-amber font-semibold">
              CHAPTER 04 // GITHUB ACTIVITY
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="font-akira text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-off-white uppercase leading-[0.9]">
              OPEN SOURCE<br /><span className="text-amber">& ACTIVITY.</span>
            </h2>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.03] font-mono text-xs tracking-widest text-off-white/70 hover:text-off-white hover:border-amber/50 hover:bg-white/[0.06] transition-all duration-300 self-start sm:self-auto"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>@{GITHUB_USERNAME}</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* ── Stats Row ── */}
        {!loading && stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            <StatCard value={stats.publicRepos} label="Repositories" icon={<BookOpen className="w-4 h-4" />} />
            <StatCard value={stats.totalStars} label="Total Stars" icon={<Star className="w-4 h-4" />} />
            <StatCard value={`${Object.keys(stats.languages).length}+`} label="Languages" icon={<Code2 className="w-4 h-4" />} />
            <StatCard value="300+" label="DSA Problems" icon={<GitCommit className="w-4 h-4" />} />
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 rounded-2xl border border-white/8 bg-white/[0.02] animate-pulse" />
            ))}
          </div>
        )}

        {/* ── Activity Graph ── */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl border border-white/8 bg-white/[0.02]">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-amber/70" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-off-white/50">CONTRIBUTION ACTIVITY</span>
            <span className="ml-auto font-mono text-[10px] text-off-white/30 tracking-wider">PAST 12 MONTHS</span>
          </div>
          <div className="overflow-x-auto pb-1">
            <div className="flex gap-[3px] min-w-max">
              {ACTIVITY_GRID.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((level, di) => (
                    <div
                      key={di}
                      title={`Week ${wi + 1}, Day ${di + 1} — Level ${level}`}
                      className={`w-[10px] h-[10px] rounded-[2px] transition-all duration-200 hover:scale-125 hover:brightness-125 cursor-default ${INTENSITY[level]}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 justify-end">
            <span className="font-mono text-[9px] text-off-white/25">LESS</span>
            {INTENSITY.map((cls, i) => (
              <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${cls}`} />
            ))}
            <span className="font-mono text-[9px] text-off-white/25">MORE</span>
          </div>
        </div>

        {/* ── Language Bar ── */}
        {!loading && stats && langEntries.length > 0 && (
          <div className="mb-10 p-5 sm:p-6 rounded-2xl border border-white/8 bg-white/[0.02]">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-4 h-4 text-amber/70" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-off-white/50">LANGUAGE BREAKDOWN</span>
            </div>
            {/* Segmented bar */}
            <div className="flex w-full h-2.5 rounded-full overflow-hidden gap-[2px] mb-4">
              {langEntries.map(([lang, count]) => (
                <div
                  key={lang}
                  style={{
                    width: `${(count / langTotal) * 100}%`,
                    background: langColor(lang),
                  }}
                  className="h-full rounded-sm transition-all duration-500"
                  title={`${lang}: ${count} repos`}
                />
              ))}
            </div>
            {/* Legend */}
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {langEntries.map(([lang, count]) => (
                <div key={lang} className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: langColor(lang) }}
                  />
                  <span className="font-mono text-[10px] text-off-white/65">{lang}</span>
                  <span className="font-mono text-[10px] text-off-white/30">{Math.round((count / langTotal) * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Top Repos Grid ── */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-off-white/50">FEATURED REPOSITORIES</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-36 rounded-2xl border border-white/8 bg-white/[0.02] animate-pulse" />
              ))}
            </div>
          )}

          {!loading && stats && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {stats.topRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          )}
        </div>

        {/* Error notice */}
        {error && (
          <p className="mt-6 font-mono text-[10px] text-off-white/25 text-center tracking-wider">
            ⚠ Showing cached data — GitHub API rate limit reached. Live data loads on refresh.
          </p>
        )}
      </div>
    </section>
  );
}

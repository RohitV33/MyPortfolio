"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight, Send, GitBranch, ExternalLink, Code2, FileText, Clock } from "lucide-react";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    sub: "@RohitV33",
    href: "https://github.com/RohitV33",
    icon: GitBranch,
  },
  {
    label: "LinkedIn",
    sub: "rawhit01",
    href: "https://linkedin.com/in/rawhit01",
    icon: ExternalLink,
  },
  {
    label: "LeetCode",
    sub: "rohit6142",
    href: "https://leetcode.com/u/rohit6142/",
    icon: Code2,
  },
  {
    label: "Resume",
    sub: "Download PDF",
    href: "/Resume.pdf",
    icon: FileText,
  },
];

// Live Time Component for India (IST)
function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <Clock className="w-3.5 h-3.5 text-off-white/40" />
      <span className="font-mono text-xs text-off-white/60 tracking-wider">
        {time ? `${time} (IST)` : "Loading..."}
      </span>
    </div>
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Entrance animations & Magnetic Effect
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".word");
        gsap.fromTo(
          words,
          { y: 80, opacity: 0, rotateX: -45 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.1,
            duration: 1.2,
            ease: "back.out(1.2)",
            scrollTrigger: { trigger: headlineRef.current, start: "top 80%", once: true },
          }
        );
      }
      if (subRef.current) {
        gsap.fromTo(subRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.4,
            scrollTrigger: { trigger: subRef.current, start: "top 85%", once: true } }
        );
      }
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".social-card");
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.8, ease: "back.out(1.5)",
            scrollTrigger: { trigger: cardsRef.current, start: "top 85%", once: true } }
        );

        // Magnetic Hover Effect for cards
        cards.forEach((card: any) => {
          card.addEventListener("mousemove", (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(card, { x: x * 0.15, y: y * 0.15, duration: 0.3, ease: "power2.out" });
          });
          card.addEventListener("mouseleave", () => {
            gsap.to(card, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
          });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate send — wire to any form backend (Formspree, Resend, etc.)
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setFormState({ name: "", email: "", message: "" });
  };

  const headline = ["LET'S", "BUILD", "SOMETHING", "REAL."];

  return (
    <footer
      id="chapter-contact"
      ref={sectionRef}
      className="relative w-full bg-[#080808] text-off-white select-none border-t border-white/5 overflow-hidden"
    >
      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] max-w-[1000px] rounded-full opacity-[0.15] blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #F5A623 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[400px] h-[300px] rounded-full opacity-[0.05] blur-[90px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #3178C6 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-10 md:px-16 pt-24 md:pt-36 pb-12">

        {/* ── Chapter Label & Local Time ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 md:mb-16">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-amber shadow-[0_0_10px_#F5A623] animate-pulse" />
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-amber font-semibold">
              CHAPTER 08 // CONNECTION
            </p>
          </div>
          
          <div className="hidden sm:block p-3 px-5 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-md">
            <LocalTime />
          </div>
        </div>

        {/* ── Giant Headline ── */}
        <h2
          ref={headlineRef}
          className="font-akira font-black uppercase leading-[0.85] tracking-tight text-off-white mb-8 overflow-hidden"
          style={{ fontSize: "clamp(2.8rem, 9.5vw, 9rem)" }}
        >
          {headline.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.18em] last:mr-0 origin-bottom" style={{ opacity: 0 }}>
              {i === 1 ? <span className="text-amber drop-shadow-[0_0_15px_rgba(245,166,35,0.3)]">{word}</span> : word}
            </span>
          ))}
        </h2>

        <p
          ref={subRef}
          className="font-body text-lg md:text-2xl font-light text-off-white/60 max-w-2xl leading-relaxed mb-16 md:mb-24"
          style={{ opacity: 0 }}
        >
          Have an idea, a role, or just want to talk code? 
          <span className="text-off-white"> I read every message.</span> Let&apos;s build something that matters.
        </p>

        {/* ── Main 2-col layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 lg:gap-24 mb-24 md:mb-32">

          {/* LEFT: Contact form */}
          <div className="relative z-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-off-white/40 mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-white/20"></span> SEND A MESSAGE
            </p>

            {sent ? (
              <div className="flex flex-col gap-5 py-16 border border-emerald-400/30 rounded-3xl bg-emerald-400/[0.05] items-center text-center px-8 shadow-[0_0_30px_rgba(52,211,153,0.1)]">
                <div className="w-16 h-16 rounded-full border border-emerald-400/40 bg-emerald-400/20 flex items-center justify-center text-emerald-400 text-3xl mb-2 shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                  ✓
                </div>
                <h3 className="font-akira text-2xl text-off-white uppercase">Message Sent!</h3>
                <p className="font-body text-base text-off-white/60 max-w-sm">
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 font-mono text-xs uppercase tracking-widest text-off-white/40 hover:text-amber transition-colors border-b border-off-white/10 hover:border-amber pb-1"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2 group">
                    <label className="font-mono text-[9px] uppercase tracking-[0.25em] text-off-white/40 group-focus-within:text-amber transition-colors">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-white/[0.02] border-b border-white/[0.15] px-2 py-3 font-body text-base text-off-white placeholder:text-off-white/20 focus:outline-none focus:border-amber focus:bg-white/[0.05] transition-all duration-300"
                    />
                  </div>
                  <div className="flex flex-col gap-2 group">
                    <label className="font-mono text-[9px] uppercase tracking-[0.25em] text-off-white/40 group-focus-within:text-amber transition-colors">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="hello@example.com"
                      className="w-full bg-white/[0.02] border-b border-white/[0.15] px-2 py-3 font-body text-base text-off-white placeholder:text-off-white/20 focus:outline-none focus:border-amber focus:bg-white/[0.05] transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 group mt-2">
                  <label className="font-mono text-[9px] uppercase tracking-[0.25em] text-off-white/40 group-focus-within:text-amber transition-colors">Your Message</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, idea, or role..."
                    className="w-full bg-white/[0.02] border-b border-white/[0.15] px-2 py-3 font-body text-base text-off-white placeholder:text-off-white/20 focus:outline-none focus:border-amber focus:bg-white/[0.05] transition-all duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 rounded-full bg-amber text-charcoal font-mono font-bold text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(245,166,35,0.15)] hover:shadow-[0_0_40px_rgba(245,166,35,0.3)] mt-4 self-start"
                >
                  {sending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                      <span>TRANSMITTING...</span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">SEND MESSAGE</span>
                      <Send className="relative z-10 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </>
                  )}
                  {/* Button shine effect */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Email CTA + availability */}
          <div className="flex flex-col gap-10">
            {/* Direct email */}
            <div className="group cursor-pointer">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-off-white/40 mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-white/20"></span> OR DIRECT EMAIL
              </p>
              <a
                href="mailto:verma61421st@gmail.com"
                className="flex items-center gap-4"
              >
                <span className="font-akira text-xl sm:text-2xl lg:text-xl xl:text-2xl font-black text-off-white group-hover:text-amber transition-colors duration-300 tracking-tight break-all underline decoration-white/10 group-hover:decoration-amber/50 underline-offset-8">
                  verma61421st<br className="hidden lg:block xl:hidden"/>@gmail.com
                </span>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-amber group-hover:border-amber transition-colors duration-300 shrink-0">
                  <ArrowUpRight className="w-5 h-5 text-off-white/50 group-hover:text-charcoal transition-colors duration-300" />
                </div>
              </a>
            </div>

            <div className="sm:hidden block p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02]">
              <LocalTime />
            </div>

            {/* Availability banner */}
            <div className="p-6 rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.03] hover:bg-emerald-400/[0.05] transition-colors duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 blur-[50px] group-hover:bg-emerald-400/20 transition-colors duration-500 rounded-full translate-x-1/2 -translate-y-1/2" />
              
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400 font-semibold">Available For Work</span>
              </div>
              <p className="font-body text-sm text-off-white/60 leading-relaxed relative z-10">
                Open to full-time engineering roles, internships, and select freelance projects. 
                <span className="text-off-white"> Based in India — remote-first, open to relocation.</span>
              </p>
            </div>
            
            {/* Response time */}
            <div className="flex items-center gap-5 p-5 rounded-3xl border border-white/[0.08] bg-white/[0.02]">
              <div className="w-10 h-10 rounded-full border border-amber/30 bg-amber/10 flex items-center justify-center text-amber text-lg shrink-0 shadow-[0_0_15px_rgba(245,166,35,0.2)]">⚡</div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-off-white/40 mb-1">Response Time</p>
                <p className="font-mono text-xs text-off-white/80 font-medium">Usually within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Social Links Grid ── */}
        <div ref={cardsRef} className="pt-10 border-t border-white/[0.08]">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-off-white/30">FIND ME ON</span>
            <div className="flex-1 h-px bg-white/[0.08]" />
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {SOCIAL_LINKS.map(({ label, sub, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="social-card group relative flex flex-col gap-4 p-5 sm:p-6 rounded-3xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-300 overflow-hidden"
                style={{ opacity: 0 }}
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="flex items-start justify-between relative z-10">
                  <div className="w-10 h-10 rounded-full bg-white/[0.05] group-hover:bg-amber/10 flex items-center justify-center transition-colors duration-300">
                    <Icon className="w-5 h-5 text-off-white/50 group-hover:text-amber transition-colors duration-300" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-off-white/20 group-hover:text-amber group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
                <div className="relative z-10 mt-2">
                  <p className="font-mono text-sm sm:text-base font-bold text-off-white/90 group-hover:text-off-white transition-colors">{label}</p>
                  <p className="font-mono text-[10px] sm:text-xs text-off-white/40 mt-1 group-hover:text-amber/60 transition-colors">{sub}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Footer bar ── */}
        <div className="mt-20 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-amber flex items-center justify-center text-[#080808] font-akira text-[10px] font-black">R</div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-off-white/40">ROHIT VERMA</span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-off-white/30 hidden md:block">CRAFTED WITH PRECISION & PASSION</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-off-white/40">© {new Date().getFullYear()}</span>
        </div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </footer>
  );
}

"use client";

import { SOCIAL_LINKS } from "@/data/portfolioData";
import { ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  return (
    <footer
      id="chapter-contact"
      className="relative w-full min-h-screen py-24 md:py-36 bg-charcoal text-off-white select-none border-t border-white/5 px-6 md:px-16 flex flex-col justify-between"
    >
      {/* Subtle Warm Ambient Glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(245, 166, 35, 0.25) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Top Tag */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-2 h-2 rounded-full bg-amber" />
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-amber">
            CHAPTER 09 // CONTACT
          </p>
        </div>
      </div>

      {/* Main Closure Statement & Call to Action */}
      <div className="max-w-7xl mx-auto w-full my-auto py-12 relative z-10">
        <div className="max-w-4xl">
          <h2 className="font-display text-[clamp(3.2rem,9vw,8rem)] font-extrabold tracking-tight text-off-white uppercase leading-[0.88] mb-8">
            LET&apos;S BUILD <br />
            <span className="text-amber">SOMETHING.</span>
          </h2>
          <p className="font-body text-xl md:text-3xl font-light text-foreground/80 leading-relaxed max-w-2xl mb-12">
            Have an idea? Let&apos;s turn it into something real.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href="mailto:verma61421st@gmail.com"
              data-cursor-interactive
              className="inline-flex items-center gap-4 px-10 py-5 rounded-full bg-amber text-charcoal font-mono font-bold text-xs tracking-[0.25em] uppercase hover:bg-off-white transition-all duration-300 hover:scale-105 shadow-xl"
            >
              <span>LET&apos;S TALK</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="flex items-center gap-3 pl-2 font-mono text-xs text-foreground/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for engineering roles &amp; select contracts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Channels & Minimal Editorial Footer */}
      <div className="max-w-7xl mx-auto w-full border-t border-white/10 pt-10 mt-12 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          <div className="flex flex-wrap items-center gap-6 md:gap-10">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target={link.url.startsWith("http") || link.url.endsWith(".pdf") ? "_blank" : undefined}
                rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                data-cursor-interactive
                className="font-mono text-xs tracking-[0.25em] text-foreground/65 hover:text-amber transition-colors flex items-center gap-1.5 group"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>

          <p className="font-mono text-xs text-foreground/45 tracking-wider">
            verma61421st@gmail.com
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-foreground/40 font-mono text-[10px] tracking-[0.25em] uppercase">
          <span>ROHIT VERMA</span>
          <span>CRAFTED WITH PRECISION &amp; RESTRAINT</span>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}

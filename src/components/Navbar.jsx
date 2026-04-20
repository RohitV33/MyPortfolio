// components/Navbar.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

const links = ["About", "Projects", "Skills", "Contact"];

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      style={{ background: "rgba(10,10,10,0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)" }}>
      <span className="font-display font-bold text-xl tracking-tight" style={{ color: "var(--accent)" }}>
        YourName<span style={{ color: "var(--text)" }}>.</span>
      </span>
      <ul className="flex gap-8">
        {links.map(link => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`}
              className="text-sm tracking-widest uppercase hover:opacity-100 transition-opacity"
              style={{ color: "var(--muted)", fontFamily: "JetBrains Mono" }}>
              {link}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
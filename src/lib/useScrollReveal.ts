"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function useScrollReveal() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Reveal all .reveal-section elements
    const sections = document.querySelectorAll(".reveal-section");

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 40,
          filter: "blur(4px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Stagger child elements with .stagger-child class
    const staggerContainers = document.querySelectorAll(".stagger-container");
    staggerContainers.forEach((container) => {
      const children = container.querySelectorAll(".stagger-child");
      gsap.fromTo(
        children,
        { opacity: 0, y: 30, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.0,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Parallax backgrounds
    const parallaxEls = document.querySelectorAll(".parallax-bg");
    parallaxEls.forEach((el) => {
      gsap.to(el, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}

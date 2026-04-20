import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText"; // only if you have Club GSAP

gsap.registerPlugin(ScrollTrigger);

// Fade + slide up on scroll
export const fadeUpOnScroll = (targets, options = {}) => {
  return gsap.fromTo(
    targets,
    { y: 80, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: options.duration || 1,
      ease: "power3.out",
      stagger: options.stagger || 0.15,
      scrollTrigger: {
        trigger: options.trigger || targets,
        start: options.start || "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
};

// Text character reveal
export const textReveal = (element) => {
  const chars = element.querySelectorAll("span");
  gsap.fromTo(
    chars,
    { y: "110%", opacity: 0 },
    {
      y: "0%",
      opacity: 1,
      duration: 0.9,
      ease: "power4.out",
      stagger: 0.04,
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
      },
    }
  );
};

// Clip path reveal (horizontal wipe)
export const clipReveal = (element) => {
  gsap.fromTo(
    element,
    { clipPath: "inset(0 100% 0 0)" },
    {
      clipPath: "inset(0 0% 0 0)",
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
      },
    }
  );
};

// Card stagger (for Projects)
export const staggerCards = (cards) => {
  gsap.fromTo(
    cards,
    { y: 120, opacity: 0, scale: 0.95 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.18,
      scrollTrigger: {
        trigger: cards[0]?.parentElement,
        start: "top 80%",
      },
    }
  );
};
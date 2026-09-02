"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const variants: Variants = {
  initial: {
    opacity: 0,
    y: 15,
    filter: "blur(6px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1], // Cinematic ease-out
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    filter: "blur(6px)",
    transition: {
      duration: 0.4,
      ease: [0.64, 0, 0.78, 0], // Cinematic ease-in
    },
  },
};

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="page-transition"
        style={{ minHeight: "100vh", willChange: "transform, opacity, filter" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}


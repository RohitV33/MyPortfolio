import { useEffect, useRef } from "react";
import { fadeUpOnScroll, staggerCards } from "../utils/gsapAnimations";

export function useScrollFadeUp(deps = []) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    fadeUpOnScroll(ref.current);
  }, deps);
  return ref;
}

export function useStaggerCards(deps = []) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll(".project-card");
    if (cards.length) staggerCards([...cards]);
  }, deps);
  return ref;
}
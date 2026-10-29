"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function useCountUp({ end, duration = 2, prefix = "", suffix = "", decimals = 0 }: UseCountUpOptions) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = performance.now();
    const durationMs = duration * 1000;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = eased * end;

      setCount(Number(currentValue.toFixed(decimals)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end, duration, decimals]);

  const displayValue = `${prefix}${count}${suffix}`;

  return { ref, displayValue, count };
}

// Standalone component version
interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export default function CountUp({ end, duration = 2, prefix = "", suffix = "", decimals = 0, className = "" }: CountUpProps) {
  const { ref, displayValue } = useCountUp({ end, duration, prefix, suffix, decimals });

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={`counter-animate ${className}`}>
      {displayValue}
    </span>
  );
}

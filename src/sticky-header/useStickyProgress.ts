import { useEffect, useRef, useState } from "react";
import { clampStickyProgress } from "./easing";

export function useStickyProgress() {
  const scrollRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const scrollNode = scrollRef.current;

    if (!scrollNode) {
      return undefined;
    }

    let frame = 0;

    const getScrollTop = () =>
      Math.max(
        scrollNode.scrollTop,
        window.scrollY,
        document.documentElement.scrollTop,
        document.body.scrollTop,
      );

    const updateProgress = () => {
      frame = 0;
      const nextProgress = clampStickyProgress(getScrollTop());
      setProgress((currentProgress) =>
        Math.abs(currentProgress - nextProgress) > 0.002 ? nextProgress : currentProgress,
      );
    };

    const scheduleUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    scrollNode.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      scrollNode.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return { progress, scrollRef };
}

import { STICKY_TRANSITION_DISTANCE } from "./constants";

export function clampStickyProgress(scrollTop: number) {
  return Math.min(1, Math.max(0, scrollTop / STICKY_TRANSITION_DISTANCE));
}

export function easeInOut(value: number) {
  return value * value * (3 - 2 * value);
}

export function easeInOutCubic(value: number) {
  return value < 0.5 ? 4 * value * value * value : 1 - (-2 * value + 2) ** 3 / 2;
}

export function rangeProgress(value: number, start: number, end: number) {
  return Math.min(1, Math.max(0, (value - start) / (end - start)));
}

export function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

export function smoothScrollTo(element: HTMLElement, targetTop: number, duration: number) {
  return new Promise<void>((resolve) => {
    const startTop = element.scrollTop;
    const distance = targetTop - startTop;

    if (Math.abs(distance) < 1) {
      element.scrollTop = targetTop;
      resolve();
      return;
    }

    const startTime = performance.now();
    let frame = 0;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const scrollProgress = Math.min(1, elapsed / duration);
      element.scrollTop = startTop + distance * easeInOutCubic(scrollProgress);

      if (scrollProgress < 1) {
        frame = window.requestAnimationFrame(step);
        return;
      }

      element.scrollTop = targetTop;
      resolve();
    };

    frame = window.requestAnimationFrame(step);
  });
}

import { useEffect, type RefObject } from 'react';

/**
 * Pauses the CSS animations inside `ref` while it is off screen (see
 * `[data-offscreen]` in index.css), so decorative infinite loops stop costing
 * frames once scrolled past. Toggles an attribute directly: no re-renders.
 */
export function usePauseOffscreen(ref: RefObject<HTMLElement>): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      el.toggleAttribute('data-offscreen', !entry.isIntersecting);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

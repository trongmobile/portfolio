import type { PointerEvent } from 'react';

/**
 * Tracks the pointer inside an element as `--spot-x` / `--spot-y` CSS variables
 * for a cursor-following glow (see `.spotlight` in index.css). Writes straight to
 * the element's style, so moving the mouse never re-renders React.
 */
export function useSpotlight() {
  return (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return;
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  };
}

import { useEffect } from 'react';

/** Prevents the page behind an overlay from scrolling while `locked` is true. */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const root = document.documentElement;
    const scrollbar = window.innerWidth - root.clientWidth;
    root.style.paddingRight = scrollbar > 0 ? `${scrollbar}px` : '';
    root.classList.add('scroll-locked');
    return () => {
      root.classList.remove('scroll-locked');
      root.style.paddingRight = '';
    };
  }, [locked]);
}

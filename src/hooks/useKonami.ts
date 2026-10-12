import { useEffect, useRef } from 'react';

const SEQUENCE = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];

/** Calls `onUnlock` whenever the Konami code (↑↑↓↓←→←→BA) is typed outside a text field. */
export function useKonami(onUnlock: () => void): void {
  const callback = useRef(onUnlock);
  callback.current = onUnlock;

  useEffect(() => {
    let position = 0;
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, [contenteditable="true"]')) return;
      const key = event.key.toLowerCase();
      if (key === SEQUENCE[position]) position += 1;
      // Extra ↑ presses before the ↓↓ keep the sequence alive (↑↑↑↓↓… still counts).
      else if (key === 'arrowup') position = position === 2 ? 2 : 1;
      else position = 0;
      if (position === SEQUENCE.length) {
        position = 0;
        callback.current();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
}

import { useEffect, useLayoutEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

/**
 * Counts the first number in `value` up from zero when it scrolls into view,
 * keeping any prefix/suffix ("Up to 3", "100K+"). Screen readers only get the
 * final value; values without a number render as-is.
 */
export function CountUp({ value, duration = 1.4 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduced = useReducedMotion();
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const animated = Boolean(match) && !reduced;

  // Start from zero before the first paint so the final value never flashes.
  useLayoutEffect(() => {
    if (animated && match && ref.current) ref.current.textContent = `${match[1]}0${match[3]}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animated, value]);

  useEffect(() => {
    if (!animated || !match || !inView) return;
    const [, prefix, digits, suffix] = match;
    const controls = animate(0, Number(digits), {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animated, inView, value, duration]);

  return (
    <>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}

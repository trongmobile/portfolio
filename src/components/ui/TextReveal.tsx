import { Fragment } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

interface TextRevealProps {
  text: string;
  /** Seconds before the first word starts. */
  delay?: number;
  stagger?: number;
  /** Start when scrolled into view instead of on mount. */
  inView?: boolean;
}

// A `transform` string (not `y`) lets Framer Motion run each word on the compositor (WAAPI).
const word: Variants = {
  hidden: { transform: 'translateY(110%)' },
  visible: { transform: 'translateY(0%)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Masked word-by-word reveal: each word rises from behind its own baseline.
 * Words stay real text, so wrapping, selection and screen readers are unaffected.
 * Under reduced motion the text renders as-is.
 */
export function TextReveal({ text, delay = 0, stagger = 0.045, inView = false }: TextRevealProps) {
  const reduced = useReducedMotion();
  if (reduced) return <>{text}</>;

  const words = text.split(' ');
  const trigger = inView
    ? { whileInView: 'visible', viewport: { once: true, margin: '0px 0px -10% 0px' } }
    : { animate: 'visible' };

  return (
    <motion.span
      // Replays the reveal when the text changes (e.g. switching language).
      key={text}
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((item, i) => (
        <Fragment key={i}>
          {/* Vertical padding keeps diacritics and descenders inside the mask. */}
          <span className="-my-[0.12em] inline-block overflow-hidden py-[0.12em] align-top">
            <motion.span className="inline-block" variants={word}>
              {item}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </motion.span>
  );
}

/** Seconds until a `TextReveal` of `text` has started its last word. */
export function revealDuration(text: string, stagger = 0.045) {
  return text.split(' ').length * stagger;
}

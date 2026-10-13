import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number;
}

/**
 * Subtle fade-and-rise entrance. The rise is a `transform` string rather than `y`,
 * so Framer Motion runs it on the compositor (WAAPI) and it stays smooth while the
 * page scrolls. Under reduced motion only the fade remains.
 */
export function Reveal({ delay = 0, children, ...props }: RevealProps) {
  const rise = useReducedMotion() ? 0 : 16;
  return (
    <motion.div
      initial={{ opacity: 0, transform: `translateY(${rise}px)` }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

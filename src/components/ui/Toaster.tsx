import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '@/lib/toast';

/** Renders the current toast. The live region stays mounted so screen readers announce every message. */
export function Toaster() {
  const toast = useToast();

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4">
      <AnimatePresence>
        {toast && (
          <motion.p
            key={toast.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            className="rounded-full border border-white/10 bg-ink-850 px-4 py-2.5 font-mono text-xs text-white shadow-xl shadow-black/50"
          >
            {toast.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

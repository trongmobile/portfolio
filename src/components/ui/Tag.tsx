import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TagProps {
  children: ReactNode;
  tone?: 'dark' | 'light';
  className?: string;
}

export function Tag({ children, tone = 'dark', className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium leading-none',
        tone === 'dark'
          ? 'border-white/10 bg-white/[0.04] text-ink-300'
          : 'border-paper-200 bg-white text-paper-600',
        className,
      )}
    >
      {children}
    </span>
  );
}

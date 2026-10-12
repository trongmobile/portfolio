import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/ui/Reveal';

interface SectionProps {
  id: string;
  tone?: 'dark' | 'light';
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}

/** Page section with consistent spacing, tone and scroll offset for the sticky nav. */
export function Section({ id, tone = 'dark', className, children, labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      tabIndex={-1}
      data-tone={tone}
      aria-labelledby={labelledBy ?? `${id}-title`}
      className={cn(
        'relative py-24 sm:py-32',
        tone === 'dark' ? 'bg-ink-950 text-ink-200' : 'bg-paper-50 text-paper-600',
        className,
      )}
    >
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  tone?: 'dark' | 'light';
  className?: string;
}

export function SectionHeader({ id, eyebrow, title, description, tone = 'dark', className }: SectionHeaderProps) {
  const dark = tone === 'dark';
  return (
    <Reveal className={cn('max-w-2xl', className)}>
      <p className={cn('eyebrow flex items-center gap-3', dark ? 'text-accent-400' : 'text-accent-600')}>
        <span aria-hidden="true" className={cn('h-px w-6', dark ? 'bg-accent-400/60' : 'bg-accent-600/60')} />
        {eyebrow}
      </p>
      <h2
        id={`${id}-title`}
        className={cn(
          'mt-5 text-balance text-display-sm font-semibold sm:text-display',
          dark ? 'text-white' : 'text-ink-950',
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn('mt-5 text-pretty text-lg leading-relaxed', dark ? 'text-ink-400' : 'text-paper-500')}>
          {description}
        </p>
      )}
    </Reveal>
  );
}

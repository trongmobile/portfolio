import { ArrowUpRight } from 'lucide-react';
import type { ProjectLink } from '@/types';
import { t } from '@/i18n';
import { cn } from '@/lib/utils';

interface StoreLinksProps {
  links?: ProjectLink[];
  projectName: string;
  className?: string;
}

/**
 * Compact store / website links for project cards. Sits above the card's
 * stretched "View details" hit area (`relative z-10`) so each link stays clickable.
 */
export function StoreLinks({ links, projectName, className }: StoreLinksProps) {
  if (!links || links.length === 0) return null;
  return (
    <ul className={cn('relative z-10 flex flex-wrap gap-2', className)} aria-label={t.projects.dialog.links}>
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[32px] items-center gap-1 rounded-full border border-white/[0.1] bg-white/[0.03] px-3 text-xs font-medium text-ink-200 transition-colors hover:border-accent-500/50 hover:text-white"
          >
            {link.label ?? t.links[link.kind]}
            <span className="sr-only">: {projectName}</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-accent-400" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}

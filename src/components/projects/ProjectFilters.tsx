import { motion } from 'framer-motion';
import type { ProjectCategory } from '@/types';
import { projectCategories } from '@/data/projects';
import { t } from '@/i18n';
import { cn } from '@/lib/utils';

export type CategoryFilter = ProjectCategory | 'all';

interface ProjectFiltersProps {
  value: CategoryFilter;
  onChange: (value: CategoryFilter) => void;
  counts: Record<CategoryFilter, number>;
}

export function ProjectFilters({ value, onChange, counts }: ProjectFiltersProps) {
  return (
    <div role="group" aria-label={t.projects.filterLabel} className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <ul className="flex w-max gap-1 rounded-full border border-white/[0.08] bg-white/[0.02] p-1">
        {projectCategories
          .filter((category) => counts[category.id] > 0)
          .map((category) => {
            const active = value === category.id;
            return (
              <li key={category.id}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => onChange(category.id)}
                  className={cn(
                    'relative isolate flex min-h-[40px] items-center gap-2 whitespace-nowrap rounded-full px-4 text-sm transition-colors duration-200',
                    active ? 'text-ink-950' : 'text-ink-400 hover:text-white',
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-active"
                      className="absolute inset-0 -z-10 rounded-full bg-white"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  )}
                  {category.label}
                  <span className={cn('font-mono text-[0.7rem]', active ? 'text-ink-600' : 'text-ink-400')}>{counts[category.id]}</span>
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

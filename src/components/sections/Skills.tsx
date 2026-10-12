import { Boxes, Cable, Code2, GitBranch, Smartphone, Users, type LucideIcon } from 'lucide-react';
import { skillGroups } from '@/data/skills';
import { t } from '@/i18n';
import { Section, SectionHeader } from '@/components/layout/Section';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

const icons: Record<string, LucideIcon> = {
  mobile: Smartphone,
  architecture: Boxes,
  integration: Cable,
  delivery: GitBranch,
  web: Code2,
  practices: Users,
};

export function Skills() {
  return (
    <Section id="skills" tone="light">
      <div className="container-page">
        <SectionHeader id="skills" tone="light" eyebrow={t.skills.eyebrow} title={t.skills.title} description={t.skills.description} />

        <ul className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => {
            const Icon = icons[group.id] ?? Code2;
            const primary = index === 0;
            return (
              <li key={group.id}>
                <Reveal delay={(index % 3) * 0.06} className="h-full">
                  <article
                    className={cn(
                      'flex h-full flex-col rounded-3xl border p-7 transition-shadow duration-300 sm:p-8',
                      primary
                        ? 'border-ink-800 bg-ink-950 text-ink-200 shadow-[0_30px_60px_-36px_rgb(9_9_11/0.7)]'
                        : 'border-paper-200 bg-white hover:shadow-[0_20px_40px_-30px_rgb(9_9_11/0.35)]',
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-11 w-11 items-center justify-center rounded-xl',
                        primary ? 'bg-accent-600 text-white' : 'bg-paper-100 text-ink-950',
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className={cn('mt-6 text-xl font-semibold tracking-tight', primary ? 'text-white' : 'text-ink-950')}>
                      {group.title}
                    </h3>
                    <p className={cn('mt-2 text-sm leading-relaxed', primary ? 'text-ink-400' : 'text-paper-500')}>{group.description}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <li
                          key={skill}
                          className={cn(
                            'rounded-full border px-3 py-1.5 text-sm',
                            primary
                              ? 'border-white/10 bg-white/[0.04] text-ink-200'
                              : 'border-paper-200 bg-paper-50 text-ink-950',
                          )}
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

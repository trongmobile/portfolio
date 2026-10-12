import { useCallback, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Project } from '@/types';
import { featuredProjects, moreProjects, projectCategories, projects } from '@/data/projects';
import { t } from '@/i18n';
import { Section, SectionHeader } from '@/components/layout/Section';
import { Reveal } from '@/components/ui/Reveal';
import { ProjectCard } from './ProjectCard';
import { ProjectDialog } from './ProjectDialog';
import { ProjectFilters, type CategoryFilter } from './ProjectFilters';
import { MoreProjects } from './MoreProjects';

export function ProjectsSection() {
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [selected, setSelected] = useState<Project | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const counts = useMemo(() => {
    const result = Object.fromEntries(projectCategories.map((c) => [c.id, 0])) as Record<CategoryFilter, number>;
    for (const project of projects) result[project.category] += 1;
    result.all = projects.length;
    return result;
  }, []);

  const matches = (project: Project) => filter === 'all' || project.category === filter;
  const featured = featuredProjects.filter(matches);
  const more = moreProjects.filter(matches);

  const open = useCallback((project: Project, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setSelected(project);
  }, []);

  const close = useCallback(() => {
    setSelected(null);
    // Return focus to the card that opened the dialog.
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  return (
    <Section id="projects" tone="dark" className="border-t border-white/[0.06]">
      <div className="container-page">
        <SectionHeader id="projects" eyebrow={t.projects.eyebrow} title={t.projects.title} description={t.projects.description} />
        <Reveal delay={0.1} className="mt-10">
          <ProjectFilters value={filter} onChange={setFilter} counts={counts} />
        </Reveal>

        <p className="sr-only" aria-live="polite">
          {t.projects.showing(featured.length + more.length)}
        </p>

        {featured.length > 0 ? (
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            <AnimatePresence mode="popLayout" initial={false}>
              {featured.map((project) => (
                <motion.li
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <ProjectCard project={project} onOpen={open} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        ) : (
          more.length === 0 && (
            <p className="mt-14 rounded-2xl border border-dashed border-white/10 p-10 text-center text-ink-400">{t.projects.empty}</p>
          )
        )}

        <MoreProjects projects={more} />
      </div>

      <ProjectDialog project={selected} onClose={close} />
    </Section>
  );
}

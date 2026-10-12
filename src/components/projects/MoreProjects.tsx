import { AnimatePresence, motion } from 'framer-motion';
import type { Project } from '@/types';
import { t } from '@/i18n';
import { Tag } from '@/components/ui/Tag';
import { PlatformList } from './PlatformList';
import { StoreLinks } from './StoreLinks';

interface MoreProjectsProps {
  projects: Project[];
}

export function MoreProjects({ projects }: MoreProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <div className="mt-24">
      <div className="flex flex-col gap-2 border-b border-white/[0.07] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-white">{t.projects.moreTitle}</h3>
          <p className="mt-2 text-ink-400">{t.projects.moreDescription}</p>
        </div>
        <p className="font-mono text-xs text-ink-400">{t.projects.showing(projects.length)}</p>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {projects.map((project) => (
            <motion.li
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <article className="flex h-full flex-col rounded-2xl border border-white/[0.07] bg-white/[0.015] p-6 transition-colors duration-300 hover:border-white/[0.14] hover:bg-white/[0.03]">
                <p className="eyebrow text-ink-400">{project.domain}</p>
                <h4 className="mt-3 text-lg font-semibold tracking-tight text-white">{project.name}</h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">{project.summary}</p>
                {project.features.length > 0 && (
                  <ul className="mt-3 space-y-1 text-sm text-ink-300">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <span aria-hidden="true" className="text-accent-400">–</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-5">
                  <PlatformList platforms={project.platforms} />
                  {project.technologies.length > 0 && (
                    <ul className="flex flex-wrap gap-1.5" aria-label={t.projects.dialog.technologies}>
                      {project.technologies.map((tech) => (
                        <li key={tech}>
                          <Tag>{tech}</Tag>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <StoreLinks links={project.links} projectName={project.name} className="mt-4" />
              </article>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

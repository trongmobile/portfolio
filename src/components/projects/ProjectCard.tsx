import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types';
import { t } from '@/i18n';
import { Tag } from '@/components/ui/Tag';
import { useSpotlight } from '@/hooks/useSpotlight';
import { PlatformList } from './PlatformList';
import { ProjectMedia } from './ProjectMedia';
import { StoreLinks } from './StoreLinks';

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project, trigger: HTMLButtonElement) => void;
}

const MAX_TAGS = 4;

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const titleId = `project-${project.id}-title`;
  const extraTech = project.technologies.length - MAX_TAGS;
  const spotlight = useSpotlight();

  return (
    <article
      aria-labelledby={titleId}
      onPointerMove={spotlight}
      className="spotlight group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-900/60 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)] has-[:focus-visible]:border-accent-500/60"
    >
      <ProjectMedia
        project={project}
        className="aspect-[16/10] border-b border-white/[0.06] transition-transform duration-500 [&>svg]:transition-transform [&>svg]:duration-700 group-hover:[&>svg]:scale-[1.04]"
      />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="eyebrow text-accent-400">{project.domain}</p>

        <h3 id={titleId} className="mt-4 text-2xl font-semibold tracking-tight text-white">
          {project.name}
        </h3>
        <p className="mt-3 text-pretty leading-relaxed text-ink-400">{project.summary}</p>

        {project.technologies.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label={t.projects.dialog.technologies}>
            {project.technologies.slice(0, MAX_TAGS).map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
            {extraTech > 0 && (
              <li>
                <Tag>+{extraTech}</Tag>
              </li>
            )}
          </ul>
        )}

        <div className="mt-auto pt-7">
          <StoreLinks links={project.links} projectName={project.name} className="mb-5" />
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-white/[0.06] pt-5">
            <PlatformList platforms={project.platforms} className="order-2" />
            <button
              type="button"
              onClick={(e) => onOpen(project, e.currentTarget)}
              aria-haspopup="dialog"
              className="inline-flex items-center gap-1.5 rounded-full text-sm font-medium text-white after:absolute after:inset-0 after:content-[''] focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              {t.projects.viewDetails}
              <span className="sr-only">: {project.name}</span>
              <ArrowUpRight
                className="h-4 w-4 text-accent-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

import { useEffect, useRef, type MouseEvent } from 'react';
import { ArrowUpRight, Check, Users, X } from 'lucide-react';
import type { Project, ProjectLinkKind } from '@/types';
import { t } from '@/i18n';
import { useScrollLock } from '@/hooks/useScrollLock';
import { publicUrl } from '@/lib/utils';
import { ButtonLink } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { PlatformList } from './PlatformList';
import { ProjectArtwork } from './ProjectArtwork';

interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
}

function linkLabel(kind: ProjectLinkKind, label?: string) {
  return label ?? t.links[kind];
}

/**
 * Accessible project details built on the native <dialog> element:
 * focus is trapped, Escape closes it and the background is inert.
 */
export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  useScrollLock(project !== null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) {
      dialog.showModal();
      dialog.scrollTop = 0;
    } else if (!project && dialog.open) {
      dialog.close();
    }
  }, [project]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  const onBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) event.currentTarget.close();
  };

  const titleId = project ? `dialog-${project.id}-title` : undefined;

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClick={onBackdropClick}
      className="project-dialog m-auto max-h-[calc(100svh-1.5rem)] w-[calc(100vw-1.5rem)] max-w-3xl overflow-y-auto overscroll-contain rounded-3xl border border-white/10 bg-ink-900 p-0 text-ink-200 shadow-2xl shadow-black/60 backdrop:bg-transparent sm:max-h-[calc(100svh-4rem)]"
    >
      {project && (
        <div>
          <div className="relative">
            {project.screenshots?.length ? (
              <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto bg-ink-950 p-4" aria-label={t.projects.dialog.screenshots}>
                {project.screenshots.map((shot) => (
                  <img
                    key={shot.src}
                    src={publicUrl(shot.src)}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    loading="lazy"
                    decoding="async"
                    className="h-72 w-auto shrink-0 snap-start rounded-xl border border-white/10 object-contain"
                  />
                ))}
              </div>
            ) : (
              <ProjectArtwork kind={project.artwork} className="aspect-[16/7] border-b border-white/[0.06]" />
            )}
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label={t.projects.dialog.close}
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-ink-950/80 text-ink-200 backdrop-blur transition-colors hover:bg-ink-800 hover:text-white"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="p-6 sm:p-10">
            <p className="eyebrow text-accent-400">{project.domain}</p>
            <h2 id={titleId} className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {project.name}
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-ink-400">{project.summary}</p>

            <div className="mt-10 grid gap-10 md:grid-cols-[1fr_15rem]">
              <div className="space-y-10">
                {project.features.length > 0 && (
                  <section aria-labelledby={`${titleId}-features`}>
                    <h3 id={`${titleId}-features`} className="eyebrow text-ink-400">
                      {t.projects.dialog.features}
                    </h3>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex gap-3 leading-snug text-ink-200">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {project.featuresToVerify && project.featuresToVerify.length > 0 && (
                      <div className="mt-5">
                        <h4 className="text-sm font-medium text-ink-400">{t.projects.dialog.featuresToVerify}</h4>
                        <ul className="mt-2 space-y-1.5 text-sm text-ink-400">
                          {project.featuresToVerify.map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </section>
                )}

                {project.contribution && project.contribution.length > 0 && (
                  <section aria-labelledby={`${titleId}-role`}>
                    <h3 id={`${titleId}-role`} className="eyebrow text-ink-400">
                      {t.projects.dialog.role}
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {project.contribution.map((line) => (
                        <li key={line} className="leading-relaxed text-ink-200">
                          {line}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {project.relatedProducts && project.relatedProducts.length > 0 && (
                  <section aria-labelledby={`${titleId}-related`}>
                    <h3 id={`${titleId}-related`} className="eyebrow text-ink-400">
                      {t.projects.dialog.related}
                    </h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.relatedProducts.map((name) => (
                        <li key={name}>
                          <Tag className="py-1.5 text-[0.8rem] text-ink-200">{name}</Tag>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>

              <aside className="space-y-7 border-t border-white/[0.07] pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                <div>
                  <h3 className="eyebrow text-ink-400">{t.projects.dialog.platforms}</h3>
                  <PlatformList platforms={project.platforms} showUnknown className="mt-3 [&_li]:text-sm [&_li]:text-ink-200" />
                </div>
                {project.teamSize !== undefined && (
                  <div>
                    <h3 className="eyebrow text-ink-400">{t.projects.dialog.teamSize}</h3>
                    <p className="mt-3 flex items-center gap-2 text-sm text-ink-200">
                      <Users className="h-4 w-4 text-ink-400" aria-hidden="true" />
                      {project.teamSize}
                    </p>
                  </div>
                )}
                {project.technologies.length > 0 && (
                  <div>
                    <h3 className="eyebrow text-ink-400">{t.projects.dialog.technologies}</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <li key={tech}>
                          <Tag>{tech}</Tag>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.links && project.links.length > 0 && (
                  <div>
                    <h3 className="eyebrow text-ink-400">{t.projects.dialog.links}</h3>
                    <div className="mt-3 flex flex-col gap-2">
                      {project.links.map((link) => (
                        <ButtonLink
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="secondary"
                          size="sm"
                          className="justify-between"
                          icon={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
                        >
                          {linkLabel(link.kind, link.label)}
                        </ButtonLink>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

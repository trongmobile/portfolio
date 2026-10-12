import type { Project } from '@/types';
import { publicUrl, cn } from '@/lib/utils';
import { ProjectArtwork } from './ProjectArtwork';

interface ProjectMediaProps {
  project: Project;
  className?: string;
  eager?: boolean;
}

/** First real screenshot when available, otherwise the placeholder artwork. */
export function ProjectMedia({ project, className, eager = false }: ProjectMediaProps) {
  const shot = project.screenshots?.[0];
  if (!shot) return <ProjectArtwork kind={project.artwork} className={className} />;
  return (
    <div className={cn('relative overflow-hidden bg-ink-900', className)}>
      <img
        src={publicUrl(shot.src)}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}

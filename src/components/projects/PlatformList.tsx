import { Globe, MessageCircle, Smartphone, TabletSmartphone } from 'lucide-react';
import type { Platform } from '@/types';
import { t } from '@/i18n';
import { cn } from '@/lib/utils';

const icons: Record<Platform, typeof Globe> = {
  android: Smartphone,
  ios: TabletSmartphone,
  web: Globe,
  zalo: MessageCircle,
};

interface PlatformListProps {
  platforms: Platform[];
  className?: string;
  /** Show the "to be confirmed" text when no platform is listed. */
  showUnknown?: boolean;
}

export function PlatformList({ platforms, className, showUnknown = false }: PlatformListProps) {
  if (platforms.length === 0) {
    return showUnknown ? <p className={cn('text-sm text-ink-400', className)}>{t.projects.platformsUnknown}</p> : null;
  }
  return (
    <ul className={cn('flex flex-wrap gap-x-3 gap-y-1.5', className)} aria-label={t.projects.dialog.platforms}>
      {platforms.map((platform) => {
        const Icon = icons[platform];
        return (
          <li key={platform} className="flex items-center gap-1.5 text-xs text-ink-400">
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {t.platforms[platform]}
          </li>
        );
      })}
    </ul>
  );
}

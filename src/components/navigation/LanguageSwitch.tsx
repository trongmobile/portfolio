import { locales, setLocale, t, useLocale } from '@/i18n';
import { cn } from '@/lib/utils';

export function LanguageSwitch({ className }: { className?: string }) {
  const current = useLocale();

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={cn('flex items-center rounded-full border border-white/[0.1] bg-white/[0.03] p-0.5', className)}
    >
      {locales.map((option) => {
        const active = option.id === current;
        return (
          <button
            key={option.id}
            type="button"
            lang={option.id}
            aria-pressed={active}
            aria-label={option.name}
            onClick={() => setLocale(option.id)}
            className={cn(
              'min-h-[36px] min-w-[40px] rounded-full px-2.5 font-mono text-xs font-medium transition-colors duration-200',
              active ? 'bg-white text-ink-950' : 'text-ink-400 hover:text-white',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

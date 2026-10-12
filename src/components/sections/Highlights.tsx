import { highlights, releaseChannels } from '@/data/highlights';
import { t } from '@/i18n';
import { CountUp } from '@/components/ui/CountUp';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

export function Highlights() {
  if (highlights.length === 0) return null;

  const cols = highlights.length >= 4 ? 'lg:grid-cols-4' : highlights.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2';

  return (
    <section id="highlights" tabIndex={-1} aria-labelledby="highlights-title" className="relative bg-ink-950 pb-24 sm:pb-28">
      <div className="container-page">
        <h2 id="highlights-title" className="sr-only">
          {t.highlights.title}
        </h2>
        <Reveal>
          <dl className={cn('grid overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2', cols)} style={{ gap: '1px' }}>
            {highlights.map((item) => (
              <div key={item.id} className="flex flex-col bg-ink-950 p-6 sm:p-8">
                <dt className="order-2 mt-3 text-[0.95rem] font-medium leading-snug text-ink-200">{item.label}</dt>
                <dd className="order-1 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                  <CountUp value={item.value} />
                </dd>
                {item.note && <dd className="order-3 mt-2 text-sm leading-relaxed text-ink-400">{item.note}</dd>}
              </div>
            ))}
          </dl>
        </Reveal>

        {releaseChannels.length > 0 && (
          <Reveal delay={0.1} className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-400">
            <span className="eyebrow text-ink-400">{t.highlights.releasedOn}</span>
            <ul className="flex flex-wrap items-center gap-2">
              {releaseChannels.map((channel) => (
                <li key={channel} className="rounded-full border border-white/[0.08] px-3 py-1 text-ink-300">
                  {channel}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}

import { t } from '@/i18n';

/**
 * Abstract, decorative composition: a phone frame with layered, generic UI
 * blocks, connected to the kinds of services a production app talks to.
 * It does not depict any real product screen.
 */
const nodes = [
  { label: 'REST API', x: '4%', y: '16%', delay: '0s' },
  { label: 'WebSocket', x: '68%', y: '6%', delay: '1.2s' },
  { label: 'Firebase', x: '74%', y: '62%', delay: '2.1s' },
  { label: 'Store release', x: '0%', y: '74%', delay: '0.6s' },
] as const;

export function HeroVisual() {
  return (
    <div role="img" aria-label={t.hero.visualLabel} className="relative mx-auto aspect-[1/1] w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-[30rem] select-none">
      {/* Connection lines */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400" fill="none" aria-hidden="true">
        <g stroke="currentColor" className="text-white/15" strokeWidth="1" strokeDasharray="3 5">
          <path className="motion-safe:animate-dash" d="M70 82 C 120 82, 130 130, 150 150" />
          <path className="motion-safe:animate-dash" d="M318 46 C 300 90, 280 110, 252 130" />
          <path className="motion-safe:animate-dash" d="M326 262 C 300 262, 280 250, 252 240" />
          <path className="motion-safe:animate-dash" d="M64 306 C 110 306, 130 280, 150 262" />
        </g>
      </svg>

      {/* Back layers */}
      <div className="absolute left-1/2 top-1/2 h-[74%] w-[44%] -translate-x-[38%] -translate-y-[54%] rotate-[8deg] rounded-[2rem] border border-white/[0.06] bg-ink-850/60" />
      <div className="absolute left-1/2 top-1/2 h-[74%] w-[44%] -translate-x-[44%] -translate-y-[52%] rotate-[4deg] rounded-[2rem] border border-white/[0.08] bg-ink-850/80" />

      {/* Phone */}
      <div className="absolute left-1/2 top-1/2 h-[74%] w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/[0.12] bg-ink-900 p-2 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9),0_0_0_1px_rgb(0_0_0/0.6)]">
        <div className="relative flex h-full flex-col overflow-hidden rounded-[1.55rem] bg-gradient-to-b from-ink-800 to-ink-900 px-3 pb-3 pt-2.5">
          <div className="mx-auto h-1.5 w-12 rounded-full bg-black/60" />
          <div className="mt-4 h-2 w-16 rounded-full bg-white/25" />
          <div className="mt-1.5 h-2 w-24 rounded-full bg-white/10" />

          {/* Route card */}
          <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.035] p-2.5">
            <svg viewBox="0 0 120 34" className="h-auto w-full" aria-hidden="true">
              <path d="M6 24 L36 24 L54 10 L90 10 L114 24" stroke="#4d7cff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              {[6, 36, 54, 90, 114].map((cx, i) => (
                <circle key={cx} cx={cx} cy={i === 2 || i === 3 ? 10 : 24} r="3.2" fill="#0e0e11" stroke="#a9bdff" strokeWidth="1.5" />
              ))}
            </svg>
            <div className="mt-2 flex items-center justify-between">
              <div className="h-1.5 w-10 rounded-full bg-white/20" />
              <div className="h-1.5 w-6 rounded-full bg-accent-500/70" />
            </div>
          </div>

          {/* List rows */}
          <div className="mt-3 space-y-2">
            {[0.7, 0.5, 0.6].map((w, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg bg-white/[0.025] p-2">
                <div className="h-5 w-5 shrink-0 rounded-md bg-white/[0.08]" />
                <div className="flex-1 space-y-1">
                  <div className="h-1.5 rounded-full bg-white/20" style={{ width: `${w * 100}%` }} />
                  <div className="h-1.5 w-1/3 rounded-full bg-white/[0.08]" />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-auto flex items-center justify-around rounded-xl bg-black/30 py-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={i === 0 ? 'h-1.5 w-4 rounded-full bg-accent-500' : 'h-1.5 w-1.5 rounded-full bg-white/25'} />
            ))}
          </div>
        </div>
      </div>

      {/* Service nodes */}
      {nodes.map((node) => (
        <div
          key={node.label}
          className="absolute motion-safe:animate-float"
          style={{ left: node.x, top: node.y, animationDelay: node.delay }}
        >
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-ink-900/90 px-3 py-1.5 font-mono text-[0.68rem] text-ink-300 shadow-lg shadow-black/40 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
            {node.label}
          </div>
        </div>
      ))}
    </div>
  );
}

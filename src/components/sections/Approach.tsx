import { Layers, Plug, Rocket, Search, ShieldCheck, type LucideIcon } from 'lucide-react';
import type { ApproachIcon } from '@/types';
import { approachSteps } from '@/data/approach';
import { t } from '@/i18n';
import { Section, SectionHeader } from '@/components/layout/Section';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

const icons: Record<ApproachIcon, LucideIcon> = {
  search: Search,
  layers: Layers,
  plug: Plug,
  shield: ShieldCheck,
  rocket: Rocket,
};

export function Approach() {
  return (
    <Section id="approach" tone="light" className="border-t border-paper-200 bg-paper-100">
      <div className="container-page">
        <SectionHeader id="approach" tone="light" eyebrow={t.approach.eyebrow} title={t.approach.title} description={t.approach.description} />

        <ol className="relative mt-16 grid gap-px overflow-hidden rounded-3xl border border-paper-200 bg-paper-200 sm:grid-cols-2 lg:grid-cols-5">
          {approachSteps.map((step, index) => {
            const Icon = icons[step.icon];
            return (
              <li
                key={step.title}
                className={cn('bg-paper-50', index === approachSteps.length - 1 && approachSteps.length % 2 === 1 && 'sm:col-span-2 lg:col-span-1')}
              >
                <Reveal delay={index * 0.06} className="flex h-full flex-col p-6 lg:p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-paper-200 bg-white text-accent-600">
                      <Icon className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-paper-500" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-6 font-semibold tracking-tight text-ink-950">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper-500">{step.description}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}

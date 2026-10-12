import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, MapPin } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { t } from '@/i18n';
import { scrollToId } from '@/lib/utils';
import { ButtonLink } from '@/components/ui/Button';
import { HeroVisual } from './HeroVisual';

const ease = [0.2, 0.8, 0.2, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  };
}

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden bg-ink-950 pt-16">
      {/* Background: faint grid + a single restrained glow */}
      <div aria-hidden="true" className="bg-grid bg-noise-fade pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-accent-600/[0.12] blur-[120px]"
      />

      <div className="container-page relative grid items-center gap-14 pb-20 pt-16 sm:pt-24 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-12">
        <div className="lg:col-span-7">
          <motion.p {...fadeUp(0)} className="eyebrow flex items-center gap-3 text-accent-400">
            <span aria-hidden="true" className="h-px w-6 bg-accent-400/60" />
            {t.hero.eyebrow}
          </motion.p>

          <motion.h1
            {...fadeUp(0.08)}
            id="hero-title"
            className="mt-6 text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-display lg:text-display-lg"
          >
            {t.hero.headlineLead} <span className="text-ink-400">{t.hero.headlineTail}</span>
          </motion.h1>

          <motion.p {...fadeUp(0.16)} className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-ink-400">
            {t.hero.intro}
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('projects');
              }}
              icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            >
              {t.hero.primaryCta}
            </ButtonLink>
            <ButtonLink
              href="#contact"
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('contact');
              }}
            >
              {t.hero.secondaryCta}
            </ButtonLink>
          </motion.div>

          <motion.div {...fadeUp(0.32)} className="mt-12 flex flex-col gap-4 border-t border-white/[0.07] pt-6">
            <ul className="flex flex-wrap items-center gap-y-1 font-mono text-xs text-ink-300" aria-label={t.hero.expertiseLabel}>
              {t.hero.expertise.map((item, i) => (
                <li key={item} className="flex items-center">
                  {item}
                  {i < t.hero.expertise.length - 1 && (
                    <span aria-hidden="true" className="px-2.5 text-ink-500">
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>
            {siteConfig.location && (
              <p className="flex shrink-0 items-center gap-1.5 text-xs text-ink-400">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {t.site.location}
              </p>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="lg:col-span-5"
        >
          <HeroVisual />
        </motion.div>
      </div>

      <a
        href="#highlights"
        onClick={(e) => {
          e.preventDefault();
          scrollToId('highlights');
        }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full px-3 py-2 text-xs text-ink-400 transition-colors hover:text-white lg:flex"
        aria-label={t.hero.scrollHintLabel}
      >
        <ArrowDown className="h-3.5 w-3.5 motion-safe:animate-bounce" aria-hidden="true" />
        {t.hero.scrollHint}
      </a>
    </section>
  );
}

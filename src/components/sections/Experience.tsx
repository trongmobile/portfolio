import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { education, experience } from '@/data/experience';
import { t } from '@/i18n';
import { Section, SectionHeader } from '@/components/layout/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Tag } from '@/components/ui/Tag';
import { cn } from '@/lib/utils';

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // The accent line draws down the timeline as it scrolls through the viewport.
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 75%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <Section id="experience" tone="light" className="border-t border-paper-200 bg-paper-100">
      <div className="container-page">
        <SectionHeader id="experience" tone="light" eyebrow={t.experience.eyebrow} title={t.experience.title} description={t.experience.description} />

        <div ref={timelineRef} className="relative mt-16 pl-8">
          <span aria-hidden="true" className="absolute bottom-8 left-[7px] top-8 w-px bg-paper-200" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: reduced ? 1 : progress }}
            className="absolute bottom-8 left-[6.5px] top-8 w-[2px] origin-top rounded-full bg-accent-500"
          />
          <ol className="space-y-4">
            {experience.map((item, index) => {
              const isCurrent = !item.end;
              return (
                <li key={`${item.company}-${item.start}`} className="relative">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute -left-8 top-7 h-[15px] w-[15px] rounded-full border-[3px] border-paper-100 ring-1 sm:top-9',
                      isCurrent ? 'bg-accent-600 ring-accent-600/40' : 'bg-paper-300 ring-paper-200',
                    )}
                  />
                  <Reveal delay={index * 0.05}>
                    <article className="grid gap-6 rounded-2xl border border-paper-200 bg-paper-50 p-6 transition-shadow duration-300 hover:shadow-[0_20px_40px_-28px_rgb(9_9_11/0.35)] sm:p-8 md:grid-cols-12 md:gap-10">
                      <header className="md:col-span-4">
                        <p className="font-mono text-xs text-paper-500">
                          <time dateTime={item.start}>{item.period}</time>
                        </p>
                        <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink-950">{item.role}</h3>
                        <p className="mt-1 flex items-center gap-2 text-paper-600">
                          {item.company}
                          {isCurrent && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-600/10 px-2 py-0.5 text-xs font-medium text-accent-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-accent-600" aria-hidden="true" />
                              {t.experience.current}
                            </span>
                          )}
                        </p>
                      </header>

                      <div className="md:col-span-8">
                        {item.summary && <p className="mb-4 font-medium text-ink-950">{item.summary}</p>}
                        <ul className="space-y-2.5">
                          {item.responsibilities.map((line) => (
                            <li key={line} className="flex gap-3 leading-relaxed text-paper-600">
                              <span aria-hidden="true" className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-paper-400" />
                              {line}
                            </li>
                          ))}
                        </ul>
                        {item.technologies && item.technologies.length > 0 && (
                          <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Technologies at ${item.company}`}>
                            {item.technologies.map((tech) => (
                              <li key={tech}>
                                <Tag tone="light">{tech}</Tag>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>

        {education.length > 0 && (
          <Reveal className="mt-12">
            <h3 className="eyebrow text-paper-500">{t.experience.educationTitle}</h3>
            <ul className="mt-5 grid gap-4 md:grid-cols-2">
              {education.map((item) => (
                <li key={item.institution} className="flex gap-4 rounded-2xl border border-paper-200 bg-paper-50 p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-950 text-white">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink-950">{item.degree}</p>
                    <p className="mt-0.5 text-paper-600">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-paper-300 underline-offset-2 transition-colors hover:text-ink-950"
                        >
                          {item.institution}
                        </a>
                      ) : (
                        item.institution
                      )}
                    </p>
                    <p className="mt-2 font-mono text-xs text-paper-500">
                      {item.period}
                      {item.detail && <> · {item.detail}</>}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </Section>
  );
}

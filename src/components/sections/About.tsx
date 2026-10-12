import { experience, education } from '@/data/experience';
import { siteConfig } from '@/data/siteConfig';
import { t } from '@/i18n';
import { Section, SectionHeader } from '@/components/layout/Section';
import { Reveal } from '@/components/ui/Reveal';

export function About() {
  const current = experience.find((item) => !item.end);
  const school = education[0];

  const facts = [
    siteConfig.location && { label: t.about.facts.basedIn, value: t.site.location },
    current && { label: t.about.facts.current, value: `${current.role}, ${current.company}` },
    { label: t.about.facts.focus, value: t.about.focusValue },
    school && { label: t.about.facts.education, value: `${school.degree}, ${school.institution}` },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact));

  return (
    <Section id="about" tone="light">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeader id="about" tone="light" eyebrow={t.about.eyebrow} title={t.about.title} />
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal className="space-y-6 text-pretty text-lg leading-relaxed text-paper-600">
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <h3 className="eyebrow text-paper-500">{t.about.factsTitle}</h3>
            <dl className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-paper-200 bg-paper-200 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label} className="bg-white p-5">
                  <dt className="text-xs font-medium uppercase tracking-wider text-paper-500">{fact.label}</dt>
                  <dd className="mt-1.5 font-medium text-ink-950">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

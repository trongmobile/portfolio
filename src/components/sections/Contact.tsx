import { useEffect, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowUpRight, Check, Copy, Download, Mail, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { t } from '@/i18n';
import { cn, publicUrl } from '@/lib/utils';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/ui/Reveal';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/BrandIcons';

interface ContactMethod {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
  external?: boolean;
  download?: boolean;
}

function prettyUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

export function Contact() {
  const { email, phone, linkedin, github } = siteConfig.contact;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copyEmail = async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard can be unavailable (permissions / insecure context); the mailto link still works.
    }
  };

  const candidates: (ContactMethod | false | null | '')[] = [
    linkedin && {
      id: 'linkedin',
      label: t.contact.linkedin,
      value: prettyUrl(linkedin),
      href: linkedin,
      icon: <LinkedInIcon className="h-5 w-5" />,
      external: true,
    },
    github && {
      id: 'github',
      label: t.contact.github,
      value: prettyUrl(github),
      href: github,
      icon: <GitHubIcon className="h-5 w-5" />,
      external: true,
    },
    phone && {
      id: 'phone',
      label: t.contact.phone,
      value: phone,
      href: `tel:${phone.replace(/[^\d+]/g, '')}`,
      icon: <Phone className="h-5 w-5" aria-hidden="true" />,
    },
    siteConfig.cvPath && {
      id: 'cv',
      label: t.contact.cv,
      value: t.contact.cvMeta,
      href: publicUrl(siteConfig.cvPath),
      icon: <Download className="h-5 w-5" aria-hidden="true" />,
      download: true,
    },
  ];
  const methods = candidates.filter((m): m is ContactMethod => Boolean(m));

  return (
    <Section id="contact" tone="dark" className="overflow-hidden border-t border-white/[0.06] pb-20 sm:pb-24">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_20%,transparent_70%)]" />
      <div className="container-page relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow inline-flex items-center gap-3 text-accent-400">
            <span aria-hidden="true" className="h-px w-6 bg-accent-400/60" />
            {t.contact.eyebrow}
            <span aria-hidden="true" className="h-px w-6 bg-accent-400/60" />
          </p>
          <h2 id="contact-title" className="mt-6 text-balance text-display-sm font-semibold text-white sm:text-display lg:text-display-lg">
            {t.contact.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-400">{t.contact.text}</p>
        </Reveal>

        {email && (
          <Reveal delay={0.1} className="mt-12 flex flex-col items-center gap-3">
            <div className="flex w-full max-w-md items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5 sm:w-auto sm:max-w-none">
              <a
                href={`mailto:${email}`}
                className="flex min-h-[44px] min-w-0 flex-1 items-center gap-2.5 rounded-full bg-accent-600 px-5 text-[0.95rem] font-medium text-white transition-colors hover:bg-accent-700"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{email}</span>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={copied ? t.contact.copied : t.contact.copyEmail}
                title={t.contact.copyEmail}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink-300 transition-colors hover:bg-white/[0.07] hover:text-white"
              >
                {copied ? <Check className="h-4 w-4 text-accent-400" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              </button>
            </div>
            <p className="h-5 text-xs text-accent-400" aria-live="polite">
              {copied ? t.contact.copied : ''}
            </p>
          </Reveal>
        )}

        {methods.length > 0 && (
          <Reveal delay={0.15}>
            <ul className={cn('mx-auto mt-6 grid gap-3', methods.length > 1 ? 'max-w-3xl sm:grid-cols-2' : 'max-w-md')}>
              {methods.map((method) => (
                <li key={method.id} className={methods.length > 1 && methods.length % 2 === 1 && method === methods[methods.length - 1] ? 'sm:col-span-2' : undefined}>
                  <a
                    href={method.href}
                    {...(method.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    {...(method.download ? { download: '' } : {})}
                    className="group flex min-h-[64px] items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.05]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-ink-200">
                      {method.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-white">{method.label}</span>
                      <span className="block truncate text-xs text-ink-400">{method.value}</span>
                    </span>
                    {method.download ? (
                      <ArrowDown
                        className="h-4 w-4 shrink-0 text-ink-400 transition-transform duration-200 group-hover:translate-y-0.5 group-hover:text-white"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-ink-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {siteConfig.location && (
          <p className="mt-10 flex items-center justify-center gap-1.5 text-sm text-ink-400">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">{t.contact.location}: </span>
            {t.site.location}
          </p>
        )}
      </div>
    </Section>
  );
}

import type { MouseEvent } from 'react';
import { siteConfig } from '@/data/siteConfig';
import { navItems } from '@/data/navigation';
import { t } from '@/i18n';
import { scrollToId } from '@/lib/utils';

export function Footer() {
  const year = new Date().getFullYear();

  const onNav = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    scrollToId(id);
  };

  return (
    <footer className="border-t border-white/[0.06] bg-ink-950">
      <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-tight text-white">
            {siteConfig.brand.replace(/\.$/, '')}
            <span className="text-accent-500">.</span>
          </p>
          <p className="mt-2 text-sm text-ink-400">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>

        <nav aria-label={t.footer.navLabel}>
          <ul className="flex flex-wrap gap-x-1 gap-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => onNav(e, item.id)}
                  className="inline-flex min-h-[44px] items-center rounded-md px-3 text-sm text-ink-400 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

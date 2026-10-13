import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Command, Download, Menu, X } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { navItems } from '@/data/navigation';
import { t } from '@/i18n';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrolled } from '@/hooks/useScrolled';
import { cn, publicUrl, scrollToId } from '@/lib/utils';
import { ButtonLink } from '@/components/ui/Button';
import { isMacLike, openCommandPalette } from '@/components/command/CommandPalette';
import { toggleDevMode } from '@/lib/devMode';
import { showToast } from '@/lib/toast';
import { LanguageSwitch } from './LanguageSwitch';

const sectionIds = navItems.map((item) => item.id);

export function Navbar() {
  const scrolled = useScrolled(12);
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  // Touch-friendly way into dev mode: five quick taps on the logo.
  const logoTaps = useRef<number[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  const handleNav = useCallback((event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    setOpen(false);
    // Wait for the mobile menu to unmount; removing the focused link mid-scroll cancels smooth scrolling.
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(id)));
  }, []);

  // Close the mobile menu on Escape, on outside resize to desktop, and move focus into it.
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const media = window.matchMedia('(min-width: 768px)');
    const onMedia = () => media.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    media.addEventListener('change', onMedia);
    return () => {
      window.removeEventListener('keydown', onKey);
      media.removeEventListener('change', onMedia);
    };
  }, [open]);

  const cvHref = siteConfig.cvPath ? publicUrl(siteConfig.cvPath) : null;
  const solid = scrolled || open;

  return (
    <header
      className={cn(
        // Solid rather than frosted: a backdrop blur on a fixed header is recomputed on every scroll frame.
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        solid ? 'border-white/[0.07] bg-ink-950' : 'border-transparent bg-transparent',
      )}
    >
      <a
        href="#main"
        className="sr-only rounded-full bg-accent-600 px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60]"
      >
        {t.nav.skipToContent}
      </a>

      <div className="container-page flex h-16 items-center justify-between gap-6">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            const now = Date.now();
            logoTaps.current = [...logoTaps.current.filter((time) => now - time < 2000), now];
            if (logoTaps.current.length >= 5) {
              logoTaps.current = [];
              showToast(toggleDevMode() ? t.toast.devModeOn : t.toast.devModeOff);
            }
            window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
            history.replaceState(null, '', location.pathname + location.search);
          }}
          className="-mx-1 rounded-md px-1 text-lg font-semibold tracking-tight text-white"
          aria-label={`${siteConfig.name} — ${t.nav.backToTop}`}
        >
          {siteConfig.brand.replace(/\.$/, '')}
          <span className="text-accent-500">.</span>
        </a>

        <nav aria-label={t.nav.primary} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNav(e, item.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'relative isolate block rounded-full px-3.5 py-2 text-sm transition-colors duration-200',
                      isActive ? 'text-white' : 'text-ink-400 hover:text-white',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-white/[0.07] ring-1 ring-inset ring-white/[0.08]"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label={t.command.open}
            aria-keyshortcuts={isMacLike() ? 'Meta+K' : 'Control+K'}
            className="hidden min-h-[40px] items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] px-3 font-mono text-xs text-ink-400 transition-colors hover:border-white/20 hover:text-white lg:inline-flex"
          >
            {isMacLike() ? <Command className="h-3.5 w-3.5" aria-hidden="true" /> : <span aria-hidden="true">Ctrl</span>}
            <span aria-hidden="true">K</span>
          </button>
          <LanguageSwitch />
          {cvHref && (
            <ButtonLink
              href={cvHref}
              download
              size="sm"
              variant="secondary"
              className="hidden sm:inline-flex"
              icon={<Download className="h-4 w-4" aria-hidden="true" />}
            >
              {t.nav.downloadCv}
            </ButtonLink>
          )}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-200 transition-colors hover:bg-white/[0.07] hover:text-white md:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden border-t border-white/[0.07] md:hidden"
          >
            <nav aria-label={t.nav.primary} className="container-page py-4">
              <ul className="flex flex-col">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleNav(e, item.id)}
                      aria-current={active === item.id ? 'location' : undefined}
                      className={cn(
                        'flex min-h-[48px] items-center justify-between rounded-lg px-2 text-base transition-colors',
                        active === item.id ? 'text-white' : 'text-ink-300 hover:text-white',
                      )}
                    >
                      {item.label}
                      {active === item.id && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-500" />}
                    </a>
                  </li>
                ))}
              </ul>
              {cvHref && (
                <ButtonLink
                  href={cvHref}
                  download
                  className="mt-4 w-full sm:hidden"
                  icon={<Download className="h-4 w-4" aria-hidden="true" />}
                >
                  {t.nav.downloadCv}
                </ButtonLink>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-accent-500/80"
        style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
      />
    </header>
  );
}

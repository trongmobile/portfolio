import { onLocaleChange, t } from '@/i18n';

const buildNavItems = () =>
  [
    { id: 'about', label: t.nav.about },
    { id: 'experience', label: t.nav.experience },
    { id: 'projects', label: t.nav.projects },
    { id: 'skills', label: t.nav.skills },
    { id: 'contact', label: t.nav.contact },
  ] as const;

/** Section ids used by the navigation, active-section tracking and the footer. */
export let navItems = buildNavItems();
onLocaleChange(() => {
  navItems = buildNavItems();
});

export type SectionId = (typeof navItems)[number]['id'];

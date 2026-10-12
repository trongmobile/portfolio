import { useSyncExternalStore } from 'react';
import { en, type Dictionary } from './en';
import { vi } from './vi';

export type Locale = 'en' | 'vi';

export const locales: { id: Locale; label: string; name: string }[] = [
  { id: 'en', label: 'EN', name: 'English' },
  { id: 'vi', label: 'VI', name: 'Tiếng Việt' },
];

const dictionaries: Record<Locale, Dictionary> = { en, vi };
const STORAGE_KEY = 'locale';
const DEFAULT_LOCALE: Locale = 'en';

function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'vi';
}

/** `?lang=vi` wins (shareable links), then the visitor's last choice, then English. */
function detectLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (isLocale(fromUrl)) return fromUrl;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // Storage can be unavailable (private mode, blocked site data).
  }
  return DEFAULT_LOCALE;
}

/**
 * `locale` and `t` are live ES module bindings: `setLocale` reassigns them, so
 * every importer reads the new values on its next render. Data modules rebuild
 * their localized exports through `onLocaleChange`, and `useLocale` re-renders
 * the app.
 */
export let locale: Locale = detectLocale();
export let t: Dictionary = dictionaries[locale];

const listeners = new Set<() => void>();

export function onLocaleChange(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setLocale(next: Locale) {
  if (next === locale) return;
  locale = next;
  t = dictionaries[next];
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Ignore: the choice just won't be remembered.
  }
  const url = new URL(window.location.href);
  if (url.searchParams.has('lang')) {
    url.searchParams.set('lang', next);
    history.replaceState(history.state, '', url);
  }
  // Data modules registered first, so they rebuild before React re-renders.
  listeners.forEach((listener) => listener());
}

export function useLocale(): Locale {
  return useSyncExternalStore(onLocaleChange, () => locale, () => DEFAULT_LOCALE);
}

/**
 * Content shape for data files: any free-text string (or string list) may be
 * written once, shared by every locale, or as `{ en, vi }`. Literal unions
 * such as `Platform` stay as they are.
 */
export type Translatable<T> = T extends string
  ? string extends T
    ? string | Record<Locale, string>
    : T
  : T extends readonly (infer U)[]
    ? Translatable<U>[] | Record<Locale, U[]>
    : T extends object
      ? { [K in keyof T]: Translatable<T[K]> }
      : T;

function isPerLocale(value: object): value is Record<Locale, unknown> {
  return !Array.isArray(value) && 'en' in value && 'vi' in value;
}

function resolve(value: unknown): unknown {
  if (typeof value !== 'object' || value === null) return value;
  if (Array.isArray(value)) return value.map(resolve);
  if (isPerLocale(value)) return value[locale];
  return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, resolve(entry)]));
}

/** Resolve `Translatable` content for the active locale. */
export function localize<T>(content: Translatable<T>): T {
  return resolve(content) as T;
}

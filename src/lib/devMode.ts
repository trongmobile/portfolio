/**
 * "Dev mode" easter egg (Konami code, command palette or tapping the logo).
 * Purely cosmetic: toggles `data-mode="dev"` on <html>, styled in index.css.
 */
export function isDevMode(): boolean {
  return document.documentElement.dataset.mode === 'dev';
}

/** Flips dev mode and returns the new state. */
export function toggleDevMode(): boolean {
  const root = document.documentElement;
  const next = !isDevMode();
  if (next) root.dataset.mode = 'dev';
  else delete root.dataset.mode;
  return next;
}

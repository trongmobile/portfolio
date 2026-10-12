/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_BASE_PATH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Fontsource packages are side-effect CSS imports.
declare module '@fontsource-variable/inter';
declare module '@fontsource-variable/jetbrains-mono';

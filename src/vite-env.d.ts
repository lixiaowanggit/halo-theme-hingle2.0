/// <reference types="vite/client" />
/// <reference types="@types/node" />

import type { Alpine } from 'alpinejs';
import type { ThemeConfig } from "./scripts/index";

declare global {
  interface Window {
    Alpine: Alpine;
    themeConfig: ThemeConfig;
  }
}

declare module 'unocss/vite' {
  import type { Plugin } from 'vite';
  const unocss: () => Plugin;
  export default unocss;
}

export {};
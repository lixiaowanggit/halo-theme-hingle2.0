/// <reference types="vite/client" />
/// <reference types="@types/node" />

import type { Alpine } from 'alpinejs';

export {};

declare global {
  interface Window {
    Alpine: Alpine;
  }
}

declare module 'unocss/vite' {
  import type { Plugin } from 'vite';
  const unocss: () => Plugin;
  export default unocss;
}

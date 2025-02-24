import type { DarkModeOptions } from '..';

export class DarkModeManager {
  private readonly body: HTMLElement;
  private readonly options: Required<DarkModeOptions>;

  constructor(options: DarkModeOptions = {}) {
    this.body = document.body;
    this.options = {
      cookiePath: '/',
      cookieMaxAge: 21600,
      autoChangeHours: options.autoChangeHours || {
        start: 22,
        end: 5
      }
    };

    this.init();
  }

  private init(): void {
    // 自动切换检查
    if (this.options.autoChangeHours && this.shouldAutoChange()) {
      this.setTheme('dark');
    }

    // Cookie 设置检查
    const cookieTheme = this.getCookie('night');
    if (cookieTheme === 'true') {
      this.setTheme('dark');
    } else if (cookieTheme === 'false') {
      this.setTheme('light');
    }

    // 按钮事件绑定
    const lightBtn = document.querySelector('.light-btn');
    if (lightBtn) {
      lightBtn.addEventListener('click', () => {
        this.body.classList.contains('dark-theme')
          ? this.setTheme('light')
          : this.setTheme('dark');
      });
    }
  }

  private setTheme(theme: 'dark' | 'light'): void {
    if (theme === 'dark') {
      this.body.classList.remove('color-scheme-light');
      this.body.classList.add('dark-theme', 'color-scheme-dark');
      this.setCookie('night', 'true');
    } else {
      this.body.classList.remove('dark-theme', 'color-scheme-dark');
      this.body.classList.add('color-scheme-light');
      this.setCookie('night', 'false');
    }
    this.updateCommentTheme(theme);
  }

  private shouldAutoChange(): boolean {
    if (!this.options.autoChangeHours) return false;

    const hour = new Date().getHours();
    const { start, end } = this.options.autoChangeHours;
    return hour >= start || hour <= end;
  }

  private updateCommentTheme(theme: 'dark' | 'light'): void {
    const commentEl = document.querySelector('div#halo-comment > div > div');
    if (!commentEl) return;

    const shadowRoot = (commentEl as any).shadowRoot;
    if (!shadowRoot) return;

    const commentBox = shadowRoot.querySelector('div.halo-comment-widget');
    if (!commentBox) return;

    commentBox.classList.remove(theme === 'dark' ? 'light' : 'dark');
    commentBox.classList.add(theme);
  }

  private setCookie(name: string, value: string): void {
    const { cookiePath, cookieMaxAge } = this.options;
    document.cookie = `${name}=${value};path=${cookiePath};max-age=${cookieMaxAge}`;
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp(`${name}=([^;]+)`));
    return match ? match[1] : null;
  }
} 
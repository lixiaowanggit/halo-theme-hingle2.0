// 主题配置
export interface ThemeConfig {
  general: {
    night: boolean;
    copyright: boolean;
  };
}

// 夜间模式选项
export interface DarkModeOptions {
  cookiePath?: string;
  cookieMaxAge?: number;
  autoChangeHours?: {
    start: number;
    end: number;
  };
}

// 随机工具函数
export interface RandomUtils {
  randomIcon(): string;
  randomPostIcon(id: number): void;
  randomColor(): string;
  randomImg(): string;
}


// TagCloud 类型定义
declare module 'TagCloud' {
  interface TagCloudOptions {
    radius?: number;
    maxSpeed?: 'slow' | 'normal' | 'fast';
    initSpeed?: 'slow' | 'normal' | 'fast';
    direction?: number;
    keep?: boolean;
    useContainerInlineStyles?: boolean;
    containerClass?: string;
    itemClass?: string;
  }

  interface TagCloudInstance {
    update: (options: Partial<TagCloudOptions> | string[]) => void;
    destroy: () => void;
    pause: () => void;
    resume: () => void;
  }

  function TagCloud(
    container: string | HTMLElement,
    texts: string[],
    options: TagCloudOptions
  ): TagCloudInstance;

  export default TagCloud;
}

export interface TagCloudOptions {
  radius?: number;
  maxSpeed?: 'slow' | 'normal' | 'fast';
  initSpeed?: 'slow' | 'normal' | 'fast';
  direction?: number;
  keep?: boolean;
  useContainerInlineStyles?: boolean;
  containerClass?: string;
  itemClass?: string;
}

export {};
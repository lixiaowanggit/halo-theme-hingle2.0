// import { DarkModeManager } from './features/darkMode';
import { TreeView } from './features/treeView';
import { ScrollManager } from './features/scrollManager';
import { MenuManager } from './features/menuManager';
import type { ThemeConfig } from "./index";
import { TagCloudManager } from './features/tagCloud';

export class ThemeManager {
  private readonly defaultConfig: ThemeConfig = {
    general: {
      night: false,
      copyright: true
    }
  };

  constructor(userConfig?: Partial<ThemeConfig>) {
    const config = {
      ...this.defaultConfig,
      ...userConfig
    };
    
    // new DarkModeManager({
    //   autoChangeHours: config.general.night ? {
    //     start: 22,
    //     end: 5
    //   } : undefined
    // });

    new TreeView();
    new ScrollManager();
    new MenuManager();
    new TagCloudManager();

    if (window.console) {
      console.log("Theme configuration:", config);
    }
  }
}
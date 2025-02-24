import "./styles/main.css";
import 'virtual:uno.css';
import { ThemeManager } from './scripts/themeManager';
import Alpine from 'alpinejs';
import { createRandomUtils } from './scripts/utils/random';

// 封装 Alpine 初始化逻辑
const initializeAlpine = () => {
  window.Alpine = Alpine;
  Alpine.data('random', createRandomUtils);
  Alpine.start();
};

const initApp = () => {
  // 初始化主题管理器
  new ThemeManager(window.themeConfig);
};

(() => {
  // 尽早初始化 Alpine
  initializeAlpine();
  // 统一控制初始化时机
  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', initApp)
    : initApp();
})();

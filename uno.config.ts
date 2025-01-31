import {
  defineConfig,
  Preset,
  PresetOptions,
  SourceCodeTransformer,
  presetUno,
  presetIcons,
  transformerDirectives,
} from 'unocss';

export default defineConfig({
  // 合并原有规则
  rules: [
    [/^bgc-(.+)$/, ([, c]) => ({ 'background-color': `var(--${c}-color)` })],
    [/^borderc-(.+)$/, ([, c]) => ({ 'border-color': `var(--${c}-color)` })],
    [/^textc-(.+)$/, ([, c]) => ({ color: `var(--${c}-color)` })],
    [/^(.+)\$(.+)$/, ([, p, c]) => ({ [p]: `var(--${c}-color)` })],
    ['font-source-han-serif', { 'font-family': 'Cantarell,Lora,source-han-serif-tc,serif' }],
    [/^size-(\d+)$/, ([, d]) => ({ width: `${Number(d) / 4}rem`, height: `${Number(d) / 4}rem` })],
    ['shadow-button', { 'box-shadow': 'rgba(0, 0, 0, 0.10) 0px 4px 6px' }],
    [
      'shadow-card',
      {
        'box-shadow': `0px 0px 15px 0px rgba(0, 0, 0, 0.03),
                    0px 2px 30px 0px rgba(0, 0, 0, 0.08),
                    0px 0px 1px 0px rgba(0, 0, 0, 0.3)`,
      },
    ],
  ],

  // 添加必要配置
  presets: [presetUno(), presetIcons()],
  transformers: [transformerDirectives()],
  content: {
    filesystem: ['./templates/**/*.html', './src/main.ts'],
  },
});

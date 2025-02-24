import type { TagCloudOptions } from '../index';
import TagCloud from 'TagCloud';

export class TagCloudManager {
  // 预定义一些好看的颜色
  private colors = [
    '#6f9fc7', // 淡蓝色
    '#7eb19f', // 青绿色
    '#cf8d6c', // 橙褐色
    '#a189c7', // 淡紫色
    '#86a6df', // 天蓝色
    '#d49a89', // 粉橙色
    '#8cc1a0', // 薄荷绿
    '#9b8bba', // 浅紫色
    '#6fb1c7', // 湖蓝色
    '#c7956f'  // 浅棕色
  ];

  constructor() {
    if(!document.getElementById('tagCloud')) return;
    
    this.initTagCloud();
  }

  private getRandomColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  private initTagCloud() {
    const container = document.getElementById('tagCloud');
    if(!container) return;

    try {
      // 获取所有标签元素
      const tagElements = container.getElementsByClassName('tag-item');
      
      // 确保转换为纯字符串数组
      const texts = Array.from(tagElements)
        .map(element => element.textContent?.trim())
        .filter((text): text is string => text !== null && text !== undefined && text !== '');
      
      // 构建URL映射
      const urlMap = new Map(
        Array.from(tagElements).map(element => [
          element.textContent?.trim() || '',
          element.getAttribute('data-url') || '#'
        ])
      );

      // 验证数据
      if (texts.length === 0) {
        console.warn('No tags found');
        return;
      }

      // 清空容器
      container.innerHTML = '';
      
      // 创建内部容器
      const innerContainer = document.createElement('div');
      innerContainer.className = 'tagcloud-inner';
      container.appendChild(innerContainer);
      
      // 配置选项
      const options: TagCloudOptions = {
        radius: 200, // 减小半径
        maxSpeed: 'normal',
        initSpeed: 'normal',
        direction: 135,
        keep: true,
        useContainerInlineStyles: false,
        containerClass: 'tagcloud',
        itemClass: 'tagcloud-item'
      };

      // 创建标签云
      TagCloud(innerContainer, texts, options);

      // 为每个标签设置随机颜色
      setTimeout(() => {
        const tagElements = container.getElementsByClassName('tagcloud-item');
        Array.from(tagElements).forEach(tag => {
          (tag as HTMLElement).style.color = this.getRandomColor();
        });
      }, 100);

      // 添加点击事件
      container.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target && target.className.includes('tagcloud-item')) {
          const text = target.textContent?.trim();
          if (text && urlMap.has(text)) {
            const url = urlMap.get(text);
            if (url) {
              window.location.href = url;
            }
          }
        }
      });

      // 添加鼠标悬停效果
      container.addEventListener('mouseover', (e) => {
        const target = e.target as HTMLElement;
        if (target && target.className.includes('tagcloud-item')) {
          target.style.transition = 'color 0.3s';
          target.style.color = 'var(--text-accent)'; // 悬停时的颜色
        }
      });

      container.addEventListener('mouseout', (e) => {
        const target = e.target as HTMLElement;
        if (target && target.className.includes('tagcloud-item')) {
          target.style.color = this.getRandomColor(); // 恢复随机颜色
        }
      });

    } catch(e) {
      console.error('TagCloud initialization failed:', e);
      if(container) {
        container.innerHTML = '<div class="empty-message">暂无标签</div>';
      }
    }
  }
}
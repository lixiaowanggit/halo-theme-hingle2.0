/**
 * 为指定选择器的元素绑定点击事件，切换目标元素的 active 类
 * @param selector 需要绑定点击事件的元素选择器
 * @param targetSelector 需要切换 active 类的目标元素选择器
 */
export function toggleActiveClass(selector: string, targetSelector: string): void {
    const element = document.querySelector(selector);
    const targetElement = document.querySelector(targetSelector);

    if (element && targetElement) {
        element.addEventListener('click', () => {
            targetElement.classList.toggle('active');
        });
    } else {
        console.warn(`无法找到元素：${selector} 或 ${targetSelector}`);
    }
}

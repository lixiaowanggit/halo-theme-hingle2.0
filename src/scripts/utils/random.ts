import type { RandomUtils } from "../index";

export const createRandomUtils = (): RandomUtils => ({
    randomIcon() {
        const icons = ['book', 'game', 'note', 'chat', 'code', 'image', 'web', 'link', 'design', 'lock'];
        return icons[Math.floor(Math.random() * icons.length)];
    },

    randomPostIcon(id: number) {
        console.log('Post ID:', id); // 暂时只打印ID，后续可以根据需求实现
        return;
    },

    randomColor() {
        const colors = ['blue', 'purple', 'green', 'yellow', 'red', 'orange'];
        return colors[Math.floor(Math.random() * colors.length)];
    },

    randomImg() {
        return `${Math.floor(Math.random() * 10)}.jpg`;
    }
}); 
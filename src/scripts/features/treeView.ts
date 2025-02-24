export class TreeView {
    private readonly content: Element | null;
    private readonly body: HTMLElement;
    private trees: HTMLElement | null = null;

    constructor() {
        this.body = document.body;
        this.content = document.querySelector(".post-content:not(.is-special), .page-content:not(.is-special)");
        this.init();
    }

    public init(): void {
        if (!this.shouldInitialize()) return;

        const headings = this.content!.querySelectorAll("h1, h2, h3, h4, h5, h6");
        if (!headings || headings.length === 0) return;

        this.body.classList.add("has-trees");
        this.createTreeView(headings);
        this.addToggleButton();
    }

    private shouldInitialize(): boolean {
        if (!this.content) return false;
        return document.body.dataset.template === 'post';
    }

    private createTreeView(headings: NodeListOf<Element>): void {
        this.trees = document.createElement('section');
        this.trees.className = 'article-list';
        this.trees.innerHTML = '<h4><span class="title">目录</span></h4>';

        headings.forEach((heading, index) => {
            const id = index + 1;
            const text = heading.textContent || '';
            heading.id = `title-${id}`;

            const link = this.createHeadingLink(heading.tagName.toLowerCase(), id, text);
            this.trees!.appendChild(link);
        });

        const wrap = document.querySelector('.wrap');
        wrap?.appendChild(this.trees);
    }

    private createHeadingLink(tagName: string, id: number, text: string): HTMLAnchorElement {
        const link = document.createElement('a');
        link.href = `#title-${id}`;
        link.textContent = text;
        link.className = this.getHeadingClassName(tagName);
        return link;
    }

    private getHeadingClassName(tagName: string): string {
        const level = parseInt(tagName.charAt(1));
        return level >= 2 && level <= 6 ? `item-${level}` : '';
    }

    private addToggleButton(): void {
        const buttons = document.querySelector("footer .buttons");
        if (!buttons || !this.trees) return;

        const toggleBtn = document.createElement('a');
        toggleBtn.className = 'toggle-list';
        buttons.appendChild(toggleBtn);

        toggleBtn.addEventListener('click', () => {
            this.trees!.classList.toggle('active');
        });
    }
} 
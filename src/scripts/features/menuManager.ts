export class MenuManager {
    private readonly toggleBtn: HTMLElement | null;
    private readonly menu: HTMLElement | null;
    private readonly parentLinks: NodeListOf<HTMLElement>;

    constructor() {
        this.toggleBtn = document.querySelector('.toggle-btn');
        this.menu = document.querySelector('.head-menu');
        this.parentLinks = document.querySelectorAll('.has-child .parent-link');
        this.init();
    }

    private init(): void {
        if (this.toggleBtn && this.menu) {
            this.toggleBtn.addEventListener('click', () => {
                this.menu!.classList.toggle('active');
            });
        }

        this.parentLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const parent = link.closest('.has-child');
                
                this.parentLinks.forEach(otherLink => {
                    const otherParent = otherLink.closest('.has-child');
                    if (otherParent && otherParent !== parent) {
                        otherParent.classList.remove('expanded');
                    }
                });

                parent?.classList.toggle('expanded');
            });
        });
    }
} 
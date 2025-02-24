export class ScrollManager {
  private readonly btn: HTMLElement | null;

  constructor() {
    this.btn = document.querySelector(".to-top");

    if (!this.btn) {
      console.warn('No .to-top element found');
      return;
    }

    this.init();
  }

  private init(): void {
    this.handleScroll();

    window.addEventListener("scroll", () => this.handleScroll());

    this.btn?.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  private handleScroll(): void {
    if (!this.btn) return;

    // 保持与原代码相同的滚动检测逻辑
    const scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    if (scroll >= window.innerHeight / 2) {
      this.btn.classList.add("active");
    } else {
      this.btn.classList.remove("active");
    }
  }
} 
import { gsap } from "gsap";

export class ProcessingBar {
  constructor({ el }) {
    this.DOM = { el };
    this.progressNumber = 0;
  }

  update() {
    if (this.progressNumber === 100) {
      gsap.to(this.DOM.el, {
        ease: "power3.in",
        xPercent: 105,
        duration: 0.001,
        onComplete: () => {
          gsap.to(this.DOM.el, {
            opacity: 0,
            onComplete: () => {
              this.reset();
            },
          });
        },
      });
    } else {
      this.progressNumber += 1;
      line.style.width = this.progressNumber + "%";
    }
  }

  reset() {
    gsap.set(this.DOM.el, {
      ease: "power3.out",
      xPercent: 0,
      opacity: 1,
      delay: 2.5,
      onComplete: () => {
        this.progressNumber = -1;
      },
    });
  }
}

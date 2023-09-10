import { gsap } from "gsap";

export class ProcessingBar {
  DOM: HTMLDivElement;
  progressNumber: number;
  constructor(el: HTMLDivElement) {
    this.DOM = el;
    this.progressNumber = 0;
    console.log(this.DOM);
  }

  update() {
    if (this.progressNumber === 100) {
      gsap.to(this.DOM, {
        ease: "power3.in",
        xPercent: 100,
        duration: 0,
        onComplete: () => {
          gsap.to(this.DOM, {
            ease: "power3.in",
            opacity: 0,
            onComplete: () => {
              this.reset();
            },
          });
        },
      });
    } else {
      this.progressNumber += 1;
      this.DOM.style.width = this.progressNumber + "%";
    }
  }

  reset() {
    gsap.set(this.DOM, {
      ease: "power3.out",
      xPercent: 0,
      opacity: 1,
      delay: 0,
      onComplete: () => {
        this.progressNumber = -1;
      },
    });
  }
}

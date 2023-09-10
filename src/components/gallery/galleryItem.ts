import SplitType, { TargetElement } from "split-type";
import { gsap } from "gsap";

export class GalleryItem {
  clipPath: { value: string };

  DOM: HTMLDivElement;
  img: HTMLImageElement;
  title: SplitType;
  subTitle: SplitType;
  index: HTMLParagraphElement;
  content: HTMLElement;

  constructor(el: HTMLDivElement) {
    this.DOM = el;
    this.img = this.DOM.querySelector(
      ".gallery-slider-item__img"
    ) as HTMLImageElement;
    this.title = new SplitType(
      this.DOM.querySelector(".gallery-slider-item__title") as TargetElement
    );
    this.subTitle = new SplitType(
      this.DOM.querySelector(".gallery-slider-item__subTitle") as TargetElement
    );
    this.index = this.DOM.querySelector(
      ".pages--current"
    ) as HTMLParagraphElement;
    this.content = this.DOM.querySelector(
      ".gallery-slider-item__content"
    ) as HTMLElement;
    this.clipPath = { value: "100%" };

    gsap.set(this.DOM, {
      clipPath: "inset(100% 0 0 0)",
    });

    gsap.set(this.img, {
      scale: 1.5,
    });

    gsap.set(this.subTitle.words, {
      y: "100%",
      opacity: 0,
    });

    gsap.set(this.title.chars, {
      y: "20%",
      opacity: 0,
    });
  }

  slideIn() {
    gsap.to(this.clipPath, {
      value: 0,
      duration: 1.2,
      onUpdate: () => {
        this.DOM.style.clipPath = `inset(${this.clipPath.value}% 0 0)`;
      },
      ease: "power3.out",
    });

    gsap.set(this.DOM, {
      clipPath: "inset(100% 0 0 0)",
    });

    gsap.to(this.img, {
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.to(this.title.chars, {
      y: 0,
      opacity: 1,
      stagger: 0.08,
      duration: 0.3,
      delay: 0.5,
      ease: "power3.out",
    });

    gsap.to(this.subTitle.words, {
      y: 0,
      opacity: 1,
      stagger: 0.05,
      duration: 0.5,
      delay: 0.5,
      ease: "power3.out",
    });
  }

  slideOut() {
    gsap.to(this.clipPath, {
      value: 100,
      duration: 2,
      onUpdate: () => {
        this.DOM.style.clipPath = `inset(0 0 ${this.clipPath.value}% 0)`;
      },
      ease: "power3.out",
    });

    gsap.to(this.img, {
      scale: 1.5,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.set(this.subTitle.words, {
      y: "100%",
      opacity: 0,
      delay: 2,
    });

    gsap.set(this.title.chars, {
      y: "20%",
      opacity: 0,
      delay: 2,
    });
  }
}

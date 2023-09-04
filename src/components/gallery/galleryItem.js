import SplitType from "split-type";
import { gsap } from "gsap";

export class GalleryItem {
  constructor({ el }) {
    this.DOM = { el };
    this.DOM.outImg = this.DOM.el.querySelector(".slider_item-img");
    this.DOM.img = this.DOM.el.querySelector(".slider_item-img img");
    this.DOM.heading = new SplitType(this.DOM.el.querySelector(".box_ttl"));
    this.DOM.subHeading = new SplitType(
      this.DOM.el.querySelector(".box_subttl p")
    );
    this.DOM.currentNumber = new SplitType(
      this.DOM.el.querySelector(".slider_number-current")
    );
    this.DOM.content = this.DOM.el.querySelector(".box_info-content");

    this.fakeClipPath = { value: "100%" };

    gsap.set(this.DOM.outImg, {
      clipPath: "inset(100% 0 0 0)",
    });
    gsap.set(this.DOM.img, {
      scale: 1.5,
    });
    gsap.set(this.DOM.subHeading.chars, {
      y: "100%",
      opacity: 0,
    });
    gsap.set(this.DOM.heading.words, {
      y: "100%",
      opacity: 0,
    });
    gsap.set(this.DOM.currentNumber.chars[1], {
      y: "-100%",
    });
    gsap.set(this.DOM.content, {
      y: "100%",
      opacity: 0,
    });
  }

  sliderIn() {
    // gsap.killTweensOf(this.DOM.img);

    gsap.to(this.fakeClipPath, {
      value: 0,
      duration: 1.2,
      onUpdate: () => {
        this.DOM.outImg.style.clipPath = `inset(${this.fakeClipPath.value}% 0 0 0)`;
      },
      ease: "power3.out",
    });

    gsap.to(this.DOM.img, {
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.to(this.DOM.subHeading.chars, {
      y: 0,
      opacity: 1,
      stagger: 0.05,
      duration: 0.5,
      delay: 0.5,
      ease: "power3.out",
    });

    gsap.to(this.DOM.heading.words, {
      y: 0,
      opacity: 1,
      stagger: 0.08,
      duration: 0.3,
      delay: 0.5,
      ease: "power3.out",
    });
    gsap.to(this.DOM.currentNumber.chars[1], {
      y: 0,
      duration: 1,
      opacity: 1,
      delay: 0.5,
      ease: "power3.out",
    });

    gsap.to(this.DOM.content, {
      y: 0,
      opacity: 1,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });
  }

  sliderOut() {
    gsap.to(this.fakeClipPath, {
      value: 100,
      duration: 2,
      onUpdate: () => {
        this.DOM.outImg.style.clipPath = `inset(0 0 ${this.fakeClipPath.value}% 0)`;
      },
      ease: "power3.out",
    });
    gsap.to(this.DOM.img, {
      scale: 1.5,
      duration: 1.2,
      ease: "power3.out",
    });
    gsap.to(this.DOM.content, {
      y: "100%",
      opacity: 0,
      duration: 1,
      delay: 2,
    });
    gsap.to(this.DOM.currentNumber.chars[1], {
      y: "-100%",
      opacity: 0,
      delay: 2,
    });
    gsap.to(this.DOM.heading.words, {
      y: "100%",
      opacity: 0,
      stagger: 0.08,
      delay: 2,
    });
    gsap.to(this.DOM.subHeading.chars, {
      y: "100%",
      opacity: 0,
      stagger: 0.02,
      delay: 2,
    });
  }
}

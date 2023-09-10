import { gsap, Power4 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SliderItem } from "./aboutItem";
import { _CURSOR_ } from "../cursor/cursor";

gsap.registerPlugin(ScrollTrigger);

const images = ["/assets/img/hero.jpg", "/assets/img/hero-2.jpg","/assets/img/hero-3.jpg"];
const titles = [
  "Find a home that suits your lifestyle",
  "Elevate with stunning designs",
  "Comfort and style in modern living",
];
const contents = [
  [
    `Built on centuries of tradition and dedicated to innovating the luxury
        real estate industry, Masteri Centre Point offers transformative
        experiences through a global network of exceptional and outstanding
        agents.`,
  ],
  [
    `Built on centuries of tradition and dedicated to innovating the luxury
          real estate industry, Masteri Centre Point offers transformative
          experiences through a global network of exceptional and outstanding
          agents.`,
  ],
  [
    `Built on centuries of tradition and dedicated to innovating the luxury
          real estate industry, Masteri Centre Point offers transformative
          experiences through a global network of exceptional and outstanding
          agents.`,
  ],
];

export class About {
  private images: string[];
  private titles: string[];
  private contents: string[][];
  private parts: HTMLDivElement[];
  private current: number;
  private isPlaying: boolean;
  private defaultDir: 1 | -1;
  private animOptions: { duration: number; ease: gsap.EaseFunction };
  private startX: number | null;
  private endX: number | null;
  private isClicked: boolean;

  constructor(images: string[], titles: string[], contents: string[][]) {
    this.images = images;
    this.titles = titles;
    this.contents = contents;
    this.parts = [];
    this.current = 0;
    this.isPlaying = false;
    this.defaultDir = 1;
    this.animOptions = {
      duration: 2,
      ease: Power4.easeInOut,
    };

    this.startX = null;
    this.endX = null;
    this.isClicked = false;

    this.create();
    this.bindEvents();
  }

  create() {
    const main = document.getElementById("js-about") as HTMLDivElement;

    const part = document.createElement("div") as HTMLDivElement;
    part.classList.add("slider-item", "hover");
    const slide = new SliderItem(
      this.images[this.current],
      this.titles[this.current],
      this.contents[this.current],
      this.current + 1,
      this.images.length
    );
    part.appendChild(slide.DOM.main as HTMLDivElement);
    main.appendChild(part);
    this.parts.push(part);
  }

  mousedown(e: TouchEvent | MouseEvent) {
    this.isClicked = true;
    if (e instanceof TouchEvent) {
      this.startX = e.touches[0].clientX || e.targetTouches[0].clientX;
    } else {
      this.startX = e.clientX;
    }
  }

  mouseup(e: TouchEvent | MouseEvent) {
    if (e instanceof MouseEvent) {
      this.endX = e.clientX;
    }

    if (
      this.isClicked &&
      this.startX &&
      Math.abs(this.startX - Number(this.endX)) >= 40
    )
      this.go(!Math.min(0, this.startX - Number(this.endX)) ? 1 : -1);
    this.isClicked = false;
    this.startX = null;
    this.endX = null;
  }

  go(dir: 1 | -1) {
    if (!this.isPlaying) {
      this.isPlaying = true;
      if (this.current + dir < 0) this.current = this.images.length - 1;
      else if (this.current + dir >= this.images.length) this.current = 0;
      else this.current += dir;

      const left = (part: HTMLDivElement, next: Node) => {
        part.prepend(next);
        gsap.to(part, { duration: 0, x: -window.innerWidth });
        gsap.to(part, { ...this.animOptions, x: 0 }).then(() => {
          part.children[1].remove();
          this.isPlaying = false;
        });

        // Tweening the image
        gsap.from(next.childNodes[0], {
          duration: 2,
          zIndex: -99999,
          scale: 1.5,
        });
      };

      const right = (part: HTMLDivElement, next: Node) => {
        part.appendChild(next);
        gsap
          .to(part, { ...this.animOptions, x: -window.innerWidth })
          .then(() => {
            part.children[0].remove();
            gsap.to(part, { duration: 0, x: 0 });
            this.isPlaying = false;
          });

        // Tweening the image
        gsap.from(next.childNodes[0], {
          duration: 2,
          zIndex: -99999,
          scale: 1.5,
        });
      };

      for (let p in this.parts) {
        let part = this.parts[p];
        let img = document.createElement("img");
        img.src = this.images[this.current];
        let title = document.createElement("h1");
        title.innerHTML = this.titles[this.current];
        let next = new SliderItem(
          this.images[this.current],
          this.titles[this.current],
          this.contents[this.current],
          this.current + 1,
          this.images.length
        ).DOM.main as HTMLDivElement;

        if ((Number(p) - Math.max(0, dir)) % 2) {
          right(part, next);
        } else {
          left(part, next);
        }
      }
      _CURSOR_.parallax();
    }
  }

  autoplay() {
    const autoplayInterval = 7000;

    const autoplayTimeline = gsap
      .timeline({ repeat: -1, paused: true })
      .to({}, { duration: autoplayInterval / 1000 }) // Dummy animation to control the interval
      .add(() => {
        if (!this.isPlaying) {
          this.go(this.defaultDir);
        }
      });

    autoplayTimeline.play();
  }

  bindEvents() {
    window.addEventListener("mousedown", this.mousedown.bind(this), false);
    window.addEventListener("touchstart", this.mousedown.bind(this), false);
    window.addEventListener(
      "touchmove",
      (e) => {
        if (this.isClicked) {
          this.endX = e.touches[0].clientX || e.targetTouches[0].clientX;
        }
      },
      false
    );
    window.addEventListener("touchend", this.mouseup.bind(this), false);
    window.addEventListener("mouseup", this.mouseup.bind(this), false);
  }
  // protected _title: HTMLCollectionOf<Element>;
  // protected _subtitle: HTMLCollectionOf<Element>;
  // protected _description: HTMLCollectionOf<Element>;

  // constructor() {
  //   this._title = document.getElementsByClassName("fnt-freight");
  //   this._subtitle = document.getElementsByClassName("box__content");
  //   this._description = document.getElementsByClassName("typo--display");
  // }

  // staggerTextAnimate() {
  //   const staggerTextAnimate = {
  //     duration: 0.7,
  //     opacity: 0,
  //     y: 80,
  //     transformOrigin: "0% 50% -50",
  //     ease: "power2.easeOut",
  //     stagger: 0.01,
  //   };

  //   // let sections = document.querySelectorAll("section");
  //   // window.onload = () => {
  //   // sections.forEach((section) => {
  //   //   const text = new SplitType(".stagger-animate");
  //   //   const chars = text.chars!;

  //   //   gsap.from(chars, {
  //   //     scrollTrigger: {
  //   //       trigger: section,
  //   //       start: "-1 top",
  //   //       end: "bottom top",
  //   //       markers: true,
  //   //     },
  //   //     ...staggerTextAnimate,
  //   //   });
  //   // });
  //   // };

  //   let title = document.getElementById("#about-title");
  //   window.onload = () => {
  //     const text = new SplitType(".stagger-animate");
  //     const chars = text.chars!;

  //     gsap.from(chars, {
  //       scrollTrigger: {
  //         trigger: title,
  //         start: "-1 top",
  //         end: "bottom top",
  //       },
  //       ...staggerTextAnimate,
  //     });
  //   };
  // }

  // revealTextAnimate() {
  //   let reveal = document.querySelectorAll(".reveal");

  //   reveal.forEach((el) => {
  //     let headings = el.querySelectorAll("h3, p");

  //     gsap.from(headings, {
  //       scrollTrigger: {
  //         trigger: el,
  //         start: "center 75%",
  //         end: "top 50%",
  //         markers: true,
  //         // toggleActions: "play none none reverse ",
  //       },
  //       y: 80,
  //       stagger: 0.05,
  //       opacity: 0,
  //       duration: 1,
  //       ease: "power3.out",
  //     });

  //     // ScrollTrigger.create({

  //     // });
  //   });
  // }
}

export const _ABOUT_ = new About(images, titles, contents);
_ABOUT_.autoplay();

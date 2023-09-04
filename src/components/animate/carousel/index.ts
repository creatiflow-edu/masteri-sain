import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

export class Carousel {
  protected slideDelay: number;
  protected slideDuration: number;
  protected slides: NodeListOf<Element>;
  protected prevButton: HTMLElement | null;
  protected nextButton: HTMLElement | null;
  protected numSlides: number;
  protected wrap: any;
  protected timer: any;
  protected animation: any;
  protected proxy: any;
  protected slideAnimation: any;
  protected slideWidth: number;
  protected wrapWidth: number;
  protected draggable: Draggable;

  constructor() {
    this.slideDelay = 3;
    this.slideDuration = 1;
    this.slides = document.querySelectorAll(".slider-item");
    this.prevButton = document.querySelector("#prevButton");
    this.nextButton = document.querySelector("#nextButton");
    this.numSlides = this.slides.length;
    this.wrap = this.wrapPartial(-100, (this.numSlides - 1) * 100);
    this.timer = gsap.delayedCall(this.slideDelay, this.autoPlay.bind(this));
    for (let i = 0; i < this.numSlides; i++) {
      gsap.set(this.slides[i], {
        xPercent: i * 100,
      });
      gsap.to(this.slides[i], {
        duration: 1,
        xPercent: `+= ${this.numSlides * 100}`,
        ease: "none",
        paused: true,
        repeat: -1,
        modifiers: {
          xPercent: this.wrap,
        },
      });
    }

    this.animation = gsap.to(this.slides, {
      duration: 1,
      xPercent: `+= ${this.numSlides * 100}`,
      ease: "none",
      paused: true,
      repeat: -1,
      modifiers: {
        xPercent: this.wrap,
      },
    });
    this.proxy = document.createElement("div");
    gsap.set(this.proxy, { x: 0 });
    this.slideAnimation = gsap.to({}, { duration: 0.1 });
    this.slideWidth = 0;
    this.wrapWidth = 0;
    this.resize();
    // this.initListeners();
    this.draggable = new Draggable(this.proxy, {
      trigger: ".slides-container",
      throwProps: true,
      onPress: this.updateDraggable.bind(this),
      onDrag: this.updateProgress.bind(this),
      // onThrowUpdate: this.updateProgress.bind(this),
      snap: {
        x: this.snapX.bind(this),
      },
    });

    window.addEventListener("resize", this.resize.bind(this));
    if (this.prevButton && this.nextButton) {
      this.prevButton.addEventListener("click", () => this.animateSlides(1));
      this.nextButton.addEventListener("click", () => this.animateSlides(-1));
    }
  }

  initListeners() {
    this.draggable = new Draggable(this.proxy, {
      trigger: ".slides-container",
      throwProps: true,
      onPress: this.updateDraggable.bind(this),
      onDrag: this.updateProgress.bind(this),
      onThrowUpdate: this.updateProgress.bind(this),
      snap: {
        x: this.snapX.bind(this),
      },
    });

    window.addEventListener("resize", this.resize.bind(this));
    if (this.prevButton && this.nextButton) {
      this.prevButton.addEventListener("click", () => this.animateSlides(1));
      this.nextButton.addEventListener("click", () => this.animateSlides(-1));
    }
  }

  updateDraggable() {
    this.timer.restart(true);
    this.slideAnimation.kill();
    this.draggable.update();
  }

  animateSlides(direction: number) {
    this.timer.restart(true);
    this.slideAnimation.kill();
    const x = this.snapX(
      Number(gsap.getProperty(this.proxy, "x")) + direction * this.slideWidth
    );

    this.slideAnimation = gsap.to(this.proxy, {
      duration: this.slideDuration,
      x: x,
      onUpdate: this.updateProgress.bind(this),
    });
  }

  autoPlay() {
    // if (
    //   this.draggable.isPressed ||
    //   this.draggable.isDragging ||
    //   this.draggable.isThrowing
    // ) {
    //   this.timer.restart(true);
    // } else {
    //   this.animateSlides(-1);
    // }
  }

  updateProgress() {
    this.animation?.progress(
      gsap.utils.wrap(
        0,
        1,
        Number(gsap.getProperty(this.proxy, "x")) / this.wrapWidth
      )
    );
  }

  resize() {
    const norm =
      Number(gsap.getProperty(this.proxy, "x")) / this.wrapWidth || 0;

    this.slideWidth = this.slides[0].offsetWidth;
    this.wrapWidth = this.slideWidth * this.numSlides;

    gsap.set(this.proxy, { x: norm * this.wrapWidth });

    this.animateSlides(0);
    this.slideAnimation.progress(1);
  }

  snapX(x: number) {
    console.log(x);
    return Math.round(x / this.slideWidth) * this.slideWidth;
  }

  wrapPartial(min: number, max: number) {
    var r = max - min;
    return function (value: any) {
      var v = value - min;
      return ((r + (v % r)) % r) + min;
    };
  }
}

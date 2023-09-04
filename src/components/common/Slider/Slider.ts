import { SliderItem } from "./SliderItem";

export class Slider {
  private images: string[];
  private titles: string[];
  private contents: string[];
  private parts: HTMLDivElement[];
  private current: number;
  private playing: boolean;
  private defaultDir: 1 | -1;
  private animOptions: { duration: number; ease: gsap.EaseFunction };
  private startX: number | null;
  private endX: number | null;
  private clicked: boolean;

  constructor(images: string[], titles: string[], contents: string[]) {
    this.images = images;
    this.titles = titles;
    this.contents = contents;
    this.parts = [];
    this.current = 0;
    this.playing = false;
    this.defaultDir = 1;
    this.animOptions = {
      duration: 1,
      ease: Power4.easeInOut,
    };

    this.startX = null;
    this.endX = null;
    this.clicked = false;

    this.create();
    this.bindEvents();
  }

  create() {
    const main = document.getElementById("main") as HTMLDivElement;

    const part = document.createElement("div");
    part.className = "part";
    const slide = new SliderItem(
      this.images[this.current],
      this.contents[this.current]
    );
    part.appendChild(slide.DOM.main as HTMLDivElement);
    main.appendChild(part);
    this.parts.push(part);
  }

  mousedown(e: TouchEvent | MouseEvent) {
    this.clicked = true;
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
      this.clicked &&
      this.startX &&
      Math.abs(this.startX - Number(this.endX)) >= 40
    )
      this.go(!Math.min(0, this.startX - Number(this.endX)) ? 1 : -1);
    this.clicked = false;
    this.startX = null;
    this.endX = null;
  }

  go(dir: 1 | -1) {
    if (!this.playing) {
      this.playing = true;
      if (this.current + dir < 0) this.current = this.images.length - 1;
      else if (this.current + dir >= this.images.length) this.current = 0;
      else this.current += dir;

      // function up(part, next) {
      //   part.appendChild(next);
      //   gsap
      //     .to(part, { ...this.animOptions, y: -window.innerHeight })
      //     .then(function () {
      //       part.children[0].remove();
      //       gsap.to(part, { duration: 0, y: 0 });
      //     });
      // }

      // function down(part, next) {
      //   part.prepend(next);
      //   gsap.to(part, { duration: 0, y: -window.innerHeight });
      //   gsap.to(part, { ...this.animOptions, y: 0 }).then(function () {
      //     part.children[1].remove();
      //     this.playing = false;
      //   });
      // }

      const left = (part: HTMLDivElement, next: Node) => {
        part.prepend(next);
        gsap.to(part, { duration: 0, x: -window.innerWidth });
        gsap.to(part, { ...this.animOptions, x: 0 }).then(() => {
          part.children[1].remove();
          this.playing = false;
        });
      };

      const right = (part: HTMLDivElement, next: Node) => {
        part.appendChild(next);
        gsap
          .to(part, { ...this.animOptions, x: -window.innerWidth })
          .then(() => {
            part.children[0].remove();
            gsap.to(part, { duration: 0, x: 0 });
            this.playing = false;
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
          this.contents[this.current]
        ).DOM.main as HTMLDivElement;

        if ((Number(p) - Math.max(0, dir)) % 2) {
          right(part, next);
        } else {
          left(part, next);
        }
      }
    }
  }

  autoplay() {
    const autoplayInterval = 2000;

    const autoplayTimeline = gsap
      .timeline({ repeat: -1, paused: true })
      .to({},{duration: autoplayInterval/1000}) // Dummy animation to control the interval
      .add(() => {
        if (!this.playing) {
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
        if (this.clicked) {
          this.endX = e.touches[0].clientX || e.targetTouches[0].clientX;
        }
      },
      false
    );
    window.addEventListener("touchend", this.mouseup.bind(this), false);
    window.addEventListener("mouseup", this.mouseup.bind(this), false);
  }
}

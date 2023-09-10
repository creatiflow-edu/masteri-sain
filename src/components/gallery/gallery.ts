import { gsap } from "gsap";
import { GalleryItem } from "./galleryItem";
import { ProcessingBar } from "./progressBar";
import { TabItem } from "./tabItem";

export class Gallery {
  DOM: {
    tabs: NodeListOf<HTMLDivElement>;
    slider: NodeListOf<HTMLDivElement>;
    line: HTMLDivElement;
    btnNext: HTMLButtonElement;
    btnPrev: HTMLButtonElement;
  };
  obGalleryItems: GalleryItem[];
  indexSlider: number;
  tlGallery: gsap.core.Timeline;
  obProcessingBar: ProcessingBar;
  breakPointSlider: 0 | 33 | 66 | 99;
  obTabs: TabItem[];

  constructor() {
    this.DOM = {
      tabs: document.querySelectorAll(
        ".heading__item"
      ) as NodeListOf<HTMLDivElement>,
      slider: document.querySelectorAll(
        ".gallery-slider-item"
      ) as NodeListOf<HTMLDivElement>,
      line: document.getElementById("line") as HTMLDivElement,
      btnNext: document.querySelector(".btn-next") as HTMLButtonElement,
      btnPrev: document.querySelector(".btn-prev") as HTMLButtonElement,
    };

    this.indexSlider = 0;
    this.obGalleryItems = [];
    this.DOM.slider.forEach((el: HTMLDivElement) => {
      this.obGalleryItems.push(new GalleryItem(el));
    });

    this.breakPointSlider = 33;

    this.obTabs = [];
    this.DOM.tabs.forEach((el: HTMLParagraphElement) => {
      this.obTabs.push(new TabItem(el));
    });

    this.obProcessingBar = new ProcessingBar(this.DOM.line);
    this.autoPlay = this.autoPlay.bind(this);

    this.tlGallery = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.1,
      // paused: true,
      onStart: () => {
        this.autoPlay;
      },
      onRepeat: this.autoPlay,
    });

    this.bindEvent();
  }

  autoPlay() {
    this.obProcessingBar.update();
    if (this.obProcessingBar.progressNumber === this.breakPointSlider) {
      this.indexSlider++;
      this.breakPointSlider += 33;

      this.obTabs[this.indexSlider - 1].remove();
      this.obGalleryItems[this.indexSlider - 1].slideOut();
    }
    if (this.indexSlider === this.obGalleryItems.length) {
      this.indexSlider = 0;
      this.breakPointSlider = 33;
    }

    this.obTabs[this.indexSlider].active();
    this.obGalleryItems[this.indexSlider].slideIn();
  }

  handleNextSlideClick() {
    this.obProcessingBar.progressNumber = (this.indexSlider + 1) * 33;
    if (this.obProcessingBar.progressNumber === this.breakPointSlider) {
      this.indexSlider++;
      this.breakPointSlider += 33;

      this.obTabs[this.indexSlider - 1].remove();
      this.obGalleryItems[this.indexSlider - 1].slideOut();
    }
    if (this.indexSlider === this.obGalleryItems.length) {
      this.indexSlider = 0;
      this.breakPointSlider = 33;
    }

    this.obTabs[this.indexSlider].active();
    this.obGalleryItems[this.indexSlider].slideIn();
  }

  handlePrevSlideClick() {
    if (this.indexSlider === 0) {
      this.obProcessingBar.progressNumber =
        (this.obGalleryItems.length - 1) * 33;
    } else {
      this.obProcessingBar.progressNumber = (this.indexSlider - 1) * 33;
    }
    if (this.obProcessingBar.progressNumber <= this.breakPointSlider * 2) {
      if (this.indexSlider === 0) {
        this.indexSlider = this.obGalleryItems.length - 1;
        this.breakPointSlider = 99;
      } else {
        this.indexSlider--;
        this.breakPointSlider -= 33;
      }
      let toRemoveIndex =
        this.indexSlider + 1 === this.obGalleryItems.length
          ? 0
          : this.indexSlider + 1;
      this.obTabs[toRemoveIndex].remove();
      this.obGalleryItems[toRemoveIndex].slideOut();
    }

    this.obTabs[this.indexSlider].active();
    this.obGalleryItems[this.indexSlider].slideIn();
  }

  bindEvent() {
    this.DOM.btnNext.addEventListener(
      "click",
      this.handleNextSlideClick.bind(this)
    );
    this.DOM.btnPrev.addEventListener(
      "click",
      this.handlePrevSlideClick.bind(this)
    );
  }
}

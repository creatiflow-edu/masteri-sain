import { gsap } from "gsap";
import { GalleryItem } from "./galleryItem";
import { TabItems } from "./tabItem";
import { ProcessingBar } from "./processingBar";

export class Gallery {
  constructor() {
    this.DOM = {
      tabs: document.querySelectorAll(".gallery_tabs-tab"),
      slider: document.querySelectorAll(".gallery_slider-item"),
      line: document.getElementById("line"),
      btnNext: document.querySelector(".js-next"),
      btnPrev: document.querySelector(".js-prev"),
    };

    this.indexSlider = 0;
    this.obGalleryItems = [];
    this.DOM.slider.forEach((el) => {
      this.obGalleryItems.push(new GalleryItem({ el }));
    });

    this.breakPointSlider = 33;

    this.obTabs = [];
    this.DOM.tabs.forEach((el) => {
      this.obTabs.push(new TabItems({ el }));
    });

    this.obProcessingBar = new ProcessingBar({ el: this.DOM.line });
    this.nextSlide = this.nextSlide.bind(this);
    this.updateProgress = this.nextSlide.bind(this);

    this.tlGallery = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.1,
      onStart: () => {
        this.nextSlide;
      },
      onRepeat: this.nextSlide,
    });

    this.bindEvent();
  }

  nextSlide() {
    this.obProcessingBar.update();

    if (this.obProcessingBar.progressNumber === this.breakPointSlider) {
      this.indexSlider++;
      this.breakPointSlider += 33;

      this.obTabs[this.indexSlider - 1].remove();
      this.obGalleryItems[this.indexSlider - 1].sliderOut();
    }
    if (this.indexSlider === this.obGalleryItems.length) {
      this.indexSlider = 0;
      this.breakPointSlider = 33;
    }

    this.obTabs[this.indexSlider].active();
    this.obGalleryItems[this.indexSlider].sliderIn();
  }

  prevSlide() {
    this.indexSlider--;
  }

  transDone() {
    console.log("complete");
  }

  bindEvent() {
    this.DOM.btnNext.addEventListener("click", this.nextSlide.bind(this));
    this.DOM.btnPrev.addEventListener("click", this.prevSlide.bind(this));
  }
}

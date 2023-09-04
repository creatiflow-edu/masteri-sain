import { gsap} from "gsap";
import SplitType from "split-type";

export class SliderItem {
  img: string;
  title: string | undefined;
  contents: string[] | undefined;
  DOM: {
    main?: HTMLDivElement;
    title?: string;
    contents?: string[];
  };
  constructor(img: string, title?: string, contents?: string[]) {
    this.img = img;
    this.title = title;
    this.contents = contents;
    this.DOM = {};
    this.create();
    this.slideIn();
  }

  create() {
    this.DOM.main = document.createElement("div");
    this.DOM.main.className = "section";

    const title = document.createElement("h2");
    title.classList.add("fnt-freight");
    title.innerHTML = this.title as string;

    this.contents?.forEach((c) => {
      const content = document.createElement("h1");
      content.classList.add("slide__content");
      content.innerHTML = c;
      this.DOM.main?.appendChild(content);
    });

    const img = document.createElement("img");
    img.src = this.img;
    this.DOM.main.appendChild(img);
    this.DOM.main.appendChild(title);
  }

  slideIn() {
    const content = new SplitType(
      this.DOM.main?.querySelector(".slide__title") as HTMLDivElement
    );
    gsap.from(content.chars, {
      y: 10,
      stagger: 0.05,
      delay: 0.5,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }
}

import { gsap } from "gsap";
import SplitType from "split-type";

export class SliderItem {
  index?: number;
  totalSlide?: number;
  img: string;
  title: string | undefined;
  contents: string[] | undefined;
  DOM: {
    main?: HTMLDivElement;
    title?: string;
    contents?: string[];
  };
  constructor(
    img: string,
    title?: string,
    contents?: string[],
    index?: number,
    totalSlide?: number
  ) {
    this.index = index;
    this.totalSlide = totalSlide;
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
    this.DOM.main.classList.add("container", "pt-[11rem]");

    const img = document.createElement("img");
    img.src = this.img;
    img.classList.add("slider-item__img");
    this.DOM.main.appendChild(img);

    const box = document.createElement("div");
    box.classList.add("box", "grid", "grid-cols-22");
    const boxHead = document.createElement("div");
    boxHead.classList.add("box_head", "col-start-1", "col-span-9");

    const title = document.createElement("h2");
    title.id = "about-title";
    title.classList.add("stagger-animate", "fnt-freight", "slide__title");
    title.innerHTML = this.title as string;

    const sectionHead = document.createElement("div");
    sectionHead.classList.add(
      "box_ttl",
      "col-start-1",
      "col-span-2",
      "typo--overline",
      "color--white"
    );

    sectionHead.innerHTML = "Superior";

    boxHead.append(title);
    box.append(boxHead, sectionHead);

    this.contents?.forEach((c) => {
      const content = document.createElement("p");
      content.classList.add("box__content", "col-start-12", "col-span-5");
      content.innerHTML = c;
      box.appendChild(content);
    });

    const boxNumber = document.createElement("p");
    boxNumber.classList.add(
      "box__number",
      "col-start-4",
      "typo--display",
      "color--white"
    );
    boxNumber.innerHTML = `0${this.index}`;

    const sliderPages = document.createElement("div");
    sliderPages.classList.add("slider-pages", "typo--label");

    const currentPage = document.createElement("p");
    currentPage.classList.add("pages", "pages--current");
    currentPage.innerText = `0${this.index?.toString() as string}`;

    const totalPage = document.createElement("p");
    totalPage.classList.add("pages", "pages--total");
    totalPage.innerText = `/0${this.totalSlide?.toString() as string}`;

    sliderPages.append(currentPage, totalPage);

    const callToAction = document.createElement("div");
    callToAction.classList.add("call-to-action-button", `call-to-action-button-${this.index}`);
    const circle = document.createElement("circle");
    circle.classList.add("circle");
    const buttonText = document.createElement("p");
    buttonText.classList.add("button-text", "typo--button", "color--white");
    buttonText.innerText = "Discover design";
    callToAction.append(circle, buttonText);
    
    box.append(boxNumber, sliderPages, callToAction);
    this.DOM.main.append(box);
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

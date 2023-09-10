export class TabItem {
  DOM: HTMLParagraphElement ;

  constructor( el :  HTMLParagraphElement ) {
    this.DOM =  el ;
  }
  active() {
    this.DOM.classList.add("heading__item--active");
  }

  remove() {
    this.DOM.classList.remove("heading__item--active");
  }
}

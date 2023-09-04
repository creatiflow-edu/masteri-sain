export class TabItems {
  constructor({ el }) {
    this.DOM = { el };
  }
  active() {
    this.DOM.el.classList.add("active");
  }

  remove() {
    this.DOM.el.classList.remove("active");
  }
}

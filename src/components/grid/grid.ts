export class Grid {
  protected _grid: HTMLElement | null;

  constructor() {
    this._grid = document.getElementById("js-grid");
  }

  toggleGrid() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "G" && e.shiftKey) {
        if (this._grid && !this._grid.classList.contains("display")) {
          this._grid.classList.add("display");
          console.log("add grid");
        } else if (this._grid) {
          console.log("remove grid");
          this._grid.classList.remove("display");
        }
      }
    });
  }
}

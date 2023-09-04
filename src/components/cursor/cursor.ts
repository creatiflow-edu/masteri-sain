import { gsap } from "gsap";

type Position = {
  x: number;
  y: number;
};
export class Cursor {
  protected _mouse: Position;
  protected _pos: Position;
  protected _ratio;
  protected _isActive: boolean;
  protected _cursor: HTMLElement | null;

  constructor() {
    this._cursor = document.getElementById("js-cursor");
    this._mouse = { x: 0, y: 0 };
    this._pos = { x: 0, y: 0 };
    this._ratio = 0.15;
    this._isActive = false;
  }

  animate() {
    const cursor = this._cursor;
    if (!cursor) return;
    // Custom cursor
    window.addEventListener("mousemove", moveCursor);

    function moveCursor(e: MouseEvent) {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
      });
    }

    //default cursor
    const defaultCursor = {
      backgroundColor: "transparent",
      color: "#fff",
      height: "1.5rem",
      width: "1.5rem",
      border: "1px solid #B0B0B0",
      outline: "none",
      zIndex: "999",
    };

    //cursor depend attr
    const hoverList = document.querySelectorAll(".hover");

    hoverList.forEach((hoverEffect) => {
      hoverEffect.addEventListener("mouseenter", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const currentTarget = e.currentTarget as HTMLElement;
        if (!currentTarget) return;

        let cursorContent = currentTarget.getAttribute("data-content")!;
        let cursorBgColor = currentTarget.getAttribute("data-bgcolor");
        let cursorSize = currentTarget.getAttribute("data-size");
        let cursorTextColor = currentTarget.getAttribute("data-color");
        let cursorTextSize = currentTarget.getAttribute("data-fontsize")!;
        let cursorOutline = currentTarget.getAttribute("data-outline");

        cursor.classList.add("active");
        const cursorInnerText =
          document.querySelector<HTMLElement>(".cursor .content")!;
        if (cursorInnerText) {
          cursorInnerText.innerHTML = cursorContent;
          cursorInnerText.style.fontSize = cursorTextSize;
        }
        Object.assign(cursor.style, {
          backgroundColor: cursorBgColor,
          color: cursorTextColor,
          height: cursorSize,
          width: cursorSize,
          border: "none",
          outline: `${cursorOutline} solid 1px`,
          outlineOffset: "-3px",
          zIndex: "999",
        });
      });

      hoverEffect.addEventListener("mouseleave", () => {
        cursor.classList.remove("active");
        document.querySelector(".cursor .content span")!.innerHTML = "";
        Object.assign(cursor.style, defaultCursor);
      });
    });
  }

  mouseMove() {
    if (!this._cursor) return;

    const mouseMove = (e: MouseEvent) => {
      gsap.to(this._cursor, { x: e.clientX, y: e.clientY, duration: 0.5 });
    };

    document.addEventListener("mousemove", mouseMove);

    //default cursor
    const defaultCursor = {
      backgroundColor: "transparent",
      color: "#fff",
      height: "1.5rem",
      width: "1.5rem",
      border: "1px solid #B0B0B0",
      outline: "none",
      zIndex: "999",
    };

    Object.assign(this._cursor.style, defaultCursor);
  }

  setIsActive(isActive: boolean) {
    this._isActive = isActive;
  }

  parallaxIt(
    event: MouseEvent,
    parent: HTMLElement,
    target: HTMLElement[],
    movement: any
  ): void {
    if (parent) {
      const boundingRect = parent.getBoundingClientRect();
      const relX = event.clientX - boundingRect.left;
      const relY = event.clientY - boundingRect.top;

      gsap.to(target, {
        x: ((relX - boundingRect.width / 2) / boundingRect.width) * movement,
        y: ((relY - boundingRect.height / 2) / boundingRect.height) * movement,
        ease: "power2.easeOut",
        duration: 0.3,
      });
    }
  }

  parallax() {
    const buttons = document.querySelectorAll<HTMLElement>(
      ".call-to-action-button"
    );

    buttons.forEach((button) => {
      const q = gsap.utils.selector(button);
      const circle = q(".circle");
      const buttonText = q(".button-text");

      if (button && circle && buttonText) {
        button.addEventListener("mousemove", (event: MouseEvent) => {
          this.parallaxIt(event, button, circle, 80);
          this.parallaxIt(event, button, buttonText, 50);
        });

        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            transformOrigin: "50 50",
            scale: 1.3,
            duration: 0.3,
          });

          gsap.to(circle, { scale: 0.85, duration: 0.3 });

          button.style.cursor = "pointer";
        });

        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
          });

          gsap.to(".circle, .button-text", {
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.3,
          });
        });
      }
    });
  }
}

export const _CURSOR_ = new Cursor()
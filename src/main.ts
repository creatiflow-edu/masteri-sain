import "./styles/styles.scss";
import { Grid } from "./components/grid/grid";

import { Cursor } from "./components/cursor/cursor";
import { _ABOUT_ } from "./components/about/about";
import { Gallery } from "./components/gallery/gallery";
// import { Carousel } from "./components/animate/carousel";
// import { Gallery } from "./components/gallery/gallery";
// import { Slideshow } from "./components/animate/carousel";

const grid = new Grid();
grid.toggleGrid();

const cursor = new Cursor();
cursor.mouseMove();
cursor.parallax();

_ABOUT_
// const about = new About();
// about.staggerTextAnimate();
// about.revealTextAnimate();

const gallery = new Gallery();
// const carousel = new Carousel();
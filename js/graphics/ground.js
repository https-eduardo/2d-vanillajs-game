import { Collision } from "../collision.js";
import { Graphic } from "./graphic.js";

export class Ground extends Graphic {
  #img
  constructor(img) {
    super('div');
    this.#img = img;
  }

  mount() {
    const groundEl = document.createElement(this.tagName);
    groundEl.style.background = `url(${this.#img})`;
    groundEl.style.position = 'absolute';
    groundEl.style.height = '25px';
    groundEl.style.width = '100%';
    groundEl.style.bottom = '0';

    Collision.addToElement(groundEl, 'ground');

    return groundEl;
  }
}
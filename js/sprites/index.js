import { Graphic } from "../graphics/graphic.js";

export class Sprite extends Graphic {
  #spriteEl
  #imgsFolder
  #state = 'idle'

  constructor(imgsFolder) {
    super('img')
    this.#imgsFolder = imgsFolder;
  }

  mount() {
    const sprite = document.createElement(this.tagName);
    sprite.style.position = 'absolute';
    this.#spriteEl = sprite;
    this.changeSpriteFrame('idle');

    return sprite;
  }

  changeSpriteFrame(name) {
    this.#spriteEl.src = `${this.#imgsFolder}/${name}.png`;
  }

  updateState(state) {
    if (this.#state !== state) {
      const oldState = this.#state
      this.#state = state;
      this.onStateChange(oldState, state)
    }
  }

  async onStateChange(oldState, newState) { }

  get element() {
    return this.#spriteEl;
  }

  get state() {
    return this.#state;
  }
}
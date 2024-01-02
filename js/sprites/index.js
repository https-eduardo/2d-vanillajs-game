import { Graphic } from "../graphics/graphic.js";
import { SpriteAnimation } from "./animation.js";
import { delay } from "../utils/promises.js";

export class Sprite extends Graphic {
  #spriteEl
  #imgsFolder
  #state = 'idle'
  #jumpEnabled = true
  #animation

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

  move(direction, speed) {
    if (!this.#spriteEl) throw new Error('Operation not allowed until the elememt have been mounted')
    const { left } = this.#getSpriteOffset();
    this.#updateState('walking')

    switch (direction) {
      case "forward":
        this.#spriteEl.style.transform = 'scaleX(1)';
        this.#spriteEl.style.left = `${left + speed}px`;
        break;
      case "backward":
        this.#spriteEl.style.transform = 'scaleX(-1)';
        this.#spriteEl.style.left = `${left - speed}px`;
        break;
    }
  }

  async jump(speed) {
    if (this.#state === 'jumping' || !this.#jumpEnabled) return;
    this.#updateState('jumping');

    const intervalUp = setInterval(() => {
      const { top } = this.#getSpriteOffset();
      this.#spriteEl.style.top = `${top - speed}px`;
    }, speed * 2.5)

    await delay(speed * 20);

    clearInterval(intervalUp);

    this.#updateState('idle')
  }


  #updateState(state) {
    if (this.#state !== state) {
      const oldState = this.#state
      this.#state = state;
      this.#onStateChange(oldState, state)
    }
  }

  goIdle() {
    this.#updateState('idle');
  }

  async #onStateChange(oldState, newState) {
    if (this.#animation)
      this.#animation.stop();

    switch (newState) {
      case 'idle':
        this.changeSpriteFrame('idle')
        this.#jumpEnabled = true;
        break;
      case 'walking':
        this.#animation = new SpriteAnimation(this)
        this.#animation.start('move')
        break;
      case 'jumping':
        this.#jumpEnabled = false;
        this.changeSpriteFrame('jump_2')
        break;
    }
  }

  get element() {
    return this.#spriteEl;
  }

  #getSpriteOffset() {
    const rect = this.#spriteEl.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }
}
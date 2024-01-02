import { Sprite } from "./index.js";
import { getElementOffset } from "../utils/position.js";
import { SpriteAnimation } from "./animation.js";
import { delay } from "../utils/promises.js";

export class Creature extends Sprite {
  #jumpEnabled = true
  #animation

  constructor(imgsFolder) {
    super(imgsFolder);
  }

  goIdle() {
    this.updateState('idle');
  }

  move(direction, speed) {
    if (!this.element) throw new Error('Operation not allowed until the elememt have been mounted')
    const { left } = getElementOffset(this.element);
    this.updateState('walking')

    switch (direction) {
      case "forward":
        this.element.style.transform = 'scaleX(1)';
        this.element.style.left = `${left + speed}px`;
        break;
      case "backward":
        this.element.style.transform = 'scaleX(-1)';
        this.element.style.left = `${left - speed}px`;
        break;
    }
  }

  async jump(speed) {
    if (this.state === 'jumping' || !this.#jumpEnabled) return;
    this.updateState('jumping');

    const intervalUp = setInterval(() => {
      const { top } = getElementOffset(this.element);
      this.element.style.top = `${top - speed}px`;
    }, speed * 2.5)

    await delay(speed * 20);

    clearInterval(intervalUp);

    this.updateState('idle')
  }

  async onStateChange(oldState, newState) {
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
}
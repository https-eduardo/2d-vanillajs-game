import { Sprite } from "./sprites/index.js";
import { keyboardMapper } from "./keyboard.js";
import { delay } from "./utils/promises.js";
import { Gravity } from "./gravity.js";

export class Character extends Sprite {
  SPEED = 10;
  constructor() {
    super('../assets/sprites/character');

    this.#init();
  }

  async #init() {
    keyboardMapper.registerKeyDown('w', () => this.jump(this.SPEED));
    keyboardMapper.registerKeyDown('d', () => this.move('forward', this.SPEED));
    keyboardMapper.registerKeyDown('a', () => this.move('backward', this.SPEED));

    keyboardMapper.registerKeyUp('d', () => this.goIdle());
    keyboardMapper.registerKeyUp('a', () => this.goIdle());

    while (!this.element)
      await delay(1);

    Gravity.addToElement(this.element);
  }
}
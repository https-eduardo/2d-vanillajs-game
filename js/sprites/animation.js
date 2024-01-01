export class SpriteAnimation {
  #animationId
  #sprite
  #cycles
  #interval
  #onCycle
  constructor(sprite, interval = 100, cycles = 8) {
    this.#sprite = sprite;
    this.#interval = interval;
    this.#cycles = cycles;
  }

  onCycle(cb) {
    this.#onCycle = cb;
  }

  start(animationName) {
    let cycle = 1
    const runCycle = () => {
      if (cycle > this.#cycles) cycle = 1
      if (this.#onCycle) this.#onCycle();
      this.#sprite.changeSpriteFrame(`${animationName}_${cycle}`)
      cycle++;
    }
    runCycle();
    this.#animationId = setInterval(() => {
      runCycle();
    }, this.#interval);
  }

  stop() {
    clearInterval(this.#animationId);
  }
}
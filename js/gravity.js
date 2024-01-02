export class Gravity {
  static #GRAVITY = 0.02;
  static #gravitySpeed = 0;
  static #GROUND_HEIGHT = 25;

  static addToElement(element) {
    setInterval(() => {
      this.#handleGravity(element);
    });
  }

  static #handleGravity(element) {
    this.#gravitySpeed += this.#GRAVITY;
    const { top } = this.#getOffset(element)


    if (!this.#isInGround(element))
      element.style.top = `${top + this.#gravitySpeed}px`;
  }

  static #isInGround(element) {
    const ground = window.innerHeight - this.#GROUND_HEIGHT - element.height;
    const { top } = this.#getOffset(element);

    if (top < ground)
      return false;

    element.style.top = `${ground}px`;
    this.#gravitySpeed = 0;
    return true;
  }

  static #getOffset(element) {
    const rect = element.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }
}
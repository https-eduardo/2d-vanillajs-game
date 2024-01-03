import { Collision } from "./collision.js";
import { getElementGroundDistance, getElementOffset } from "./utils/position.js";

export class Gravity {
  static #GRAVITY = 0.02;
  static #gravitySpeed = 0;
  static #elementsInGround = new Set();

  static addToElement(element) {
    setInterval(() => {
      this.#handleGravity(element);
    });
    this.#initElement(element);
  }

  static #handleGravity(element) {
    this.#gravitySpeed += this.#GRAVITY;
    const { top } = getElementOffset(element)


    if (!this.#isInGround(element))
      element.style.top = `${top + this.#gravitySpeed}px`;
  }

  static #initElement(element) {
    Collision.onCollide(element.id, (_, target) => {
      if (target.type === 'ground') {
        this.#elementsInGround.add(element.id);
        this.#setInGround(element, getElementGroundDistance(element, target.element));
      }
    });
    Collision.onDetach(element.id, (_, target) => {
      if (target.type === 'ground') {
        this.#elementsInGround.delete(element.id);
      }
    });
  }

  static #setInGround(element, groundHeight) {
    element.style.top = `${groundHeight}px`;
    this.#gravitySpeed = 0;
  }

  static #isInGround(element) {
    if (!this.#elementsInGround.has(element.id))
      return false;

    return true;
  }

}
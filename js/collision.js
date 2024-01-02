import { getElementOffset } from "./utils/position.js";

class CollisionHandler {
  #collisionElements = [];
  constructor() {
    this.#init();
  }

  addToElement(element, creature = false) {
    this.#collisionElements.push({ element, creature });
  }

  removeElement(id) {
    const idx = this.#collisionElements.findIndex((value) => value.element.id === id);
    this.#collisionElements.splice(idx, 1);
  }

  #init() {
    setInterval(() => {
      this.#handleCollision();
    });
  }

  #handleCollision() {
    const elementsInCollision = this.#collisionElements.map((col) => {
      return this.#collisionElements.find((target) => {
        if (target !== col)
          return this.#checkCollision(col.element, target.element);
      });
    });
    // TODO: Finish handling collisions
  }

  #checkCollision(element, targetElement) {
    const { left: x, top: y } = getElementOffset(element);
    const { left: targetX, top: targetY,
      width: targetWidth, height: targetHeight } = getElementOffset(targetElement);

    if (x >= targetX && x < targetX + targetWidth && y > targetY && y < targetY + targetHeight)
      return true;
  }
}

export const Collision = new CollisionHandler();
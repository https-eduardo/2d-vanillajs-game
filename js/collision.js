import { getElementOffset } from "./utils/position.js";

class CollisionHandler {
  #collisionElements = [];
  #elementsInCollision = new Map();
  #collideListeners = {};
  #detachListeners = {};
  constructor() {
    this.#init();
  }

  addToElement(element, type) {
    this.#collisionElements.push({ element, type });
  }

  onCollide(elementId, cb) {
    const existentListener = this.#collideListeners[elementId];

    if (!existentListener)
      this.#collideListeners[elementId] = [cb];
    else existentListener.push(cb);
  }

  onDetach(elementId, cb) {
    const existentListener = this.#detachListeners[elementId];

    if (!existentListener)
      this.#detachListeners[elementId] = [cb];
    else existentListener.push(cb);
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
    this.#collisionElements.forEach((col) => {
      const target = this.#collisionElements.find((target) => {
        if (target !== col)
          return this.#checkCollision(col.element, target.element);
      });


      if (target && target.element) {
        this.#elementsInCollision.set(col.element.id, target);
        this.#runCollideListeners(col, target);
      } else {
        const savedTarget = this.#elementsInCollision.get(col.element.id);
        if (savedTarget) {
          this.#elementsInCollision.delete(col.element.id);
          this.#runDetachListeners(col, savedTarget);
        }
      }
    });
  }

  #runCollideListeners(col, target) {
    const callbacks = this.#collideListeners[col.element.id];

    if (callbacks)
      callbacks.forEach((cb) => cb(col, target));
  }

  #runDetachListeners(col, lastTarget) {
    const callbacks = this.#detachListeners[col.element.id];

    if (callbacks)
      callbacks.forEach((cb) => cb(col, lastTarget));
  }

  #checkCollision(element, targetElement) {
    const { left: x, top: y, height } = getElementOffset(element);
    const { left: targetX, top: targetY,
      width: targetWidth, height: targetHeight } = getElementOffset(targetElement);

    if (x >= targetX && x < targetX + targetWidth && (y + height) >= targetY && y < targetY + targetHeight)
      return true;
  }
}

export const Collision = new CollisionHandler();
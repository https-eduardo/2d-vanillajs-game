class KeyboardMapper {
  #keysPressed
  #keydownMaps
  #keyupMaps

  constructor() {
    this.#keysPressed = new Set();
    this.#keydownMaps = new Map();
    this.#keyupMaps = new Map();
    document.addEventListener('keydown', this.#handleKeyDown.bind(this));
    document.addEventListener('keyup', this.#handleKeyUp.bind(this));
  }

  registerKeyDown(key, fn) {
    this.#keydownMaps.set(key, fn);
  }

  registerKeyUp(key, fn) {
    this.#keyupMaps.set(key, fn);
  }

  unregisterKeyDown(key) {
    this.#keydownMaps.delete(key);
  }

  unregisterKeyUp(key) {
    this.#keyupMaps.delete(key);
  }

  #handleKeyDown(event) {
    this.#keysPressed.add(event.key);

    this.#keydownMaps.forEach((fn, key) => {
      if (this.#keysPressed.has(key))
        fn();
    });
  }

  #handleKeyUp(event) {
    this.#keysPressed.delete(event.key);

    this.#keyupMaps.forEach((fn, key) => {
      if (event.key === key)
        fn();
    });
  }
}

export const keyboardMapper = new KeyboardMapper();
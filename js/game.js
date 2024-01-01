import { genId } from "./utils/id.js";

export class Game {
  #wrapper;
  #elements = [];
  constructor(wrapperId) {
    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) throw new Error('Could not create a new Game instance. Wrapper element not found')
    this.#wrapper = wrapper;
  }

  add(graphic) {
    const id = genId();
    const element = graphic.mount()
    this.#elements.push({ id, element })

    return id;
  }

  remove(id) {
    const idx = this.#elements.findIndex((el) => el.id === id);

    this.#elements.splice(idx, 1)
    this.#deleteFromDOM()
  }

  #insertInDOM(id, element) {
    element.id = id;
    this.#wrapper.append(element)
  }

  #deleteFromDOM(id) {
    const element = document.getElementById(id)
    element.remove()
  }

  start() {
    this.#elements.forEach(({ id, element }) => {
      this.#insertInDOM(id, element)
    });
  }
}
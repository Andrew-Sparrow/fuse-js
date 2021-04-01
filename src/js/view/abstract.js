import {createElementHTML} from "../utils/utils";

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }

    this._elementHTML = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error(`Abstract method. Not implemented: getTemplate`);
  }

  getElement(selector = ``) {
    if (!this._elementHTML) {
      this._elementHTML = createElementHTML(this.getTemplate());
    }

    // some trick
    // passing selector as an argument to get inner DOM element
    if (selector) {
      return this._elementHTML.querySelector(selector);
    }

    return this._elementHTML;
  }

  removeElement() {
    this._elementHTML = null;
  }
}

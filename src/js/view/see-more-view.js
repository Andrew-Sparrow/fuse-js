import Abstract from "./abstract";

const createSeeMoreTemplate = () => {
  return `<button class="seemore">See more</button>`;
};

export default class SeeMoreView extends Abstract {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createSeeMoreTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}

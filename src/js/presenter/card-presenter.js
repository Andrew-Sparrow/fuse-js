import CardView from "../view/cards/card-view";

import {
  render,
  replace,
  remove,
  RenderPosition,
} from "../utils/render-utils";


export default class CardPresenter {
  constructor(cardListContainerElement) {

    this._cardListContainerElement = cardListContainerElement;

    this._component = null;
  }

  init(card) {
    this._card = card;

    const prevCardComponent = this._component;

    this._component = new CardView(this._card);

    if (prevCardComponent === null) {
      render(this._cardListContainerElement, this._component, RenderPosition.BEFOREEND);
      return;
    }

    if (this._cardListContainerElement.contains(prevCardComponent.getElement())) {
      replace(this._component, prevCardComponent);
    }

    remove(prevCardComponent);
  }

  destroy() {
    remove(this._component);
  }
}

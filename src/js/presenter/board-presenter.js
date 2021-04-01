import CardsBoardView from "../view/cards/cards-board-view";
import NoCardsView from "../view/cards/no-cards";
import SeeMoreView from "../view/see-more-view";

import CardsListView from "../view/cards/cards-list-view";
import CardPresenter from "./card-presenter";

import LoadingView from "../view/loading-view";

import {
  CARDS_COUNT_PER_STEP,
  UpdateTypeForRerender,
} from "../utils/consts";

import {
  remove,
  render,
  RenderPosition
} from "../utils/render-utils";


export default class BoardPresenter {
  constructor(container, cardsModel, filterModel) {
    this._container = container;
    this._cardsModel = cardsModel;
    this._filterModel = filterModel;

    this._isLoading = true;

    this._renderedCardsCount = CARDS_COUNT_PER_STEP;

    this._cardsBoardComponent = new CardsBoardView();
    this._cardsListComponent = new CardsListView();

    this._seeMoreButtonComponent = null;

    this._noCardsComponent = new NoCardsView();
    this._loadingComponent = new LoadingView();

    this._handleModelEventForRerender = this._handleModelEventForRerender.bind(this);

    this._handleSeeMoreButtonClick = this._handleSeeMoreButtonClick.bind(this);

    this._cardsModel.addObserver(this._handleModelEventForRerender);
    this._filterModel.addObserver(this._handleModelEventForRerender);
  }

  init() {
    this._renderDesk();
  }

  _destroy() {
    this._clearDesk({resetRenderedCardsCount: true});
  }

  _getCards() {
    const cards = this._cardsModel.getItems();
    let filteredCards = [];

    filteredCards = cards;

    return filteredCards;
  }

  _renderCardInBasicBlock(card) {
    const cardPresenter = new CardPresenter(
        this._cardsListComponent
    );

    cardPresenter.init(card);
    this._listRenderedPresentersBasicBlock.set(card.id, cardPresenter);
  }

  _renderCards(cards) {
    cards
      .forEach((card) => this._renderCardInBasicBlock(card));
  }

  _renderBasicCardList() {
    render(this._container, this._cardsBoardComponent, RenderPosition.BEFOREEND);
    render(this._cardsBoardComponent, this._cardsListComponent, RenderPosition.BEFOREEND);

    const allCards = this._getCards();
    const cardsCount = allCards.length;

    const cardsForRendering = allCards.slice(0, Math.min(cardsCount, this._renderedCardsCount));
    this._renderCards(cardsForRendering);

    if (cardsCount > this._renderedCardsCount) {
      this._renderSeeMoreButton();
    }
  }

  _renderNoCards() {
    render(this._container, this._cardsBoardComponent, RenderPosition.BEFOREEND);
    render(this._cardsBoardComponent, this._noCardsComponent, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    render(this._container, this._cardsBoardComponent, RenderPosition.BEFOREEND);
    render(this._cardsBoardComponent, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _handleModelEventForRerender(updateTypeRerender) {
    switch (updateTypeRerender) {
      case UpdateTypeForRerender.MAJOR:
        this._destroy();
        this.init();
        break;
      case UpdateTypeForRerender.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this.init();
    }
  }

  _handleSeeMoreButtonClick() {
    const cardsCount = this._getCards().length;
    const newRenderedCardsCount = Math.min(cardsCount, this._renderedCardsCount + CARDS_COUNT_PER_STEP);
    const cards = this._getCards().slice(this._renderedCardsCount, newRenderedCardsCount);

    this._renderCards(cards);
    this._renderedCardsCount = newRenderedCardsCount;

    if (this._renderedCardsCount >= cardsCount) {
      remove(this._seeMoreButtonComponent);
    }
  }

  _clearCardListInBasicBlock() {
    this._listRenderedPresentersBasicBlock.forEach((presenter) => {
      presenter.destroy();
    });

    this._listRenderedPresentersBasicBlock = new Map();

    remove(this._seeMoreButtonComponent);
  }

  _clearDesk({resetRenderedCardsCount: resetRenderedCardsCount = false} = {}) {

    this._clearCardListInBasicBlock();

    remove(this._noCardsComponent);
    remove(this._loadingComponent);

    if (resetRenderedCardsCount) {
      this._renderedCardsCount = CARDS_COUNT_PER_STEP;
    }
  }

  _renderSeeMoreButton() {
    if (this._seeMoreButtonComponent !== null) {
      this._seeMoreButtonComponent = null;
    }

    this._seeMoreButtonComponent = new SeeMoreView();
    this._seeMoreButtonComponent.setClickHandler(this._handleSeeMoreButtonClick);

    render(this._cardsListComponent, this._seeMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _renderDesk() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (this._getCards().length === 0) {
      this._renderNoCards();
      return;
    }

    this._renderBasicCardList();
  }
}

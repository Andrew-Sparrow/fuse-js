import AbstractView from "../abstract";

const createCardsListTemplate = () => {
  return `<ul class="cards"></ul>`;
};

export default class CardsListView extends AbstractView {
  getTemplate() {
    return createCardsListTemplate();
  }
}

import AbstractView from "../abstract";

const createCardsBoardTemplate = () => {
  return `<main class="main"></main>`;
};

export default class CardsBoardView extends AbstractView {
  getTemplate() {
    return createCardsBoardTemplate();
  }
}

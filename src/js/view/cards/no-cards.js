import Abstract from "../abstract";

const createNoCardsTemplate = () => {
  return `<section class="cards-list">
            <h2 class="card-list__title">There are no homes to show.</h2>
          </section>`;
};

export default class NoCardsView extends Abstract {
  getTemplate() {
    return createNoCardsTemplate();
  }
}

import Abstract from "../abstract";

const createNoCardsTemplate = () => {
  return `<section class="cards">
            <h2>There are no homes to show.</h2>
          </section>`;
};

export default class NoCardsView extends Abstract {
  getTemplate() {
    return createNoCardsTemplate();
  }
}

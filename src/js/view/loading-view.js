import Abstract from "./abstract";

const createFilmsLoadingTemplate = () => {
  return `<section class="cards">
            <h2>Loading...</h2>
          </section>`;
};

export default class LoadingView extends Abstract {
  getTemplate() {
    return createFilmsLoadingTemplate();
  }
}

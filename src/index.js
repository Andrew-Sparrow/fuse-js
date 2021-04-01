import chevronPath from "./img/chevron.svg";
import img1 from "./img/img-1.jpg";
import img2 from "./img/img-2.jpg";
import img3 from "./img/img-3.jpg";
import "./sass/style.scss";

import FilterPresenter from "./js/presenter/filter-presenter";
import FilterModel from "./js/model/filter-model";
import CardsModel from "./js/model/cards-model";
import Api from "./js/api/api";
import BoardPresenter from "./js/presenter/board-presenter";

import {UpdateTypeForRerender} from "./js/utils/consts";

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const filterModel = new FilterModel();
const cardsModel = new CardsModel();

const boardPresenter = new BoardPresenter(siteMainElement, cardsModel, filterModel);

const filterPresenter = new FilterPresenter(siteHeaderElement, filterModel);
const END_POINT = `https://603e38c548171b0017b2ecf7.mockapi.io`;

const api = new Api(END_POINT);


filterPresenter.init();
boardPresenter.init();


api.getCards()
  .then((cards) => {
    cardsModel.setItems(UpdateTypeForRerender.INIT, cards);
  })
  .catch(() => {
    cardsModel.setItems(UpdateTypeForRerender.INIT, []);
  });

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});

import chevronPath from "./img/chevron.svg";
import img1 from "./img/img-1.jpg";
import img2 from "./img/img-2.jpg";
import img3 from "./img/img-3.jpg";
import "./sass/style.scss";

import FilterPresenter from "./js/presenter/filter-presenter";
import FilterModel from "./js/model/filter-model";

const siteHeaderElement = document.querySelector(`.header`);
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(siteHeaderElement, filterModel);


filterPresenter.init();

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});

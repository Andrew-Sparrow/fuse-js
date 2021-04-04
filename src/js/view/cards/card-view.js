import Smart from "../smart";

const createFilmCardTemplate = (card) => {
  const {
    title,
    address,
    type,
    price
  } = card;

  return `<li class="card">
            <a class="card__link" href="#">
              <img class="card__house-picture" src="images/img-1.jpg" width="200" height="150" alt="picture of house" aria-label="picture of house">
              <div class="card__description card__description_${type.toLowerCase()}">
                <h3 class="card__title">${title}</h3>
                <p class="card__address">
                  ${address}
                </p>
                <p class="card__properties">
                  New Properties for Sale from <span class="card__properties_sign">£</span><span class="card__properties_price">${price}</span>
                </p>
                <p class="card__shared">Shared Ownership Available</p>
              </div>
            </a>
          </li>`;
};

export default class CardView extends Smart {
  constructor(card) {
    super();
    this._card = card;
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }
}

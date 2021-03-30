import Abstract from "./abstract";

const createFilterTemplate = () => {
  return `<input class="header__filter" id="filter" name="filter" type="text">`;
};


export default class FilterView extends Abstract {
  constructor() {
    super();
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate();
  }

  _filterTypeChangeHandler(evt) {
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}

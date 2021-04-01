import Smart from "./smart";
import he from "he";

const createFilterTemplate = (filterData) => {
  const {
    text
  } = filterData;

  return `<input class="header__filter" id="filter" name="filter" type="text" value="${he.encode(text)}">`;
};

export default class FilterView extends Smart {
  constructor(data) {
    super();
    this._data = data;
    this._inputHandler = this._inputHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._data);
  }

  _inputHandler(evt) {
    evt.preventDefault();

    this.updateData({text: evt.target.value.trim()});
    this._callback.filterValueChange(this._data);
  }

  setFilterValueChangeHandler(callback) {
    this._callback.filterValueChange = callback;
    this.getElement().addEventListener(`input`, this._inputHandler);
  }
}

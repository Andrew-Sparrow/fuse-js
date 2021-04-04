import Observer from "./observer";

export default class FilterModel extends Observer {
  constructor() {
    super();
    this._filterValue = {text: ''};
  }

  setFilterValue(updateTypeForRerender, filterValue) {
    this._filterValue = filterValue;
    this._notify(updateTypeForRerender, this._filterValue);
  }

  getFilterValue() {
    return this._filterValue;
  }
}

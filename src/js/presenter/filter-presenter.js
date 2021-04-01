import FilterView from "../view/filter-view";

import {
  render,
  RenderPosition,
} from "../utils/render-utils";

export default class FilterPresenter {
  constructor(container, filterModel) {
    this._container = container;
    this._filterModel = filterModel;

    this._component = null;

    this._handleFilterValueChange = this._handleFilterValueChange.bind(this);
  }

  init() {
    const filterValue = this._getFilterValue();

    this._component = new FilterView(filterValue);
    this._component.setFilterValueChangeHandler(this._handleFilterValueChange);

    render(this._container, this._component, RenderPosition.BEFOREEND);
  }

  _handleFilterValueChange(filterValue) {
    this._filterModel.setFilterValue(filterValue);
  }

  _getFilterValue() {
    return this._filterModel.getFilterValue();
  }
}

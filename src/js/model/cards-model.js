import Observer from "./observer";

export default class CardsModel extends Observer {
  constructor() {
    super();

    this._items = [];
  }

  setItems(updateTypeForRerender, items) {
    this._items = items.slice();

    this._notify(updateTypeForRerender);
  }

  getItems() {
    return this._items;
  }
}

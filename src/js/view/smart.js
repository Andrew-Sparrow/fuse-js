import Abstract from "./abstract";

export default class Smart extends Abstract {
  constructor() {
    super();
  }

  updateData(update) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
        {},
        this._data,
        update
    );
  }
}

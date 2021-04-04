import Abstract from "./abstract";

export default class Smart extends Abstract {
  constructor() {
    super();
  }

  updateData(newData) {
    if (!newData) {
      return;
    }

    this._data = Object.assign(
        {},
        this._data,
        newData
    );
  }
}

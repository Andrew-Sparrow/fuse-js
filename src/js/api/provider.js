import FilmsModel from "../model/films-model";
import {isOnline} from "../utils/common-utils";

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          const items = createStoreStructure(films.map(FilmsModel.adaptToServer));
          this._store.setItems(items);
          return films;
        });
    }

    const storeFilms = Object.values(this._store.getItems());

    return Promise.resolve(storeFilms.map(FilmsModel.adaptToClient));
  }

  getComments(movieId) {
    if (isOnline()) {
      return this._api.getComments(movieId);
    }

    return Promise.reject(new Error(`Get comments failed`));
  }

  updateFilm(film) {
    if (isOnline()) {
      return this._api.updateFilm(film)
        .then((updatedFilm) => {
          this._store.setItem(updatedFilm.id, FilmsModel.adaptToServer(updatedFilm));
          return updatedFilm;
        });
    }

    this._store.setItem(film.id, FilmsModel.adaptToServer(Object.assign({}, film)));

    return Promise.resolve(film);
  }

  addComment(film, comment) {
    if (isOnline()) {
      return this._api.addComment(film, comment)
        .then((newFilm) => {
          this._store.setItem(newFilm.id, newFilm.movie);
          return newFilm;
        });
    }

    return Promise.reject(new Error(`Add comment failed`));
  }

  deleteComment(comment) {
    if (isOnline()) {
      return this._api.deleteComment(comment)
        .then(() => this._store.removeItem(comment.id));
    }

    return Promise.reject(new Error(`Delete comment failed`));
  }

  sync() {
    if (isOnline()) {
      const storeFilms = Object.values(this._store.getItems());

      return this._api.sync(storeFilms)
        .then((response) => {
          // Забираем из ответа синхронизированные задачи
          const updatedFilms = response.updated;

          // Добавляем синхронизированные задачи в хранилище.
          // Хранилище должно быть актуальным в любой момент.
          const items = createStoreStructure([...updatedFilms]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}

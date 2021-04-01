import {
  RequestMethod,
  SuccessHTTPStatusRange
} from "../utils/consts";

export default class Api {
  constructor(endPoint) {
    this._endpoint = endPoint;
  }

  getCards() {
    return this._load({url: `homes`})
      .then(Api.toJSON)
  }

  _load({
    url,
    method = RequestMethod.GET,
    body = null,
  }) {

    return fetch(
        `${this._endpoint}/${url}`,
        {method, body}
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}

export const CARDS_COUNT_PER_STEP = 6;

export const BASE = 10; // the base in mathematical numeral systems

export const UserActionForModel = {
  ADD_ITEM: `ADD_ITEM`,
  DELETE_ITEM: `DELETE_ITEM`,
  UPDATE_ITEM: `UPDATE_ITEM`,
  UPDATE_COMMENTS: `UPDATE_COMMENTS`
};

export const UpdateTypeForRerender = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`,
  ADD_COMMENT: `ADD_COMMENT`,
  DELETE_COMMENT: `DELETE_COMMENT`,
  INIT_OFFLINE: `INIT_OFFLINE`
};

export const RequestMethod = {
  GET: `GET`
};

export const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

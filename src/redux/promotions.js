import * as Actiontypes from './ActionTypes';
const initialPromos = {
  isLoading: true,
  errMess: null,
  promotions: []
};
export const Promotions = (state = initialPromos, action) => {
  switch (action.type) {
    case Actiontypes.PROMOS_LOADING:
      return { ...state, isLoading: true };
    case Actiontypes.PROMOS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    case Actiontypes.ADD_PROMOS:
      return { ...state, isLoading: false, errMess: null, promotions: action.payload };
    default:
      return state;
  }
};

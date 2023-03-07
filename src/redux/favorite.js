import * as ActionTypes from './ActionTypes';
const InitialState = {
  isLoading: false,
  errMess: null,
  dishes: []
};

const Favorite = (state = InitialState, action) => {
  switch (action.type) {
    case ActionTypes.FAVORITE_LOADING:
      return { ...state, isLoading: true, errMess: null, dishes: [] };
    case ActionTypes.FAVORITE_ERROR:
      return { ...state, isLoading: false, errMess: action.payload, dishes: [] };
    case ActionTypes.ADD_FAVORITE:
      if (action.payload === null) {
        return { ...state, isLoading: false, errMess: null, dishes: [] };
      } else {
        return { ...state, isLoading: false, errMess: null, dishes: action.payload };
      }
    case ActionTypes.REMOVE_FAVORITE:
      return { ...state, isLoading: false, errMess: null, dishes: action.payload };
    default: return state;
  }
};
export default Favorite;

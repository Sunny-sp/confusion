import * as ActionTypes from './ActionTypes';
const InitialState = {
  isLoading: false,
  errMess: null,
  dishes: []
};

const Favorite = (state = InitialState, action) => {
  switch (action.type) {
    case ActionTypes.FAVORITE_LOADING:
      return { ...state, isLoading: true, errMess: null };
    case ActionTypes.FAVORITE_ERROR:
      return { ...state, isLoading: false, errMess: action.payload };
    case ActionTypes.ADD_FAVORITE:
      if (action.payload === null) {
        return { ...state, isLoading: false, errMess: null };
      } else {
        return { ...state, isLoading: false, errMess: null, dishes: action.payload };
      }
    case ActionTypes.REMOVE_FAVORITE:
      return { ...state, isLoading: false, errMess: null, dishes: action.payload };
    default: return state;
  }
};
export default Favorite;

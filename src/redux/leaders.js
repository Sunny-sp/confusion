import * as ActionTypes from './ActionTypes';

const initialState = {
  isLoading: true,
  errMess: null,
  leaders: []
};

export const Leaders = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LEADERS_LOADING:
      return { ...state, isLoading: true };
    case ActionTypes.LEADERS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    case ActionTypes.ADD_LEADERS:
      return { ...state, isLoading: false, leaders: action.payload };
    default:
      return state;
  }
};

import * as ActionTypes from './ActionTypes';
export const InitialFeedback = {
  firstName: '',
  lastName: '',
  telNum: '',
  email: '',
  agree: false,
  contactType: 'Tel.',
  message: ''
};

export const UserFeedback = (state = { isLoading: false, errMess: '' }, action) => {
  switch (action.type) {
    case ActionTypes.FEEDBACK_LOADING:
      return { ...state, isLoading: true, errMess: false };
    case ActionTypes.FEEDBACK_ERROR:
      return { ...state, isLoading: false, errMess: action.payload };
    case ActionTypes.SEND_FEEDBACK:
      return { ...state, isLoading: false, errMess: false };
    default:
      return state;
  }
};

import * as ActionTypes from './ActionTypes';
const InitialAuth = {
  isLoading: false,
  isAuthenticated: !!localStorage.getItem('token'),
  errMess: '',
  user: JSON.parse(localStorage.getItem('cred')),
  token: localStorage.getItem('token')
};

export const Auth = (state = InitialAuth, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_LOGIN:
      return { ...state, isLoading: true, isAuthenticated: false, user: action.payload, errMess: '' };
    case ActionTypes.LOGIN_SUCCESS:
      return { ...state, isLoading: false, isAuthenticated: true, token: action.payload, errMess: '' };
    case ActionTypes.LOGIN_ERROR:
      return { ...state, isLoading: false, isAuthenticated: false, errMess: action.payload };
    case ActionTypes.REQUEST_LOGOUT:
      return { ...state, isLoading: true, isAuthenticated: true, errMess: '' };
    case ActionTypes.LOGOUT_SUCCESS:
      return { ...state, isLoading: false, isAuthenticated: false, token: '', user: null, errMess: '' };
    case ActionTypes.LOGOUT_ERROR:
      return { ...state, isLoading: false, isAuthenticated: false, errMess: action.payload };
    case ActionTypes.REQUEST_SIGNUP:
      return { ...state, isLoading: true, isAuthenticated: false, user: action.payload, errMess: '' };
    case ActionTypes.SIGNUP_SUCCESS:
      return { ...state, isLoading: false, isAuthenticated: false, token: '', user: null, errMess: '' };
    case ActionTypes.SIGNUP_ERROR:
      return { ...state, isLoading: false, isAuthenticated: false, errMess: action.payload };
    default: return state;
  }
};

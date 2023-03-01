import * as ActionTypes from './ActionTypes';
import { baseUrl } from './BaseUrl';
import axios from 'axios';

export const addComment = (comment) => (
  {
    type: ActionTypes.ADD_COMMENT,
    payload: comment
  }
);
export const postComment = (dishId, rating, comment) => (dispatch) => {
  console.log('dishId testing' + dishId);
  console.log('rating testing' + rating);
  console.log('comment testing' + comment);
  const newComment = {
    dishId,
    rating,
    comment
  };
  newComment.date = new Date().toISOString();
  axios.post(baseUrl + 'comments', newComment,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(response => dispatch(addComment(response.data)))
    .catch((error) => {
      if (!localStorage.getItem('token')) {
        alert('please Login before adding a comment on a dish!');
      } else {
        alert('Error ' + error.request.status + ': comment could not add!');
      }
    });
};
export const fetchDishes = () => (dispatch) => {
  axios.get(baseUrl + 'dishes')
    .then(response => dispatch(addDishes(response.data)))
    .catch((error) => {
      if (error.request) {
        throw new Error('Error 404: Not Found!');
      }
    })
    .catch((error) => dispatch(dishesFailed(error.message)));
};
export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});
export const dishesFailed = (errMess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errMess
});
export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});
export const fetchComments = () => (dispatch) => {
  axios.get(baseUrl + 'comments')
    .then(response => dispatch(addComments(response.data)))
    .catch((error) => {
      if (error.response) {
        throw new Error(error.response);
      } else if (error.request) {
        throw new Error('Error 404: Not Found!');
      }
    })
    .catch((error) => dispatch(commentsFailed(error.message)));
};
export const commentsFailed = (errMess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errMess
});
export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});
export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});
export const promosFailed = (errMess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errMess
});
export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});
export const fetchPromos = () => (dispatch) => {
  axios.get(baseUrl + 'promotions')
    .then(response => dispatch(addPromos(response.data)))
    .catch((error) => {
      if (error.request) {
        throw new Error('Error 404: Not Found!');
      }
    })
    .catch((error) => dispatch(promosFailed(error.message)));
};

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errMess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errMess
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});
export const fetchLeaders = () => (dispatch) => {
  axios.get(baseUrl + 'leaders')
    .then(response => dispatch(addLeaders(response.data)))
    .catch((error) => {
      if (error.request) {
        throw new Error('Error 404: Not Found!');
      }
    })
    .catch((error) => dispatch(leadersFailed(error.message)));
};

export const postFeedback = (feedback) => () => {
  const newFeedback = { ...feedback };
  newFeedback.date = new Date().toISOString();
  axios.post(baseUrl + 'feedback', newFeedback)
    .then(response => alert('Thank you for giving a feedback!' + JSON.stringify(response.data, null, 2)))
    .catch(error => {
      if (error) {
        throw new Error('couldn\'t summit your feedback!');
      }
    })
    .catch(error => alert(error.message));
};

export const loginUser = (username, password) => (dispatch) => {
  const cred = {
    username,
    password
  };
  console.log('cred: ' + JSON.stringify(cred));
  dispatch(requestLogin(cred));
  axios.post(baseUrl + 'users/login', cred)
    .then((response) => {
      console.log(JSON.stringify('response' + JSON.stringify(response)));
      if (response.data.success) {
        return response;
      } else {
        const err = new Error('Error: ' + response.status);
        throw err;
      }
    })
    .then((response) => {
      if (response.statusText === 'OK') {
        dispatch(receiveLogin(response.data.token));
        console.log('token: ' + response.data.token);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('cred', JSON.stringify(cred));
      } else {
        const err = new Error('Error: ' + response.status);
        throw err;
      }
    })
    .catch((err) => dispatch(loginError(err.message)));
};
export const requestLogin = (cred) => ({
  type: ActionTypes.REQUEST_LOGIN,
  payload: cred
});
export const receiveLogin = (token) => ({
  type: ActionTypes.LOGIN_SUCCESS,
  payload: token
});
export const loginError = (errMess) => ({
  type: ActionTypes.LOGIN_ERROR,
  payload: errMess
});

export const requestLogout = () => ({
  type: ActionTypes.REQUEST_LOGOUT
});
export const receiveLogout = () => ({
  type: ActionTypes.LOGOUT_SUCCESS
});
export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  localStorage.removeItem('token');
  localStorage.removeItem('cred');
  dispatch(receiveLogout());
};

export const signupUser = (firstname, lastname, username, password) => (dispatch) => {
  const userDetails = {
    firstname,
    lastname,
    username,
    password
  };
  console.log('firstname: ' + firstname);
  console.log('userdetails : ' + JSON.stringify(userDetails));
  dispatch(requestSignup());
  axios.post(baseUrl + 'users/signup', userDetails)
    .then(response => {
      console.log('response: ' + JSON.stringify(response));
      if (response.statusText === 'OK') {
        dispatch(receiveSignup(userDetails));
        alert('Signup successful!');
      } else {
        const err = new Error('Error: ' + response.status);
        throw err;
      }
    })
    .catch(err => dispatch(signupError(err.message)));
};
export const requestSignup = () => ({
  type: ActionTypes.REQUEST_SIGNUP

});
export const receiveSignup = (userDetails) => ({
  type: ActionTypes.SIGNUP_SUCCESS,
  payload: userDetails
});
export const signupError = (errMess) => ({
  type: ActionTypes.SIGNUP_ERROR,
  payload: errMess
});

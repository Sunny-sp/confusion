import * as ActionTypes from './ActionTypes';
import { baseUrl } from './BaseUrl';
import axios from 'axios';

export const commentsLoading = () => (
  {
    type: ActionTypes.COMMENTS_LOADING
  }
);
export const commentsFailed = (errMess) => (
  {
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
  }
);
export const fetchComments = () => (dispatch) => {
  axios.get(baseUrl + 'comments')
    .then(response => dispatch(getComments(response.data)))
    .catch((error) => {
      if (error.response) {
        throw new Error(error.response);
      } else if (error.request) {
        throw new Error('Error 404: Not Found!');
      }
    })
    .catch((error) => dispatch(commentsFailed(error.message)));
};
export const getComments = (comments) => ({
  type: ActionTypes.GET_COMMENTS,
  payload: comments
});
export const addComment = (comment) => (
  {
    type: ActionTypes.ADD_COMMENT,
    payload: comment
  }
);
export const postComment = (dishId, rating, comment) => (dispatch) => {
  const newComment = {
    dishId,
    rating,
    comment
  };
  newComment.date = new Date().toISOString();
  dispatch(commentsLoading());
  axios.post(baseUrl + 'comments', newComment,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(response => dispatch(addComment(response.data)))
    .catch((error) => {
      dispatch(commentsFailed('comment could not add!'));
      if (!localStorage.getItem('token')) {
        alert('please Login before adding a comment on a dish!');
      } else {
        alert('Error ' + error.request.status + ': comment could not add!');
      }
    });
};
export const updateComment = (comment) => ({
  type: ActionTypes.UPDATE_COMMENT,
  payload: comment
});
export const editComment = (commentId, rating, comment) => (dispatch) => {
  const commentData = {
    rating,
    comment
  };
  dispatch(commentsLoading());
  axios.put(baseUrl + 'comments/' + commentId, commentData,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(response => {
      dispatch(updateComment(response.data));
      alert('Comment Updated!');
    })
    .catch(error => {
      alert('Error ' + error.request.status + ': comment could not updated!');
      dispatch(commentsFailed('comment could not updated!'));
    });
};
export const removeComment = (comment) => ({
  type: ActionTypes.REMOVE_COMMENT,
  payload: comment
});
export const deleteComment = (commentId) => (dispatch) => {
  dispatch(commentsLoading());
  axios.delete(baseUrl + 'comments/' + commentId,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(response => {
      dispatch(removeComment(response.data));
      alert('comment deleted successfully!');
    })
    .catch(error => {
      alert('Error ' + error.request.status + ': comment could not delete!');
      dispatch(commentsFailed('comment could not delete!'));
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
export const postFeedback = (feedback) => (dispatch) => {
  const newFeedback = { ...feedback };
  newFeedback.date = new Date().toISOString();
  dispatch(feedbackLoading());
  axios.post(baseUrl + 'feedback', newFeedback)
    .then(response => {
      alert(response.data.status);
      dispatch(sendFeedback());
    })
    .catch(error => {
      if (error) {
        throw new Error('couldn\'t summit your feedback!');
      }
    })
    .catch(error => {
      dispatch(feedbackError(error.message));
      alert(error.message);
    });
};
export const feedbackLoading = () => ({
  type: ActionTypes.FEEDBACK_LOADING
});
export const sendFeedback = () => ({
  type: ActionTypes.SEND_FEEDBACK
});
export const feedbackError = (errMess) => ({
  type: ActionTypes.FEEDBACK_ERROR,
  payload: errMess
});
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
        dispatch(receiveLogin(response.data.token));
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('cred', JSON.stringify(cred));
      }
    })
    .then(() => {
      dispatch(fetchFavorite());
    })
    .catch((error) => {
      dispatch(loginError(error.response.data.err));
      alert(error.response.data.err);
    });
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
export const signupUser = (firstname, lastname, username, password) => async (dispatch) => {
  const userDetails = {
    firstname,
    lastname,
    username,
    password
  };
  await dispatch(requestSignup());
  axios.post(baseUrl + 'users/signup', userDetails)
    .then(response => {
      // console.log('response: ' + JSON.stringify(response));
      if (response.data.success === true) {
        dispatch(receiveSignup(userDetails));
        alert('Signup successful!');
      }
    })
    .catch(err => {
      dispatch(signupError(err.message));
      alert(err.response.data.err.message);
    });
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
export const fetchFavorite = () => (dispatch) => {
  dispatch(favoriteLoading());
  axios.get(baseUrl + 'favorites',
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(response => {
      if (response.data !== null) {
        dispatch(addFavorite(response.data.dishes));
      }
    })
    .catch((err) => {
      dispatch(favoriteError(err.message));
      alert(err.message);
    });
};
export const addFavorite = (dishes) => ({
  type: ActionTypes.ADD_FAVORITE,
  payload: dishes
});
export const favoriteLoading = () => ({
  type: ActionTypes.FAVORITE_LOADING
});
export const favoriteError = (errMess) => ({
  type: ActionTypes.FAVORITE_ERROR,
  payload: errMess
});
export const deleteFavorite = (dishId) => (dispatch) => {
  dispatch(favoriteLoading());
  axios.delete(baseUrl + 'favorites/' + dishId, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  })
    .then(response => {
      dispatch(removeFavorite(response.data.dishes));
    })
    .catch(err => {
      dispatch(favoriteError());
      alert(err.message);
    });
};
export const removeFavorite = (dishes) => ({
  type: ActionTypes.REMOVE_FAVORITE,
  payload: dishes
});
export const postFavorite = (dishId) => (dispatch) => {
  const dishes = [{
    _id: dishId
  }];
  dispatch(favoriteLoading());
  axios.post(baseUrl + 'favorites', dishes,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(response => {
      dispatch(addFavorite(response.data.dishes));
      alert('Added into favorite list!');
    })
    .catch(err => {
      dispatch(favoriteError(err.message));
    });
};

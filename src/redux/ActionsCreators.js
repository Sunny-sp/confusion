import * as ActionTypes from './ActionTypes';
import { baseUrl } from './BaseUrl';
import axios from 'axios';

export const addComment = (comment) => (
  {
    type: ActionTypes.ADD_COMMENT,
    payload: comment
  }
);
export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  console.log('dishId tyesting' + dishId);
  const newComment = {
    dishId,
    rating,
    author,
    comment
  };
  newComment.date = new Date().toISOString();
  axios.post(baseUrl + 'comments', newComment)
    .then(response => dispatch(addComment(response.data)))
    .catch((error) => {
      alert('Error ' + error.request.status + ': comment could not add!');
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

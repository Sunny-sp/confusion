import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';

export const addComment = (dishId, rating, author, comment) => (
  {
    type: ActionTypes.ADD_COMMENT,
    payload: {
      dishId,
      rating,
      author,
      comment
    }
  }
);
export const fetchDishes = () => (dispatch) => {
  setTimeout(() => {
    dispatch(addDishes(DISHES));
  }, 2000);
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

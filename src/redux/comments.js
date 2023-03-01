import * as ActionTypes from './ActionTypes';
const InitialComments = {
  errMess: null,
  comments: []
};
export const Comments = (state = InitialComments, action) => {
  switch (action.type) {
    case ActionTypes.COMMENTS_FAILED:
      return { ...state, errMess: action.payload };
    case ActionTypes.ADD_COMMENTS:
      return { ...state, errMess: null, comments: action.payload };
    case ActionTypes.ADD_COMMENT:{
      const comment = action.payload;
      comment.date = new Date().toISOString();
      return { ...state, comments: state.comments.concat(comment) };
    }
    default:
      return state;
  }
};

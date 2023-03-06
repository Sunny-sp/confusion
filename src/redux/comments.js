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
    case ActionTypes.UPDATE_COMMENT:{
      const newComment = action.payload;
      newComment.date = new Date().toISOString();
      const updatedComments = state.comments.map(comment => {
        return comment._id === newComment._id ? newComment : comment;
      });
      console.log('updated comments: ' + JSON.stringify(updatedComments));
      return { ...InitialComments, comments: updatedComments };
    }
    case ActionTypes.REMOVE_COMMENT: {
      const removedComment = action.payload;
      const updatedComment = state.comments.filter(comment => comment._id !== removedComment._id);
      return { ...InitialComments, comments: updatedComment };
    }
    default:
      return state;
  }
};

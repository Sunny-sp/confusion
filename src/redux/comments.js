import * as ActionTypes from './ActionTypes';
const InitialComments = {
  isCommentLoading: false,
  errMess: null,
  comments: []
};
export const Comments = (state = InitialComments, action) => {
  switch (action.type) {
    case ActionTypes.COMMENTS_FAILED:
      return { ...state, isCommentLoading: false, errMess: action.payload };
    case ActionTypes.GET_COMMENTS:
      return { ...state, isCommentLoading: false, errMess: null, comments: action.payload };
    case ActionTypes.COMMENTS_LOADING:
      return { ...state, isCommentLoading: true, errMess: null };
    case ActionTypes.ADD_COMMENT:{
      const comment = action.payload;
      comment.date = new Date().toISOString();
      return { ...state, isCommentLoading: false, comments: state.comments.concat(comment) };
    }
    case ActionTypes.UPDATE_COMMENT:{
      const newComment = action.payload;
      newComment.date = new Date().toISOString();
      const updatedComments = state.comments.map(comment => {
        return comment._id === newComment._id ? newComment : comment;
      });
      // console.log('updated comments: ' + JSON.stringify(updatedComments));
      return { ...InitialComments, isCommentLoading: false, comments: updatedComments };
    }
    case ActionTypes.REMOVE_COMMENT: {
      const removedComment = action.payload;
      const updatedComment = state.comments.filter(comment => comment._id !== removedComment._id);
      return { ...InitialComments, isCommentLoading: false, comments: updatedComment };
    }
    default:
      return state;
  }
};

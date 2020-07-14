import { GET_COMMENTS,
  DELETE_COMMENT,
  ADD_COMMENT,
  ADD_COMMENT_REPLY,
  COMMENT_THREAD_HOVER_CHANGE,
} from '../actions/types.js';

const initialState = {
  comments: {},
  commentPageLinks: {},

}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: {...state.comments, ...action.payload.comments},
        commentPageLinks: {...state.commentPageLinks, [action.payload.postId]:{...action.payload.comments}},
      }
    case DELETE_COMMENT:
      return {
        ...state,
        posts: state.posts.filter(comment => comment.id !== action.payload)
      }
    case ADD_COMMENT:
      return {
        ...state,
        comments: {...state.comments,[action.payload.comments.id]: action.payload.comments},
        commentPageLinks: {...state.commentPageLinks, [action.payload.postId]:{...action.payload.comments}},
      }
    case ADD_COMMENT_REPLY:
      return {
        ...state,
        comments: {...state.comments, [action.payload.comment.id]: action.payload.comment},
      }
    case COMMENT_THREAD_HOVER_CHANGE:
      return {
        ...state,
        comments: {...state.comments, [action.payload.comment.id]: action.payload.comment}
      }
    default:
      return state;
  }
}

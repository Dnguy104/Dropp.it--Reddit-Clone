import { GET_COMMENTS,
  DELETE_COMMENT,
  ADD_COMMENT,
  ADD_COMMENT_REPLY,
  COMMENT_COLLAPSE,
  COMMENT_UNCOLLAPSE,
} from '../actions/types.js';

const initialState = {
  commentModels: {},
  commentPageLinks: {},
  collapsed: {},
  commentForm: {},
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        commentModels: {...state.commentModels, ...action.payload.comments},
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
        commentModels: {...state.commentModels, [action.payload.comments.id]: action.payload.comments},
        commentPageLinks: {...state.commentPageLinks, [action.payload.postId]:{...action.payload.comments}},
      }
    case ADD_COMMENT_REPLY:
      return {
        ...state,
        commentForm: {...state.commentForm, [action.payload.postId]: action.payload.currentPostCommentForm}
      }
    case COMMENT_UNCOLLAPSE:
    case COMMENT_COLLAPSE:
      return {
        ...state,
        collapsed: {...state.collapsed, [action.payload.postId]: action.payload.currentPostCollapsed}
      }
    default:
      return state;
  }
}

import { GET_COMMENTS, DELETE_COMMENT, ADD_COMMENT } from '../actions/types.js';

const initialState = {
  comments: [],
  postsLoadedIds: [],

}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: [...state.comments, ...action.payload.comments],
        postsLoadedIds: [...state.postsLoadedIds, action.payload.postId],
      }
    case DELETE_COMMENT:
      return {
        ...state,
        posts: state.posts.filter(comment => comment.id !== action.payload)
      }
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload.comments],
        postsLoadedIds: [...state.postsLoadedIds, action.payload.postsLoadedId],
      }
    default:
      return state;
  }
}

import { GET_POST_COMMENTS, DELETE_COMMENT, ADD_COMMENT } from '../actions/types.js';

const initialState = {
  comments: [],
  loaded: false,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_POST_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loaded: true,
      }
    case DELETE_COMMENT:
      return {
        ...state,
        posts: state.posts.filter(comment => comment.id !== action.payload)
      }
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.posts, action.payload]
      }
    default:
      return state;
  }
}

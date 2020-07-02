import { GET_POSTS, DELETE_POST, ADD_POST, SET_POST } from '../actions/types.js';

const initialState = {
  posts: [],
  loaded: false,
  currentPostId: null,
  threadPageShow: false,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loaded: true,
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload)
      }
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
    case SET_POST:
      return {
        ...state,
        currentPostId: action.payload,
        threadPageShow: true,
      }
    default:
      return state;
  }
}

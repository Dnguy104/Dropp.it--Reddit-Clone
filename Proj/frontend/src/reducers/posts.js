import { GET_POSTS, DELETE_POST, ADD_POST } from '../actions/types.js';

const initialState = {
  posts: [],
  loaded: false,
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
    default:
      return state;
  }
}

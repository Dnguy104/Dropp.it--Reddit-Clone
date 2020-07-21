import { GET_POSTS, DELETE_POST, ADD_POST, SET_POST, POST_LOADING } from '../actions/types.js';

const initialState = {
  posts: {},
  loaded: false,
  isLoading: false,
  currentPostId: null,
  threadPageShow: false,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case POST_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loaded: true,
        isLoading: false,
      }
    case DELETE_POST:
      return {
        ...state,
        posts: action.payload
      }
    case ADD_POST:
      return {
        ...state,
        posts: {...state.posts, [action.payload.id]: action.payload}
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

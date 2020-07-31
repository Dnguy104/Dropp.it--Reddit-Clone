import { GET_POSTS, DELETE_POST, ADD_POST, SET_POST, POST_LOADING, SET_POST_STYLE, CAST_VOTE, CLEAR_USER_POST } from '../actions/types.js';

const initialState = {
  posts: {},
  loaded: false,
  isLoading: false,
  currentPostId: null,
  threadPageShow: false,
  postStyle: 'card',
}

export default (state = initialState, action) => {
  switch(action.type) {
    case POST_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case SET_POST_STYLE:
      return {
        ...state,
        postStyle: action.payload
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
    case CAST_VOTE:
      return {
        ...state,
        posts: {...state.posts, [action.payload.id]: action.payload}
      }
    case CLEAR_USER_POST:
      return {
        ...state,
        posts: {...action.payload.posts}
      }
    default:
      return state;
  }
}

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  INIT_LOADING,
  INIT_LOADED,
} from '../actions/types.js';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  init: false,
  initLoading: false,
  user: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case INIT_LOADING:
      return {
        ...state,
        initLoading: true
      };
    case INIT_LOADED:
      return {
        ...state,
        initLoading: false,
        init: true
      };
    
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      }
    default:
      return state;
  }
};

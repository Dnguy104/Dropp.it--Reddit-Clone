import axios from 'axios';
import { returnErrors } from './messages';
import { getPosts } from './posts.js';
import { getThreads, getTrendingThreads } from './threads.js';
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_USER_POST,
  INIT_LOADED,
  INIT_LOADING
} from './types';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({type: USER_LOADING });
  axios.get('http://localhost:8000/api/user/', tokenConfig(getState) )
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: {
          user: res.data
        }
      });

      dispatch(getPosts());
      dispatch(getThreads());
      return true;
    }).catch(err => {
      console.log(err)
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({type: AUTH_ERROR});
      dispatch(clearUser)
    });
  return false;
};

export const loadInit = () => (dispatch, getState) => {

  try {
    (async ()=>{
      dispatch({type: INIT_LOADING });
      await dispatch(getPosts());
      await dispatch(getThreads());
      await dispatch(getTrendingThreads());
      dispatch({type: INIT_LOADED });
    })()
  } catch (e) {
      console.log(e)
      throw new TypeError(e.message);
  }
};

export const clearUser = (dispatch, getState) => {
  const posts = getState().posts.posts;
  const newPosts = Object.keys(posts).reduce((obj, key)=>{
    obj[key] = {...posts[key], votestate: 0 };
    return obj;
  }, {})

  dispatch({
      type: CLEAR_USER_POST,
      payload: {
        posts: newPosts,
      }
  })
};

// LOGIN USER
export const login = (username, password) => dispatch => {
  //Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // REquest Body
  const body = JSON.stringify({ username, password });

  axios.post('http://localhost:8000/api/login/', body, config)
    .then(res => {
      console.log(res.data)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
    }).catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch(clearUser)
      dispatch({ type: LOGIN_FAIL });
    });
};

// LOGOUT
export const logout = () => (dispatch, getState) => {

  dispatch(clearUser)
  dispatch({
    type: LOGOUT_SUCCESS,
    payload: {}
  });
};

// REGISTER USER
export const register = ({username, password, email}) => dispatch => {
  //Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // REquest Body
  const body = JSON.stringify({ username, password, email });

  axios.post('http://localhost:8000/api/register/', body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    }).catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: REGISTER_FAIL });
    });
};

// Setup config and token helper
export const tokenConfig = getState => {
  const token = getState().auth.token;
  //Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };
  if(token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}

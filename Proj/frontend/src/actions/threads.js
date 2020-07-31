import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import {  } from '../utils/helpers.js';
import { tokenConfig } from './auth';
import { GET_THREADS, SET_THREAD, ADD_THREAD, THREAD_LOADING, LOAD_TRENDING_THREADS } from './types';

export const setThread = (post) => (dispatch, getState) => () => {
  dispatch({
    type: SET_THREAD,
    payload: post.id
  });
};

export const getThreads = (params = null) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  console.log(params)
  config.params = {
    ...params
  }

  dispatch({type: THREAD_LOADING });
  axios
    .get('http://localhost:8000/api/threads/', config)
    .then(res => {
      dispatch({
        type: GET_THREADS,
        payload: {
          threads: res.data.threads
        }
      });
      if(res.data.hasOwnProperty('trending')) {
        dispatch({
          type: LOAD_TRENDING_THREADS,
          payload: {
            trending: res.data.trending
          }
        });
      }
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const getTrendingThreads = () => (dispatch, getState) => {
  dispatch(getThreads({type: 'trending'}))
};

export const addThreads = (thread) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  const state = getState();
  if(!state.auth.user) {
    dispatch(createMessage({ error: {msg: "Must be logged in"}}));
    return;
  }

  const request = {
    ...thread,
    author: state.auth.user.username
  }

  axios
    .post(`http://localhost:8000/api/threads/${post.thread}/posts/`, request, tokenConfig(getState)).then(res => {
      // dispatch(createMessage({ addPost: "Post Added"}));

      const newPost = generateTime(res.data)
      dispatch({
        type: ADD_THREAD,
        payload: newPost
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

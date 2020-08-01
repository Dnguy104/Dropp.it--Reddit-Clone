import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { formatDate, formatDates } from '../utils/helpers.js';
import { tokenConfig } from './auth';
import { GET_THREADS, SET_THREAD, ADD_THREAD, THREAD_LOADING, LOAD_TRENDING_THREADS, CAST_T_SUB, CAST_T_UNSUB } from './types';

export const setThread = (post) => (dispatch, getState) => () => {
  dispatch({
    type: SET_THREAD,
    payload: post.id
  });
};

export const subThread = (threadId) => (dispatch, getState)  => {
  const state = getState();
  let sub = false;
  if(!!state.auth.user) {
    sub = state.auth.user.subs.hasOwnProperty(threadId);
  }
  else {
    dispatch(createMessage({ error: {msg: "Must be logged in"}}));
    return;
  }

  let options = {
    method: '',
    headers: tokenConfig(getState).headers,
    data: {
      thread: threadId,
    },
    url: `http://localhost:8000/api/user/${state.auth.user.id}/threadsub/`,
  };
  if(sub) {
    options.method = 'DELETE';
  }
  else if(!sub) {
    options.method = 'POST';
  }

  axios(options)
    .then(res => {
      const subs = state.auth.user.subs;
      let newSubs = { ...subs };
      if(sub) {
        delete newSubs[threadId]
        dispatch({
          type: CAST_T_UNSUB,
          payload: {
            subs: newSubs
          }
        });
      }
      else {
        newSubs[threadId] = threadId
        dispatch({
          type: CAST_T_SUB,
          payload: {
            subs: newSubs
          }
        });
      }
    }).catch(err => {
      console.log(err)
      dispatch(returnErrors(err.response.data, err.response.status));
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
      if(res.data.hasOwnProperty('threads')) {
        const threads = formatDates(res.data.threads)
        dispatch({
          type: GET_THREADS,
          payload: {
            threads: threads
          }
        });
      }
      if(res.data.hasOwnProperty('trending')) {
        dispatch({
          type: LOAD_TRENDING_THREADS,
          payload: {
            trending: res.data.trending
          }
        });
      }
    }).catch(err => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
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

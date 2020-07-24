import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { generateTimes, generateTime } from '../utils/helpers.js';
import { tokenConfig } from './auth';
import { GET_POSTS, DELETE_POST, ADD_POST, SET_POST, POST_LOADING, SET_POST_STYLE } from './types';

// SET POST sets the post that will load on thread page components
export const setPost = (post) => (dispatch, getState) => () => {
  dispatch({
    type: SET_POST,
    payload: post.id
  });
};

export const setPostStyle = (style) => (dispatch, getState) => {
  dispatch({
    type: SET_POST_STYLE,
    payload: style
  });
};

//GET GET_POSTS
export const getPosts = () => (dispatch, getState) => {
  dispatch({type: POST_LOADING });
  axios
    .get('http://localhost:8000/api/posts/', tokenConfig(getState))
    .then(res => {
      const posts = generateTimes(res.data)
      dispatch({
        type: GET_POSTS,
        payload: posts
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE POSTS
export const deletePost = (id) => (dispatch, getState) => {
  axios
    .delete(`http://localhost:8000/api/posts/${id}/`, tokenConfig(getState))
      .then(res => {
        dispatch(createMessage({ deletePost: "Post Deleted"}));

        const state = getState().posts.posts;
        let newState = {...state};
        delete newState[id];

        dispatch({
          type: DELETE_POST,
          payload: newState
        });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// ADD POST
export const addPost = (post) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  const state = getState();
  if(!state.auth.user) {
    dispatch(createMessage({ error: {msg: "Must be logged in"}}));
    return;
  }

  const request = {
    ...post,
    threadid: 2,
    author: state.auth.user.username
  }

  axios
    .post(`http://localhost:8000/api/threads/${2}/posts/`, request, tokenConfig(getState)).then(res => {
      dispatch(createMessage({ addPost: "Post Added"}));

      const newPost = generateTime(res.data)
      dispatch({
        type: ADD_POST,
        payload: newPost
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

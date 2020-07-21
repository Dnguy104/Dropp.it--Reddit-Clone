import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';
import { GET_POSTS, DELETE_POST, ADD_POST, SET_POST } from './types';

// SET POST sets the post that will load on thread page components
export const setPost = (post) => (dispatch, getState) => () => {

  dispatch({
    type: SET_POST,
    payload: post.id
  });
};

//GET GET_POSTS
export const getPosts = () => (dispatch, getState) => {
  axios
    .get('http://localhost:8000/api/posts/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE POSTS
export const deletePost = (id) => (dispatch, getState) => {
  axios
    .delete(`http://localhost:8000/api/posts/${id}/`, tokenConfig(getState))
      .then(res => {
      dispatch(createMessage({ deletePost: "Post Deleted"}));
      dispatch({
        type: DELETE_POST,
        payload: id
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// ADD POST
export const addPost = (post) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  config.headers['']
  axios
    .post(`http://localhost:8000/api/threads/${2}/posts/`, {...post, threadid: 2}, tokenConfig(getState)).then(res => {
      dispatch(createMessage({ addPost: "Post Added"}));
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

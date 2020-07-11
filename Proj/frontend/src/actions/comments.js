import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';
import { GET_POST_COMMENTS, DELETE_COMMENT, ADD_COMMENT } from './types';

// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

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
    .delete(`http://localhost:8000/api/posts/${null}/comments`, tokenConfig(getState))
      .then(res => {
      dispatch(createMessage({ deletePost: "Post Deleted"}));
      dispatch({
        type: DELETE_POST,
        payload: id
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// ADD COMMENT
export const addComment = (comment) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  config.headers['']
  axios
    .post(`http://localhost:8000/api/posts/${null}/comments/`, comment, tokenConfig(getState)).then(res => {
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

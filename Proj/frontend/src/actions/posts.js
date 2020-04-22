import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { GET_POSTS, DELETE_POST, ADD_POST } from './types';

// axios.defaults.withCredentials = true;

//GET GET_POSTS
export const getPosts = () => dispatch => {
  axios
    .get('http://localhost:8000/api/posts/').then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE POSTS
export const deletePost = (id) => dispatch => {
  axios
    .delete(`http://localhost:8000/api/posts/${id}`).then(res => {
      dispatch(createMessage({ deletePost: "Post Deleted"}));
      dispatch({
        type: DELETE_POST,
        payload: id
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// ADD POST
export const addPost = (post) => dispatch => {
  axios
    .post(`http://localhost:8000/api/posts/`, post).then(res => {
      dispatch(createMessage({ addPost: "Post Added"}));
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

import axios from 'axios';
import { createMessage } from './messages';
import { GET_POSTS, DELETE_POST, ADD_POST, GET_ERRORS } from './types';

// axios.defaults.withCredentials = true;

//GET GET_POSTS
export const getPosts = () => dispatch => {
  axios
    .get('http://localhost:8000/api/posts/').then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    }).catch(err => console.log(err.response.data));
}

// DELETE POSTS
export const deletePost = (id) => dispatch => {
  axios
    .delete(`http://localhost:8000/api/posts/${id}`).then(res => {
      dispatch(createMessage({ deletePost: "Post Deleted"}));
      dispatch({
        type: DELETE_POST,
        payload: id
      });
    }).catch(err => console.log(err.response.data));
}

// ADD POST
export const addPost = (post) => dispatch => {
  axios
    .post(`http://localhost:8000/api/posts/`, post).then(res => {
      dispatch(createMessage({ addPost: "Post Added"}));
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
    }).catch(err => {
      console.log(err.response);

      const errors = {
        msg: err.response.data,
        status: err.response.status
      };

      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
}

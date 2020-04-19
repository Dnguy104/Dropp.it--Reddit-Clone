import axios from 'axios';

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
    }).catch(err => console.log(err));
}

// DELETE POSTS
export const deletePost = (id) => dispatch => {
  axios
    .delete(`http://localhost:8000/api/posts/${id}`).then(res => {
      dispatch({
        type: DELETE_POST,
        payload: id
      });
    }).catch(err => console.log(err));
}

// ADD POST
export const addPost = (post) => dispatch => {
  axios
    .post(`http://localhost:8000/api/posts/`, post).then(res => {
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
    }).catch(err => console.log(err));
}

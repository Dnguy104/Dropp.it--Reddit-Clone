import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';
import { GET_COMMENTS, DELETE_COMMENT, ADD_COMMENT } from './types';

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
export const getComments = () => (dispatch, getState) => {
  const state = getState();
  const commentExists = state.comments.postsLoadedIds.filter((postId)=>(state.posts.currentPostId == postId));
  // if(commentExists.length) {
  //   dispatch({
  //     type: GET_COMMENTS,
  //     payload: {
  //       comments: res.data,
  //       postId: {}
  //     }
  //   });
  //   return;
  // }
  axios
    .get(`http://localhost:8000/api/posts/${state.posts.currentPostId}/comments/`, tokenConfig(getState))
    .then(res => {
      console.log("getComment: " )
      console.log(res)

      dispatch({
        type: GET_COMMENTS,
        payload: {
          comments: res.data,
          postId: state.posts.currentPostId
        }
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
  const state = getState();
  let config = tokenConfig(getState);
  // config.headers['']
  const request = {
    ...comment,
    author: 'author'
  }

  axios
    .post(`http://localhost:8000/api/threads/${2}/posts/${state.posts.currentPostId}/comments/`, request, config)
    .then(res => {

      const postsLoadedId = !!res.data.post ? res.data.post : 1
      dispatch({
        type: ADD_COMMENT,
        payload: {
          comments: res.data,
          postsLoadedIds: postsLoadedId
        }
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

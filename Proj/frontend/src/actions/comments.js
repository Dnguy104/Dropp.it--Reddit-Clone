import axios from 'axios';
import { commentsInit, commentInit } from '../utils/helpers.js';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';
import { GET_COMMENTS, DELETE_COMMENT, ADD_COMMENT, ADD_COMMENT_REPLY } from './types';


// SET POST sets the post that will load on thread page components
export const handleCommentReplyToggle = (comment) => (dispatch, getState) => () => {
  const toggledReplyComment = {...comment, commentForm: !comment.commentForm}
  dispatch({
    type: ADD_COMMENT_REPLY,
    payload: toggledReplyComment
  });
};

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
      const comments = commentsInit(res.data);

      dispatch({
        type: GET_COMMENTS,
        payload: {
          comments: comments,
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
export const addComment = (newComment) => (dispatch, getState) => {
  const state = getState();
  let config = tokenConfig(getState);
  // config.headers['']
  console.log(newComment)
  const moreData = {
    depth: newComment.parent ? state.comments.comments[newComment.parent].depth + 1 : null,
    author: 'author'
  }
  const request = {
    ...newComment,
    ...moreData
  }

  axios
    .post(`http://localhost:8000/api/threads/${2}/posts/${state.posts.currentPostId}/comments/`, request, config)
    .then(res => {

      // if postid is null, set to 1
      const postsLoadedId = !!res.data.post ? res.data.post : 1
      const comment = commentInit(res.data);
      handleCommentReplyToggle(comment);

      dispatch({
        type: ADD_COMMENT,
        payload: {
          comments: comment,
          postsLoadedIds: postsLoadedId
        }
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

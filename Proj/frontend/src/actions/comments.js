import axios from 'axios';
import { commentsInit, commentInit } from '../utils/helpers.js';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';
import { GET_COMMENTS,
  DELETE_COMMENT,
  ADD_COMMENT,
  ADD_COMMENT_REPLY,
  COMMENT_COLLAPSE,
  COMMENT_UNCOLLAPSE,
 } from './types';


// SET POST sets the post that will load on thread page components
export const handleCommentReplyToggle = (commentId) => (dispatch, getState) => () => {
  const state = getState();
  const currentPostCommentForm = {...state.comments.commentForm[state.posts.currentPostId]};

  if(currentPostCommentForm.hasOwnProperty(commentId)) {
    delete currentPostCommentForm[commentId];
  } else {
    currentPostCommentForm[commentId] = true;
  }

  dispatch({
    type: ADD_COMMENT_REPLY,
    payload: {
      currentPostCommentForm: currentPostCommentForm,
      postId: state.posts.currentPostId
    }
  });
};
//
// // SET POST sets the post that will load on thread page components
// export const setPost = (post) => (dispatch, getState) => () => {
//   dispatch({
//     type: SET_POST,
//     payload: post.id
//   });
// };

//GET GET_POSTS
export const getComments = () => (dispatch, getState) => {
  const state = getState();
  const commentExists = state.comments.commentPageLinks.hasOwnProperty(state.posts.currentPostId)
  if(commentExists) {
    return;
  }


  axios
    .get(`http://localhost:8000/api/posts/${state.posts.currentPostId}/comments/`, tokenConfig(getState))
    .then(res => {
      console.log("getComment: " )
      console.log(res)
      const comments = commentsInit(res.data);

      dispatch({
        type: GET_COMMENTS,
        payload: {
          commentPageLink: comments,
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

      if(comment.parent) dispatch(handleCommentReplyToggle(comment.parent))();
      dispatch({
        type: ADD_COMMENT,
        payload: {
          comments: comment,
          postId: postsLoadedId
        }
      });
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const handleCommentCollapse = (commentId) => (dispatch, getState) => () => {
  const state = getState();
  const currentPostCollapsed = {...state.comments.collapsed[state.posts.currentPostId]};
  console.log("collapse")
  if(currentPostCollapsed.hasOwnProperty(commentId)) {
    delete currentPostCollapsed[commentId];
    dispatch({
      type: COMMENT_UNCOLLAPSE,
      payload: {
        currentPostCollapsed: currentPostCollapsed,
        postId: state.posts.currentPostId
      }
    });
  } else {
    currentPostCollapsed[commentId] = true;
    dispatch({
      type: COMMENT_COLLAPSE,
      payload: {
        currentPostCollapsed: currentPostCollapsed,
        postId: state.posts.currentPostId
      }
    });
  }
}

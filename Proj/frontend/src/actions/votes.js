import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { generateTimes, generateTime } from '../utils/helpers.js';
import { tokenConfig } from './auth';
import { CAST_C_VOTE, CAST_VOTE } from './types';

export const handleUpvote = (postId, commentId=null) => (dispatch, getState) => () => {
  const state = getState();
  const obj = !!commentId ? state.comments.commentModels[commentId] : getState().posts.posts[postId];

  let newObj = {
    ...obj
  }
  console.log(newObj)
  let options = {
    method: '',
    headers: tokenConfig(getState).headers,
    data: {
      post: postId,
      comment: commentId,
    },
    url: `http://localhost:8000/api/votes/`,
  };
  if(obj.votestate == 0) {
    options.data.score = 1;
    options.method = 'POST';
    newObj.votestate = 1;
    newObj.score = newObj.score + 1;
  }
  else if(obj.votestate == -1) {
    options.data.score = 1;
    options.method = 'PUT';
    newObj.votestate = 1;
    newObj.score = newObj.score + 2;
  }
  else {
    options.method = 'DELETE';
    newObj.votestate = 0;
    newObj.score = newObj.score - 1;
  }

  axios(options)
    .then(res => {
      if(!!commentId) {
        dispatch({
          type: CAST_C_VOTE,
          payload: newObj
        });
        return;
      }
      dispatch({
        type: CAST_VOTE,
        payload: newObj
      });
    }).catch(err => {
      console.log(err)
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const handleDownvote = (postId, commentId=null) => (dispatch, getState) => () => {
  const state = getState();
  const obj = !!commentId ? state.comments.commentModels[commentId] : getState().posts.posts[postId];
  let newObj = {
    ...obj
  }

  let options = {
    method: '',
    headers: tokenConfig(getState).headers,
    data: {
      post: postId,
      comment: commentId,
    },
    url: `http://localhost:8000/api/votes/`,
  };
  if(obj.votestate == 0) {
    options.data.score = -1;
    options.method = 'POST';
    newObj.votestate = -1;
    newObj.score = newObj.score - 1;
  }
  else if(obj.votestate == -1) {

    options.method = 'DELETE';
    newObj.votestate = 0;
    newObj.score = newObj.score + 1;
  }
  else {
    options.data.score = -1;
    options.method = 'PUT';
    newObj.votestate = -1;
    newObj.score = newObj.score - 2;
  }

  axios(options)
    .then(res => {
      if(!!commentId) {
        dispatch({
          type: CAST_C_VOTE,
          payload: newObj
        });
        return;
      }
      dispatch({
        type: CAST_VOTE,
        payload: newObj
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

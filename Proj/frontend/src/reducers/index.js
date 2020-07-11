import { combineReducers } from 'redux';
import posts from './posts';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import comments from './comments';
import global from './global';

export default combineReducers({
  posts,
  errors,
  messages,
  auth,
  global,
  comments,
});

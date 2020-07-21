import axios from 'axios';
import { returnErrors } from './messages';
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({type: USER_LOADING });
  console.log(localStorage.getItem('token'));
  axios.get('http://localhost:8000/api/user/', tokenConfig(getState) )
    .then(res => {
      console.log(res.data)
      console.log('//////////////////////////////////////////')
      dispatch({
        type: USER_LOADED,
        payload: {
          user: res.data
        }
      });
    }).catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({type: AUTH_ERROR});
    });
};

// LOGIN USER
export const login = (username, password) => dispatch => {
  //Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // REquest Body
  const body = JSON.stringify({ email: username, password });

  axios.post('http://localhost:8000/api/login/', body, config)
    .then(res => {
      console.log(res.data)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    }).catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: LOGIN_FAIL });
    });
};

// LOGOUT
export const logout = () => (dispatch, getState) => {
  // axios
  //   .post('http://localhost:8000/api/logout/', null, tokenConfig(getState))
  //   .then(res => {
  //     dispatch({
  //       type: LOGOUT_SUCCESS,
  //       payload: res.data
  //     });
  //   }).catch(err => {
  //     dispatch(returnErrors(err.response.data, err.response.status));
  //   });
  dispatch({
    type: LOGOUT_SUCCESS,
    payload: {}
  });
};

// REGISTER USER
export const register = ({username, password, email}) => dispatch => {
  //Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // REquest Body
  const body = JSON.stringify({ username, password, email });

  axios.post('http://localhost:8000/api/register/', body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    }).catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: REGISTER_FAIL });
    });
};

// Setup config and token helper
export const tokenConfig = getState => {
  const token = getState().auth.token;
  //Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };
  if(token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}

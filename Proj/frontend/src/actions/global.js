import axios from 'axios';
import { SET_THEME } from './types';

export const setTheme = (theme) => (dispatch, getState) => {
  localStorage.setItem('theme', theme);
  dispatch({
    type: SET_THEME,
    payload: theme
  });
};

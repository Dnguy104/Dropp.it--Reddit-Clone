import {
  THEME_CHANGED
} from '../actions/types.js';
import theme from '../utils/theme.js';

const initialState = {
  theme: 'dark',
}

export default (state=initialState, action) => {
  switch(action.type) {
    case THEME_CHANGED:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
}

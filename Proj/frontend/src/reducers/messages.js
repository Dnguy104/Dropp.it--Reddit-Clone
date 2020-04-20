import { GET_MESSAGES, CREATE_MESSAGE} from '../actions/types.js';

const initialState = {

}

export default (state = initialState, action) => {
  switch(action.type) {
    case CREATE_MESSAGE:
      // return (state = action.payload);
      return action.payload;
    default:
      return state;
  }
}

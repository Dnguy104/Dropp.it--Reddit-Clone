import { CREATE_MESSAGE } from './types';

// CREATE messages
export const createMessage = msg => {
  return {
    type: CREATE_MESSAGE,
    payload: msg
  };
}

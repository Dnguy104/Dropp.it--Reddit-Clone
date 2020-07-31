import { GET_THREADS, SET_THREAD, ADD_THREAD, THREAD_LOADING, LOAD_TRENDING_THREADS } from '../actions/types.js';

const initialState = {
  threadModels: {},
  currentThreadId: null,
  isLoading: false,
  trendingThreads: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_THREADS:
      return {
        ...state,
        threadModels: { ...state.threadModels, ...action.payload.threads},
        isLoading: false,
      };
    case SET_THREAD:
      return {
        ...state,
        currentThreadId: action.payload.threadId
      };
    case ADD_THREAD:
      return {
        ...state

      };
    case THREAD_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_TRENDING_THREADS:
      return {
        ...state,
        trendingThreads: action.payload.trending,
      };
    default:
      return state;
  }
};

import { Reducer } from 'redux';

import { ISentimentState, SentimentActionTypes } from './types';

const initialState: ISentimentState = {
  errors: undefined,
  loading: false,
  sentiments: [],
};

const reducer: Reducer<ISentimentState> = (state = initialState, action) => {
  switch (action.type) {
    case SentimentActionTypes.SENTIMENTS_GET: {
      return {
        ...state,
        loading: true,
      };
    }
    case SentimentActionTypes.SENTIMENTS_GET_SUCCESS: {
      return {
        ...state,
        errors: undefined,
        loading: false,
        sentiments: action.payload,
      };
    }
    case SentimentActionTypes.SENTIMENTS_GET_ERROR: {
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as sentimentReducer };

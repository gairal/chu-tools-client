import { Reducer } from 'redux';

import { ISearchState, SearchActionTypes } from './types';

const initialState: ISearchState = {
  errors: undefined,
  loading: false,
  tweets: [],
};

const reducer: Reducer<ISearchState> = (state = initialState, action) => {
  switch (action.type) {
    case SearchActionTypes.REQUEST_SEND: {
      return {
        ...state,
        loading: true,
        tweets: [],
      };
    }
    case SearchActionTypes.REQUEST_SUCCESS: {
      return {
        ...state,
        loading: false,
        tweets: action.payload,
      };
    }
    case SearchActionTypes.REQUEST_ERROR: {
      return { ...state, errors: action.payload, loading: false };
    }
    case SearchActionTypes.TWEET_SET_SENTIMENT: {
      const newTweets = [...state.tweets];
      const idx = newTweets.findIndex(t => t.id === action.payload.id);
      newTweets[idx] = {
        ...newTweets[idx],
        sentiment: action.payload.sentiment,
      };

      return { ...state, tweets: newTweets };
    }
    default: {
      return state;
    }
  }
};

export { reducer as searchReducer };
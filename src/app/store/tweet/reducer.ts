import { Reducer } from 'redux';

import { ITweetState, Sentiment, TweetActionTypes } from './types';

const initialState: ITweetState = {
  errors: undefined,
  loading: false,
  tweets: [],
};

const reducer: Reducer<ITweetState> = (state = initialState, action) => {
  switch (action.type) {
    case TweetActionTypes.REQUEST_SEND: {
      return {
        ...state,
        loading: true,
        tweets: [],
      };
    }
    case TweetActionTypes.REQUEST_SUCCESS: {
      return {
        ...state,
        loading: false,
        tweets: action.payload,
      };
    }
    case TweetActionTypes.REQUEST_ERROR: {
      return { ...state, errors: action.payload, loading: false };
    }
    case TweetActionTypes.TWEET_SET_SENTIMENT: {
      const newTweets = [...state.tweets];
      const idx = newTweets.findIndex(t => t.id === action.payload.id);
      newTweets[idx] = {
        ...newTweets[idx],
        sentiment: action.payload.sentiment,
      };

      return { ...state, tweets: newTweets };
    }
    case TweetActionTypes.TWEET_SET_VISIBILITY: {
      const newTweets = [...state.tweets];
      const idx = newTweets.findIndex(t => t.id === action.payload.id);

      newTweets[idx] = {
        ...newTweets[idx],
        hidden: action.payload.hidden,
        sentiment: Sentiment.Unorder,
      };

      return { ...state, tweets: newTweets };
    }
    default: {
      return state;
    }
  }
};

export { reducer as tweetReducer };

import { AnyAction, Reducer } from 'redux';

import Search from '@/data/Search';
import { ITweetState, TweetActionTypes } from './types';

const initialState: ITweetState = {
  currentSearch: null,
  data: new Search(),
  errors: undefined,
  loading: false,
  saved: [],
  tweets: [],
};

const copyTweetsAndGetIDX = (state: ITweetState, action: AnyAction) => {
  const newTweets = [...state.tweets];
  const idx = newTweets.findIndex(t => t.id === action.payload.id);

  return { newTweets, idx };
};

const reducer: Reducer<ITweetState> = (state = initialState, action) => {
  switch (action.type) {
    // TODO: need to get currentSearch in this case too
    case TweetActionTypes.TWEETS_LOAD: {
      return {
        ...state,
        tweets: state.data.load(),
      };
    }
    case TweetActionTypes.TWEETS_FLUSH: {
      state.data.flush();
      return {
        ...state,
        currentSearch: null,
        tweets: [],
      };
    }
    case TweetActionTypes.REQUEST_SEND: {
      state.data.flush();
      return {
        ...state,
        currentSearch: null,
        loading: true,
        tweets: [],
      };
    }
    case TweetActionTypes.REQUEST_MORE: {
      return {
        ...state,
        loading: true,
      };
    }
    case TweetActionTypes.REQUEST_SUCCESS: {
      const baseState = {
        ...state,
        loading: false,
      };

      if (!action.payload.tweets.length) {
        state.data.flush();
        return baseState;
      }

      const newTweets = [...state.tweets, ...action.payload.tweets];
      state.data.value = newTweets;

      return {
        ...baseState,
        currentSearch: {
          ...action.payload.params,
          max_id: newTweets[newTweets.length - 1].id,
        },
        tweets: newTweets,
      };
    }
    case TweetActionTypes.REQUEST_ERROR: {
      return {
        ...state,
        currentSearch: null,
        errors: action.payload,
        loading: false,
      };
    }
    case TweetActionTypes.TWEET_SET_SENTIMENT: {
      const { newTweets, idx } = copyTweetsAndGetIDX(state, action);

      newTweets[idx] = {
        ...newTweets[idx],
        sentiment: action.payload.sentiment,
      };
      state.data.value = newTweets;

      return { ...state, tweets: newTweets };
    }
    case TweetActionTypes.TWEET_SET_VISIBILITY: {
      const { newTweets, idx } = copyTweetsAndGetIDX(state, action);

      newTweets[idx] = {
        ...newTweets[idx],
        hidden: action.payload.hidden,
        sentiment: null,
      };
      state.data.value = newTweets;

      return { ...state, tweets: newTweets };
    }
    case TweetActionTypes.TWEET_SET_CATEGORY: {
      const { newTweets, idx } = copyTweetsAndGetIDX(state, action);

      newTweets[idx] = {
        ...newTweets[idx],
        category: action.payload.category,
      };
      state.data.value = newTweets;

      return { ...state, tweets: newTweets };
    }
    case TweetActionTypes.SAVED_GET: {
      return {
        ...state,
        loading: true,
        saved: [],
      };
    }
    case TweetActionTypes.SAVED_GET_SUCCESS: {
      return {
        ...state,
        loading: false,
        saved: action.payload,
      };
    }
    case TweetActionTypes.SAVED_GET_ERROR: {
      return { ...state, errors: action.payload, loading: false };
    }
    case TweetActionTypes.TRANSLATE_GET: {
      return {
        ...state,
        loading: true,
      };
    }
    case TweetActionTypes.TRANSLATE_GET_SUCCESS: {
      const { newTweets, idx } = copyTweetsAndGetIDX(state, action);

      newTweets[idx] = {
        ...newTweets[idx],
        translation: action.payload.translation.translatedText,
      };
      state.data.value = newTweets;

      return { ...state, loading: false, tweets: newTweets };
    }
    case TweetActionTypes.TRANSLATE_GET_ERROR: {
      return { ...state, errors: action.payload, loading: false };
    }
    default: {
      return state;
    }
  }
};

export { reducer as tweetReducer };

import { Reducer } from 'redux';

import Search from '@/data/Search';
import { ISearchState, SearchActionTypes } from './types';

const initialState: ISearchState = {
  data: null,
  errors: undefined,
  loading: false,
  tweets: [],
};

const reducer: Reducer<ISearchState> = (state = initialState, action) => {
  switch (action.type) {
    case SearchActionTypes.SEARCH_LOAD: {
      // TODO: what are we doing with the idToken in Persistable ?
      const data = state.data ? state.data : new Search('');
      return {
        ...state,
        data,
        tweets: data.load(),
      };
    }
    case SearchActionTypes.SEARCH_FLUSH: {
      state.data.flush();
      return {
        ...state,
        tweets: [],
      };
    }
    case SearchActionTypes.REQUEST_SEND: {
      const newMessage = {
        content: {
          text: action.payload,
        },
        id: state.tweets.length,
        isBot: false,
        user: 'you',
      };

      state.data.add(newMessage);

      return {
        ...state,
        loading: true,
        tweets: [...state.tweets, newMessage],
      };
    }
    case SearchActionTypes.REQUEST_SUCCESS: {
      const newMessage = {
        content: action.payload,
        id: state.tweets.length,
        isBot: true,
        user: 'vc',
      };

      state.data.add(newMessage);
      return {
        ...state,
        loading: false,
        tweets: [...state.tweets, newMessage],
      };
    }
    case SearchActionTypes.REQUEST_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as searchReducer };

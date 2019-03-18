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
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as searchReducer };

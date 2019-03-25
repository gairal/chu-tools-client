import { Reducer } from 'redux';

import { CategoryActionTypes, ICategoryState } from './types';

const initialState: ICategoryState = {
  categories: [],
  errors: undefined,
  loading: false,
};

const reducer: Reducer<ICategoryState> = (state = initialState, action) => {
  switch (action.type) {
    case CategoryActionTypes.CATEGORIES_GET: {
      return {
        ...state,
        loading: true,
      };
    }
    case CategoryActionTypes.CATEGORIES_GET_SUCCESS: {
      return {
        ...state,
        categories: action.payload,
        errors: undefined,
        loading: false,
      };
    }
    case CategoryActionTypes.CATEGORIES_GET_SUCCESS: {
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

export { reducer as categoryReducer };

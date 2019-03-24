import { Reducer } from 'redux';

import { ISheetState, SheetActionTypes } from './types';

const initialState: ISheetState = {
  errors: undefined,
  loading: false,
  sheets: [],
};

const reducer: Reducer<ISheetState> = (state = initialState, action) => {
  switch (action.type) {
    case SheetActionTypes.SAVE_SEND: {
      return {
        ...state,
        loading: true,
      };
    }
    case SheetActionTypes.SAVE_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case SheetActionTypes.SAVE_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as sheetReducer };

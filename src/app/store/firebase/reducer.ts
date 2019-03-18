import { Reducer } from 'redux';

import { FirebaseActionTypes, IFirebaseState } from './types';

const initialState: IFirebaseState = {
  errors: undefined,
  idToken: null,
  isAuthenticated: false,
  name: null,
};

const reducer: Reducer<IFirebaseState> = (state = initialState, action) => {
  switch (action.type) {
    case FirebaseActionTypes.AUTH_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    }
    case FirebaseActionTypes.AUTH_ERROR: {
      return {
        ...state,
        ...initialState,
        error: action.payload,
      };
    }
    case FirebaseActionTypes.AUTH_SIGNOUT: {
      return {
        ...state,
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as firebaseReducer };

import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { Action, AnyAction, combineReducers, Dispatch } from 'redux';
import { all, fork } from 'redux-saga/effects';

import { firebaseReducer } from './firebase/reducer';
import firebaseSaga from './firebase/sagas';
import { IFirebaseState } from './firebase/types';

import { searchReducer } from './search/reducer';
import searchSaga from './search/sagas';
import { ISearchState } from './search/types';

export interface IApplicationState {
  search: ISearchState;
  firebase: IFirebaseState;
  router: RouterState;
}

export interface IConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export const createRootReducer = (history: History) =>
  combineReducers<IApplicationState>({
    firebase: firebaseReducer,
    router: connectRouter(history),
    search: searchReducer,
  });

export function* rootSaga() {
  yield all([fork(searchSaga), fork(firebaseSaga)]);
}

export default createRootReducer;

import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { Action, AnyAction, combineReducers, Dispatch } from 'redux';
import { all, fork } from 'redux-saga/effects';

import { firebaseReducer } from './firebase/reducer';
import firebaseSaga from './firebase/sagas';
import { IFirebaseState } from './firebase/types';

import { sheetReducer } from './sheet/reducer';
import sheetSaga from './sheet/sagas';
import { ISheetState } from './sheet/types';
import { tweetReducer } from './tweet/reducer';
import tweetSaga from './tweet/sagas';
import { ITweetState } from './tweet/types';

export interface IApplicationState {
  tweet: ITweetState;
  sheet: ISheetState;
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
    sheet: sheetReducer,
    tweet: tweetReducer,
  });

export function* rootSaga() {
  yield all([fork(sheetSaga), fork(tweetSaga), fork(firebaseSaga)]);
}

export default createRootReducer;

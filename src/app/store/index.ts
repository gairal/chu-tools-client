import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { Action, AnyAction, combineReducers, Dispatch } from 'redux';
import { all, fork } from 'redux-saga/effects';

import { firebaseReducer } from './firebase/reducer';
import firebaseSaga from './firebase/sagas';
import { IFirebaseState } from './firebase/types';

import { tweetReducer } from './tweet/reducer';
import tweetSaga from './tweet/sagas';
import { ITweetState } from './tweet/types';

export interface IApplicationState {
  tweet: ITweetState;
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
    tweet: tweetReducer,
  });

export function* rootSaga() {
  yield all([fork(tweetSaga), fork(firebaseSaga)]);
}

export default createRootReducer;

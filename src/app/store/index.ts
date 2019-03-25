import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { Action, AnyAction, combineReducers, Dispatch } from 'redux';
import { all, fork } from 'redux-saga/effects';

import { firebaseReducer } from './firebase/reducer';
import firebaseSaga from './firebase/sagas';
import { IFirebaseState } from './firebase/types';

import { categoryReducer } from './category/reducer';
import categorySaga from './category/sagas';
import { ICategoryState } from './category/types';
import { sheetReducer } from './sheet/reducer';
import sheetSaga from './sheet/sagas';
import { ISheetState } from './sheet/types';
import { tweetReducer } from './tweet/reducer';
import tweetSaga from './tweet/sagas';
import { ITweetState } from './tweet/types';

export interface IApplicationState {
  category: ICategoryState;
  firebase: IFirebaseState;
  router: RouterState;
  tweet: ITweetState;
  sheet: ISheetState;
}

export interface IConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export const createRootReducer = (history: History) =>
  combineReducers<IApplicationState>({
    category: categoryReducer,
    firebase: firebaseReducer,
    router: connectRouter(history),
    sheet: sheetReducer,
    tweet: tweetReducer,
  });

export function* rootSaga() {
  yield all([
    fork(categorySaga),
    fork(sheetSaga),
    fork(tweetSaga),
    fork(firebaseSaga),
  ]);
}

export default createRootReducer;

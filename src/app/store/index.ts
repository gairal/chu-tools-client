import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { Action, AnyAction, combineReducers, Dispatch } from 'redux';
import { all, fork } from 'redux-saga/effects';

import { categoryReducer } from './category/reducer';
import categorySaga from './category/sagas';
import { ICategoryState } from './category/types';
import { firebaseReducer } from './firebase/reducer';
import firebaseSaga from './firebase/sagas';
import { IFirebaseState } from './firebase/types';
import { postReducer } from './post/reducer';
import postSaga from './post/sagas';
import { IPostState } from './post/types';
import { sentimentReducer } from './sentiment/reducer';
import sentimentSaga from './sentiment/sagas';
import { ISentimentState } from './sentiment/types';
import { sheetReducer } from './sheet/reducer';
import sheetSaga from './sheet/sagas';
import { ISheetState } from './sheet/types';

export interface IApplicationState {
  category: ICategoryState;
  firebase: IFirebaseState;
  router: RouterState;
  sentiment: ISentimentState;
  sheet: ISheetState;
  post: IPostState;
}

export interface IConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export const createRootReducer = (history: History) =>
  combineReducers<IApplicationState>({
    category: categoryReducer,
    firebase: firebaseReducer,
    post: postReducer,
    router: connectRouter(history),
    sentiment: sentimentReducer,
    sheet: sheetReducer,
  });

export function* rootSaga() {
  yield all([
    fork(categorySaga),
    fork(sentimentSaga),
    fork(sheetSaga),
    fork(firebaseSaga),
    fork(postSaga),
  ]);
}

export default createRootReducer;

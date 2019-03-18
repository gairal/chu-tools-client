import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { Action, AnyAction, combineReducers, Dispatch } from 'redux';
import { all, fork } from 'redux-saga/effects';

import { firebaseReducer } from './firebase/reducer';
import firebaseSaga from './firebase/sagas';
import { IFirebaseState } from './firebase/types';

import { chatReducer } from './chat/reducer';
import chatSaga from './chat/sagas';
import { IChatState } from './chat/types';

import { commandsReducer } from './commands/reducer';
import { ICommandState } from './commands/types';

export interface IApplicationState {
  chat: IChatState;
  commands: ICommandState;
  firebase: IFirebaseState;
  router: RouterState;
}

export interface IConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export const createRootReducer = (history: History) =>
  combineReducers<IApplicationState>({
    chat: chatReducer,
    commands: commandsReducer,
    firebase: firebaseReducer,
    router: connectRouter(history),
  });

export function* rootSaga() {
  yield all([fork(chatSaga), fork(firebaseSaga)]);
}

export default createRootReducer;

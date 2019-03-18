import { firebase } from '@firebase/app';
import '@firebase/auth';
import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';

import createRootReducer, { IApplicationState, rootSaga } from './';

const fbConfig = {
  apiKey: '',
  authDomain: 'com-gairal-chools.firebaseapp.com',
  projectId: 'com-gairal-chools',
};

firebase.initializeApp(fbConfig);

export default function configureStore(
  history: History,
  initialState?: IApplicationState,
): Store<IApplicationState> {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [routerMiddleware(history), sagaMiddleware];

  const store = createStore(
    createRootReducer(history),
    initialState,
    compose(applyMiddleware(...middlewares)),
  );

  // Don't forget to run the root saga, and return the store object.
  sagaMiddleware.run(rootSaga);
  return store;
}

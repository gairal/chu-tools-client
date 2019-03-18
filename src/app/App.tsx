import { ConnectedRouter } from 'connected-react-router';
import { createHashHistory } from 'history';
import * as React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import RootContainer from '@/containers/RootContainer';
import reducer from '@/store';
import configure from '@/store/configure';
import { IWindow } from './window';

const history = createHashHistory();
const store = configure(history, (window as IWindow).INITIAL_STATE);

const App: React.SFC = () => {
  return (
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <RootContainer />
        </ConnectedRouter>
      </Provider>
    </AppContainer>
  );
};

export default App;

if ((module as any).hot) {
  (module as any).hot.accept('./store/index', () => {
    store.replaceReducer(reducer(history));
  });
}

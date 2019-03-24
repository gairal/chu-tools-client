import 'es6-promise/auto';
import 'react-dates/initialize';
import 'whatwg-fetch';

import * as React from 'react';
import ReactDom from 'react-dom';

import App from './App';

const render = () => {
  ReactDom.render(<App />, document.getElementById('root'));
};

render();

if ((module as any).hot) {
  (module as any).hot.accept('./App', () => {
    render();
  });
}

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {AppContainer} from 'react-hot-loader';
import log from 'loglevel';

import App from './views/App';
import initialState from './store/initialState';
import configureStore from './store/configureStore';

log.setLevel('debug');

const store = configureStore(initialState);

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const newApp = require('./views/App').default;
    render(newApp);
  });
}

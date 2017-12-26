import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {AppContainer} from 'react-hot-loader';
import log from 'loglevel';

import App from './components/App';
import appConfig from './services/appConfig';
import initialState from './store/initialState';
import configureStore from './store/configureStore';

log.setLevel('debug');

const store = configureStore(initialState);

const addScript = document.createElement('script');
addScript.setAttribute('src', `http://${appConfig.volumioBackend}/socket.io/socket.io.js`);
document.body.appendChild(addScript);

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

addScript.onload = () => render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const newApp = require('./components/App').default;
    render(newApp);
  });
}

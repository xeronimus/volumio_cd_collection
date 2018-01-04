import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

import rootReducer from '../reducers';


/**
 * configures and sets up the redux store.
 *
 * @param {object} [initialState]
 * @returns {object} the redux store
 */
export default function configureStore(initialState) {

  const logger = createLogger();

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware,
        logger
      )
    )
  );
}

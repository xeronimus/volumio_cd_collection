import {createStore, applyMiddleware} from 'redux';
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
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunkMiddleware,
      logger
    )
  );
}

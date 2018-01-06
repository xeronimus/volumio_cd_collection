import {combineReducers} from 'redux';

import volumio from './volumio';
import uiState from './uiState';
import lastActionTimestamp from './lastActionTimestamp';

const rootReducer = combineReducers({
  volumio,
  uiState,
  lastActionTimestamp
});

export default rootReducer;

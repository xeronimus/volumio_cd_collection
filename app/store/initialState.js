import {V_PLAYER} from '../views';

/**
 * The initial state that is loaded into the redux store on (client) application load.
 */
const INITIAL_STATE = {
  volumioQueue: [],
  volumioState: {},
  currentView: V_PLAYER,
  timrCountdown: false
};

export default INITIAL_STATE;

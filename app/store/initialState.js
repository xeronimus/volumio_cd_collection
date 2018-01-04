import {V_PLAYER} from '../views';

/**
 * The initial state that is loaded into the redux store on (client) application load.
 */
const INITIAL_STATE = {
  volumioConnected: false,
  volumioConnectError: undefined,
  volumioQueue: [],
  volumioState: {},
  currentView: V_PLAYER,
  timrCountdown: false, // if true, show song timer in "countdown" mode
  showTracklist: false // if true, display an overlay with the current tracklist  (playlist)
};

export default INITIAL_STATE;

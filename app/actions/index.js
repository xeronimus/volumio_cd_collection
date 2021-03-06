import axios from 'axios';
import {initialize as initializeVolumio} from '../services/volumio';
import log from 'loglevel';

import appConfig from '../services/appConfig';
import {
  VOLUMIO_CONNECT,
  VOLUMIO_CONNECT_ERROR,
  VOLUMIO_DISCONNECT,
  VOLUMIO_STATE_UPDATE,
  VOLUMIO_QUEUE_UPDATE,
  VOLUMIO_PUSH_BROWSE_LIBRARY,
  FAVORITES_LOADED,
  CURRENT_VIEW,
  TOGGLE_TIMR_COUNTDOWN,
  TOGGLE_TRACKLIST,
  LOCK_UI,
  UILOCK_DIGIT,
  UILOCK_DIGIT_CLEAR
} from '../actions/types';

let volumio;
let lockUiIntervalId;

const LOCKUI_CHECK_INTERVALL = 5000;
const LOCKUI_LAST_ACTION_THRESHOLD = 10000;


export const connectToBackend = () => (dispatch, getState) => {

  dispatch({type: VOLUMIO_DISCONNECT});

  // init websocket connection
  volumio = initializeVolumio(dispatch);
  volumio.connect()
    .then(() => {
      dispatch({type: VOLUMIO_CONNECT});

      // make sure we get the current volumio state & queue
      volumio.command('getState');
      volumio.command('getQueue');

      // start checking for last action timestamp in order to lock UI if necessary
      startCheckingLockUi(dispatch, getState);

      return loadFavoritesListFromGist();

    })
    .then((gistResponse) => {
      if (gistResponse.status !== 200) {
        log.error('Could not fetch favorites from gist / github', gistResponse.status);
        return;
      }

      processFavoritesList(gistResponse, dispatch);
    })
    .catch((error) => dispatch({type: VOLUMIO_CONNECT_ERROR, error}));

};

/**
 *
 * @param gistResponse
 * @param dispatch
 */
function processFavoritesList(gistResponse, dispatch) {

  const favListFromGist = JSON.parse(gistResponse.data.files['christina.json'].content);
  dispatch({type: FAVORITES_LOADED, data: favListFromGist});

  // fetch metadata (title, artist, albumart) from volumio library for every uri in the favoriteList
  favListFromGist.forEach((fav, index) => setTimeout(() => volumio.command('browseLibrary', {uri: fav}), index * 200));
}

/**
 *
 */
function loadFavoritesListFromGist() {
  return axios.get('https://api.github.com/gists/210058969b7cf59c1aa7edf8e18eb279', {
    auth: {
      username: appConfig.gitHubAccessToken
    }
  });
}

/**
 *
 * @param dispatch
 * @param getState
 */
function startCheckingLockUi(dispatch, getState) {
  if (lockUiIntervalId) {
    clearInterval(lockUiIntervalId);
  }
  lockUiIntervalId = setInterval(lockUiIfNecessary.bind(undefined, dispatch, getState), LOCKUI_CHECK_INTERVALL);
  lockUiIfNecessary(dispatch, getState);
}

/**
 *
 * @param dispatch
 * @param getState
 */
function lockUiIfNecessary(dispatch, getState) {
  log.trace('checking if we need to lock UI');

  const state = getState();

  if (state.uiState.uiIsLocked) {
    return;
  }

  if (state.volumio.volumioState.status === 'play') {
    return;
  }

  const diffMs = Date.now() - state.lastActionTimestamp;
  if (diffMs > LOCKUI_LAST_ACTION_THRESHOLD) { // if time passed since last action is more than threshold -> lock UI
    dispatch(lockUi());
  }
}

export const volumioStateUpdate = (volumioState) => (dispatch) => {
  dispatch({
    type: VOLUMIO_STATE_UPDATE,
    volumioState
  });
};

export const volumioQueueUpdate = (volumioQueue) => ({
  type: VOLUMIO_QUEUE_UPDATE,
  volumioQueue
});

export const volumioPushBrowseLibrary = (data) => ({
  type: VOLUMIO_PUSH_BROWSE_LIBRARY,
  data
});

export const volumioDisconnect = () => ({
  type: VOLUMIO_DISCONNECT
});

export const setCurrentView = (view) => ({
  type: CURRENT_VIEW,
  view
});
export const toggleTimrCountdown = () => ({
  type: TOGGLE_TIMR_COUNTDOWN
});
export const toggleTracklist = () => ({
  type: TOGGLE_TRACKLIST
});
export const lockUi = () => ({
  type: LOCK_UI
});
export const uiLockDigit = (digit) => ({
  type: UILOCK_DIGIT,
  digit
});
export const uiLockDigitClear = () => ({
  type: UILOCK_DIGIT_CLEAR
});

export const jumpToQueuePosition = (index) => () => {
  volumio.command('play', {value: index});
};
export const playUri = (uri) => () => {
  volumio.command('replaceAndPlay', {uri});
};
export const nextTrackInQueue = () => () => {
  volumio.command('next', null);
};
export const prevTrackInQueue = () => () => {
  volumio.command('prev', null);
};
export const pause = () => () => {
  volumio.command('pause', null);
};
export const play = () => () => {
  volumio.command('play', null);
};
export const volumeUp = () => () => {
  volumio.command('volume', '+');
};
export const volumeDown = () => () => {
  volumio.command('volume', '-');
};
export const setShuffle = (setShuffleOnFlag) => () => {
  volumio.command('setRandom', {value: !!setShuffleOnFlag});
};
export const setRepeat = (setRepeatOnFlag) => () => {
  volumio.command('setRepeat', {value: !!setRepeatOnFlag});
};

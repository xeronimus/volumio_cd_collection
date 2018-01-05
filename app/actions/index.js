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
  VOLUMIO_ALBUM_LIST,
  FAVORITES_LOADED,
  CURRENT_VIEW,
  TOGGLE_TIMR_COUNTDOWN,
  TOGGLE_TRACKLIST
} from '../actions/types';

let volumio;


export const connectToBackend = () => (dispatch) => {

  dispatch({type: VOLUMIO_DISCONNECT});

  // init websocket connection
  volumio = initializeVolumio(dispatch);
  volumio.connect()
    .then(() => {
      dispatch({type: VOLUMIO_CONNECT});
      // load favorites list
      // github personal access token "volumio_cd_collection"    3d7efb621ecf8246d0470464c5a351f28cf6801c

      return axios.get('https://api.github.com/gists/210058969b7cf59c1aa7edf8e18eb279', {
        auth: {
          username: appConfig.gitHubAccessToken
        }
      });

    })
    .then((favoritesResponse) => {
      if (favoritesResponse.status === 200) {
        dispatch({type: FAVORITES_LOADED, data: favoritesResponse.data.files});
      } else {
        // TODO: inform user?  toast message?
        log.error('Could not fetch favorites from gist / github', favoritesResponse.status);
      }
    })
    .catch((error) => dispatch({type: VOLUMIO_CONNECT_ERROR, error}));


};

export const volumioStateUpdate = (volumioState) => ({
  type: VOLUMIO_STATE_UPDATE,
  volumioState
});

export const volumioQueueUpdate = (volumioQueue) => ({
  type: VOLUMIO_QUEUE_UPDATE,
  volumioQueue
});

export const volumioAlbumList = (volumioAlbumList) => ({
  type: VOLUMIO_ALBUM_LIST,
  volumioAlbumList
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

import {initialize as initializeVolumio} from '../services/volumio';

import {
  VOLUMIO_CONNECT,
  VOLUMIO_DISCONNECT,
  VOLUMIO_STATE_UPDATE,
  VOLUMIO_QUEUE_UPDATE,
  VOLUMIO_ALBUM_LIST
} from '../actions/types';

let volumio;

export const connectToBackend = () => (dispatch) => {
  volumio = initializeVolumio(dispatch);
  volumio.connect().then(() => dispatch({type: VOLUMIO_CONNECT}));
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

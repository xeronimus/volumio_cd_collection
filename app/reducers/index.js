import log from 'loglevel';

import filterForFavorites from '../services/filterForFavorites';
import {
  VOLUMIO_ALBUM_LIST,
  VOLUMIO_CONNECT,
  VOLUMIO_DISCONNECT,
  VOLUMIO_STATE_UPDATE,
  VOLUMIO_QUEUE_UPDATE
} from '../actions/types';

const rootReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case VOLUMIO_ALBUM_LIST:
      return {
        ...state,
        favorites: filterForFavorites(action.volumioAlbumList),
        allAlbums: action.volumioAlbumList.map((album) => ({artist: album.artist, title: album.title, uri: album.uri}))
      };
    case VOLUMIO_CONNECT:
      return {
        ...state,
        connected: true
      };
    case VOLUMIO_DISCONNECT:
      return {
        ...state,
        connected: false
      };
    case VOLUMIO_QUEUE_UPDATE:
      return {
        ...state,
        volumioQueue: action.volumioQueue
      };
    case VOLUMIO_STATE_UPDATE: {
      const {status, title, artist, album, albumart, uri, seek, duration, volume, mute, position} = action.volumioState;
      return {
        ...state,
        volumioState: {status, title, artist, album, albumart, uri, seek, duration, volume, mute, position}
      };
    }
    default:
      log.info('unknown action', action);
      return state;
  }
};


export default rootReducer;

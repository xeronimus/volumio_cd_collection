import log from 'loglevel';

import filterForFavorites from '../services/filterForFavorites';
import {
  VOLUMIO_ALBUM_LIST,
  VOLUMIO_CONNECT,
  VOLUMIO_DISCONNECT,
  VOLUMIO_STATE_UPDATE,
  VOLUMIO_QUEUE_UPDATE,
  FAVORITES_LOADED,
  CURRENT_VIEW,
  TOGGLE_TIMR_COUNTDOWN
} from '../actions/types';

const rootReducer = (state = {}, action = {}) => {
  switch (action.type) {

    case VOLUMIO_ALBUM_LIST: {
      if (state.favorites) {
        const modifiedState = {
          ...state,
          favoriteAlbums: filterForFavorites(action.volumioAlbumList, state.favorites),
        };
        delete modifiedState.favorites;
        return modifiedState;
      } else {
        return {
          ...state,
          volumioAlbumList: action.volumioAlbumList
        };
      }
    }

    case FAVORITES_LOADED: {
      const favorites = JSON.parse(action.data['christina.json'].content);

      if (state.volumioAlbumList) {
        const modifiedState = {
          ...state,
          favoriteAlbums: filterForFavorites(state.volumioAlbumList, favorites)
        };
        delete modifiedState.volumioAlbumList;
        return modifiedState;
      } else {
        return {
          ...state,
          favorites
        };
      }
    }

    case CURRENT_VIEW : {
      return {
        ...state,
        currentView: action.view
      };
    }

    case TOGGLE_TIMR_COUNTDOWN : {
      return {
        ...state,
        timrCountdown: !state.timrCountdown
      };
    }

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
      const {status, title, artist, album, albumart, uri, seek, duration, volume, mute, position, random, repeat} = action.volumioState;
      return {
        ...state,
        volumioState: {
          status,
          title,
          artist,
          album,
          albumart,
          uri,
          seek,
          duration,
          volume,
          mute,
          position,
          random,
          repeat
        }
      };
    }
    default:
      log.info('unknown action', action);
      return state;
  }
};


export default rootReducer;

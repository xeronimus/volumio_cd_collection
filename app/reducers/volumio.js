import filterForFavorites from '../services/filterForFavorites';
import {
  VOLUMIO_ALBUM_LIST,
  VOLUMIO_CONNECT,
  VOLUMIO_CONNECT_ERROR,
  VOLUMIO_DISCONNECT,
  VOLUMIO_STATE_UPDATE,
  VOLUMIO_QUEUE_UPDATE,
  FAVORITES_LOADED
} from '../actions/types';

export default function volumioReducer(state = {}, action) {
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

    case VOLUMIO_CONNECT:
      return {
        ...state,
        volumioConnected: true,
        volumioConnectError: undefined
      };

    case VOLUMIO_DISCONNECT:
      return {
        ...state,
        volumioConnected: false,
        volumioConnectError: undefined
      };

    case VOLUMIO_CONNECT_ERROR:
      return {
        ...state,
        volumioConnected: false,
        volumioConnectError: action.error
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

  }

  return state;
}



import {
  VOLUMIO_PUSH_BROWSE_LIBRARY,
  VOLUMIO_CONNECT,
  VOLUMIO_CONNECT_ERROR,
  VOLUMIO_DISCONNECT,
  VOLUMIO_STATE_UPDATE,
  VOLUMIO_QUEUE_UPDATE,
  FAVORITES_LOADED
} from '../actions/types';

export default function volumioReducer(state = {}, action) {
  switch (action.type) {

    case FAVORITES_LOADED: {
      return {
        ...state,
        favorites: action.data
      };
    }

    case VOLUMIO_PUSH_BROWSE_LIBRARY : {

      const libraryData = action.data;

      // check if pushed data matches one of our favorites
      const itemInfo = libraryData.navigation.info;

      const newFavorites = state.favorites.map((fav) => {
        if (fav !== itemInfo.uri) {
          // This isn't the fav we care about - keep it as-is
          return fav;
        }
        return {
          ...itemInfo,
          title: itemInfo.title ? itemInfo.title : itemInfo.album
        };
      });

      return {
        ...state,
        favorites: newFavorites
      };
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



/* global io */

import Promise from 'bluebird';
import {bindActionCreators} from 'redux';

import appConfig from './appConfig';

import {
  volumioStateUpdate,
  volumioQueueUpdate,
  volumioDisconnect,
  volumioAlbumList
} from '../actions';

/**
 *
 * @param {function} dispatch The redux store dispatch function
 */
export function initialize(dispatch) {
  const actions = bindActionCreators({
    volumioStateUpdate,
    volumioQueueUpdate,
    volumioDisconnect,
    volumioAlbumList
  }, dispatch);

  if (!io) {
    throw new Error('Socket.io library not present!');
  }

  const volumio = {
    connect,
    command
  };
  return volumio;

  function connect() {
    // open connection to Volumio backend
    const socket = io(appConfig.volumioBackend);
    volumio.socket = socket;

    return new Promise((resolve) => {
      socket.on('connect', () => {
        // make sure we get the current volumio state
        socket.emit('getState');
        socket.emit('getQueue');

        // fetch all albums from the volumio library
        socket.emit('browseLibrary', {
          uri: 'albums://'
        });


        resolve();
      });

      socket.on('pushState', actions.volumioStateUpdate);
      socket.on('pushQueue', actions.volumioQueueUpdate);

      socket.on('pushBrowseLibrary', (volumioLibrary) => {
        const sanitizedAlbumList = volumioLibrary.navigation.lists[0].items.filter((item) => (item.service === 'mpd'));
        actions.volumioAlbumList(sanitizedAlbumList);
      });

      socket.on('disconnect', () => actions.volumioDisconnect);

    });
  }

  function command(command, payload) {
    volumio.socket.emit(command, payload);
  }


}

import Promise from 'bluebird';
import {bindActionCreators} from 'redux';
import io from 'socket.io-client';
import log from 'loglevel';

import appConfig from './appConfig';

import {
  volumioStateUpdate,
  volumioQueueUpdate,
  volumioDisconnect,
  volumioPushBrowseLibrary
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
    volumioPushBrowseLibrary
  }, dispatch);

  const volumio = {
    connect,
    command
  };
  return volumio;

  function connect() {

    // open connection to Volumio backend
    const socket = io(appConfig.volumioBackend);
    volumio.socket = socket;

    return new Promise((resolve, reject) => {

      socket.on('connect_error', (err) => reject(new Error(err)));
      socket.on('connect_timeout', (err) => reject(new Error(err)));
      socket.on('connect', () => resolve());
      socket.on('pushState', actions.volumioStateUpdate);
      socket.on('pushQueue', actions.volumioQueueUpdate);
      socket.on('pushBrowseLibrary', actions.volumioPushBrowseLibrary);
      socket.on('disconnect', () => actions.volumioDisconnect);

    });

  }

  function command(command, payload) {
    log.debug('sending command to Backend', command, payload);
    volumio.socket.emit(command, payload);
  }

}

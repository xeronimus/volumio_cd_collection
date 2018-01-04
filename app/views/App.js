import React from 'react';
import {connect} from 'react-redux';

import PlayerView from './PlayerView';
import LibraryView from './LibraryView';
import {V_PLAYER, V_LIBRARY} from '../views';
import {connectToBackend} from '../actions/index';
import appConfig from '../services/appConfig';

/**
 * The main App Component
 */
class App extends React.Component {

  componentWillMount() {
    this.props.connectToBackend();
  }

  render() {
    const {currentView, volumioConnected, volumioConnectError, connectToBackend} = this.props;

    if (!volumioConnected && volumioConnectError) {
      return (
        <div className="msg msg-error">
          <div className="msg-content">
            <div>Could not connect to Volumio Backend on <b>{appConfig.volumioBackend}</b></div>
            <button type="button" className="pure-button" onClick={connectToBackend}>Retry</button>
          </div>
        </div>
      );
    }


    if (!volumioConnected) {
      return (
        <div className="msg msg-info">
          <div className="msg-content">
            <div>Waiting for Volumio Backend on <b>{appConfig.volumioBackend} ...</b></div>
          </div>
        </div>
      );
    }

    if (currentView === V_PLAYER) {
      return <PlayerView />;
    } else if (currentView === V_LIBRARY) {
      return <LibraryView />;
    }
  }

}


export default connect(
  (state) => ({
    currentView: state.currentView,
    volumioConnected: state.volumioConnected,
    volumioConnectError: state.volumioConnectError
  }),
  {connectToBackend}
)(App);

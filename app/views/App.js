import React from 'react';
import {connect} from 'react-redux';

import PlayerView from './PlayerView';
import LibraryView from './LibraryView';
import {V_PLAYER, V_LIBRARY} from '../views';
import {connectToBackend} from '../actions/index';

/**
 * The main App Component
 */
class App extends React.Component {

  componentWillMount() {
    this.props.connectToBackend();
  }

  render() {
    if (this.props.currentView === V_PLAYER) {
      return <PlayerView />;
    } else if (this.props.currentView === V_LIBRARY) {
      return <LibraryView />;
    }
  }

}


export default connect(
  (state) => ({
    currentView: state.currentView
  }),
  {connectToBackend}
)(App);

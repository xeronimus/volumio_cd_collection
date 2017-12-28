import React from 'react';
import {connect} from 'react-redux';

import PlayerTopBar from '../components/PlayerTopBar';
import CoverImg from '../components/CoverImg';
import Timr from '../components/Timr';
import {volumeUp, volumeDown, setShuffle} from '../actions';

/**
 *
 */
const PlayerView = ({volumioState, volumeUp, volumeDown, setShuffle}) => {

  return (
    <div className="view player-view">

      <PlayerTopBar />

      <div className="main">

        <div className="column left-column">
          <Timr seek={volumioState.seek} pause={volumioState.status !== 'play'}/>
        </div>

        <div className="column trackinfo">
          <div className="artist album">{volumioState.artist} - {volumioState.album}</div>
          <div className="title">{volumioState.title}</div>
          <CoverImg albumArt={volumioState.albumart}/>
        </div>

        <div className="column right-column">
          <div>
            <button type="button" className="pure-button" onClick={volumeDown}>
              <i className="icon icon-volume-down"></i>
            </button>
            <button type="button" className="pure-button" onClick={volumeUp}>
              <i className="icon icon-volume-up"></i>
            </button>
          </div>
          <div>
            <button type="button" className={`pure-button ${volumioState.random ? 'active' : ''}`}
                    onClick={toggleShuffle}>
              <i className="icon icon-shuffle"></i>
            </button>
          </div>
        </div>

      </div>
    </div>
  );

  function toggleShuffle() {
    setShuffle(!volumioState.random);
  }

};

export default connect(
  (state) => ({
    volumioState: state.volumioState
  }),
  {volumeUp, volumeDown, setShuffle}
)(PlayerView);

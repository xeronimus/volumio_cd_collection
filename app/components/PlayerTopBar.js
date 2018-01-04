import React from 'react';
import {connect} from 'react-redux';

import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import {V_LIBRARY} from '../views';
import {prevTrackInQueue, nextTrackInQueue, setCurrentView} from '../actions';
import img from '../assets/images/volumio-logo.png';

/**
 * The PlayerTopBar (Header), containing play/pause, next/prev buttons
 */
const PlayerTopBar = ({playerStatus, prevTrackInQueue, nextTrackInQueue, setCurrentView}) => {
  return (
    <div className="top-bar player-top-bar">
      <img src={img} onClick={() => location.reload()}/>

      <div className="player-buttons">

        <button className="pure-button btn-prev" type="button" onClick={prevTrackInQueue}>
          <i className="icon icon-step-backward"></i>
        </button>

        <div className="play-button-wrapper">
          {
            (playerStatus === 'pause' || playerStatus === 'stop') &&
            <PlayButton/>
          }
          {
            (playerStatus === 'play'  ) && <PauseButton/>
          }
        </div>

        <button className="pure-button btn-next" type="button" onClick={nextTrackInQueue}>
          <i className="icon icon-step-forward"></i>
        </button>
      </div>

      <button type="button" className="pure-button btn-library" onClick={setCurrentView.bind(undefined, V_LIBRARY)}>
        <i className="icon icon-music"></i>
      </button>

    </div>
  );
};

export default connect(
  (state) => ({
    playerStatus: state.volumioState && state.volumioState.status
  }),
  {prevTrackInQueue, nextTrackInQueue, setCurrentView}
)(PlayerTopBar);

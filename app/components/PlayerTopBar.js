import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import {V_LIBRARY} from '../views';
import {prevTrackInQueue, nextTrackInQueue, setCurrentView, lockUi} from '../actions';
import img from '../assets/images/volumio-logo.png';

/**
 * The PlayerTopBar (Header), containing play/pause, next/prev buttons
 */
const PlayerTopBar = ({playerStatus, prevTrackInQueue, nextTrackInQueue, setCurrentView, lockUi}) => {
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

      <div className="quick-menu">
        <button type="button" className="pure-button btn-lock" onClick={lockUi}>
          <i className="icon icon-lock"></i>
        </button>
        <button type="button" className="pure-button btn-library" onClick={setCurrentView.bind(undefined, V_LIBRARY)}>
          <i className="icon icon-music"></i>
        </button>
      </div>

    </div>
  );
};

PlayerTopBar.propTypes = {
  playerStatus: PropTypes.string,
  prevTrackInQueue: PropTypes.func.isRequired,
  nextTrackInQueue: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired,
  lockUi: PropTypes.func.isRequired
};

export default connect(
  (state) => ({
    playerStatus: state.volumio.volumioState && state.volumio.volumioState.status
  }),
  {prevTrackInQueue, nextTrackInQueue, setCurrentView, lockUi}
)(PlayerTopBar);

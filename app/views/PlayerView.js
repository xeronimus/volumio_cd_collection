import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import PlayerTopBar from '../components/PlayerTopBar';
import TrackList from '../components/TrackList/TrackList';
import Timr from '../components/Timr';
import VolumeControl from '../components/VolumeControl';
import PlaybackModeControl from '../components/PlaybackModeControl';
import TrackInfo from '../components/TrackInfo';
import UiLock from '../components/UiLock';

/**
 *
 */
const PlayerView = ({showTracklist, uiIsLocked,}) => {

  return (
    <div className="view player-view">

      <PlayerTopBar />

      <div className="main">

        <div className="column left-column">
          <Timr />
        </div>

        <TrackInfo />

        <div className="column right-column">
          <VolumeControl />

          <PlaybackModeControl />
        </div>

      </div>

      { showTracklist && <TrackList /> }

      { uiIsLocked && <UiLock /> }

    </div>
  );

};

PlayerView.propTypes = {
  showTracklist: PropTypes.bool,
  uiIsLocked: PropTypes.bool
};

export default connect(
  (state) => ({
    showTracklist: state.uiState.showTracklist,
    uiIsLocked: state.uiState.uiIsLocked
  })
)(PlayerView);

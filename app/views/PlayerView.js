import React from 'react';
import {connect} from 'react-redux';

import PlayerTopBar from '../components/PlayerTopBar';
import CoverImg from '../components/CoverImg';
import TrackList from '../components/TrackList';
import Timr from '../components/Timr';
import {
  volumeUp,
  volumeDown,
  setShuffle,
  setRepeat,
  toggleTimrCountdown,
  jumpToQueuePosition,
  toggleTracklist
} from '../actions';

/**
 *
 */
const PlayerView = ({
                      volumioState,
                      tracklist,
                      showTracklist,
                      timrCountdown,
                      volumeUp,
                      volumeDown,
                      setShuffle,
                      setRepeat,
                      toggleTimrCountdown,
                      jumpToQueuePosition,
                      toggleTracklist
                    }) => {

  return (
    <div className="view player-view">

      <PlayerTopBar />

      <div className="main">

        <div className="column left-column">
          <Timr seek={volumioState.seek} pause={volumioState.status !== 'play'} duration={volumioState.duration}
                countdown={timrCountdown} onTimrClick={toggleTimrCountdown}/>
        </div>

        <div className="column trackinfo">
          <div className="artist album">{volumioState.artist} - {volumioState.album}</div>
          <div className="title">{volumioState.title}</div>
          <CoverImg albumArt={volumioState.albumart} onClick={toggleTracklist}/>
        </div>

        <div className="column right-column">
          <div>
            <div className="volume-bar">
              <div className="volume-bar-inner" style={{width: `${volumioState.volume}%`}}></div>
            </div>
          </div>
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
            <button type="button" className={`pure-button ${volumioState.repeat ? 'active' : ''}`}
                    onClick={toggleRepeat}>
              <i className="icon icon-cw"></i>
            </button>
          </div>
        </div>

      </div>

      { showTracklist &&

      <TrackList
        tracks={tracklist}
        currentUri={volumioState.uri}
        onTrackClick={jumpToQueuePosition}
        onCancel={toggleTracklist}
      />

      }

    </div>
  );

  function toggleShuffle() {
    setShuffle(!volumioState.random);
  }

  function toggleRepeat() {
    setRepeat(!volumioState.repeat);
  }

};

export default connect(
  (state) => ({
    volumioState: state.volumioState,
    timrCountdown: state.timrCountdown,
    tracklist: state.volumioQueue,
    showTracklist: state.showTracklist
  }),
  {volumeUp, volumeDown, setShuffle, setRepeat, toggleTimrCountdown, jumpToQueuePosition, toggleTracklist}
)(PlayerView);

import React from 'react';
import {connect} from 'react-redux';

import FavoritesList from './FavoritesList';
import CoverImg from './CoverImg';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import {connectToBackend, playUri, prevTrackInQueue, nextTrackInQueue} from '../actions';

class App extends React.Component {

  componentWillMount() {
    this.props.connectToBackend();
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <div className="top-bar">

          <div className="player-buttons">

            <button className="pure-button" type="button" onClick={this.props.prevTrackInQueue}><i
              className="icon icon-step-backward"></i></button>

            {
              (this.props.volumioState.status === 'pause' || this.props.volumioState.status === 'stop') && <PlayButton/>
            }
            {
              (this.props.volumioState.status === 'play'  ) && <PauseButton/>
            }

            <button className="pure-button" type="button" onClick={this.props.nextTrackInQueue}><i
              className="icon icon-step-forward"></i></button>
          </div>

        </div>

        <div className="trackinfo">
          <div className="album">{this.props.volumioState.album}</div>
          <div className="title">{this.props.volumioState.title}</div>
          <div className="artist">{this.props.volumioState.artist}</div>
          <CoverImg albumArt={this.props.volumioState.albumart}/>
        </div>

        {
          /**
           <ol className="queue">
           {
             this.props.volumioQueue.map((track, index) => <li key={index}
                                                               className={(index === this.props.volumioState.position) ? 'current-track' : ''}>{track.name}</li>)
           }
           </ol>
           **/
        }

        <FavoritesList favorites={this.props.favorites} onFavoriteClick={this.props.playUri}/>
      </div>
    );
  }

}


export default connect(
  (state) => ({
    volumioState: state.volumioState,
    volumioQueue: state.volumioQueue,
    favorites: state.favorites
  }),
  {connectToBackend, playUri, prevTrackInQueue, nextTrackInQueue}
)(App);

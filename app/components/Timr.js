import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import formatDate from 'date-fns/format';

import {toggleTimrCountdown} from '../actions';

class Timr extends React.Component {

  constructor() {
    super();
    this.state = {seek: 0, pause: false};
  }

  componentDidMount() {
    this.onSeekUpdate(this.props.seek, this.props.pause);
  }

  componentWillUnmount() {
    window.clearInterval(this.timerPlayback);
  }

  onSeekUpdate(seek, pause) {
    if (typeof seek === 'undefined') {
      return;
    }
    this.timeLastStateUpdate = Date.now();
    this.setState({
      seek,
      pause: !!pause
    }, () => this.startPlaybackTimer());
  }


  startPlaybackTimer() {
    window.clearInterval(this.timerPlayback);

    if (this.state.pause) {
      return;
    }
    const startSeek = this.state.seek;

    this.timerPlayback = window.setInterval(() => {
      const newSeek = startSeek + Date.now() - this.timeLastStateUpdate;

      this.setState({
        seek: newSeek
      });

    }, 500);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.seek !== nextProps.seek || this.props.pause !== nextProps.pause) {
      this.onSeekUpdate(nextProps.seek, nextProps.pause);
    }
  }

  render() {

    const {countdown, duration, toggleTimrCountdown} = this.props;
    const {seek} = this.state;

    return (
      <div className="timr" onClick={toggleTimrCountdown}>
        {
          !countdown &&
          formatDate(new Date(seek), 'mm:ss')
        }
        {
          countdown &&
          `- ${formatDate(new Date(duration * 1000 - seek), 'mm:ss')}`
        }
      </div>
    );
  }

}

Timr.propTypes = {
  seek: PropTypes.number,
  pause: PropTypes.bool,
  duration: PropTypes.number,
  countdown: PropTypes.bool,
  toggleTimrCountdown: PropTypes.func.isRequired
};

export default connect(
  (state) => ({
    seek: state.volumio.volumioState.seek,
    pause: state.volumio.volumioState.status !== 'play',
    duration: state.volumio.volumioState.duration,
    countdown: state.uiState.timrCountdown
  }),
  {toggleTimrCountdown}
)(Timr);

import React from 'react';
import formatDate from 'date-fns/format';

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
    if (typeof  seek === 'undefined') {
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
    if (this.props.seek !== nextProps.seek) {
      this.onSeekUpdate(nextProps.seek, nextProps.pause);
    }
  }

  render() {

    const {countdown, duration, onTimrClick} = this.props;
    const {seek} = this.state;

    return (
      <div className="timr" onClick={onTimrClick}>
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

export default Timr;

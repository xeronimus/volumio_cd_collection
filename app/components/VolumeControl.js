import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {volumeUp, volumeDown} from '../actions';

/**
 */
const VolumeControl = ({volumeUp, volumeDown, volume}) => {
  return [
    <div className="volume-bar" key="volume-bar">
      <div className="volume-bar-inner" style={{width: `${volume}%`}}></div>
    </div>,
    <div key="volume-buttons">
      <button type="button" className="pure-button" onClick={volumeDown}>
        <i className="icon icon-volume-down"></i>
      </button>
      <button type="button" className="pure-button" onClick={volumeUp}>
        <i className="icon icon-volume-up"></i>
      </button>
    </div>
  ];
};

VolumeControl.propTypes = {
  volume: PropTypes.number,
  volumeUp: PropTypes.func.isRequired,
  volumeDown: PropTypes.func.isRequired
};

export default connect(
  (state) => ({
    volume: state.volumio.volumioState.volume
  }),
  {volumeUp, volumeDown}
)(VolumeControl);

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {setShuffle, setRepeat} from '../actions';

/**
 */
const PlaybavkModeControl = ({random, repeat, setShuffle, setRepeat}) => {
  return (
    <div>
      <button type="button" className={`pure-button ${random ? 'active' : ''}`}
              onClick={toggleShuffle}>
        <i className="icon icon-shuffle"></i>
      </button>
      <button type="button" className={`pure-button ${repeat ? 'active' : ''}`}
              onClick={toggleRepeat}>
        <i className="icon icon-cw"></i>
      </button>
    </div>
  );

  function toggleShuffle() {
    setShuffle(!random);
  }

  function toggleRepeat() {
    setRepeat(!repeat);
  }
};

PlaybavkModeControl.propTypes = {
  random: PropTypes.bool,
  repeat: PropTypes.bool,
  setShuffle: PropTypes.func.isRequired,
  setRepeat: PropTypes.func.isRequired
};

export default connect(
  (state) => ({
    random: state.volumio.volumioState.random,
    repeat: state.volumio.volumioState.repeat
  }),
  {setShuffle, setRepeat}
)(PlaybavkModeControl);

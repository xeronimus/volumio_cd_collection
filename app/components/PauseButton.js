import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {pause} from '../actions';

const PauseButton = ({pause}) => (
  <button type="button" className="pure-button btn-pause" onClick={pause}><i className="icon icon-pause"></i></button>
);

PauseButton.propTypes = {
  pause: PropTypes.func.isRequired
};

export default connect(
  () => ({}),
  {pause}
)(PauseButton);

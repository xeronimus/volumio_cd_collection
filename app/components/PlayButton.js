import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {play} from '../actions';

const PlayButton = ({play}) => (
  <button type="button" className="pure-button btn-play" onClick={play}><i className="icon icon-play"></i></button>
);

PlayButton.propTypes = {
  play: PropTypes.func.isRequired
};

export default connect(
  () => ({}),
  {play}
)(PlayButton);

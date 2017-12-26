import React from 'react';
import {connect} from 'react-redux';

import {play} from '../actions';

const PlayButton = ({play}) => (
  <button type="button" className="pure-button btn-play" onClick={play}><i className="icon icon-play"></i></button>
);

export default connect(
  () => ({}),
  {play}
)(PlayButton);

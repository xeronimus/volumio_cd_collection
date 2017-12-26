import React from 'react';
import {connect} from 'react-redux';

import {pause} from '../actions';

const PauseButton = ({pause}) => (
  <button type="button" className="pure-button btn-pause" onClick={pause}><i className="icon icon-pause"></i></button>
);

export default connect(
  () => ({}),
  {pause}
)(PauseButton);

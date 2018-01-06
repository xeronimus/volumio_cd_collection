import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {V_PLAYER} from '../views';
import {setCurrentView} from '../actions';

/**
 */
const LibraryTopBar = ({setCurrentView}) => {
  return (
    <div className="top-bar library-top-bar">

      <button type="button" className="pure-button" onClick={setCurrentView.bind(undefined, V_PLAYER)}>
        <i className="icon icon-left-open"></i>
      </button>

    </div>
  );
};

LibraryTopBar.propTypes = {
  setCurrentView: PropTypes.func.isRequired
};

export default connect(
  () => ({}),
  {setCurrentView}
)(LibraryTopBar);

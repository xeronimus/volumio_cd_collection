import React from 'react';
import PropTypes from 'prop-types';

import appConfig from '../services/appConfig';

/**
 *
 */
const CoverImg = ({albumArt, onClick}) => {
  if (albumArt) {
    return <img src={`${appConfig.volumioBackend + '' + albumArt}`} onClick={onClick}/>;
  } else {
    return <span />;
  }
};

CoverImg.propTypes = {
  albumArt: PropTypes.string,
  onClick: PropTypes.func
};

export default CoverImg;

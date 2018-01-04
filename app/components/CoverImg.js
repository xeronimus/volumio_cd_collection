import React from 'react';

import appConfig from '../services/appConfig';

/**
 *
 */
const CoverImg = ({albumArt, onClick}) => {
  if (albumArt) {
    return (  <img src={`${appConfig.volumioBackend + '' + albumArt}`} onClick={onClick}/> );
  } else {
    return <span />;
  }
};


export default CoverImg;

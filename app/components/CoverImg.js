import React from 'react';

import appConfig from '../services/appConfig';

/**
 *
 */
const CoverImg = ({albumArt}) => {
  if (albumArt) {
    return (  <img src={`${appConfig.volumioBackend + '' + albumArt}`}/> );
  } else {
    return <span />;
  }
};


export default CoverImg;

import React from 'react';

import appConfig from '../services/appConfig';

/**
 *
 */
const CoverImg = ({albumArt}) => (
  <img src={`http://${appConfig.volumioBackend + '' + albumArt}`}/>
);


export default CoverImg;

import React from 'react';
import PropTypes from 'prop-types';

const Track = ({track, currentUri, onTrackClick}) => (
  <li className={currentUri === track.uri ? 'current' : ''} onClick={onTrackClick}>
    {track.artist} - {track.name}
  </li>
);

Track.propTypes = {
  track: PropTypes.object,
  currentUri: PropTypes.string,
  onTrackClick: PropTypes.func.isRequired
};

export default Track;

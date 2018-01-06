import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {toggleTracklist} from '../actions';
import CoverImg from '../components/CoverImg';

/**
 */
const TrackInfo = ({artist, album, title, albumart, toggleTracklist}) => {
  return (
    <div className="column trackinfo">
      <div className="artist album">{artist} - {album}</div>
      <div className="title">{title}</div>
      <CoverImg albumArt={albumart} onClick={toggleTracklist}/>
    </div>
  );
};

TrackInfo.propTypes = {
  artist: PropTypes.string,
  album: PropTypes.string,
  title: PropTypes.string,
  albumart: PropTypes.string,
  toggleTracklist: PropTypes.func.isRequired
};

export default connect(
  (state) => ({
    artist: state.volumio.volumioState.artist,
    album: state.volumio.volumioState.album,
    title: state.volumio.volumioState.title,
    albumart: state.volumio.volumioState.albumart
  }),
  {toggleTracklist}
)(TrackInfo);

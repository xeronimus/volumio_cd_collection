import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import FavoritesList from '../components/FavoritesList/FavoritesList';
import LibraryTopBar from '../components/LibraryTopBar';
import {playUri} from '../actions';
import {V_PLAYER} from '../views';
import {setCurrentView} from '../actions';
/**
 *
 */
const LibraryView = ({favoriteAlbums, playUri, setCurrentView}) => {

  return (
    <div className="view library-view">

      <LibraryTopBar />

      {favoriteAlbums && favoriteAlbums.length &&
      <FavoritesList favoriteAlbums={favoriteAlbums} onFavoriteClick={onFavoriteClick}/>
      }
    </div>
  );

  function onFavoriteClick(favoriteUri) {
    playUri(favoriteUri);
    setCurrentView(V_PLAYER);
  }

};

LibraryView.propTypes = {
  favoriteAlbums: PropTypes.array,
  playUri: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired
};

export default connect(
  (state) => ({
    favoriteAlbums: state.volumio.favoriteAlbums,
  }),
  {playUri, setCurrentView}
)(LibraryView);

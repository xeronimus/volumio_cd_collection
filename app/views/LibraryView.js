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
const LibraryView = ({favorites, playUri, setCurrentView}) => {

  return (
    <div className="view library-view">

      <LibraryTopBar />

      {favorites && favorites.length &&
      <FavoritesList favorites={favorites} onFavoriteClick={onFavoriteClick}/>
      }
    </div>
  );

  function onFavoriteClick(favoriteUri) {
    playUri(favoriteUri);
    setCurrentView(V_PLAYER);
  }

};

LibraryView.propTypes = {
  favorites: PropTypes.array,
  playUri: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired
};

export default connect(
  (state) => ({
    favorites: state.volumio.favorites,
  }),
  {playUri, setCurrentView}
)(LibraryView);

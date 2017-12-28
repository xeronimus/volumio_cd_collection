import React from 'react';
import {connect} from 'react-redux';

import FavoritesList from '../components/FavoritesList';
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

export default connect(
  (state) => ({
    favoriteAlbums: state.favoriteAlbums,
  }),
  {playUri, setCurrentView}
)(LibraryView);

import React from 'react';

import CoverImg from './CoverImg';

/**
 *
 */
const FavoritesList = ({favorites, onFavoriteClick}) => (
  <ul className="favoritesList">
    {
      favorites.map((favorite) => <FavoritesListItem key={favorite.uri} favorite={favorite}
                                                     onFavoriteClick={onFavoriteClick}/>)
    }
  </ul>

);

const FavoritesListItem = ({favorite, onFavoriteClick}) => (
  <li onClick={() => onFavoriteClick(favorite.uri)}>
    <CoverImg albumArt={favorite.albumart}/>
  </li>
);

export default FavoritesList;

import React from 'react';
import PropTypes from 'prop-types';

import CoverImg from '../CoverImg';

/**
 *
 */
const FavoritesListItem = ({favorite, onFavoriteClick}) => (
  <li onClick={() => onFavoriteClick(favorite.uri)}>
    <CoverImg albumArt={favorite.albumart}/>
    <div className="favorite-title">{favorite.artist} - {favorite.title}</div>
  </li>
);

FavoritesListItem.propTypes = {
  favorite: PropTypes.object,
  onFavoriteClick: PropTypes.func.isRequired
};

export default FavoritesListItem;

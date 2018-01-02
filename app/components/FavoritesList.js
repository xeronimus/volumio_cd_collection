import React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';

import CoverImg from './CoverImg';

/**
 *
 */
const FavoritesList = ({favoriteAlbums, onFavoriteClick}) => {

  const sortedFavorites = favoriteAlbums.sort((fA, fB) => fA.title.localeCompare(fB.title));

  return (
    <div className="favoritesList">
      <Scrollbars autoHeight autoHeightMax={500}>
        <ul >
          {
            sortedFavorites.map((favorite) => <FavoritesListItem key={favorite.uri} favorite={favorite}
                                                                 onFavoriteClick={onFavoriteClick}/>)
          }
        </ul>
      </Scrollbars>
    </div>
  );
};

const FavoritesListItem = ({favorite, onFavoriteClick}) => (
  <li onClick={() => onFavoriteClick(favorite.uri)}>
    <CoverImg albumArt={favorite.albumart}/>
    <div className="favorite-title">{favorite.artist} - {favorite.title}</div>
  </li>
);

export default FavoritesList;

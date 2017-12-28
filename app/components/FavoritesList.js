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
      <Scrollbars style={{height: '210px'}}>
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
  </li>
);

export default FavoritesList;

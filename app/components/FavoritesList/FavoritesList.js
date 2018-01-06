import React from 'react';
import PropTypes from 'prop-types';
import {Scrollbars} from 'react-custom-scrollbars';

import FavoritesListItem from './FavoritesListItem';

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

FavoritesList.propTypes = {
  favoriteAlbums: PropTypes.array,
  onFavoriteClick: PropTypes.func.isRequired
};

export default FavoritesList;

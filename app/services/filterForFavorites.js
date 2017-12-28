/**
 *
 */
export default function filterForFavorites(volumioAlbumList, favorites) {
  return volumioAlbumList.filter((album) => favorites.includes(album.uri));
}


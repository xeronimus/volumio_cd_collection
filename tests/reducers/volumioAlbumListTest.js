import volumioReducer from '../../app/reducers/volumio';
import {
  VOLUMIO_ALBUM_LIST
} from '../../app/actions/types';

/**
 *
 */
describe('volumioAlbumList', () => {


  it('should store volumioAlbumList if favorites are not yet loaded', () => {
    const modifiedState = volumioReducer({}, {
      type: VOLUMIO_ALBUM_LIST,
      volumioAlbumList: [{uri: 'album://some/album'}]
    });

    expect(modifiedState.volumioAlbumList).toBeDefined();
    expect(modifiedState.volumioAlbumList).toEqual([{uri: 'album://some/album'}])

  });

  it('should store favoriteAlbums if favorites are already loaded', () => {
    const modifiedState = volumioReducer({
      favorites: ['album://some/album']
    }, {
      type: VOLUMIO_ALBUM_LIST,
      volumioAlbumList: [{uri: 'album://some/album'}]
    });

    expect(modifiedState.favorites).toBeUndefined();
    expect(modifiedState.volumioAlbumList).toBeUndefined();
    expect(modifiedState.favoriteAlbums).toEqual([{uri: 'album://some/album'}])

  });


});

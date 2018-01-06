import volumioReducer from '../../app/reducers/volumio';
import {
  FAVORITES_LOADED
} from '../../app/actions/types';

/**
 *
 */
describe('favoritesLoaded', () => {


  it('should store favorites if volumioAlbumList is not yet loaded', () => {
    const modifiedState = volumioReducer({}, {
      type: FAVORITES_LOADED,
      data: {
        'christina.json': {content: '["one","two","three"]'}
      }
    });

    expect(modifiedState.favorites).toBeDefined();
    expect(modifiedState.favorites).toEqual(['one', 'two', 'three'])

  });

  it('should store favoriteAlbums if volumioAlbumList is already loaded', () => {
    const modifiedState = volumioReducer({
      volumioAlbumList: [{uri: 'album://some/album'}]
    }, {
      type: FAVORITES_LOADED,
      data: {
        'christina.json': {content: '["album://some/album"]'}
      }
    });

    expect(modifiedState.favorites).toBeUndefined();
    expect(modifiedState.volumioAlbumList).toBeUndefined();
    expect(modifiedState.favoriteAlbums).toEqual([{uri: 'album://some/album'}])

  });


});

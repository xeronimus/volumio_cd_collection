import volumioReducer from '../../app/reducers/volumio';
import {
  FAVORITES_LOADED
} from '../../app/actions/types';

/**
 *
 */
describe('favoritesLoaded', () => {

  it('should store favorites as array of strings on FAVORITES_LOADED', () => {
    const modifiedState = volumioReducer({}, {
      type: FAVORITES_LOADED,
      data: ['album://some/album']
    });

    expect(modifiedState.favorites).toBeDefined();
    expect(modifiedState.favorites.length).toBe(1);

  });


});

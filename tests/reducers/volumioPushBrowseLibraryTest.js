import volumioReducer from '../../app/reducers/volumio';
import {
  VOLUMIO_PUSH_BROWSE_LIBRARY
} from '../../app/actions/types';

/**
 *
 */
describe('volumioPushBrowseLibrary', () => {

  it('should store favorites as array of strings on VOLUMIO_PUSH_BROWSE_LIBRARY', () => {
    const modifiedState = volumioReducer({
      favorites: [
        'firstUri',
        'secondUri'
      ]
    }, {
      type: VOLUMIO_PUSH_BROWSE_LIBRARY,
      data: {
        navigation: {
          info: {
            uri: 'firstUri',
            service: 'mpd',
            artist: 'Adele',
            album: '21',
            albumart: '/albumart?cacheid=412',
            year: '2011',
            type: 'album',
            duration: '54:45'
          },
          lists: [
            {
              availableListViews: [
                'list'
              ],
              items: []
            }
          ],
          prev: {
            uri: 'albums://'
          }
        }
      }
    });

    expect(modifiedState.favorites).toBeDefined();
    expect(modifiedState.favorites[0].album).toBe('21');
    expect(modifiedState.favorites[0].artist).toBe('Adele');
    expect(modifiedState.favorites[0].title).toBe('21');
    expect(modifiedState.favorites[0].uri).toBeDefined();

  });


});

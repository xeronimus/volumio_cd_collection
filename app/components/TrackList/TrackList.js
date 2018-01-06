import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Scrollbars} from 'react-custom-scrollbars';

import {jumpToQueuePosition, toggleTracklist} from '../../actions/index';
import Track from './Track';

/**
 *
 */
const Tracklist = ({tracklist, currentUri, jumpToQueuePosition, toggleTracklist}) => {
  return (
    <div className="track-list" onClick={handleTracklistClick}>
      <div className="track-list-inner">
        <Scrollbars style={{width: '100%'}} autoHeight autoHeightMax={'60vh'}>
          <ol>
            {
              tracklist.map((track, index) => <Track key={track.uri} track={track} currentUri={currentUri}
                                                     onTrackClick={() => jumpToQueuePosition(index)}/>)
            }
          </ol>
        </Scrollbars>
      </div>
    </div>
  );

  function handleTracklistClick(clickEvent) {
    if (clickEvent.target.tagName !== 'LI') {
      // do not trigger cancel (hide trackList overlay) if click was on a list element (track)
      toggleTracklist();
    }
  }
};

Tracklist.propTypes = {
  tracklist: PropTypes.array,
  currentUri: PropTypes.string,
  jumpToQueuePosition: PropTypes.func.isRequired,
  toggleTracklist: PropTypes.func.isRequired
};


export default connect(
  (state) => ({
    tracklist: state.volumio.volumioQueue,
    currentUri: state.volumio.volumioState.uri
  }),
  {jumpToQueuePosition, toggleTracklist}
)(Tracklist);

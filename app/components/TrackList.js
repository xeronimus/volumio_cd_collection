import React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';

/**
 *
 */
const Tracklist = ({tracks, currentUri, onTrackClick, onCancel}) => {
  return (
    <div className="track-list" onClick={handleTracklistClick}>
      <div className="track-list-inner">
        <Scrollbars style={{width: '100%'}} autoHeight autoHeightMax={'60vh'}>
          <ol>
            {
              tracks.map((track, index) => <Track key={track.uri} track={track} currentUri={currentUri}
                                                  onTrackClick={() => onTrackClick(index)}/>)
            }
          </ol>
        </Scrollbars>
      </div>
    </div>
  );

  function handleTracklistClick(clickEvent) {
    if (clickEvent.target.tagName !== 'LI') {
      // do not trigger cancel (hide trackList overlay) if click was on a list elemtn (track)
      onCancel();
    }
  }
};

const Track = ({track, currentUri, onTrackClick}) => (
  <li className={currentUri === track.uri ? 'current' : ''} onClick={onTrackClick}>
    {track.artist} - {track.name}
  </li>
);

export default Tracklist;

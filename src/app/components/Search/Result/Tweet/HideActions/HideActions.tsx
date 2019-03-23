import * as React from 'react';

import { setVisibility } from '@/store/search/actions';
import { ITweet } from '@/store/search/types';

interface IProps {
  setTheVisibility: typeof setVisibility;
  tweet: ITweet;
}
type AllProps = IProps;

const TweetView: React.SFC<AllProps> = ({ tweet, setTheVisibility }) => {
  const hide = () => setTheVisibility(tweet.id, true);
  const show = () => setTheVisibility(tweet.id, false);

  return (
    <div>
      {tweet.hidden ? (
        <button type="button" className={`text-grey`} onClick={show}>
          <i className="fas fa-undo" />
        </button>
      ) : (
        <button type="button" className={`text-red`} onClick={hide}>
          <i className="fas fa-trash" />
        </button>
      )}
    </div>
  );
};

export default TweetView;

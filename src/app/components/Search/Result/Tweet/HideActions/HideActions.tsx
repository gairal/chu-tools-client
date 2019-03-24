import * as React from 'react';

import { setVisibility } from '@/store/tweet/actions';
import { ITweet } from '@/store/tweet/types';

interface IProps {
  setTheVisibility: typeof setVisibility;
  tweet: ITweet;
}
type AllProps = IProps;

const HideActions: React.SFC<AllProps> = ({ tweet, setTheVisibility }) => {
  const hide = () => setTheVisibility(tweet.id, true);
  const show = () => setTheVisibility(tweet.id, false);

  return (
    <div>
      {tweet.hidden ? (
        <button type="button" className={`text-grey`} onClick={show}>
          <i className="fas fa-trash-restore" />
        </button>
      ) : tweet.sentiment ? (
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

export default HideActions;

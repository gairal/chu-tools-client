import * as React from 'react';

import { setVisibility } from '@/store/tweet/actions';
import { IPost } from '@/store/types';

interface IProps {
  setTheVisibility: typeof setVisibility;
  tweet: IPost;
}
type AllProps = IProps;

const HideActions: React.SFC<AllProps> = ({ tweet, setTheVisibility }) => {
  const hide = () => setTheVisibility(tweet.id, true);
  const show = () => setTheVisibility(tweet.id, false);

  return (
    <div>
      {tweet.hidden ? (
        <button
          type="button"
          className="text-grey hover:text-grey-dark"
          onClick={show}
        >
          <i className="fas fa-trash-restore" />
        </button>
      ) : tweet.sentiment ? (
        <button
          type="button"
          className="text-grey hover:text-grey-dark"
          onClick={show}
        >
          <i className="fas fa-undo" />
        </button>
      ) : (
        <button
          type="button"
          className="text-red-light hover:text-red-dark"
          onClick={hide}
        >
          <i className="fas fa-trash" />
        </button>
      )}
    </div>
  );
};

export default HideActions;

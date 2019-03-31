import * as React from 'react';

import { setVisibility } from '@/store/post/actions';
import { IPost } from '@/store/types';

interface IProps {
  setTheVisibility: typeof setVisibility;
  post: IPost;
}
type AllProps = IProps;

const HideActions: React.SFC<AllProps> = ({ post, setTheVisibility }) => {
  const hide = () => setTheVisibility(post.id, true);
  const show = () => setTheVisibility(post.id, false);

  return (
    <div>
      {post.hidden ? (
        <button
          type="button"
          className="text-grey hover:text-grey-dark"
          onClick={show}
        >
          <i className="fas fa-trash-restore" />
        </button>
      ) : post.sentiment ? (
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

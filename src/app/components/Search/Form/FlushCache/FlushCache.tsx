import * as React from 'react';

import { postsFlush } from '@/store/post/actions';

interface IProps {
  flush: typeof postsFlush;
}

const CountInput: React.SFC<IProps> = ({ flush }) => {
  return (
    <button
      type="button"
      className="text-grey hover:text-grey-dark mx-2"
      onClick={flush}
    >
      <i className="fas fa-toilet fa-2x" />
    </button>
  );
};

export default CountInput;

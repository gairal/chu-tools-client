import * as React from 'react';

import { tweetsFlush } from '@/store/tweet/actions';

interface IProps {
  flush: typeof tweetsFlush;
}

const CountInput: React.SFC<IProps> = ({ flush }) => {
  return (
    <button
      type="button"
      className="text-grey hover:text-grey-dark"
      onClick={flush}
    >
      <i className="fas fa-toilet" />
    </button>
  );
};

export default CountInput;

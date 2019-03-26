import * as React from 'react';

import { ITweet } from '@/store/tweet/types';

interface IProps {
  tweet: ITweet;
}
type AllProps = IProps;

const Translate: React.SFC<AllProps> = ({ tweet }) => {
  return (
    !['en', 'und'].includes(tweet.lang) && (
      <button type="button" className="text-grey hover:text-grey-dark ml-2">
        <i className="fas fa-language fa-lg" />
      </button>
    )
  );
};

export default Translate;

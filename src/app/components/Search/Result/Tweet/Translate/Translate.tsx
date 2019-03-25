import * as React from 'react';

import { ITweet } from '@/store/tweet/types';

interface IProps {
  tweet: ITweet;
}
type AllProps = IProps;

const Translate: React.SFC<AllProps> = ({ tweet }) => {
  return (
    tweet.lang !== 'en' && (
      <i className="fas fa-language fa-lg text-grey ml-2" />
    )
  );
};

export default Translate;

import * as React from 'react';

import { requestTranslate } from '@/store/tweet/actions';
import { IPost } from '@/store/types';

interface IProps {
  tweet: IPost;
  translate: typeof requestTranslate;
}
type AllProps = IProps;

const Translate: React.SFC<AllProps> = ({ tweet, translate }) => {
  const handleClick = () => translate(tweet.id, tweet.lang, tweet.text);

  return (
    !['en', 'und'].includes(tweet.lang) && (
      <button
        type="button"
        className="text-grey hover:text-grey-dark ml-2"
        onClick={handleClick}
      >
        <i className="fas fa-language fa-lg" />
      </button>
    )
  );
};

export default Translate;

import * as React from 'react';

import { requestTranslate } from '@/store/post/actions';
import { IPost } from '@/store/types';

interface IProps {
  post: IPost;
  translate: typeof requestTranslate;
}
type AllProps = IProps;

const Translate: React.SFC<AllProps> = ({ post, translate }) => {
  const handleClick = () => translate(post.id, post.lang, post.text);

  return (
    !!post.lang &&
    !['en', 'und'].includes(post.lang) && (
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

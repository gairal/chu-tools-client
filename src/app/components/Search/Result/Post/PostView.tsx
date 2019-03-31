import moment from 'moment';
import * as React from 'react';

import SentimentActions from '@/components/Search/Result/Post/SentimentActions';
import theme from '@/components/theme';
import { ICategory } from '@/store/category/types';
import {
  requestTranslate,
  setCategory,
  setSentiment,
  setVisibility,
} from '@/store/post/actions';
import { ISentiment } from '@/store/sentiment/types';
import { IPost } from '@/store/types';
import Category from './Category';
import HideActions from './HideActions';
import Translate from './Translate';

interface IProps {
  post: IPost;
  categories: ICategory[];
  sentiments: ISentiment[];
}

interface IPropsFromDispatch {
  setTheCategory: typeof setCategory;
  setTheSentiment: typeof setSentiment;
  setTheVisibility: typeof setVisibility;
  translate: typeof requestTranslate;
}

type AllProps = IProps & IPropsFromDispatch;

const PostView: React.SFC<AllProps> = ({
  categories,
  setTheCategory,
  setTheSentiment,
  setTheVisibility,
  sentiments,
  translate,
  post,
}) => {
  const date = moment(new Date(post.created)).format('MMM Do YY');
  return (
    <li
      className={`flex flex-col p-4 my-2 shadow-sm rounded overflow-hidden bg-${
        theme.postBg
      } border ${post.hidden && 'opacity-50'}`}
    >
      <div
        className={`flex justify-between items-center text-${
          theme.postHeaderText
        } text-sm`}
      >
        <a className="p-2 hover:text-grey" href={post.url} target="_blank">
          <i className="fas fa-external-link-alt" />
        </a>
        <div>
          <i className="fas fa-retweet mr-1" />
          {post.likes}
        </div>
        <span className={`text-${theme.postHeaderText}`}>{date}</span>

        <HideActions post={post} setTheVisibility={setTheVisibility} />
      </div>
      {!post.hidden && (
        <SentimentActions
          id={post.id}
          setTheSentiment={setTheSentiment}
          sentiments={sentiments}
        />
      )}
      <p
        className={`p-1 pl-2 text-${
          theme.color
        } border-l-4 border-blue-light break-words`}
      >
        {post.translation || post.text}
      </p>
      <div className="flex justify-between items-center mt-2">
        <Category
          post={post}
          categories={categories}
          setTheCategory={setTheCategory}
        />
        <Translate post={post} translate={translate} />
      </div>
    </li>
  );
};

export default PostView;

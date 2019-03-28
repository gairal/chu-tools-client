import moment from 'moment';
import * as React from 'react';

import SentimentActions from '@/components/Search/Result/Tweet/SentimentActions';
import theme from '@/components/theme';
import { ICategory } from '@/store/category/types';
import { ISentiment } from '@/store/sentiment/types';
import {
  requestTranslate,
  setCategory,
  setSentiment,
  setVisibility,
} from '@/store/tweet/actions';
import { ITweet } from '@/store/tweet/types';
import Category from './Category';
import HideActions from './HideActions';
import Translate from './Translate';

interface IProps {
  tweet: ITweet;
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

const TweetView: React.SFC<AllProps> = ({
  categories,
  setTheCategory,
  setTheSentiment,
  setTheVisibility,
  sentiments,
  translate,
  tweet,
}) => {
  const date = moment(new Date(tweet.created_at)).format('MMM Do YY');
  return (
    <li
      className={`flex flex-col p-4 my-2 shadow-sm rounded overflow-hidden bg-${
        theme.tweetBg
      } border ${tweet.hidden && 'opacity-50'}`}
    >
      <div
        className={`flex justify-between items-center text-${
          theme.tweetHeaderText
        } text-sm`}
      >
        <a className="p-2 hover:text-grey" href={tweet.url} target="_blank">
          <i className="fas fa-external-link-alt" />
        </a>
        <div>
          <i className="fas fa-retweet mr-1" />
          {tweet.retweet_count}
        </div>
        <span className={`text-${theme.tweetHeaderText}`}>{date}</span>

        <HideActions tweet={tweet} setTheVisibility={setTheVisibility} />
      </div>
      {!tweet.hidden && (
        <SentimentActions
          id={tweet.id_str}
          setTheSentiment={setTheSentiment}
          sentiments={sentiments}
        />
      )}
      <p
        className={`p-1 pl-2 text-${
          theme.color
        } border-l-4 border-blue-light break-words`}
      >
        {tweet.translation || tweet.text}
      </p>
      <div className="flex justify-between items-center mt-2">
        <Category
          tweet={tweet}
          categories={categories}
          setTheCategory={setTheCategory}
        />
        <Translate tweet={tweet} translate={translate} />
      </div>
    </li>
  );
};

export default TweetView;

import moment from 'moment';
import * as React from 'react';

import SentimentActions from '@/components/Search/Result/Tweet/SentimentActions';
import { ICategory } from '@/store/category/types';
import {
  setCategory,
  setSentiment,
  setVisibility,
} from '@/store/tweet/actions';
import { ITweet } from '@/store/tweet/types';
import Category from './Category';
import HideActions from './HideActions';

interface IProps {
  setTheCategory: typeof setCategory;
  setTheSentiment: typeof setSentiment;
  setTheVisibility: typeof setVisibility;
  tweet: ITweet;
  categories: ICategory[];
}
type AllProps = IProps;

const TweetView: React.SFC<AllProps> = ({
  categories,
  setTheCategory,
  setTheSentiment,
  setTheVisibility,
  tweet,
}) => {
  const date = moment(new Date(tweet.created_at)).format('MMM Do YY');
  return (
    <li
      className={`flex flex-col p-4 my-2 shadow-sm rounded bg-grey-lightest border ${tweet.hidden &&
        'opacity-50'}`}
    >
      <div className="flex justify-between items-center text-grey text-sm">
        <a className="p-2" href={tweet.url} target="_blank">
          <i className="fas fa-external-link-alt" />
        </a>
        <div>
          <i className="fas fa-retweet mr-1" />
          {tweet.retweet_count}
        </div>
        {date}
        <HideActions tweet={tweet} setTheVisibility={setTheVisibility} />
      </div>
      {!tweet.hidden && (
        <SentimentActions id={tweet.id} setTheSentiment={setTheSentiment} />
      )}
      {tweet.text}

      {tweet.sentiment && (
        <Category
          id={tweet.id}
          categories={categories}
          setTheCategory={setTheCategory}
        />
      )}
    </li>
  );
};

export default TweetView;

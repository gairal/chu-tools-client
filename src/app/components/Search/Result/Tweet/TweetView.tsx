import * as React from 'react';

import SentimentActions from '@/components/Search/Result/Tweet/SentimentActions';
import { setSentiment, setVisibility } from '@/store/tweet/actions';
import { ITweet } from '@/store/tweet/types';
import HideActions from './HideActions';

interface IProps {
  setTheSentiment: typeof setSentiment;
  setTheVisibility: typeof setVisibility;
  tweet: ITweet;
}
type AllProps = IProps;

const TweetView: React.SFC<AllProps> = ({
  tweet,
  setTheSentiment,
  setTheVisibility,
}) => {
  const date = new Date(tweet.created_at).toDateString();
  return (
    <li
      className={`flex flex-col p-4 my-2 shadow-sm rounded bg-grey-lightest border ${tweet.hidden &&
        'opacity-50'}`}
    >
      <div className="flex justify-between items-center text-grey text-sm">
        <a className="p-2" href={tweet.url} target="_blank">
          <i className="fas fa-external-link-alt" />
        </a>
        {date}
        <HideActions tweet={tweet} setTheVisibility={setTheVisibility} />
      </div>
      {!tweet.hidden && (
        <SentimentActions id={tweet.id} setTheSentiment={setTheSentiment} />
      )}
      {tweet.text}
    </li>
  );
};

export default TweetView;

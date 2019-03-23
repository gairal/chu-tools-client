import * as React from 'react';

import { setSentiment } from '@/store/search/actions';
import { ITweet, sentiment } from '@/store/search/types';

interface IProps {
  setTheSentiment: typeof setSentiment;
  tweet: ITweet;
}
type AllProps = IProps;

const TweetView: React.SFC<AllProps> = ({ tweet, setTheSentiment }) => {
  const setNegativeSentiment = () =>
    setTheSentiment(tweet.id, sentiment.Negative);
  const setNeutralSentiment = () =>
    setTheSentiment(tweet.id, sentiment.Neutral);
  const setPositiveSentiment = () =>
    setTheSentiment(tweet.id, sentiment.Positive);

  const defaultActionClassNames = 'text-white m-2 w-full';

  const date = new Date(tweet.created_at).toDateString();
  return (
    <div className="flex flex-col p-4 my-2 border">
      <div className="flex justify-between text-grey text-sm">
        <a className="truncate" href={tweet.url}>
          {tweet.url}
        </a>
        {date}
      </div>
      {tweet.text}
      <div className="flex justify-between pt-2">
        <button
          className={`${defaultActionClassNames} bg-red`}
          type="button"
          onClick={setNegativeSentiment}
        >
          -
        </button>
        <button
          className={`${defaultActionClassNames} bg-grey`}
          type="button"
          onClick={setNeutralSentiment}
        >
          ~
        </button>
        <button
          className={`${defaultActionClassNames} bg-green`}
          type="button"
          onClick={setPositiveSentiment}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default TweetView;

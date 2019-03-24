import * as React from 'react';

import { IOrderedTweetIds } from '@/store/sheet/types';
import { ITweet, Sentiment } from '@/store/tweet/types';

interface IProps {
  loading: boolean;
  save: (ids: IOrderedTweetIds) => void;
  tweets: ITweet[];
}

const SaveButton: React.SFC<IProps> = ({ loading, save, tweets }) => {
  const handleSave = () => {
    const orderedTweets = tweets.reduce(
      (twits, tweet) => {
        if (tweet.sentiment === Sentiment.Negative) {
          twits.negative.push(tweet.id);
        } else if (tweet.sentiment === Sentiment.Positive) {
          twits.positive.push(tweet.id);
        } else if (tweet.sentiment === Sentiment.Neutral) {
          twits.neutral.push(tweet.id);
        }

        return twits;
      },
      {
        negative: [],
        neutral: [],
        positive: [],
      },
    );

    save(orderedTweets);
  };

  return (
    <button
      type="button"
      className="text-blue hover:text-blue-dark px-8"
      onClick={handleSave}
      disabled={loading}
    >
      <i className="fas fa-file-import" />
    </button>
  );
};

export default SaveButton;

import * as React from 'react';

import Tweets from '@/components/Search/Result/Tweets';
import { ITweet, sentiment } from '@/store/search/types';

interface IPropsFromState {
  tweets: ITweet[];
  loading?: boolean;
  title?: string;
}

type AllProps = IPropsFromState;

const ResultView: React.SFC<AllProps> = ({ tweets }) => {
  const { unordered, negative, neutral, positive } = tweets.reduce(
    (acc, t) => {
      switch (t.sentiment) {
        case sentiment.Negative:
          acc.negative.push(t);
          break;
        case sentiment.Neutral:
          acc.neutral.push(t);
          break;
        case sentiment.Positive:
          acc.positive.push(t);
          break;
        default:
          acc.unordered.push(t);
          break;
      }

      return acc;
    },
    {
      negative: [],
      neutral: [],
      positive: [],
      unordered: [],
    },
  );

  return (
    <div className="flex">
      <Tweets tweets={unordered} title="Unordered" />
      <Tweets tweets={negative} title="Negative" />
      <Tweets tweets={neutral} title="Neutral" />
      <Tweets tweets={positive} title="Positive" />
    </div>
  );
};

export default ResultView;

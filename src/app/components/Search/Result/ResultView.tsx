import * as React from 'react';

import SaveForm from '@/components/Search/Result/SaveForm';
import Tweets from '@/components/Search/Result/Tweets';
import { ITweet, Sentiment } from '@/store/tweet/types';

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
        case Sentiment.Negative:
          acc.negative.push(t);
          break;
        case Sentiment.Neutral:
          acc.neutral.push(t);
          break;
        case Sentiment.Positive:
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
    <div className="flex h-full">
      <Tweets tweets={unordered} />
      <div className="flex flex-col flex-3 shadow-sm">
        <SaveForm />
        <div className="flex">
          <Tweets tweets={negative} title="Negative" />
          <Tweets tweets={neutral} title="Neutral" />
          <Tweets tweets={positive} title="Positive" />
        </div>
      </div>
    </div>
  );
};

export default ResultView;

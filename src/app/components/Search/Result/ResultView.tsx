import * as React from 'react';

import SaveForm from '@/components/Search/Result/SaveForm';
import Tweets from '@/components/Search/Result/Tweets';
import { ISentiment } from '@/store/sentiment/types';
import { loadMoreTweets } from '@/store/tweet/actions';
import { ITweet } from '@/store/tweet/types';

interface IPropsFromState {
  saved: string[];
  tweets: ITweet[];
  loading?: boolean;
  sentiments: ISentiment[];
  title?: string;
}

interface IPropsFromDispatch {
  loadMore: typeof loadMoreTweets;
}

interface IOrderedTweets {
  unordered: ITweet[];
  [key: string]: ITweet[];
}

type AllProps = IPropsFromState & IPropsFromDispatch;

const ResultView: React.SFC<AllProps> = ({
  saved,
  tweets,
  sentiments,
  loadMore,
}) => {
  const sentimentLabels = sentiments.map(s => s.label);

  const orderedTweets: IOrderedTweets = tweets
    .filter(t => !saved.includes(t.id_str))
    .reduce(
      (acc: IOrderedTweets, t) => {
        if (!t.sentiment) {
          acc.unordered.push(t);
        } else if (sentimentLabels.includes(t.sentiment)) {
          if (!acc[t.sentiment]) {
            acc[t.sentiment] = [];
          }

          acc[t.sentiment].push(t);
        }
        return acc;
      },
      {
        unordered: [],
      },
    );

  const shouldSave = Object.keys(orderedTweets).length > 1;

  return (
    <div className="flex flex-col-reverse md:flex-row h-full flex-no-grow flex-no-shrink">
      <Tweets
        tweets={orderedTweets.unordered}
        loadMore={loadMore}
        className="tweets__unordered"
      />
      <div className="shadow-sm flex-1 w-0 flex flex-col w-full p-2">
        {shouldSave && <SaveForm />}
        <div className="hidden md:flex overflow-x-auto flex-1">
          {sentiments.map(s => (
            <Tweets
              key={s.id}
              tweets={orderedTweets[s.label] || []}
              sentiment={s}
              style={{ flex: '0 0 25vw' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultView;

import * as React from 'react';

import Tweet from '@/components/Search/Result/Tweet';
import { ITweet } from '@/store/search/types';

interface IPropsFromState {
  tweets: ITweet[];
  loading?: boolean;
  title?: string;
}

type AllProps = IPropsFromState;

const TweetsView: React.SFC<AllProps> = ({ tweets, title }) => (
  <div className="flex flex-col w-1/4 border-r">
    <h2 className="p-2 border-b">{title}</h2>
    <div className="flex flex-col p-2">
      {tweets.map(t => (
        <Tweet key={t.id} tweet={t} />
      ))}
    </div>
  </div>
);

export default TweetsView;

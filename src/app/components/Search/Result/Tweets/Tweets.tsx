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
  <div className="flex flex-col w-1/4 mx-2">
    <h2 className="p-2 border-b uppercase text-grey-darker text-center">
      {title}
    </h2>
    <ul className="list-reset p-2">
      {tweets
        .sort((t1, t2) => {
          if (t1.hidden && !t2.hidden) {
            return 1;
          }
          if (!t1.hidden && t2.hidden) {
            return -1;
          }

          return 0;
        })
        .map(t => (
          <Tweet key={t.id} tweet={t} />
        ))}
    </ul>
  </div>
);

export default TweetsView;

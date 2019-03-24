import * as React from 'react';

import Tweet from '@/components/Search/Result/Tweet';
import { ITweet } from '@/store/tweet/types';

interface IPropsFromState {
  className?: string;
  loading?: boolean;
  title?: string;
  tweets: ITweet[];
}

type AllProps = IPropsFromState;

const TweetsView: React.SFC<AllProps> = ({ tweets, title, className }) => (
  <div
    className={`flex flex-col mx-2 flex-1 h-full overflow-auto ${className}`}
  >
    {title && (
      <h2 className="p-2 border-b uppercase text-grey-darker text-center text-lg">
        {title}
      </h2>
    )}
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

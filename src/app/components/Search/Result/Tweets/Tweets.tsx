import * as React from 'react';

import Tweet from '@/components/Search/Result/Tweet';
import { ISentiment } from '@/store/sentiment/types';
import { ITweet } from '@/store/tweet/types';

interface IPropsFromState {
  className?: string;
  loading?: boolean;
  sentiment?: ISentiment;
  tweets: ITweet[];
  style?: React.CSSProperties;
}

type AllProps = IPropsFromState;

const TweetsView: React.SFC<AllProps> = ({
  tweets,
  sentiment,
  style,
  className,
}) => {
  const infiniteListRef: React.RefObject<HTMLDivElement> = React.useRef(null);

  React.useEffect(() => {
    infiniteListRef.current.addEventListener('scroll', () => {
      if (
        infiniteListRef.current.scrollTop +
          infiniteListRef.current.clientHeight >=
        infiniteListRef.current.scrollHeight
      ) {
        // tslint:disable-next-line:no-console
        console.info('LOAD MORE');
      }
    });
  }, [false]);

  return (
    <div
      className={`flex flex-col px-2 h-full overflow-y-auto ${className}`}
      style={style}
      ref={infiniteListRef}
    >
      {sentiment && (
        <h2
          className={`p-2 border-b uppercase text-${
            sentiment.color
          } text-center text-lg`}
        >
          {sentiment.label}
          <i className={`fas fa-${sentiment.icon} ml-2`} />
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
};

export default TweetsView;

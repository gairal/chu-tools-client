import * as React from 'react';

import { setSentiment } from '@/store/search/actions';
import { Sentiment } from '@/store/search/types';

interface IProps {
  setTheSentiment: typeof setSentiment;
  id: number;
}
type AllProps = IProps;

const TweetView: React.SFC<AllProps> = ({ id, setTheSentiment }) => {
  const setNegativeSentiment = () => setTheSentiment(id, Sentiment.Negative);
  const setNeutralSentiment = () => setTheSentiment(id, Sentiment.Neutral);
  const setPositiveSentiment = () => setTheSentiment(id, Sentiment.Positive);

  const defaultActionClassNames = 'm-2 w-full';

  return (
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
  );
};

export default TweetView;

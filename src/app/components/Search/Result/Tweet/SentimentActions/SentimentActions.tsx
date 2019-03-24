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

  const defaultActionClassNames = 'p-1 m-2 w-full';

  return (
    <div className="flex justify-between">
      <button
        className={`${defaultActionClassNames} bg-red hover:bg-red-dark`}
        type="button"
        onClick={setNegativeSentiment}
      >
        -
      </button>
      <button
        className={`${defaultActionClassNames} bg-grey hover:bg-grey-dark`}
        type="button"
        onClick={setNeutralSentiment}
      >
        ~
      </button>
      <button
        className={`${defaultActionClassNames} bg-green hover:bg-green-dark`}
        type="button"
        onClick={setPositiveSentiment}
      >
        +
      </button>
    </div>
  );
};

export default TweetView;

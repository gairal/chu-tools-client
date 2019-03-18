import * as React from 'react';
import styled from 'styled-components';

import Tweet from '@/components/Search/Result/Tweet';
import { setSentiment } from '@/store/search/actions';
import { ITweet, sentiment } from '@/store/search/types';

interface IPropsFromState {
  tweets: ITweet[];
  loading?: boolean;
  setTheSentiment: typeof setSentiment;
  title?: string;
}

type AllProps = IPropsFromState;

const ResultColumn: React.SFC<AllProps> = ({
  tweets,
  title,
  setTheSentiment,
}) => (
  <Tweets>
    <h1>{title}</h1>
    {tweets.map(t => (
      <Tweet key={t.id} setTheSentiment={setTheSentiment} tweet={t} />
    ))}
  </Tweets>
);

const ResultView: React.SFC<AllProps> = ({ setTheSentiment, tweets }) => {
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
    <Result>
      <ResultColumn
        tweets={unordered}
        setTheSentiment={setTheSentiment}
        title="Unordered"
      />
      <ResultColumn
        tweets={negative}
        setTheSentiment={setTheSentiment}
        title="Negative"
      />
      <ResultColumn
        tweets={neutral}
        setTheSentiment={setTheSentiment}
        title="Neutral"
      />
      <ResultColumn
        tweets={positive}
        setTheSentiment={setTheSentiment}
        title="Positive"
      />
    </Result>
  );
};

const Result = styled.div`
  display: flex;
  padding: ${props => props.theme.lengths.l4};
`;

const Tweets = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.lengths.l2};
`;

export default ResultView;

import * as React from 'react';
import styled from 'styled-components';

import Tweet from '@/components/Search/Result/Tweet';
import { ITweet } from '@/store/search/types';

interface IPropsFromState {
  tweets: ITweet[];
  loading: boolean;
}

type AllProps = IPropsFromState;

const ResultView: React.SFC<AllProps> = ({ tweets }) => (
  <Result>
    {tweets.map(t => (
      <Tweet key={t.id} tweet={t} />
    ))}
  </Result>
);

const Result = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.lengths.l4};
`;

export default ResultView;

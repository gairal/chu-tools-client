import * as React from 'react';
import styled from 'styled-components';

import Tweet from '@/components/Search/Result/Tweet';
import { ITweet } from '@/store/search/types';

interface IPropsFromState {
  tweets: ITweet[];
  loading?: boolean;
  title?: string;
}

type AllProps = IPropsFromState;

const TweetsView: React.SFC<AllProps> = ({ tweets, title }) => (
  <Tweets>
    <Title>{title}</Title>
    <TweetsContainer>
      {tweets.map(t => (
        <Tweet key={t.id} tweet={t} />
      ))}
    </TweetsContainer>
  </Tweets>
);

const Tweets = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  border-right: ${props => `1px solid ${props.theme.colors.grey}`};
`;

const Title = styled.h2`
  padding: ${props => props.theme.lengths.l2};
  border-bottom: ${props => `1px solid ${props.theme.colors.grey}`};
`;

const TweetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.lengths.l2};
`;

export default TweetsView;

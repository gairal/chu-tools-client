import * as React from 'react';
import styled from 'styled-components';

import { setSentiment } from '@/store/search/actions';
import { ITweet, sentiment } from '@/store/search/types';

interface IProps {
  setTheSentiment: typeof setSentiment;
  tweet: ITweet;
}
type AllProps = IProps;

const TweetView: React.SFC<AllProps> = ({ tweet, setTheSentiment }) => {
  const setNegativeSentiment = () =>
    setTheSentiment(tweet.id, sentiment.Negative);
  const setNeutralSentiment = () =>
    setTheSentiment(tweet.id, sentiment.Neutral);
  const setPositiveSentiment = () =>
    setTheSentiment(tweet.id, sentiment.Positive);

  const date = new Date(tweet.created_at).toDateString();
  return (
    <Tweet>
      <Header>
        <a href={tweet.url}>{tweet.url}</a>
        {date}
      </Header>
      {tweet.text}
      <Actions>
        <Negative onClick={setNegativeSentiment}>-</Negative>
        <Neutral onClick={setNeutralSentiment}>~</Neutral>
        <Positive onClick={setPositiveSentiment}>+</Positive>
      </Actions>
    </Tweet>
  );
};

const Tweet = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.lengths.l4};
  margin-bottom: ${props => props.theme.lengths.l2};
  margin-top: ${props => props.theme.lengths.l2};
  border: ${props => `solid 1px ${props.theme.colors.greyLight}`};
`;

const Header = styled.div`
  margin-bottom: ${props => props.theme.lengths.l2};
  display: flex;
  justify-content: space-between;
  color: ${props => props.theme.colors.grey};
  font-size: ${props => props.theme.lengths.l3};
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: ${props => props.theme.lengths.l2};
`;

const Action = styled.button`
  color: ${props => props.theme.colors.white};
  margin: ${props => props.theme.lengths.l2};
  width: 100%;
`;

const Negative = styled(Action)`
  background-color: ${props => props.theme.colors.red};
`;

const Neutral = styled(Action)`
  background-color: ${props => props.theme.colors.grey};
`;

const Positive = styled(Action)`
  background-color: ${props => props.theme.colors.green};\
`;

export default TweetView;

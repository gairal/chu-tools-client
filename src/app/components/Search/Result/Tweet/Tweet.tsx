import * as React from 'react';
import styled from 'styled-components';

import { ITweet } from '@/store/search/types';

interface IProps {
  tweet: ITweet;
}
type AllProps = IProps;

const TweetView: React.SFC<AllProps> = ({ tweet }) => {
  const date = new Date(tweet.created_at).toDateString();
  return (
    <Tweet>
      <CreateDate>{date}</CreateDate>
      {tweet.text}
      <Link>
        <a href={tweet.url}>{tweet.url}</a>
      </Link>
    </Tweet>
  );
};

const Tweet = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.lengths.l4};
  border: ${props => `solid 1px ${props.theme.colors.greyLight}`};
`;

const CreateDate = styled.div`
  display: flex;
  justify-content: flex-end;
  color: ${props => props.theme.colors.grey};
  font-size: ${props => props.theme.lengths.l2};
`;

const Link = styled.div`
  display: flex;
  justify-content: flex-end;
  color: ${props => props.theme.colors.grey};
  padding: ${props => props.theme.lengths.l2};
  font-size: ${props => props.theme.lengths.l3};
`;

export default TweetView;

import * as React from 'react';
import styled from 'styled-components';

import { IConnectedReduxProps } from '@/store';

import Conversation from './Conversation';
import Input from './Input';

const ChatView: React.SFC<IConnectedReduxProps> = () => (
  <Chat>
    <Conversation />
    <Input />
  </Chat>
);

export default ChatView;

const Chat = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: ${props => props.theme.lengths.full};
  padding-bottom: ${props => props.theme.lengths.l16};
`;

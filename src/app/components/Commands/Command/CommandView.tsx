import * as React from 'react';

import { requestSend } from '@/store/chat/actions';
import styled from 'styled-components';

interface IPropsFromState {
  q: string;
}

interface IPropsFromDispatch {
  sendCommand: typeof requestSend;
}

type AllProps = IPropsFromState & IPropsFromDispatch;

const CommandView: React.SFC<AllProps> = ({ q, sendCommand }) => {
  const send = (query: string) => () => {
    sendCommand(query);
  };

  return (
    <li>
      <Action type="button" onClick={send(q)}>
        {q}
      </Action>
    </li>
  );
};

export default CommandView;

const Action = styled.button`
  margin-top: ${props => props.theme.lengths.l1};
  margin-bottom: ${props => props.theme.lengths.l1};
  padding: ${props => props.theme.lengths.l2};
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.tealLight};
`;

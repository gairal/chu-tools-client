import * as React from 'react';
import styled from 'styled-components';

import { flushChat, requestSend } from '@/store/chat/actions';

const actions = [
  'Tell me a joke',
  "What's the weather",
  "I'm hungry for fish",
  "Pourquoi tu m'aimes",
  'Search for choux',
  'Search on wikipedia for choux',
  'Show me images about choux',
  "I'm pickle rick",
  'I want a cat',
  'I want a gif',
  'Send a message, thinking about you',
];

interface IPropsFromDispatch {
  flushChat: typeof flushChat;
  requestSend: typeof requestSend;
}

export default class Help extends React.Component<IPropsFromDispatch> {
  public state = {
    visible: false,
  };

  public render() {
    const { visible } = this.state;
    return (
      <HelpSection>
        <Button type="button" onClick={this.toggle}>
          🧀
        </Button>
        {visible ? (
          <Content>
            <Action onClick={this.flush}>Flush Cache</Action>
            {actions.map(action => (
              <Action onClick={this.createSend(action)} key={action}>
                {action}
              </Action>
            ))}
          </Content>
        ) : null}
      </HelpSection>
    );
  }

  private flush = () => {
    this.props.flushChat();
  };

  private createSend = (q: any) => {
    return () => {
      this.props.requestSend(q);
    };
  };

  private toggle = () => {
    this.setState(state => ({ ...state, visible: !this.state.visible }));
  };
}

const HelpSection = styled.section`
  position: absolute;
  top: ${props => props.theme.lengths.null};
  right: ${props => props.theme.lengths.null};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Button = styled.button`
  padding: ${props => props.theme.lengths.l4};
  font-size: ${props => props.theme.lengths.l7};
  opacity: 0.25;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${props => props.theme.lengths.l4};
  padding: ${props => props.theme.lengths.l2};
  background-color: ${props => props.theme.colors.greyLightest};
  border: 1px solid ${props => props.theme.colors.greyLight};
  border-radius: ${props => props.theme.lengths.l1};
`;

const Action = styled.button`
  margin-top: ${props => props.theme.lengths.l1};
  margin-bottom: ${props => props.theme.lengths.l1};
  padding: ${props => props.theme.lengths.l2};
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.tealLight};
`;

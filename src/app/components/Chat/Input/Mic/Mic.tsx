import * as React from 'react';
import styled, { ThemedStyledProps } from 'styled-components';

import { requestSend } from '@/store/chat/actions';
import { IWindow } from '@/window';

interface IProps {
  requestSend: typeof requestSend;
}

export default class Mic extends React.Component<IProps> {
  public state = {
    listening: false,
  };

  public render() {
    const { listening } = this.state;

    return (
      <Button type="button" onClick={this.talk} listening={listening}>
        <Icon src="/img/icons/mic.svg" alt="speak" />
      </Button>
    );
  }

  private talk = () => {
    const { webkitSpeechRecognition }: IWindow = window as IWindow;
    if (!webkitSpeechRecognition) return;

    this.setState(state => ({ ...state, listening: true }));

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.start();
    recognition.onresult = (e: SpeechRecognitionEvent) => {
      this.setState(state => ({ ...state, listening: false }));
      if (!e.results[0] || !e.results[0][0]) return;
      this.props.requestSend(e.results[0][0].transcript);
    };
  };
}

type AllStyledProps = ThemedStyledProps<
  React.HTMLProps<HTMLDivElement>,
  any
> & {
  listening: boolean;
};

const Button = styled.button`
  position: absolute;
  right: ${(props: AllStyledProps) => props.theme.lengths.l2};
  bottom: ${(props: AllStyledProps) => props.theme.lengths.l1};
  background-color: ${(props: AllStyledProps) =>
    props.listening
      ? props.theme.colors.greyLight
      : props.theme.colors.transparent};
`;

const Icon = styled.img`
  width: ${props => props.theme.lengths.l6};
`;

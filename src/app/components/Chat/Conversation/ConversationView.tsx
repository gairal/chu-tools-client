import * as React from 'react';
import styled from 'styled-components';

import { loadChat } from '@/store/chat/actions';
import { IMessage } from '@/store/chat/types';
import { loadCommands } from '@/store/commands/actions';
import Help from './Help';
import Message from './Message';

interface IPropsFromState {
  dialog: IMessage[];
  errors?: string;
}
interface IPropsFromDispatch {
  loadChat: typeof loadChat;
  loadCommands: typeof loadCommands;
}

type AllProps = IPropsFromState & IPropsFromDispatch;

export default class ConversationView extends React.Component<AllProps> {
  private convo: React.RefObject<HTMLDivElement>;
  constructor(props: AllProps) {
    super(props);
    this.convo = React.createRef();
  }

  public componentWillMount() {
    this.props.loadChat();
    this.props.loadCommands();
  }

  public componentDidUpdate() {
    this.updated();
  }

  public render() {
    const { dialog } = this.props;
    return (
      <React.Fragment>
        <Help />
        <Dialog ref={this.convo}>
          <Spacer />
          <div>
            {dialog.map((message: IMessage) => (
              <Message key={message.id} {...message} />
            ))}
          </div>
        </Dialog>
      </React.Fragment>
    );
  }

  private updated = () => {
    // TODO: Create a component to download the image and exec a callback to scroll
    // Instead of using a inconsistent timeout
    const { dialog } = this.props;
    if (!dialog || !dialog.length) return;
    const lastMsg = dialog[dialog.length - 1];
    const timeout = lastMsg.isBot ? 1000 : 0;

    setTimeout(() => {
      this.scrollTop();
    }, timeout);
  };

  private scrollTop = () => {
    if (!this.convo.current) return;
    this.convo.current.scrollTop = this.convo.current.scrollHeight;
  };
}

const Dialog = styled.section`
  display: flex;
  flex-direction: column;
  height: ${props => props.theme.lengths.full};
  padding-right: ${props => props.theme.lengths.l4};
  padding-left: ${props => props.theme.lengths.l4};
  overflow-y: auto;
`;

const Spacer = styled.div`
  flex: 1;
`;

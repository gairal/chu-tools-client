import * as React from 'react';
import BarLoader from 'react-bar-loader';
import styled from 'styled-components';

import { requestSend } from '@/store/chat/actions';
import { IMessage } from '@/store/chat/types';
import Mic from './Mic';

interface IPropsFromState {
  dialog: IMessage[];
  loading: boolean;
}

interface IPropsFromDispatch {
  requestSend: typeof requestSend;
}

type AllProps = IPropsFromState & IPropsFromDispatch;

export default class Input extends React.Component<AllProps> {
  private query: React.RefObject<HTMLInputElement>;
  constructor(props: AllProps) {
    super(props);
    this.query = React.createRef();
  }

  public componentDidMount() {
    this.reset();
  }

  public render() {
    const { loading } = this.props;
    return (
      <Form>
        {loading ? <BarLoader /> : null}
        <TextInput
          ref={this.query}
          type="text"
          onKeyUp={this.keyPress}
          onChange={this.onChange}
          placeholder="Type something..."
        />
        <Mic requestSend={this.props.requestSend} />
      </Form>
    );
  }

  private reset = () => {
    this.query.current.value = '';
    this.query.current.dataset.id = '';
  };

  private chat = () => {
    this.props.requestSend(this.query.current.value);
    this.reset();
  };

  private navigate = (code: number) => {
    const { dialog } = this.props;
    const { id } = this.query.current.dataset;
    if (id === '' && code === 40) return;

    const userDialog = dialog.filter(d => !d.isBot);
    if (!userDialog.length) return;

    switch (code) {
      case 38:
        if (id === '0') return;
        if (id === '') {
          this.query.current.dataset.id = `${userDialog.length - 1}`;
        } else this.query.current.dataset.id = `${+id - 1}`;
        break;
      case 40:
        if (id === '') return;
        if (id === `${userDialog.length - 1}`) return this.reset();
        this.query.current.dataset.id = `${+id + 1}`;
        break;
      default:
        break;
    }
    this.query.current.value =
      userDialog[+this.query.current.dataset.id].content.text;
  };

  private onChange = () => {
    if (this.query.current.value === '') this.query.current.dataset.id = '';
  };

  private keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) this.chat();
    if (e.keyCode === 38 || e.keyCode === 40) this.navigate(e.keyCode);
  };
}

const Form = styled.form`
  position: fixed;
  right: ${props => props.theme.lengths.null};
  bottom: ${props => props.theme.lengths.null};
  left: ${props => props.theme.lengths.null};
  display: flex;
  flex-direction: column;
`;

const TextInput = styled.input`
  flex: 1 1 0%;
  height: ${props => props.theme.lengths.l16};
  padding-right: ${props => props.theme.lengths.l4};
  padding-left: ${props => props.theme.lengths.l4};
  overflow: hidden;
  font-size: ${props => props.theme.lengths.l6};
`;

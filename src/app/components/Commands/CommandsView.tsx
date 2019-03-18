import * as React from 'react';
import styled, { ThemedStyledProps } from 'styled-components';

import { loadCommands } from '@/store/commands/actions';
import { IQuery } from '@/store/commands/types';
import Command from './Command';

interface IProps {
  isOpened: boolean;
}

interface IPropsFromState {
  commands: IQuery[];
  errors?: string;
}

interface IPropsFromDispatch {
  loadCommands: typeof loadCommands;
}

type AllProps = IPropsFromState & IPropsFromDispatch & IProps;

export default class CommandsView extends React.Component<AllProps> {
  public componentWillMount() {
    this.props.loadCommands();
  }

  public render() {
    const { commands, isOpened } = this.props;
    return (
      <Commands isOpened={isOpened}>
        {commands.map((command: IQuery, i) => (
          <Command key={`${command.q}_${i}`} q={command.q} />
        ))}
      </Commands>
    );
  }
}

type AllStyledProps = ThemedStyledProps<
  React.HTMLProps<HTMLUListElement>,
  any
> & {
  isOpened: boolean;
};

const Commands = styled.ul`
  margin: 0;
  height: ${(props: AllStyledProps) => (props.isOpened ? '50vh' : '0')};
  overflow: ${(props: AllStyledProps) => (props.isOpened ? 'auto' : 'hidden')};
`;

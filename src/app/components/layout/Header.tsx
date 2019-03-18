import Commands from '@/components/Commands';
import * as React from 'react';
import styled from 'styled-components';

interface IHeaderProps {
  title: string;
  commandCounts: number;
}

interface IHeaderState {
  opened: boolean;
}

export default class Header extends React.Component<
  IHeaderProps,
  IHeaderState
> {
  constructor(props: IHeaderProps) {
    super(props);
    this.state = {
      opened: false,
    };
  }

  public toggle = (): void => {
    this.setState((prev: IHeaderState) => ({
      ...prev,
      opened: !prev.opened,
    }));
  };

  public render() {
    const { title, commandCounts } = this.props;
    const { opened } = this.state;
    return (
      <HeaderWrapper>
        <Commands isOpened={opened} />
        <HeaderHeader onClick={this.toggle}>
          <Title>{title}</Title>
          <span>{opened ? '▲' : '▼'}</span>
          <Badge>{commandCounts}</Badge>
        </HeaderHeader>
      </HeaderWrapper>
    );
  }
}

const Badge = styled.span`
  background-color: ${props => props.theme.colors.tealDarkest};
  color: ${props => props.theme.colors.white};
  border-radius: 50%;
  padding: ${props => props.theme.lengths.l2};
  font-size: ${props => props.theme.lengths.l2};
  height: ${props => props.theme.lengths.l7};
  width: ${props => props.theme.lengths.l7};
  text-align: center;
`;

const HeaderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  min-height: 3rem;
  width: ${props => props.theme.lengths.full};
`;

const HeaderWrapper = styled.div`
  position: fixed;
  top: ${props => props.theme.lengths.null};
  right: ${props => props.theme.lengths.null};
  left: ${props => props.theme.lengths.null};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: ${props => props.theme.lengths.l16};
  padding-left: ${props => props.theme.lengths.l16};
  background-color: ${props => props.theme.colors.greyLightest};
  border-bottom: solid 1px ${props => props.theme.colors.greyLight};
`;

const Title = styled.div`
  margin-right: ${props => props.theme.lengths.l4};
  font-weight: bold;
`;

import * as React from 'react';
import styled from 'styled-components';

interface IHeaderProps {
  title: string;
}

type AllProps = IHeaderProps;

const Header: React.SFC<AllProps> = ({ title }) => (
  <HeaderWrapper>
    <HeaderHeader>
      <Title>Tweet Factory - {title}</Title>
    </HeaderHeader>
  </HeaderWrapper>
);

export default Header;

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

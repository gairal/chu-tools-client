import * as React from 'react';
import styled from 'styled-components';

import Form from '@/components/Search/Form';
import Result from '@/components/Search/Result';
import { IConnectedReduxProps } from '@/store';

const SearchView: React.SFC<IConnectedReduxProps> = () => (
  <Search>
    <Form />
    <Result />
  </Search>
);

export default SearchView;

const Search = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: ${props => props.theme.lengths.full};
  padding-bottom: ${props => props.theme.lengths.l16};
`;

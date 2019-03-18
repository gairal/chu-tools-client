import * as React from 'react';
import styled from 'styled-components';

import { requestSend } from '@/store/search/actions';
import { ITweet } from '@/store/search/types';

interface IPropsFromState {
  tweets: ITweet[];
  loading: boolean;
}

interface IPropsFromDispatch {
  request: typeof requestSend;
}

type AllProps = IPropsFromState & IPropsFromDispatch;

const FormView: React.SFC<AllProps> = ({ request }) => {
  const [keyword, setKeyword] = React.useState('');

  // TODO: REMOVE
  React.useEffect(() => {
    request('group');
  }, [false]);

  const keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) request(keyword);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <Form>
      <Input
        onChange={handleKeywordChange}
        onKeyUp={keyPress}
        placeholder="keyword"
        type="text"
        value={keyword}
      />
    </Form>
  );
};

export default FormView;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.lengths.l4};
  border-bottom: ${props => `solid 1px ${props.theme.colors.greyLight}`};
`;

const Input = styled.input`
  padding: ${props => props.theme.lengths.l2};
  width: 100%;
`;

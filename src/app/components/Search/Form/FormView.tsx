import * as React from 'react';

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
    <form className="flex justify-between p-2 border-b">
      <input
        className="p-2 w-full"
        onChange={handleKeywordChange}
        onKeyUp={keyPress}
        placeholder="keyword"
        type="text"
        value={keyword}
      />
    </form>
  );
};

export default FormView;

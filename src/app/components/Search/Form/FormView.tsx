import moment from 'moment';
import * as React from 'react';

import CountInput from '@/components/Search/Form//CountInput';
import QueryInput from '@/components/Search/Form//QueryInput';
import SaveButton from '@/components/Search/Form//SaveButton';
import DatePicker from '@/components/Search/Form/DatePicker';
import { requestSend, saveSend } from '@/store/search/actions';
import { ITweet } from '@/store/search/types';

interface IPropsFromState {
  tweets: ITweet[];
  loading: boolean;
}

interface IPropsFromDispatch {
  request: typeof requestSend;
  save: typeof saveSend;
}

type AllProps = IPropsFromState & IPropsFromDispatch;

const FormView: React.SFC<AllProps> = ({ request, save, tweets, loading }) => {
  const [keyword, setKeyword] = React.useState('');
  const [start, setStart] = React.useState(moment().subtract(1, 'months'));
  const [end, setEnd] = React.useState(moment());
  const [count, setCount] = React.useState(50);

  const search = () => {
    request(keyword, start, end, count);
  };

  // TODO: REMOVE
  React.useEffect(() => {
    request('group');
  }, [false]);

  return (
    <form className="flex justify-between">
      <QueryInput
        loading={loading}
        search={search}
        setKeyword={setKeyword}
        keyword={keyword}
      />
      <DatePicker
        loading={loading}
        search={search}
        setStart={setStart}
        start={start}
        setEnd={setEnd}
        end={end}
      />
      <CountInput
        count={count}
        loading={loading}
        setCount={setCount}
        search={search}
      />
      <SaveButton loading={loading} save={save} tweets={tweets} />
    </form>
  );
};

export default FormView;

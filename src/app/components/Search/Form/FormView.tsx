import moment from 'moment';
import * as React from 'react';

import CountInput from '@/components/Search/Form/CountInput';
import DatePicker from '@/components/Search/Form/DatePicker';
import QueryInput from '@/components/Search/Form/QueryInput';
import { requestSend, tweetsFlush, tweetsLoad } from '@/store/tweet/actions';
import { ITweet } from '@/store/tweet/types';
import FlushCache from './FlushCache';

interface IPropsFromState {
  loading: boolean;
  tweets: ITweet[];
}

interface IPropsFromDispatch {
  flush: typeof tweetsFlush;
  load: typeof tweetsLoad;
  request: typeof requestSend;
}

type AllProps = IPropsFromState & IPropsFromDispatch;

const FormView: React.SFC<AllProps> = ({ request, loading, load, flush }) => {
  const [keyword, setKeyword] = React.useState('');
  const [start, setStart] = React.useState(moment().subtract(1, 'months'));
  const [end, setEnd] = React.useState(moment());
  const [count, setCount] = React.useState(50);
  const [isInit, setIsInit] = React.useState(false);

  const search = () => {
    request(keyword, start, end, count);
  };

  React.useEffect(() => {
    if (isInit) {
      search();
    }
  }, [count, start, end]);

  React.useEffect(() => {
    load();
    setIsInit(true);
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
        setStart={setStart}
        start={start}
        setEnd={setEnd}
        end={end}
      />
      <CountInput count={count} loading={loading} setCount={setCount} />
      <FlushCache flush={flush} />
    </form>
  );
};

export default FormView;

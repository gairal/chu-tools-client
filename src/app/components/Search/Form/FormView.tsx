import moment from 'moment';
import * as React from 'react';

import CountInput from '@/components/Search/Form/CountInput';
import DatePicker from '@/components/Search/Form/DatePicker';
import QueryInput from '@/components/Search/Form/QueryInput';
import { requestSend } from '@/store/tweet/actions';

interface IPropsFromState {
  loading: boolean;
}

interface IPropsFromDispatch {
  request: typeof requestSend;
}

type AllProps = IPropsFromState & IPropsFromDispatch;

const FormView: React.SFC<AllProps> = ({ request, loading }) => {
  const [keyword, setKeyword] = React.useState('');
  const [start, setStart] = React.useState(moment().subtract(1, 'months'));
  const [end, setEnd] = React.useState(moment());
  const [count, setCount] = React.useState(50);

  const search = () => {
    request(keyword, start, end, count);
  };

  React.useEffect(() => {
    request(keyword, start, end, count);
  }, [count, start, end]);

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
    </form>
  );
};

export default FormView;

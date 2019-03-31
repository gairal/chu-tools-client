import moment from 'moment';
import * as React from 'react';

import DatePicker from '@/components/Search/Form/DatePicker';
import QueryInput from '@/components/Search/Form/QueryInput';
import { postsFlush, postsLoad } from '@/store/post/actions';
import { IPost, PostType } from '@/store/types';
import FlushCache from './FlushCache';

interface IPropsFromState {
  loading: boolean;
  posts: IPost[];
}

interface IPropsFromDispatch {
  flush: typeof postsFlush;
  load: typeof postsLoad;
  request: (
    term: string,
    start: moment.Moment,
    end: moment.Moment,
    type: PostType,
  ) => void;
}

type AllProps = IPropsFromState & IPropsFromDispatch;

const FormView: React.SFC<AllProps> = ({ request, loading, load, flush }) => {
  const [keyword, setKeyword] = React.useState('');
  const [start, setStart] = React.useState(moment().subtract(5, 'days'));
  const [end, setEnd] = React.useState(moment());
  const [isInit, setIsInit] = React.useState(false);

  const search = () => {
    request(keyword, start, end, PostType.Twitter);
  };

  React.useEffect(() => {
    if (isInit) {
      search();
    }
  }, [start, end]);

  React.useEffect(() => {
    load();
    setIsInit(true);
  }, [false]);

  return (
    <form className="flex flex-col md:flex-row justify-between">
      <QueryInput
        loading={loading}
        search={search}
        setKeyword={setKeyword}
        keyword={keyword}
      />
      <div className="flex items-center justify-between">
        <DatePicker
          loading={loading}
          setStart={setStart}
          start={start}
          setEnd={setEnd}
          end={end}
        />
        <FlushCache flush={flush} />
      </div>
    </form>
  );
};

export default FormView;

import moment from 'moment';
import * as React from 'react';
import Switch from 'react-switch';

import DatePicker from '@/components/Search/Form/DatePicker';
import QueryInput from '@/components/Search/Form/QueryInput';
import { postsFlush, postsLoad } from '@/store/post/actions';
import { ISearchParams } from '@/store/post/types';
import { IPost, PostType } from '@/store/types';
import FlushCache from './FlushCache';

interface IPropsFromState {
  loading: boolean;
  posts: IPost[];
  currentSearch: ISearchParams;
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

const uncheckedIcon: JSX.Element = (
  <i className="fab fa-reddit text-white h-full flex justify-center items-center" />
);
const checkedIcon: JSX.Element = (
  <i className="fab fa-twitter text-white h-full flex justify-center items-center" />
);

const FormView: React.SFC<AllProps> = ({
  request,
  loading,
  load,
  flush,
  currentSearch,
}) => {
  const didLoadRef = React.useRef(false);
  const [keyword, setKeyword] = React.useState('');
  const [start, setStart] = React.useState(moment().subtract(5, 'days'));
  const [end, setEnd] = React.useState(moment());
  const [isTwitter, setIsTwitter] = React.useState(true);
  // const [isInit, setIsInit] = React.useState(false);

  const search = () => {
    request(
      keyword,
      start,
      end,
      isTwitter ? PostType.Twitter : PostType.Reddit,
    );
  };

  React.useEffect(() => {
    if (didLoadRef.current) {
      search();
    }
  }, [start, end, isTwitter]);

  // Set saved search params
  React.useEffect(() => {
    if (currentSearch && currentSearch.q) {
      setKeyword(currentSearch.q);
      setIsTwitter(currentSearch.type === PostType.Twitter);
    }
  }, [didLoadRef.current]);

  // Loads localStorage results
  React.useEffect(() => {
    load();
    didLoadRef.current = true;
  }, []);

  const handleTypeSwitch = (checked: boolean) => {
    setIsTwitter(checked);
  };

  return (
    <form className="flex flex-col md:flex-row justify-between">
      <QueryInput
        loading={loading}
        search={search}
        setKeyword={setKeyword}
        keyword={keyword}
      />
      <div className="flex items-center mr-2">
        <Switch
          onChange={handleTypeSwitch}
          checked={isTwitter}
          uncheckedIcon={uncheckedIcon}
          checkedIcon={checkedIcon}
        />
      </div>
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

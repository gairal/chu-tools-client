import moment from 'moment';
import * as React from 'react';
import Switch from 'react-switch';

import DatePicker from '@/components/Search/Form/DatePicker';
import QueryInput from '@/components/Search/Form/QueryInput';
import { postsFlush } from '@/store/post/actions';
import { ISearchParams } from '@/store/post/types';
import { IPost, PostType } from '@/store/types';
import FlushCache from './FlushCache';

interface IPropsFromState {
  currentSearch: ISearchParams;
  hasLoaded: boolean;
  loading: boolean;
  posts: IPost[];
}

interface IPropsFromDispatch {
  flush: typeof postsFlush;
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
  hasLoaded,
  request,
  loading,
  flush,
  currentSearch,
}) => {
  const [isInit, setIsInit] = React.useState(false);
  const [keyword, setKeyword] = React.useState('');
  const [start, setStart] = React.useState(moment().subtract(5, 'days'));
  const [end, setEnd] = React.useState(moment());
  const [isTwitter, setIsTwitter] = React.useState(true);

  const search = () => {
    request(
      keyword,
      start,
      end,
      isTwitter ? PostType.Twitter : PostType.Reddit,
    );
  };

  React.useEffect(() => {
    if (hasLoaded && isInit) {
      search();
    }
  }, [start, end, isTwitter]);

  // Set saved search params
  React.useEffect(() => {
    if (hasLoaded) {
      const { q = '', type = PostType.Twitter } = currentSearch || {};
      setKeyword(q);
      setIsTwitter(type === PostType.Twitter);
      setTimeout(() => {
        setIsInit(true);
      }, 100);
    }
  }, [hasLoaded]);

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
      <div className="flex items-center justify-between">
        <Switch
          className="mr-2"
          onChange={handleTypeSwitch}
          checked={isTwitter}
          uncheckedIcon={uncheckedIcon}
          checkedIcon={checkedIcon}
        />
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

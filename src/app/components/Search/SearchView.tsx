import * as React from 'react';

import Result from '@/components/Search/Result';
import { IConnectedReduxProps } from '@/store';

interface IPropsFromDispatch {
  init: () => void;
}

type AllProps = IConnectedReduxProps & IPropsFromDispatch;

const SearchView: React.SFC<AllProps> = ({ init }) => {
  React.useEffect(() => {
    init();
  }, []);

  return (
    <div className="flex flex-1 flex-col h-full">
      <Result />
    </div>
  );
};

export default SearchView;

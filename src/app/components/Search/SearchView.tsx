import * as React from 'react';

import Result from '@/components/Search/Result';
import { IConnectedReduxProps } from '@/store';
import { requestSheets } from '@/store/sheet/actions';

interface IPropsFromDispatch {
  getSheets: typeof requestSheets;
}

type AllProps = IConnectedReduxProps & IPropsFromDispatch;

const SearchView: React.SFC<AllProps> = ({ getSheets }) => {
  React.useEffect(() => {
    getSheets();
  }, [false]);

  return (
    <div className="flex flex-1 flex-col h-full">
      <Result />
    </div>
  );
};

export default SearchView;

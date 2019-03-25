import * as React from 'react';

import Result from '@/components/Search/Result';
import { IConnectedReduxProps } from '@/store';
import { requestCategories } from '@/store/category/actions';
import { requestSheets } from '@/store/sheet/actions';

interface IPropsFromDispatch {
  getSheets: typeof requestSheets;
  getCategories: typeof requestCategories;
}

type AllProps = IConnectedReduxProps & IPropsFromDispatch;

const SearchView: React.SFC<AllProps> = ({ getSheets, getCategories }) => {
  React.useEffect(() => {
    getSheets();
    getCategories();
  }, [false]);

  return (
    <div className="flex flex-1 flex-col h-full">
      <Result />
    </div>
  );
};

export default SearchView;

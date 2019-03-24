import * as React from 'react';

import Result from '@/components/Search/Result';
import { IConnectedReduxProps } from '@/store';

const SearchView: React.SFC<IConnectedReduxProps> = () => (
  <div className="flex flex-1 flex-col h-full">
    <Result />
  </div>
);

export default SearchView;

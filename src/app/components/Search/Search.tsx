import * as React from 'react';

import Form from '@/components/Search/Form';
import Result from '@/components/Search/Result';
import { IConnectedReduxProps } from '@/store';

const SearchView: React.SFC<IConnectedReduxProps> = () => (
  <div className="flex flex-1 flex-col h-full pb-16">
    <Form />
    <Result />
  </div>
);

export default SearchView;

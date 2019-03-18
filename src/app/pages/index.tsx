import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import Search from '@/components/Search';
import { IConnectedReduxProps } from '@/store';

type AllProps = RouteComponentProps<{}> & IConnectedReduxProps;

const SearchPage: React.SFC<AllProps> = ({ match }) => (
  <Switch>
    <Route exact={true} path={`${match.path}/`} component={Search} />
  </Switch>
);

export default SearchPage;

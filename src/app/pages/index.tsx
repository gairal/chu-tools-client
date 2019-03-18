import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import Chat from '@/components/Chat';
import { IConnectedReduxProps } from '@/store';

type AllProps = RouteComponentProps<{}> & IConnectedReduxProps;

const ChatPage: React.SFC<AllProps> = ({ match }) => (
  <Switch>
    <Route exact={true} path={`${match.path}/`} component={Chat} />
  </Switch>
);

export default ChatPage;

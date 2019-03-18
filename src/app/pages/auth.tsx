import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Auth from '@/components/Auth';
import { IConnectedReduxProps } from '@/store';

type AllProps = RouteComponentProps<{}> & IConnectedReduxProps;

const AuthPage: React.SFC<AllProps> = () => <Auth />;

export default AuthPage;

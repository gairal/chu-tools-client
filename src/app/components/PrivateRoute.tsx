import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';

import { IApplicationState } from '@/store';

interface IPropsFromState {
  idToken: string;
  isAuthenticated: boolean;
}

type AllProps = IPropsFromState & RouteProps;
const PrivateRoute: React.StatelessComponent<AllProps> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  const renderComponent = (props: any) =>
    isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/auth',
          state: { from: props.location },
        }}
      />
    );

  return <Route {...rest} render={renderComponent} />;
};

const mapStateToProps = ({ firebase }: IApplicationState) => ({
  idToken: firebase.idToken,
  isAuthenticated: firebase.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import PrivateRoute from '@/components/PrivateRoute';
import NotFound from '@/pages/notFound';
import routes from '@/routes';

const RoutesContainer: React.SFC = () => {
  return (
    <RoutesWrapper>
      <Switch>
        {routes.map(route => {
          return route.private ? (
            <PrivateRoute key={route.props.path} {...route.props} />
          ) : (
            <Route key={route.props.path} {...route.props} />
          );
        })}
        <Route component={NotFound} />
      </Switch>
    </RoutesWrapper>
  );
};

const RoutesWrapper = styled.div`
  height: ${props => props.theme.lengths.full};
  padding-top: ${props => props.theme.lengths.header};
`;

export default RoutesContainer;

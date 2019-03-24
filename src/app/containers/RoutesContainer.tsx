import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '@/components/PrivateRoute';
import NotFound from '@/pages/notFound';
import routes from '@/routes';

const RoutesContainer: React.SFC = () => {
  return (
    <div className="content">
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
    </div>
  );
};

export default RoutesContainer;

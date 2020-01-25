import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '@/components/PrivateRoute';
import NotFound from '@/pages/notFound';
import routes from '@/routes';

const RoutesContainer: React.SFC = () => (
  <div className="content flex justify-center items-center">
    <Switch>
      {routes.map(({ props, isPrivate }) => {
        const routeProps = {
          ...props,
          key: props.path,
        };

        return isPrivate ? (
          <PrivateRoute {...routeProps} />
        ) : (
          <Route {...routeProps} />
        );
      })}
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default RoutesContainer;

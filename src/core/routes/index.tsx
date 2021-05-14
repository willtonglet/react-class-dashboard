import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { routes } from "./routes";

const Routes = () => {
  return (
    <Switch>
      {routes.map((route, index) =>
        route.redirect ? (
          <Route key={index} exact={route.exact} path={route.path}>
            <Redirect to={route.to} />
          </Route>
        ) : (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        )
      )}
    </Switch>
  );
};

export default Routes;

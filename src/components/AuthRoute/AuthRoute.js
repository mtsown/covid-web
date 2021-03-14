import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function AuthRoute({ component: Component, ...rest }) {
  const token = localStorage.getItem('userToken');

  return (
    <Route
      {...rest}
      render={() => (token === null ? <Component /> : <Redirect to="/" />)}
    />
  );
}

export default AuthRoute;

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  const token = localStorage.getItem('userToken');

  return (
    <Route
      {...rest}
      render={(props) => (token !== null ? <Component countryId={props.match.params.id} /> : <Redirect to="/login" />)}
    />
  );
}

export default PrivateRoute;
//Create a protected route for your friends list. Remember, if the user isn't logged in, navigating to this protected route will redirect them to the login page.

import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = window.localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (token) {
          return <Component {...props} />;
        } else {
          return <Redirect to='/login' />;
        }
      }}
    />
  );
};

export default PrivateRoute;

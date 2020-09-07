import React from "react";
import { Redirect, Route } from "react-router-dom";
// import auth from "../Pages/Login";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        sessionStorage.getItem("token") ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

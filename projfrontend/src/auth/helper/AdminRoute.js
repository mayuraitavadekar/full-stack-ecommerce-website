import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().user.role === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;

/* 
we have already seen during design of base component 
when we use children, we can render multiple components

we are replacing the children with component : component
    
*/

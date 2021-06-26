import React from "react";

import { Redirect, Route } from "react-router-dom";

const PrivateRoute = props => {
  const accessToken = localStorage.getItem("accessToken")

  return accessToken === null && accessToken === "" ? <Redirect to="/login"></Redirect> : <Route {...props}>{props.children}</Route>
};

export default PrivateRoute;
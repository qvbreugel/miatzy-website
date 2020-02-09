import React, { useContext } from "react";
import UserContext from "../UserContext";
import { Redirect } from "react-router-dom";

const PrivateRoute = props => {
  const userContext = useContext(UserContext);
  console.log(userContext.user.access_id);
  if (userContext.user.access_id > 0) {
    return props.children;
  } else return <Redirect to="/" exact />;
};

export default PrivateRoute;

import React from "react";
import { Link } from "react-router-dom";

const Expired = () => {
  return (
    <h2>
      Your session has expired. Please <Link to="/">Login again</Link>
    </h2>
  );
};

export default Expired;

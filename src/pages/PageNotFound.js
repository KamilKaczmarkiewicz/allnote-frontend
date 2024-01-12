import React from "react";
import { Link } from "react-router-dom";
import { HOME_PATH } from "../data/Constants";

const PageNotFound = () => {
  return (
    <>
      <div className="container text-center">
        <h1>Page not found</h1>
        <Link to={HOME_PATH}> <h2>HOME</h2></Link>
      </div>
    </>
  );
};

export default PageNotFound;

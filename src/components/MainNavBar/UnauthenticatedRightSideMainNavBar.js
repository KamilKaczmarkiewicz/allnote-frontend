import React from "react";
import { Link } from "react-router-dom";
import { LOGIN_PATH } from "../../data/Constants";
import "./MainNavBar.css";

const UnauthenticatedRightSideMainNavBar = () => {
  return (
    <Link to={LOGIN_PATH}>
      <button type="button" className="btn btn-primary">
        Login
      </button>
    </Link>
  );
};

export default UnauthenticatedRightSideMainNavBar;

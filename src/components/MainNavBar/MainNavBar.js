import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HOME_PATH } from "../../data/Constants";
import logo from "../../assets/WhiteAllNoteLogo.png";
import { useAuth } from "../../context/AuthContext";
import AuthenticatedRightSideMainNavBar from "./AuthenticatedRightSideMainNavBar";
import UnauthenticatedRightSideMainNavBar from "./UnauthenticatedRightSideMainNavBar";
import "./MainNavBar.css";

const MainNavBar = () => {
  const { isUserAuthenticated } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    console.log("use effect of navbar");
    setIsAuthenticated(isUserAuthenticated());
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-color">
      <div className="container">
        <Link to={HOME_PATH}>
          <img src={logo} width="120" height="35" alt="Your Logo" />
        </Link>

        <div className="justify-content-end">
          {isAuthenticated ? (
            <AuthenticatedRightSideMainNavBar />
          ) : (
            <UnauthenticatedRightSideMainNavBar />
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNavBar;

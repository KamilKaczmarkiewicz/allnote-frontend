import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainNavBar from "../components/MainNavBar/MainNavBar";
import MainFooter from "../components/Footer/MainFooter";
import LoginForm from "../components/LoginPage/LoginForm";
import ForgotPasswordForm from "../components/LoginPage/ForgotPasswordForm";
import RegisterForm from "../components/LoginPage/RegisterForm";

const LoginPage = () => {
  const location = useLocation();

  const [locationFormType, setLocationFormType] = useState("login");

  useEffect(() => {
    const hash = location.hash.substring(1);
    if (hash === "register" || hash === "forgot-password") {
      setLocationFormType(hash);
    } else {
      setLocationFormType("login");
    }
  }, [location]);

  const handleRegisterClick = () => {
    window.location.hash = `#register`;
  };

  const handleLoginClick = () => {
    window.location.hash = `#login`;
  };

  const handleForgotPasswordClick = () => {
    window.location.hash = `#forgot-password`;
  };

  let formComponent;
  switch (locationFormType) {
    case "login":
      formComponent = <LoginForm />;
      break;
    case "register":
      formComponent = <RegisterForm />;
      break;
    case "forgot-password":
      formComponent = <ForgotPasswordForm />;
      break;
    default:
      formComponent = <LoginForm />;
  }

  return (
    <>
      <MainNavBar />
      <div className="container">
        {formComponent}
        <div className="mt-3">
          {locationFormType !== "login" && (
            <button className="btn btn-link" onClick={handleLoginClick}>
              Login
            </button>
          )}
          {locationFormType !== "register" && (
            <button className="btn btn-link" onClick={handleRegisterClick}>
              Register
            </button>
          )}
          {locationFormType !== "forgot-password" && (
            <button
              className="btn btn-link"
              onClick={handleForgotPasswordClick}
            >
              Forgot Password
            </button>
          )}
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default LoginPage;

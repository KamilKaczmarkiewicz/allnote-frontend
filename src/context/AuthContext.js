import React, { useContext } from "react";
import {
  auth_login,
  auth_forgotPassword,
  auth_register,
} from "../actions/auth";
import { useNavigate } from "react-router-dom";
import {
  LOGIN_PATH,
  AFTER_LOGIN_HOME_PATH,
  HOME_PATH,
} from "../data/Constants";
import { isStatusFromResponse2XX } from "../utils/utils";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  async function login(loginForm) {
    const response = await auth_login(loginForm);
    if (isStatusFromResponse2XX(response)) {
      setTokens(response?.data.access_token, response?.data.refresh_token);
      navigate(AFTER_LOGIN_HOME_PATH);
      return response;
    } else {
      return response;
    }
  }

  function logout() {
    clearAuthenticationInfo();
    navigate(LOGIN_PATH);
  }

  async function register(form) {
    const response = await auth_register(form);
    if (isStatusFromResponse2XX(response)) {
      setTokens(response?.data.access_token, response?.data.refresh_token);
      navigate(AFTER_LOGIN_HOME_PATH);
      return response;
    } else {
      return response;
    }
  }

  async function resetPassword(username) {
    await auth_forgotPassword(username);
  }

  function requireAuthenticated() {
    console.log("requireAuthenticated start");
    if (!isUserAuthenticated()) {
      console.log("requireAuthenticated navigate home");
      navigate(HOME_PATH);
      return false;
    }
    return true;
  }

  function isUserAuthenticated() {
    console.log("isUserAuthenticated start");
    const token = localStorage.getItem("access_token");
    console.log(`tokens: ${token}`);
    if (!token) {
      console.log("false");
      return false;
    }
    try {
      return setAuthenticaionInfoFromToken(token);
    } catch (error) {
      clearAuthenticationInfo();
      console.error("Error decoding or validating token:", error);
      return false;
    }
  }

  function getCurrentUserId() {
    const token = getAccessToken();
    if (token === null) return null;
    const decodedToken = decodeToken(token);
    const userId = decodedToken.userId;
    return userId;
  }

  function getCurrentUserName() {
    const token = getAccessToken();
    if (token === null) return null;
    const decodedToken = decodeToken(token);
    const username = decodedToken.sub;
    return username;
  }

  function getAccessToken() {
    return localStorage.getItem("access_token");
  }

  function decodeToken(token) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  function setTokens(access_token, refresh_token) {
    console.log(`set tokens: ${access_token} ${refresh_token}`);
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    setAuthenticaionInfoFromToken(access_token);
  }

  function setAuthenticaionInfoFromToken(token) {
    const decodedToken = decodeToken(token);
    const isTokenExpired = Date.now() >= decodedToken.exp * 1000;
    if (!isTokenExpired) {
      return true;
    } else {
      clearAuthenticationInfo();
      return false;
    }
  }

  function clearTokens() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  function clearAuthenticationInfo() {
    clearTokens();
  }

  const value = {
    getCurrentUserId,
    getCurrentUserName,
    login,
    register,
    resetPassword,
    logout,
    isUserAuthenticated,
    requireAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

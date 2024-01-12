import axios from "axios";
import { BACKEND_URL } from "../data/Constants";

export async function auth_login(loginForm) {
  console.log("auth_login");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(loginForm);

  try {
    return await axios.post(`${BACKEND_URL}/api/auth/token`, body, config);
  } catch (err) {
    console.log("err");
    console.log(err);
    return err;
  }
}

export async function auth_register(form) {
  console.log("auth_login");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(form);

  try {
    return await axios.post(`${BACKEND_URL}/api/auth/register`, body, config);
  } catch (err) {
    console.log("err");
    console.log(err);
    return err;
  }
}

export async function auth_forgotPassword(username) {
  console.log("auth_forgotPassword");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    return await axios.post(
      `${BACKEND_URL}/api/auth/users/${username}/forgot-password`,
      config
    );
  } catch (err) {
    console.log(err);
    return err;
  }
}

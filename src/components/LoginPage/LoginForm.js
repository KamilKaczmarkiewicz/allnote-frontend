import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getErrorFromResponse } from "../../utils/utils";
import ErrorMessage from "../Components/ErrorMessage";

const LoginForm = () => {
  const { login } = useAuth();
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [displayError, setDispalyError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await login(loginForm);
    setDispalyError(getErrorFromResponse(result));
  }

  const handleChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            required
            onChange={handleChange}
          />
        </div>
        {displayError && <ErrorMessage message={displayError} />}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default LoginForm;

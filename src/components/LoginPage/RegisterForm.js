import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getErrorFromResponse } from "../../utils/utils";
import ErrorMessage from "../Components/ErrorMessage";

const RegisterForm = () => {
  const { register } = useAuth();
  const [displayError, setDispalyError] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    birthDate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(form);
    setDispalyError(getErrorFromResponse(result));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            required
            onChange={handleChange}
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="birthDate">Birth Date</label>
          <input
            type="date"
            className="form-control"
            id="birthDate"
            name="birthDate"
            required
            onChange={handleChange}
          />
        </div>
        {displayError && <ErrorMessage message={displayError} />}
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;

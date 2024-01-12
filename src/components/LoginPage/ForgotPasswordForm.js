import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import SuccessMessage from "../Components/SuccessMessage";

const ForgotPasswordForm = ({ onSubmit }) => {
  const { resetPassword } = useAuth();
  const [username, setUserName] = useState("");
  const [displayMessage, setDispalyMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(username);
    setDispalyMessage(
      "Success! The login credentials associated with the provided username have been sent to the email address linked to this account. Please check your inbox for further instructions."
    );
  };

  return (
    <>
      <h2>Reset password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">UserName</label>
          <input
            type="username"
            className="form-control"
            id="username"
            value={username}
            required
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        {displayMessage && <SuccessMessage message={displayMessage} />}
        <button type="submit" className="btn btn-primary">
          Reset Password
        </button>
      </form>
    </>
  );
};

export default ForgotPasswordForm;

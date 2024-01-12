// ChangePasswordForm.js
import React, { useState } from "react";

const ChangePasswordForm = ({ onClose, onSave }) => {
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordRepeated: "",
  });

  const handleSave = () => {
    if (
      passwordForm.oldPassword !== "" &&
      passwordForm.newPassword !== "" &&
      passwordForm.newPasswordRepeated !== ""
    ) {
      onSave(passwordForm);
    }
  };

  return (
    <div className="change-password-form">
      <h3>Change Password</h3>
      <form>
        {/* Password input fields */}
        <div className="mb-3">
          <label htmlFor="oldPassword" className="form-label">
            Old Password
          </label>
          <input
            type="password"
            className="form-control"
            id="oldPassword"
            name="oldPassword"
            value={passwordForm.oldPassword}
            onChange={(e) =>
              setPasswordForm((prevData) => ({
                ...prevData,
                oldPassword: e.target.value,
              }))
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            name="newPassword"
            value={passwordForm.newPassword}
            onChange={(e) =>
              setPasswordForm((prevData) => ({
                ...prevData,
                newPassword: e.target.value,
              }))
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPasswordRepeated" className="form-label">
            Repeat New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="newPasswordRepeated"
            name="newPasswordRepeated"
            value={passwordForm.newPasswordRepeated}
            onChange={(e) =>
              setPasswordForm((prevData) => ({
                ...prevData,
                newPasswordRepeated: e.target.value,
              }))
            }
          />
        </div>
      </form>
      <div className="text-center mt-3">
        <button className="btn btn-secondary mr-2" onClick={onClose}>
          Close
        </button>
        <button
          className="btn btn-primary"
          onClick={(event) => {
            event.preventDefault();
            handleSave();
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordForm;

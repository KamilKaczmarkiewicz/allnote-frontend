import React, { useEffect, useRef, useState } from "react";
import {
  user_getUserByUsername,
  user_getUserProfilePicture,
  user_uploadProfilePicture,
  user_updateUserProfile,
  user_changePassword,
} from "../../actions/user";
import { getErrorFromResponse } from "../../utils/utils";
import { useParams } from "react-router-dom";
import SuccessMessage from "../Components/SuccessMessage";
import ErrorMessage from "../Components/ErrorMessage";

import ChangePasswordForm from "./ChangePasswordForm";

const ViewUserProfileContainer = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [userProfilePicture, setUserProfilePicture] = useState(null);
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
  });
  const fileInputRef = useRef(null);
  const [displayError, setDispalyError] = useState(false);
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);

  useEffect(() => {
    console.log("user profile page");
    const fetchUserData = async () => {
      try {
        console.log("get user ");
        const userData = await user_getUserByUsername(username);
        console.log(userData);
        setUser(userData.data);
        console.log(`user: ${user}`);
        const userPicture = await user_getUserProfilePicture(userData.data.id);
        console.log(userPicture);
        const imageBlob = new Blob([userPicture.data], { type: "image/png" });
        const imageUrl = URL.createObjectURL(imageBlob);
        setFormData({
          firstName: userData.data.firstName,
          lastName: userData.data.lastName,
          birthDate: userData.data.birthDate,
          email: userData.data.email,
        });
        setUserProfilePicture(imageUrl);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handlePictureUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", newProfilePicture);

      const result = await user_uploadProfilePicture(user.id, formData);
      setNewProfilePicture(null);
      return result;
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let pictureStatusError = false;
    if (newProfilePicture !== null) {
      const pictureresult = await handlePictureUpload();
      pictureStatusError = getErrorFromResponse(pictureresult);
    }
    try {
      const profileResult = await user_updateUserProfile(user.id, formData);
      const profileStatusError = getErrorFromResponse(profileResult);
      setDisplaySuccessMessage(null);
      setDispalyError(null);
      if (pictureStatusError === false && profileStatusError === false) {
        setDisplaySuccessMessage("Profile changes successfully saved!");
      } else if (pictureStatusError !== false && profileStatusError === false){
        setDispalyError(pictureStatusError);
      } else if (pictureStatusError === false && profileStatusError !== false){
        setDispalyError(profileStatusError);
        if(profileStatusError === ""){
          setDispalyError("Something went wrong!");
        }
      } else {
        setDispalyError(profileStatusError + " " + pictureStatusError);
      }
      setShowPasswordForm(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setNewProfilePicture(file);
    const imageUrl = URL.createObjectURL(file);
    setUserProfilePicture(imageUrl);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangePassword = async (form) => {
    // Call your function with passwordForm
      setDispalyError(false);
      setDisplaySuccessMessage(false);
    const result = await user_changePassword(user.id, form);
    const error = getErrorFromResponse(result);
    if(error === false){
      setShowPasswordForm(false);
    } else{
      setDispalyError(error);
    }
  }

  return (
    <>
      <div className="container mt-5">
        {user ? (
          <div>
            <div className="text-center mt-3">
              <h2>{user.username}</h2>
              <hr />
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="row">
                <div
                  className="col-md-4"
                  onClick={() => fileInputRef.current.click()}
                >
                  <label htmlFor="fileInput2">
                    <img
                      src={userProfilePicture}
                      alt="User"
                      className="img-fluid rounded-circle"
                    />
                    <input
                      type="file"
                      id="fileInput"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <div className="col-md-8">
                  <label className="user-profile-form-lable">
                    First Name:
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="user-profile-form-lable">
                    Last Name:
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="user-profile-form-lable">
                    Birth Date:
                    <input
                      type="text"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="user-profile-form-lable">
                    Email:
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </label>
                  <hr />
                  <div className="text-center mt-3">
                  <button
              className="btn btn-primary btn-margin"
              onClick={(event) => {console.log("heheh");event.preventDefault();setShowPasswordForm(true)}}
            >
              Change password
            </button>

            {showPasswordForm && (
              <ChangePasswordForm
                onClose={() => setShowPasswordForm(false)}
                onSave={(passwordForm) => {
                  handleChangePassword(passwordForm);
                }}
              />
            )}
                  </div>
                </div>
              </div>
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-primary btn-margin">
                  Save changes
                </button>
              </div>
            </form>
        {displayError && <ErrorMessage message={displayError} />}
        {displaySuccessMessage && <SuccessMessage message={displaySuccessMessage} />}

          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default ViewUserProfileContainer;

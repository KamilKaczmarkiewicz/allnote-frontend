import axios from "axios";
import { BACKEND_URL } from "../data/Constants";

export async function user_getUserById(userId) {
  console.log("kams getUserById");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };

  try {
    return await axios.get(`${BACKEND_URL}/api/users/id/${userId}`, config);
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function user_getUserByUsername(username) {
  console.log("kams getUserByUsername");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };

  try {
    return await axios.get(
      `${BACKEND_URL}/api/users/username/${username}`,
      config
    );
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function user_getLogedInUser() {
  console.log("kams get logedin user");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };

  try {
    return await axios.get(`${BACKEND_URL}/api/user`, config);
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function user_getUserProfilePicture(userId) {
  console.log("kams user_getUserProfilePicture");
  const config = {
    responseType: "arraybuffer",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };

  try {
    return await axios.get(
      `${BACKEND_URL}/api/users/${userId}/profile-picture`,
      config
    );
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function user_uploadProfilePicture(userId, picture) {
  console.log("kams user_uploadProfilePicture");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };

  try {
    return await axios.put(
      `${BACKEND_URL}/api/users/${userId}/profile-picture`,
      picture,
      config
    );
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function user_updateUserProfile(userId, form) {
  console.log("kams user_updateUserProfile");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };
  const body = JSON.stringify(form);

  try {
    return await axios.put(`${BACKEND_URL}/api/users/${userId}`, body, config);
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function user_changePassword(userId, form) {
  console.log("kams user_changePassword");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };
  const body = JSON.stringify(form);

  try {
    return await axios.put(`${BACKEND_URL}/api/users/${userId}/change-password`, body, config);
  } catch (err) {
    console.log(err);
    return err;
  }
}

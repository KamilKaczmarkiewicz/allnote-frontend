import axios from "axios";
import { BACKEND_URL } from "../data/Constants";

export async function notes_getNote(noteId) {
  console.log("kams get note");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };

  try {
    return await axios.get(`${BACKEND_URL}/api/notes/${noteId}`, config);
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function notes_getUserNotes(userId) {
  console.log("kams getUserNotes");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };

  try {
    return await axios.get(
      `${BACKEND_URL}/api/users/${userId}/notes?size=10`,
      config
    );
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function notes_postNote(body, userId) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };

  try {
    return await axios.post(
      `${BACKEND_URL}/api/users/${userId}/notes`,
      body,
      config
    );
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function notes_putNote(body, noteId) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };

  try {
    return await axios.put(`${BACKEND_URL}/api/notes/${noteId}`, body, config);
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function notes_deleteNote(noteId) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };

  try {
    return await axios.delete(`${BACKEND_URL}/api/notes/${noteId}`, config);
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function notes_addTagToNote(noteId, tagId) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };
  const body = {};
  try {
    return await axios.put(
      `${BACKEND_URL}/api/notes/${noteId}/tags/${tagId}`,
      body,
      config
    );
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function notes_deleteTagFromNote(noteId, tagId) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };

  try {
    return await axios.delete(
      `${BACKEND_URL}/api/notes/${noteId}/tags/${tagId}`,
      config
    );
  } catch (err) {
    console.log(err);
    return err;
  }
}

import React, { useState } from "react";
import { notes_postNote } from "../../actions/note";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { NOTES_LIST_PATH } from "../../data/Constants";
import TextEditor from "./TextEditor";

const CreateNotePageContainer = () => {
  const navigate = useNavigate();
  const { getCurrentUserId } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("helllo heh");
    console.log(formData);
    console.log(document.getElementsByClassName("ql-editor")[0])
    console.log(document.getElementsByClassName("ql-editor")[0].innerHTML)
    notes_postNote(formData, getCurrentUserId());
    navigate(NOTES_LIST_PATH);
  };

  // todo trzeba przeslac getcontent, gettext i samemu chyba pobrac html z pliku
  const handleContentChange = (content) => {
    setFormData((prevData) => ({
      ...prevData,
      content: document.getElementsByClassName("ql-editor")[0].innerHTML,
    }));
  };

  return (
    <div className="container create-note-container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="summary" className="form-label">
            Summary
          </label>
          <input
            type="text"
            className="form-control"
            id="summary"
            name="summary"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
        <TextEditor content={""} onContentChange={handleContentChange}/>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateNotePageContainer;

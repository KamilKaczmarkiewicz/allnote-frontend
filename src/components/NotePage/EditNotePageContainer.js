import React, { useEffect, useState } from "react";
import { notes_putNote } from "../../actions/note";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { NOTES_LIST_PATH } from "../../data/Constants";
import { notes_getNote } from "../../actions/note";
import TextEditor from "./TextEditor";

const EditNotePageContainer = () => {
  const navigate = useNavigate();
  const { getCurrentUserId } = useAuth();

  const { noteId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
  });
  const [note, setNote] = useState(null);

  
  useEffect(() => {
    requestNote();
  }, []);

  async function requestNote() {
    const response = await notes_getNote(noteId);
    setNote(response?.data);
    setFormData({
      title: response.data.title,
      summary: response.data.summary,
      content: response.data.content,
    })
    console.log(response)
  }

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
    notes_putNote(formData, noteId);
    navigate(NOTES_LIST_PATH);
  };

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
            value={formData.title}
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
            value={formData.summary}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
        <TextEditor content={formData.content} onContentChange={handleContentChange}/>
        </div>
        <button type="submit" className="btn btn-primary">
          Save changes
        </button>
      </form>
    </div>
  );
};

export default EditNotePageContainer;

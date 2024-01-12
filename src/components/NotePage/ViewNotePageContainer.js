import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  notes_addTagToNote,
  notes_deleteNote,
  notes_deleteTagFromNote,
  notes_getNote,
} from "../../actions/note";
import "./kams.css";
import { EDIT_NOTE_PATH, NOTES_LIST_PATH } from "../../data/Constants";
import Tag from "./Tag/Tag";
import { isStatusFromResponse2XX } from "../../utils/utils";

const ViewNotePageContainer = () => {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const [note, setNote] = useState(null);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    requestNote();
  }, []);

  useEffect(() => {
    if (note && note.content)
      document.getElementsByClassName("note-content")[0].innerHTML =
        note.content;
  }, [note]);

  async function requestNote() {
    const response = await notes_getNote(noteId);
    setNote(response?.data);
  }

  const handleDeleteNoteButtonClick = () => {
    notes_deleteNote(note.id);
    navigate(NOTES_LIST_PATH);
  };

  const handleEditNoteButtonClick = () => {
    navigate(`${EDIT_NOTE_PATH.replace(":noteId", note.id)}`);
    //`${EDIT_NOTE_PATH.replace(":noteId", note.id)}`   EDIT_NOTE_PATH
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleRemoveTag = async (tagNameToRemove) => {
    console.log(`remove tag: ${tagNameToRemove}`);
    const result = await notes_deleteTagFromNote(noteId, tagNameToRemove);
    if (isStatusFromResponse2XX(result)) {
      const updatedTags = note.tags.filter((tag) => tag.name !== tagNameToRemove);
      setNote((prevNote) => ({
        ...prevNote,
        tags: updatedTags,
      }));
    }
  };

  const handleAddTag = async () => {
    if (newTag === "") return;
    console.log(`add tag: ${newTag}`);
    const result = await notes_addTagToNote(noteId, newTag);
    if (isStatusFromResponse2XX(result)) {
      const updatedTags = [...note.tags, { name: newTag }];
      setNote((prevNote) => ({
        ...prevNote,
        tags: updatedTags,
      }));
    }
    setNewTag("");
  };

  return (
    <>
      {note ? (
        <div className="container-view-note">
          <div>
            <Button
              variant="primary"
              className="mr-2"
              onClick={() => handleBackButtonClick()}
            >
              Back
            </Button>
            {/* <Button variant="outline-success" className="mr-2">
              Download
            </Button> */}
            <Button
              variant="warning"
              className="mr-2"
              onClick={() => handleEditNoteButtonClick()}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              className="mr-2"
              onClick={() => handleDeleteNoteButtonClick()}
            >
              Delete
            </Button>
          </div>
          <div>
            <h1>{note.title}</h1>
          </div>
          <div>
            <p>Created: {note.createdTime}</p>
          </div>
          <div>
            <p>Last Modified: {note.lastModifiedDate}</p>
          </div>

          <div>
            <h3>Tags</h3>
            <div className="mb-3">
              <div className="input-group">
                <input
                  type="text"
                  id="tagInput"
                  className="form-control"
                  placeholder="Enter tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddTag}
                >
                  Add Tag
                </button>
              </div>
            </div>

            <div>
              {note.tags.map((tag, index) => (
                <Tag
                  key={index}
                  tagName={tag.name}
                  onRemove={handleRemoveTag}
                />
              ))}
            </div>
          </div>
          <div>
            <h3>Summary</h3>
            <p>{note.summary}</p>
          </div>
          <div>
            <h3>Content</h3>
            <div className="note-content"></div>
          </div>
        </div>
      ) : (
        <div className="container">
          <h1>Note not found!</h1>
        </div>
      )}
    </>
  );
};

export default ViewNotePageContainer;

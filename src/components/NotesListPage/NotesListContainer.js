import React, { useEffect, useState } from "react";
import { notes_getUserNotes } from "../../actions/note";
import { useAuth } from "../../context/AuthContext";
import { BsSearch } from "react-icons/bs"; // Import the search icon from react-icons
import NoteRespresentationInNotesList from "./NoteRespresentationInNotesList";
import { Link } from "react-router-dom";
import { VIEW_NOTE_PATH } from "../../data/Constants";
import "./NotesListPageStyles.css";

const NotesListContainer = () => {
  const { getCurrentUserId } = useAuth();

  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    requestUserNotes();
  }, []);

  async function requestUserNotes() {
    console.log(`dzialam`);
    console.log(getCurrentUserId());
    const response = await notes_getUserNotes(getCurrentUserId());
    console.log(
      `hello from Login.js testingkams: ${JSON.stringify(response?.data)}`
    );
    if (response.data._embedded) {
      setNotes(response?.data._embedded.noteModelList || []);
    }
  }

  const handleSearch = () => {
    // Implement search logic here based on the searchTerm
    // You may need to modify your API call to include the search term
    // For simplicity, I'm just logging the search term for now
    console.log(`Search term: ${searchTerm}`);
  };

  return (
    <div className="container">
      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary ml-2" onClick={handleSearch}>
          <BsSearch /> Search
        </button>
      </div>
      <ul className="notes-list-container">
        {notes &&
          notes.map((note) => (
            <li key={note.id}>
              <Link
                to={`${VIEW_NOTE_PATH.replace(":noteId", note.id)}`}
                style={{ textDecoration: "none" }}
              >
                <NoteRespresentationInNotesList note={note} />
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default NotesListContainer;

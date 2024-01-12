import React from "react";
import NoteTags from "./NoteTags";

const NoteRespresentationInNotesList = ({ note }) => {
    return (
        <div className="note-representation-in-list">
            <h2>{note.title}</h2>
            <h4>{note.summary}</h4>
            <NoteTags tags={note.tags} />
        </div>
    );
};

export default NoteRespresentationInNotesList;
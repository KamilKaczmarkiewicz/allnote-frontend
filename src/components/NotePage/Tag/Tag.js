import React from "react";

const Tag = ({ tagName, onRemove }) => {
  return (
    <>
      <div className="tag-container border" style={{ display: "inline-block", marginRight: "5px" }}>
        <span className="badge bg-primary">{tagName}</span>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={() => onRemove(tagName)}
        >
          X
        </button>
      </div>
    </>
  );
};

export default Tag;

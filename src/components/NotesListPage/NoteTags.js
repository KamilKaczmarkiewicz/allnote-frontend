import React from "react";

const NoteTags = ({tags}) => {
  return <div>Tags: {tags &&
    tags.map((tag) => (tag.name + ", "))}
  </div>;
};

export default NoteTags;

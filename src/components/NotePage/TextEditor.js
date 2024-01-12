import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./TextEditor.css";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const TextEditor = ({ content, onContentChange }) => {
  const [quill, setQuill] = useState();
  const [loadContent, setLoadContent] = useState(false);

  useEffect(() => {
    if (quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      onContentChange(quill.getContents());
      console.log(`quill content: ${quill.getContents()}`);
      console.log(`quill content.data: ${quill.getText()}`);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [quill]);

  useEffect(() => {
    if (quill == null) return;
    if (loadContent) return;

    quill.clipboard.dangerouslyPasteHTML(content);
    setLoadContent(true);
  }, [content]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    setQuill(q);
  }, []);

  return <div className="quill-container" ref={wrapperRef}></div>;
};

export default TextEditor;

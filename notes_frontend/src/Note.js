/* See above for file content. */
import React from "react";

// PUBLIC_INTERFACE
function Note({ note }) {
  /**
   * Renders a single note (read-only view)
   * @param {object} note - Note object
   */
  if (!note) {
    return <div style={{ color: "#757575", marginTop: "32px" }}>Select a note to view.</div>;
  }
  return (
    <article>
      <h2 className="note-title">{note.content.slice(0, 40) || "Untitled"}</h2>
      <div className="note-date">{new Date(note.date || note.id * 1).toLocaleString()}</div>
      <div style={{ marginTop: "18px" }}>{note.content}</div>
    </article>
  );
}

export default Note;

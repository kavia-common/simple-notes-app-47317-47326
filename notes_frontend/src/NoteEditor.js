/* See above for file content. */
import React, { useState, useEffect } from "react";

// PUBLIC_INTERFACE
function NoteEditor({ note, onSave, onCancel }) {
  /**
   * Editor to create or edit notes.
   * @param {object} note - Note to edit ({ id, content }), can be null for new
   * @param {function} onSave - Save callback
   * @param {function} onCancel - Cancel callback
   */
  const [content, setContent] = useState(note ? note.content : "");

  useEffect(() => {
    setContent(note ? note.content : "");
  }, [note]);

  return (
    <section className="note-editor" data-testid="note-editor">
      <div className="note-editor-title">
        {note ? "Edit Note" : "New Note"}
      </div>
      <textarea
        className="note-editor-area"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write your note here..."
        autoFocus
        rows={8}
        data-testid="note-content-input"
      />
      <div className="note-editor-actions">
        <button
          className="note-editor-save-btn"
          onClick={() => {
            if (content.trim()) onSave(content, note && note.id);
          }}
          data-testid="save-note-button"
        >
          Save
        </button>
        {note && (
          <button
            style={{
              background: "transparent",
              color: "#2563EB",
              border: "1px solid #2563EB",
              borderRadius: 8,
              padding: "10px 22px",
              fontWeight: "600",
              cursor: "pointer"
            }}
            onClick={onCancel}
            data-testid="cancel-edit-button"
          >
            Cancel
          </button>
        )}
      </div>
    </section>
  );
}

export default NoteEditor;

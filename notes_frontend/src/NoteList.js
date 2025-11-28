/* See above for file content. */
import React from "react";

// PUBLIC_INTERFACE
function NoteList({ notes, selectedId, onSelect, onDelete }) {
  /**
   * Lists existing notes with select and delete options.
   * @param {Array} notes - List of note objects { id, content, date }
   * @param {string} selectedId - Current selected note id
   * @param {function} onSelect - Note select callback
   * @param {function} onDelete - Delete note callback
   */
  return (
    <section className="note-list">
      <div className="note-list-title">Notes</div>
      {notes.length === 0 ? (
        <div style={{ color: "#757575" }}>No notes yet.</div>
      ) : (
        <ul className="note-list-items">
          {notes.map(note => (
            <li
              key={note.id}
              className={`note-list-item${
                note.id === selectedId ? " selected" : ""
              }`}
              onClick={() => onSelect(note.id)}
              data-testid={`note-item-${note.id}`}
            >
              <div>
                <div className="note-title">
                  {note.content.slice(0, 30) || "Untitled"}
                </div>
                <div className="note-date">
                  {new Date(note.date || note.id * 1).toLocaleString()}
                </div>
              </div>
              <div className="note-actions">
                <button
                  className="note-delete-btn"
                  onClick={e => {
                    e.stopPropagation();
                    onDelete(note.id);
                  }}
                  aria-label="Delete note"
                  data-testid={`delete-note-${note.id}`}
                >
                  🗑
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default NoteList;

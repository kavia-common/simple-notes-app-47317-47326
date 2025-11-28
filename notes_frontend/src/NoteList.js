import React from "react";

/**
 * Renders list of notes with selection, deletion and highlighting of matches.
 *
 * @param {Array}  notes        – list of note objects { id, content, date }
 * @param {string} selectedId   – currently selected note id
 * @param {Function} onSelect   – callback when note selected
 * @param {Function} onDelete   – callback when note deleted
 * @param {string}  searchTerm  – current search term for highlighting
 */
// PUBLIC_INTERFACE
function NoteList({
  notes,
  selectedId,
  onSelect,
  onDelete,
  searchTerm = "",
}) {
  // Highlight matching text with <span className="note-highlight">
  const highlightText = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.split(regex).map((chunk, i) =>
      regex.test(chunk) ? (
        <span key={i} className="note-highlight">
          {chunk}
        </span>
      ) : (
        chunk
      )
    );
  };

  return (
    <section className="note-list">
      <div className="note-list-title">Notes</div>
      {notes.length === 0 ? (
        <div style={{ color: "#757575" }}>No notes yet.</div>
      ) : (
        <ul className="note-list-items">
          {notes.map((note) => (
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
                  {highlightText(note.content.slice(0, 30) || "Untitled")}
                </div>
                <div className="note-date">
                  {new Date(note.date || Number(note.id)).toLocaleString()}
                </div>
              </div>
              <div className="note-actions">
                <button
                  className="note-delete-btn"
                  onClick={(e) => {
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

/* See above for file content. */
import React from "react";

// PUBLIC_INTERFACE
function Sidebar({ onAddNote }) {
  /**
   * Sidebar navigation for notes app.
   * @param {function} onAddNote - Callback for adding a note
   */
  return (
    <aside className="notes-sidebar" data-testid="sidebar">
      <div className="nav-title">Navigation</div>
      <div className="sidebar-actions">
        <button
          className="sidebar-add-btn"
          onClick={onAddNote}
          data-testid="add-note-button"
        >
          + New Note
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

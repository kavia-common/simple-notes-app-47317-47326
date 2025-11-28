import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import NoteList from "./NoteList";
import Note from "./Note";
import NoteEditor from "./NoteEditor";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "./api";

/**
 * Root component for Notes Ocean frontend (Ocean Professional theme)
 * Handles global state: theme, notes, selection, editing, search & filters.
 */
// PUBLIC_INTERFACE
function App() {
  /* ---------- State ---------- */
  // Theme
  const [theme, setTheme] = useState("light");
  // Notes array
  const [notes, setNotes] = useState([]);
  // Currently selected note id
  const [selectedId, setSelectedId] = useState(null);
  // Editing state { mode: "new" } | false
  const [editing, setEditing] = useState(false);
  // Search term for full-text filter
  const [searchTerm, setSearchTerm] = useState("");
  // Filter value: "all" | "recent"
  const [filter, setFilter] = useState("all");

  /* ---------- Effects ---------- */
  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // On mount: load notes
  useEffect(() => {
    loadNotes();
  }, []);

  /* ---------- Data helpers ---------- */
  const loadNotes = async () => {
    const notesData = await getNotes();
    setNotes(notesData);
    // If none selected, pick first note
    if (notesData.length > 0) {
      setSelectedId(notesData[0].id);
    }
  };

  /* ---------- Theme ---------- */
  // PUBLIC_INTERFACE
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  /* ---------- Notes CRUD ---------- */
  // PUBLIC_INTERFACE
  const handleAddNote = () => setEditing({ mode: "new" });

  // PUBLIC_INTERFACE
  const handleSelectNote = (id) => {
    setSelectedId(id);
    setEditing(false);
  };

  // PUBLIC_INTERFACE
  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    const updated = await getNotes();
    setNotes(updated);
    if (updated.length > 0) {
      setSelectedId(updated[0].id);
    } else {
      setSelectedId(null);
      setEditing(false);
    }
  };

  // PUBLIC_INTERFACE
  const handleSaveNote = async (content, id = null) => {
    if (id) {
      await updateNote(id, content);
    } else {
      await createNote({ content, date: Date.now() });
    }
    const updated = await getNotes();
    setNotes(updated);
    const newId = id
      ? id
      : updated.length > 0
      ? updated[0].id
      : null;
    setSelectedId(newId);
    setEditing(false);
  };

  // PUBLIC_INTERFACE
  const handleCancelEdit = () => setEditing(false);

  /* ---------- Derived values ---------- */
  const filteredNotes = notes.filter((note) => {
    // Text match
    const textMatch = note.content
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    if (!textMatch) return false;

    // Filter type
    if (filter === "recent") {
      const oneDayMs = 24 * 60 * 60 * 1000;
      const noteTime = note.date || Number(note.id);
      return noteTime >= Date.now() - oneDayMs;
    }
    return true;
  });

  const selectedNote = notes.find((n) => n.id === selectedId);

  /* ---------- Render ---------- */
  return (
    <div className="App" data-testid="app-root">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filter={filter}
        onFilterChange={setFilter}
      />
      <Sidebar onAddNote={handleAddNote} />
      <main className="notes-main">
        <NoteList
          notes={filteredNotes}
          selectedId={selectedId}
          onSelect={handleSelectNote}
          onDelete={handleDeleteNote}
          searchTerm={searchTerm}
        />
        {editing ? (
          <NoteEditor
            note={editing.mode === "new" ? null : selectedNote || null}
            onSave={handleSaveNote}
            onCancel={handleCancelEdit}
          />
        ) : (
          <Note note={selectedNote} />
        )}
      </main>
    </div>
  );
}

export default App;

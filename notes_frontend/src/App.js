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

// PUBLIC_INTERFACE
function App() {
  // Theme state
  const [theme, setTheme] = useState("light");
  // Notes state
  const [notes, setNotes] = useState([]);
  // Selected note ID
  const [selectedId, setSelectedId] = useState(null);
  // True if editing (edit or new)
  const [editing, setEditing] = useState(false);

  // Effect: Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Effect: Load notes on mount
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const notes = await getNotes();
    setNotes(notes);
    if (notes.length > 0) {
      setSelectedId(notes[0].id);
    }
  };

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // PUBLIC_INTERFACE
  const handleAddNote = async () => {
    setEditing({ mode: "new" });
  };

  // PUBLIC_INTERFACE
  const handleSelectNote = (id) => {
    setSelectedId(id);
    setEditing(false);
  };

  // PUBLIC_INTERFACE
  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    let updated = await getNotes();
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
      // Edit existing
      await updateNote(id, content);
    } else {
      // Create new
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

  // Compute selectedNote
  const selectedNote = notes.find((n) => n.id === selectedId);

  return (
    <div className="App" data-testid="app-root">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <Sidebar onAddNote={handleAddNote} />
      <main className="notes-main">
        <NoteList
          notes={notes}
          selectedId={selectedId}
          onSelect={handleSelectNote}
          onDelete={handleDeleteNote}
        />
        {editing ? (
          <NoteEditor
            note={
              editing.mode === "new"
                ? null
                : selectedNote || null
            }
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

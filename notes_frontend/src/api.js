/**
 * Mock CRUD API for notes using localStorage and a timeout
 * Uses REACT_APP_API_BASE for base, but this is a mock.
 */

// PUBLIC_INTERFACE
export const getNotes = async () => {
  /** Fetch all notes (mock) */
  await delay(100);
  const notes = JSON.parse(localStorage.getItem('notes') || '[]');
  return notes;
};

// PUBLIC_INTERFACE
export const createNote = async (note) => {
  /** Create a new note (mock) */
  await delay(100);
  const notes = JSON.parse(localStorage.getItem('notes') || '[]');
  const newNote = { ...note, id: Date.now().toString() };
  localStorage.setItem('notes', JSON.stringify([newNote, ...notes]));
  return newNote;
};

// PUBLIC_INTERFACE
export const updateNote = async (id, content) => {
  /** Update a note by ID (mock) */
  await delay(100);
  const notes = JSON.parse(localStorage.getItem('notes') || '[]');
  const updatedNotes = notes.map(n => (n.id === id ? { ...n, content } : n));
  localStorage.setItem('notes', JSON.stringify(updatedNotes));
  return updatedNotes.find(n => n.id === id);
};

// PUBLIC_INTERFACE
export const deleteNote = async (id) => {
  /** Delete a note by ID (mock) */
  await delay(100);
  const notes = JSON.parse(localStorage.getItem('notes') || '[]');
  const filtered = notes.filter(n => n.id !== id);
  localStorage.setItem('notes', JSON.stringify(filtered));
  return id;
};

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
